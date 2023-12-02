import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../Actions/postActios";

import SinglePost from "./SinglePost";
const PostList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const posts = useSelector((state) => state.postReducer.posts);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPosts = () => {
    if (posts.isNextPageAvailable||page===1) {
      dispatch(postActions.getPosts({ userToken: user.data.userToken, page }));
    }
  };
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.scrollHeight
    ) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={`d-flex flex-column align-items-center`}>
      {posts.data.map((post) => (
        <SinglePost post={post} />
      ))}
    </div>
  );
};

export default PostList;
