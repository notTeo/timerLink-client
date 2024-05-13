import React from "react";
import "./mainPage.css";
import LinkList from "../../components/LinkList/LinkList";
import GoToCreationPageButton from "../../components/GoToCreationPageButton/GoToCreationPageButton";

export default function MainPage() {
  return (
    <div className="mainPage">
      <h4 className="small-title">MyLinks</h4>
      <div className="linksHeader">
        <p>Do you want to create a Link? Just press the button!</p>
        <GoToCreationPageButton />
      </div>
      <LinkList />
    </div>
  );
}
