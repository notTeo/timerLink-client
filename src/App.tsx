import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectExpirationTimestamp, selectIsAuthenticated } from "./reducers/authSlice";
import CreateLinkPage from "./pages/CreateLinkPage/CreateLinkPage";
import HeroPage from "./pages/HeroPage/HeroPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import MainPage from "./pages/MainPage/MainPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import "./ShearedStyles.css";
import SignInPage from "./pages/SignInPage/SignInPage";

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  const dispatch = useDispatch();
  const expirationTimestamp = useSelector(selectExpirationTimestamp);

  useEffect(() => {
    if (!expirationTimestamp) return;

    const timeLeft = expirationTimestamp - Date.now();

    const timeout = setTimeout(() => {
      dispatch(logout());
    }, timeLeft);

    return () => clearTimeout(timeout);
  }, [expirationTimestamp, dispatch]);
  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/links" element={<AuthenticatedLayout />}>
              <Route index element={<MainPage />} />
              <Route path="new" element={<CreateLinkPage />} />
            </Route>
            <Route path="/" element={<Navigate to={"/links"} />} />
          </>
        ) : (
          <Route element={<AuthenticatedLayout />}>
            <Route path="/" element={<HeroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
          </Route>
        )}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
