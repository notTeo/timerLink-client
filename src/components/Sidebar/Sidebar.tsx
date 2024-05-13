import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/authSlice';

interface NavbarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ showSidebar, setShowSidebar }: NavbarProps) {
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
        <div className="sidebarUsernameDisplay">
          <h2>Hi,</h2>
          <h2>Username</h2>
        </div>
        <div className="logOutButton">
          <Link to={"/"} onClick={handleLogout} className="whiteButton">
            Log Out
          </Link>
        </div>
        <div className="date">
          4/44/4444
        </div>
      </div>
    </div>
  );
}
