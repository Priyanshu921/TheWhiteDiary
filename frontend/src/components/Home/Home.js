import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import homeStyle from './Home.module.css'
import { userActions } from '../../Actions/userActions';
import { quoteActions } from '../../Actions/quoteActions';
export const Home = () => {
    const user = useSelector(state => state.userReducer.user)
    const quoteData = useSelector(state => state.quoteReducer.quote)
    const dispatch = useDispatch()
    const [quote,setQuote] = useState({})
    const [isExpanded,setIsExpanded] = useState(false)
    useEffect(()=>{
      dispatch(quoteActions.getRandomQuote())
    },[])
    useEffect(() => {
      setQuote(quoteData.data);
    }, [quoteData]);
    const handleLogout = () => {
      dispatch(userActions.logout())
    }
  return (
    <>
    < div className={homeStyle.nav}>
      <button
            className={"navbar-toggler "+homeStyle.navbar_toggler}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
            onClick={()=>{console.log("sdsdfsddf");setIsExpanded(!isExpanded)}}
          >
            <span className={"navbar-toggler-icon "+homeStyle.navbar_toggler_icon_white_diary}></span>
          </button>
      <div className={"d-flex px-2 " + homeStyle.navbar+" "+ (isExpanded?homeStyle.isExpanded:"")}>
        <div className="col-md-8 my-2 h-100">
          <Link
            className={"mx-2 " + homeStyle.navLink + " " + homeStyle.active}
            to="/"
          >
            Home
          </Link>
          <Link className={"mx-2 " + homeStyle.navLink} to="/search">
            Search
          </Link>
          <Link className={"mx-2 " + homeStyle.navLink} to="/">
            About
          </Link>
        </div>
        <div className="col-md-4 my-1">
          <div className={"dropdown float-end " + homeStyle.profileButton}>
            <Link
              className={
                "btn btn-secondary dropdown-toggle " + homeStyle.profileButton
              }
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user.data.userName}
            </Link>

            <ul className="dropdown-menu ps-2">
              <li>
                <Link to="/</div>">View Profile</Link>
              </li>
              <li>
                <Link to="/</div>">Settings</Link>
              </li>
              <li>
                <button
                  className={homeStyle.logoutBtn}
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
      <div className={`my-2 ${homeStyle.quoteOuterBox}`}>
        <div className={` ${homeStyle.quoteBox}`}>
          <p className={`text-center ${homeStyle.quoteText}`}>{quote.quote}</p>
          <p className={`text-end ${homeStyle.quoteByText}`}>
            - {quote.saidBy}
          </p>
        </div>
      </div>
    </>
  );
}
