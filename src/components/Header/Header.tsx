import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../reducers/authSlice";

export default function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <div className="header">
      <Link to={isAuthenticated? ("/links"): ("/")} className="tittle">
        TimerLink
      </Link>
      <Navbar />
    </div>
  );
}
