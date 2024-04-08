import React from "react";
import postCSS from "./postList.module.scss";
import NameInitials from "../utils/NameInitials";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../Actions/postActios";

const SinglePost = ({ post, isOpenInModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  TimeAgo.addLocale(en);

  // Create formatter (English).
  const timeAgo = new TimeAgo("en-US");

  // disable right click on post
  const handleRightClick = (event) => {
    event.preventDefault();
  };

  const addLike = (e) => {
    if (post.isLiked) {
      dispatch(postActions.unlikePost({ postID: post._id, user: user.data }));
    } else {
      dispatch(postActions.likePost({ postID: post._id, user: user.data }));
    }
    e.stopPropagation();
  };

  const selectPost = (index) => {
    if(isOpenInModal) return;
    dispatch(postActions.selectPost(index));
  };

  return (
    <div
      className={`${postCSS.singlePostOuterDiv} m-2 p-2 ${
        isOpenInModal ? postCSS.FullWidth : ""
      }`}
      onContextMenu={handleRightClick}
      onClick={(e) => selectPost(post.index,e)}
    >
      <div className={` d-flex align-items-center mb-4 select-none`}>
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
            src={`${post.image}`}
            alt={post.image}
            className={`${postCSS.postImage}`}
          />
        </div>
      )}
      <p className={`${postCSS.NoOfLikesAndComments}`}>
        <span
          className={`${postCSS.noOfLikes}`}
        >{`${post.likes?.length} Likes`}</span>
      </p>
      <button className={`btn fw-bold ${postCSS.likeButton}`} onClick={addLike}>
        {" "}
        <AiFillLike
          className={`${postCSS.likeIcon}  ${
            post.isLiked ? postCSS.isLiked : "  "
          }`}
        />
      </button>
    </div>
  );
};

export default SinglePost;
