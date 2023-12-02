import React from "react";
import postCSS from "./postList.module.scss";
import NameInitials from "../utils/NameInitials";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { BASE_URL } from "../../helper";
import { AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../Actions/postActios";

const SinglePost = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  TimeAgo.addDefaultLocale(en);

  // Create formatter (English).
  const timeAgo = new TimeAgo("en-US");

  const addLike = () => {
    if(post.isLiked){
      dispatch(postActions.unlikePost({postID:post._id,user:user.data}))
    }
    else{
      dispatch(postActions.likePost({postID:post._id,user:user.data}))
    }
  }
  return (
    <div className={`${postCSS.singlePostOuterDiv} m-2 p-2 `}>
      <div className={` d-flex align-items-center mb-4`}>
        <NameInitials nameInitials={post?.author?.userName.split("")[0]} />
        <div className={` mx-4`}>
          <p className={`fw-bold`}>{post?.author?.userName}</p>
          <p>{timeAgo.format(new Date(post?.createdAt))}</p>
        </div>
      </div>
      <p className={`fw-bold m-3`}>{post.text}</p>
      {post?.image && (
        <div>
          <img
            src={`${BASE_URL}image/${post.image}`}
            alt={post.image}
            className={`${postCSS.postImage}`}
          />
        </div>
      )}
      <p className={`${postCSS.NoOfLikesAndComments}`}>
        <span className={`${postCSS.noOfLikes}`}>{`${post.likes?.length} Likes`}</span>
      </p>
      <botton className={`btn fw-bold ${postCSS.likeButton}`} onClick={addLike}>
        {" "}
        <AiFillLike
          className={`${postCSS.likeIcon}  ${
            post.isLiked ? postCSS.isLiked : "  "
          }`}
        />
      </botton>
    </div>
  );
};

export default SinglePost;
