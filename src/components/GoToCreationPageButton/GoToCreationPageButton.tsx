import React from "react";
import { Link } from "react-router-dom";
import "./GoToCreationPageButton.css";

export default function GoToCreationPageButton() {
  return (
    <div>
      <Link to={"new"} className="createLinkButton blueButton">
        Add a new Link!
      </Link>
    </div>
  );
}
