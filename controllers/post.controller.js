import mongoose from "mongoose";
import { apiResponse } from "../helper/utils.js";
import { post } from "../models/post.js";
import { socket } from "../helper/socket.js";
import fs from "fs";
import { authorize, deleteFile, uploadFile } from "../helper/uploadFile.js";
import path from "path";
import { notificationModel } from "../models/notification.js";
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const image = req?.file
      ? req.user.userName + "_" + req.file.originalname
      : null;
    if (image) {
      const jwtToken = await authorize();
      var id = await uploadFile(jwtToken, image);
      fs.unlinkSync(path.join(path.resolve(), "uploads", "images", image));
    }
    const postCreated = await post.create({
      text,
      image: id?.data?.id || null,
      author: new mongoose.Types.ObjectId(req.user._id),
    });
    await postCreated.populate("author");
    if (postCreated) {
      const io = socket.getIo();
      io.emit("newPost", postCreated);
      return apiResponse(res, {
        statusCode: 201,
        data: postCreated,
        message: "Post Created Succefully",
      });
    }
  } catch (error) {
    console.log(error);
    return apiResponse(res, {
      statusCode: 500,
      error: "Problem while creating posts",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const page = req.query.page || process.env.page;
    const limit = req.query.limit || process.env.limit;
    let totalPosts = await post.count().lean().exec();
    let totalPages = Math.ceil(totalPosts / limit);
    let posts = await post
      .find()
      .sort({ updatedAt: "desc" })
      .populate("author", "userName email")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();
    posts = posts.map((post) => {
      const isLiked = post.likes.some(
        (like) => like.likedBy.toString() === req.user._id
      );
      return {
        ...post,
        isLiked,
      };
    });
    if (!posts.length) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Posts not available",
      });
    }
    return apiResponse(res, {
      statusCode: 200,
      data: posts,
      page: page,
      isNextPageAvailable: page < totalPages,
      isPreviousPageavailable: page > 1,
      message: "Posts fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return apiResponse(res, {
      statusCode: 500,
      error: "Problem while fetching posts",
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { postID } = req.params;
    if (!postID) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Please send valid Post ID",
      });
    }
    let postDetails = await post
      .findOne({ _id: postID })
      .populate("author", "userName email")
      .lean()
      .exec();
    if (!postDetails) {
      return apiResponse(res, { statuCode: 400, error: "Post Not found" });
    }
    const isLiked = postDetails.likes.some(
      (like) => like.likedBy.toString() === req.user._id
    );
    postDetails = {
      ...postDetails,
      isLiked,
    };
    return apiResponse(res, {
      statusCode: 200,
      data: postDetails,
      message: "Post data fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return apiResponse(res, {
      statusCode: 500,
      error: "Problem while finding Post details",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postID } = req.params;
    let fileDeleted = 204;
    if (!postID) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Please send valid Post ID",
      });
    }
    const postDetail = await post.findOne({ _id: postID }).lean().exec();
    if (!postDetail) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Please send valid Post ID",
      });
    }
    if (postDetail?.image) {
      const jwtToken = await authorize();
      const fileDeleted = await deleteFile(jwtToken, postDetail.image);
    }
    const postDeleted = await post.deleteOne({ _id: postID });
    if (postDeleted.deletedCount && fileDeleted === 204) {
      return apiResponse(res, {
        statusCode: 200,
        message: "Post Deleted Successfully.",
      });
    }
  } catch (error) {
    return apiResponse(res, {
      statusCode: 500,
      error: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { comment, postID } = req.body;
    const postData = await post.findOne({ _id: postID }).lean().exec();
    if (!postData) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Post does not exist",
      });
    }
    postData.comments.push({
      commentor: new mongoose.Types.ObjectId(req.user._id),
      comment: comment,
    });
    const postUpdated = await post.updateOne({ _id: postID }, postData);
    if (!postUpdated.modifiedCount) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Please send valid details",
      });
    }
    return apiResponse(res, {
      statusCode: 200,
      message: "Comment added",
      data: { comment, commentor: { name: req.user.name } },
    });
  } catch (err) {
    console.log(err);
    return apiResponse(res, {
      statusCode: 500,
      error: "Problem while adding comment",
    });
  }
};

export const addLike = async (req, res) => {
  try {
    const { postID } = req.body;
    const postUpdated = await post.updateOne(
      { _id: postID, "likes.likedBy": { $ne: req.user._id } },
      {
        $addToSet: {
          likes: { likedBy: new mongoose.Types.ObjectId(req.user._id) },
        },
      }
    );
    if (!postUpdated.modifiedCount) {
      return apiResponse(res, {
        statusCode: 400,
        error: "Already Liked the post",
      });
    }
    const likedPost = await post
      .findOne({ _id: postID })
      .populate("comments.commentor", "name")
      .populate("author")
      .lean()
      .exec();
    const io = socket.getIo();
    const message = `Someone Liked your post "${likedPost.text.slice(0, 100)}${
      likedPost.text.length > 76 ? "..." : "."
    }"`;
    const notificationExist = await notificationModel
      .findOne({ userID: likedPost.author._id })
      .lean()
      .exec();
    let notificationAdded = false;
    const notificationData = {
      message: message,
      _id: likedPost._id,
    };
    if (notificationExist) {
      const newUnreadNotification = notificationExist.unreadNotifications + 1;
      notificationAdded = await notificationModel.updateOne(
        { userID: likedPost.author._id },
        {
          unreadNotifications: newUnreadNotification,
          notifications: [notificationData, ...notificationExist.notifications],
        },
        { upsert: true }
      );
    } else {
      notificationAdded = await notificationModel.create({
        userID: likedPost.author._id,
        unreadNotifications: 1,
        notifications: notificationData,
      });
    }
    if (notificationAdded) {
      io.emit(likedPost.author._id.toString(), notificationData);
    }
    return apiResponse(res, {
      statusCode: 200,
      message: "Like added",
      data: { ...likedPost, isLiked: true },
    });
  } catch (err) {
    console.log(err);
    return apiResponse(res, {
      statusCode: 500,
      error: "Problem while Liking the Post",
    });
  }
};

export const removeLike = async (req, res) => {
  try {
    const { postID } = req.body;
    const postUpdated = await post.updateOne(
      { _id: postID, "likes.likedBy": req.user._id },
      {
        $pull: {
          likes: { likedBy: new mongoose.Types.ObjectId(req.user._id) },
        },
      }
    );
    if (!postUpdated.modifiedCount) {
      return apiResponse(res, {
        statusCode: 400,
        error: "You haven't liked the post",
      });
    }
    const unLikedPost = await post
      .findOne({ _id: postID })
      .populate("comments.commentor", "name")
      .populate("author")
      .lean()
      .exec();
    return apiResponse(res, {
      statusCode: 200,
      message: "Unliked the post",
      data: { ...unLikedPost, isliked: false },
    });
  } catch (err) {
    console.log(err);
    return apiResponse(res, {
      statusCode: 500,
      error: "Problem while Unliking the Post",
    });
  }
};
