import React from "react";
import "./HeroPage.css";

export default function HeroPage() {
  return (
    <div className="heroPage">
      <div className="marginWrapperHero">
        <p>
          Welcome to our link hosting platform that allows users to create links
          dynamically pointing to different things based on dates. We call it
          <span className="blue"> TimerLink</span>!
        </p>
      </div>
      <div className="boxes">
        <div className="box box1"></div>
        <div className="box box2"></div>
        <div className="box box3"></div>
        <div className="box box4"></div>
      </div>
    </div>
  );
}
