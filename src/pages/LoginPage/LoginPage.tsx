import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/authSlice";
import { setUsername } from "../../reducers/userSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const responseData = await response.json();

      const token = responseData.data.token;
      const username = responseData.data.username;
      dispatch(setUsername(username));

      console.log({token, username});
      dispatch(login(token));
      navigate("/")
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="loginPage">
      <h4 className="small-title">Login</h4>
      <div className="marginWrapper">
        <p>Welcome back to TimerLink! Good to see you again!</p>
        <p>Login to access your TimerLink account</p>
        <div className="loginInputs">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="loginControls">
          <label htmlFor="remeberMecheckbox">
            <input
              type="checkbox"
              name="remeberMecheckbox"
              className="checkbox"
            />
            Remember me
          </label>
          <p>
            <Link
              to={"/userid/links"}
              onClick={handleLogin}
              className="blueButton"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="redirectToLoginContainer">
          <p>If you don't have an account,</p>
          <p>
            <Link to={"/sign-in"} className="micro-link">
              Sing in
            </Link>{" "}
            to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
