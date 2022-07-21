import React from "react";
import img from "../../assets/imgs/Wall.jpg";
import "./ProjectDetail.scss";

export default function ProjectPage() {
  return (
    <div className="projectPage">
      <div className="bannerImg">
        <img className="bannerImg__img" src={img} alt="" />
      </div>
      <div className="overlay"></div>
      <div className="projectPage__content">
        <div className="projectPage__title">
          <div className="title__logo"></div>
          <div className="title__info">
            <div className="title__info__projectName"></div>
            <div className="title__info__overview"></div>
            <div className="title__info__tags"></div>
            <div className="title__info__members"></div>
          </div>
        </div>
        <div className="gallery">

        </div>
        <div className="discription">
          
        </div>
        <div className="rating">

        </div>
        <div className="milestone">
          
        </div>
      </div>
    </div>
  );
}
