import { useDispatch, useSelector } from "react-redux";
import { IoIosNotifications } from "react-icons/io";
import NotficationStyle from "./Notifications.module.scss";
import { Link } from "react-router-dom";
import {  useEffect, useState } from "react";
import { userActions } from "../../Actions/userActions";
import { postActions } from "../../Actions/postActios";
export const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.userReducer.notifications);
  const unreadNotification = useSelector((state) => state.userReducer.unreadNotification);
  const user = useSelector(state=> state.userReducer.user);
  const [isOpen, setIsOpen] = useState(false);

  // use effects
  useEffect(()=>{
    getNotifications()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // functions 
  const openNotification = (event) => {
    setIsOpen(!isOpen);
    if(unreadNotification){
      dispatch(
        userActions.readNotification({
          userToken: user.data.userToken,
        })
      );
    }
  };

  const clearNotifications = () => {
    dispatch(
      userActions.clearNotifications({
        userToken: user.data.userToken,
      })
    );
  }

  const handleViewNotification = (_id) => {
      dispatch(postActions.getPost({ userToken: user.data.userToken, postID:_id }));

  }

  const getNotifications = () => {
    dispatch(
      userActions.getNotifications({
        userToken: user.data.userToken,
      })
    );
  }

  return (
    <div className={NotficationStyle.notification}>
      <Link onClick={openNotification}>
        <IoIosNotifications />
        {unreadNotification > 0 && (
          <p className={`${NotficationStyle.notificationCount}`}>
            {unreadNotification}
          </p>
        )}
      </Link>

      {isOpen && (
        <div
          className={` ${NotficationStyle.notificationContainer}`}
        >
          {notifications?.length > 0 && (
            <button
              className={`${NotficationStyle.clearButton}`}
              onClick={clearNotifications}
            >
              Clear All
            </button>
          )}
          {!notifications?.length && (
            <p className={` p-2`}>No Notifications Available</p>
          )}
          <div className={`${NotficationStyle.notificationInnerContainer}`}>
            {notifications?.length > 0 &&
              notifications.map((notification, index) => (
                <p
                  className={`${NotficationStyle.singleNotification}`}
                  key={index}
                  onClick={() => handleViewNotification(notification._id)}
                >
                  {notification?.message}
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
