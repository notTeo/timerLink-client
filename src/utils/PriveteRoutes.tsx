import React from "react";
import { Route, RouteProps, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../reducers/authSlice";
import ErrorPage from "../pages/ErrorPage/ErrorPage";



const PrivateRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  // If user is authenticated, render the provided element or children, else redirect to error page
  return isAuthenticated ? <Outlet/> : <Navigate to={"/error"} replace/>;
};

export default PrivateRoute;
