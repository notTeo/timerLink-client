import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../reducers/authSlice";

export default function ErrorPage() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return (
    <div className="errorPage">
      <h4 className="small-title">Oops</h4>
      <div className="marginWrapper">
        <div className="errorMessege">
          <h1>404</h1>
          <p>Page not found...</p>
          <p>
            It seems like you've stumbled upon a page that doesn't exist. Don't
            worry, even the best explorers take a wrong turn now and then. Let's
            get you back on track! You can navigate back to our homepage.
          </p>
          <p>
            <Link to={isAuthenticated ? ("/links") : ("/")} className="blueButton">
              Go to main page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
