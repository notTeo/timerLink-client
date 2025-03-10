import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { login, logout } from "../../reducers/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectIsAuthenticated } from "../../reducers/authSlice";


export default function Navbar() {
  const username = useSelector((state: RootState) => state.user.username);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showSidebar, setShowSidebar] = useState(false);

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }
  const dispatch = useDispatch();

  const handleLogout = async (e: any) => {
    dispatch(logout());
  };
  return (
    <div className="navbar">
      <div className="displayLines" onClick={toggleSidebar}>
        <div className="lines">
          <div className="nav-line"></div>
          <div className="nav-line middle"></div>
          <div className="nav-line"></div>
        </div>
      </div>
      <div className="displayFullScreenContent">
        <div className="fullScreenContent">
          {!isAuthenticated ? (
            <div>
              <Link to={"/login"} className="whiteButton">
                Login
              </Link>

              <Link to={"/sign-in"} className="blueButton">
                Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="usernameDisplay">
                  <h2>Hi,&nbsp;</h2>
                  <h3>{username || "Guest"}</h3>  
              </div>
              <div className="logOutButton ">
                <Link to={"/"} onClick={handleLogout} className="whiteButton">
                  Log Out
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
    </div>
  );
}
