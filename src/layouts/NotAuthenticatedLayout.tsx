import React from "react";
import {
    Outlet,
  } from "react-router-dom";
import NotAuthHeader from "../components/NotAuthHeader/NotAuthHeader";

export default function NotAuthenticatedLayout() {
    return (
      <div>
        <NotAuthHeader />
        <Outlet />
      </div>
    );
  }