import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavStyle from "./Navbar.module.scss";
import { userActions } from "../../Actions/userActions";
import { Notification } from "../Notifications/Notifications";
export const Navbar = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);
  const [isExpanded, setIsExpanded] = useState(false);

  // functions
  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <>
      <div className={` sticky-top ${NavStyle.nav} `}>
        <button
          className={"navbar-toggler " + NavStyle.navbar_toggler}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-label="Toggle navigation"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <span
            className={
              "navbar-toggler-icon " + NavStyle.navbar_toggler_icon_white_diary
            }
          ></span>
        </button>
        <div
          className={
            "d-flex px-2 " +
            NavStyle.navbar +
            " " +
            (isExpanded ? NavStyle.isExpanded : "")
          }
        >
          <div className="col-md-8 my-2 h-100">
            <Link
              className={"mx-2 " + NavStyle.navLink + " " + NavStyle.active}
              to="/"
            >
              Home
            </Link>
            {/* Features yet to be */}
            {/* <Link className={"mx-2 " + NavStyle.navLink} to="/search">
              Search
            </Link>
            <Link className={"mx-2 " + NavStyle.navLink} to="/">
              About
            </Link> */}
          </div>
          <div className="col-md-4 my-1">
            <div className={"dropdown float-end " + NavStyle.profileButton}>
              <Link
                className={
                  "btn btn-secondary dropdown-toggle " + NavStyle.profileButton
                }
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.data.userName}
              </Link>

              <ul className="dropdown-menu ps-2">
                <li>
                  <button
                    className={NavStyle.logoutBtn}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Notification/>
      </div>
      {children}
    </>
  );
};
