import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/authSlice';
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../reducers/authSlice";

interface NavbarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ showSidebar, setShowSidebar }: NavbarProps) {

  const isAuthenticated = useSelector(selectIsAuthenticated);
  function toggleSidebar() {
    setShowSidebar(false);
  }
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={`sidebar ${showSidebar ? "show" : "hide"}`}>
      <button className="closeSidebar" onClick={toggleSidebar}>
        x
      </button>
      <div className="sidebarContent">
        {isAuthenticated ? (<>
            <div className="sidebarUsernameDisplay">
              <h2>Hi,</h2>
              <h2>Username</h2>
            </div>
            <div className="logOutButton">
              <Link to={"/"} onClick={handleLogout} className="whiteButton">
                Log Out
              </Link>
            </div>
          </>): (<>
              <Link to={"/login"} className="whiteButton">
                Login
              </Link>

              <Link to={"/sign-in"} className="blueButton">
                Sign In
              </Link>
            </>)}
        
      </div>
    </div>
  );
}
