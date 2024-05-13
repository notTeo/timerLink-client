import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";

export default function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
    }
  };
  return (
    <div className="singInPage">
      <h4 className="small-title">Sign In</h4>
      <div className="marginWrapper">
        <p>Welcome to TimerLink! Create dynamic links that adapt to dates.</p>
        <p>Sign in now to get started!</p>
        <form onSubmit={handleRegister}>
          <div className="signInInputs">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signInControls">
            <label htmlFor="remeberMecheckbox">
              <input
                type="checkbox"
                name="remeberMecheckbox"
                className="checkbox"
              />
              Remember me
            </label>
            <button className="blueButton" onClick={handleRegister}>
              Sign In
            </button>
          </div>
        </form>

        <div className="redirectToLoginContainer">
          <p>Already have an account?</p>
          <p>
            Head to{" "}
            <Link to={"/login"} className="micro-link">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
