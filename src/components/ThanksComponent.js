import React from "react";
import "./Thanks.css";
import FooterCompo from "./Footer";

const ThanksComnpo = () => {
  return (
    <div className="thanks-bg">
      <div className="name-brand col-12 mr-auto ml-auto fade-in-left">
        <img 
          className="mt-3"
          alt='Danny Duran on a bike'
          src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1617084235/danny/danny_logo_iv6s5b.png"
        />
      </div>
      {/* <div className="video-box mr-auto ml-auto col-12 col-lg-4 col-md-12">
        <iframe
          width="320"
          height="315"
          src="https://www.youtube.com/embed/jSxPRIBMaKk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div> */}
      {/* <div
        className="video mr-auto ml-auto justify-content-center"
        style={{
          position: "relative",
          paddingTop: "56.25%" 16:9 
          // paddingTop: 25,
          height: 0,
          overflow: "hidden"
        }}
      > */}
      <div className="embed-responsive embed-responsive-16by9 col-lg-8 col-md-10 col-10 mt-5 mr-auto ml-auto">
        <iframe
        title='Danny Duran Youtube video'
          className="embed-responsive-item"
          src="https://www.youtube.com/embed/jSxPRIBMaKk?autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <FooterCompo />
    </div>
  );
};

export default ThanksComnpo;
