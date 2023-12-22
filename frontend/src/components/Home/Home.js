import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import homeStyle from "./Home.module.css";
import { quoteActions } from "../../Actions/quoteActions";
import CreatePost from "../CreatePost/CreatePost";
import PostList from "../Posts/PostList";
import io from "socket.io-client";
import { BASE_URL_WEBSOCKET } from "../../helper";
import { postActions } from "../../Actions/postActios";
import { userActions } from "../../Actions/userActions";
export const Home = () => {
  const quoteData = useSelector((state) => state.quoteReducer.quote);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const [quote, setQuote] = useState({});
  useEffect(() => {
    dispatch(quoteActions.getRandomQuote());
    //IO for new post
    io(BASE_URL_WEBSOCKET.toString()).on(`newPost`, (payload) => {
      dispatch(postActions.addNewPost(payload));
    });
    io(BASE_URL_WEBSOCKET.toString()).on(`${user.data._id.toString()}`, (payload) => {
      dispatch(userActions.addNewNotifications(payload));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setQuote(quoteData.data);
  }, [quoteData]);

  return (
    <>
      {quote && (
        <div className={`my-2 ${homeStyle.quoteOuterBox}`}>
          <div className={` ${homeStyle.quoteBox}`}>
            <p className={`text-center ${homeStyle.quoteText}`}>
              {quote.quote}
            </p>
            <p className={`text-end ${homeStyle.quoteByText}`}>
              - {quote.saidBy}
            </p>
          </div>
        </div>
      )}
      <CreatePost />
      <PostList />
    </>
  );
};
