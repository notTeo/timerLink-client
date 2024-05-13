import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./reducers/authSlice";
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
