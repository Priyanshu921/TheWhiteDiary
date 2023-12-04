import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../Actions/postActios";
import { debounce } from "lodash";

import SinglePost from "./SinglePost";
import { Rings } from "react-loader-spinner";
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
    if ((posts.isNextPageAvailable && !posts.isLoading) || page === 1) {
      dispatch(postActions.getPosts({ userToken: user.data.userToken, page }));
    }
  };
  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop+100 <
      document.documentElement.scrollHeight
    ) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  },1000);

  return (
    <div className={`d-flex flex-column align-items-center`}>
      {posts.data.length > 0 &&
        posts.data.map((post) => <SinglePost post={post} key={post._id} />)}
      {!posts.data.length && !posts.isLoading && <h2>No Posts Available</h2>}
      {posts.isLoading && (
        <Rings
          height="180"
          width="180"
          color="#f2f2bc"
          radius="100%"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      )}
    </div>
  );
};

export default PostList;
