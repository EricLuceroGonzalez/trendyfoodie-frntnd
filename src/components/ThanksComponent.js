import React, { useState } from "react";
import "./Thanks.css";
import FooterCompo from "./Footer";
import { useHistory } from "react-router-dom";

const ThanksComnpo = () => {
  const hist = useHistory();
  return (
    <div className="thanks-bg">
      <div className="name-brand col-12 mr-auto ml-auto">
        <img
          onClick={() => {
            hist.push("/");
          }}
          className="mt-3"
          src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1617084235/danny/danny_logo_iv6s5b.png"
        />
      </div>
      <div className="video-box col-12 mr-auto ml-auto">
        <iframe
          width="320"
          height="315"
          src="https://www.youtube.com/embed/jSxPRIBMaKk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <FooterCompo />
      </div>
    </div>
  );
};

export default ThanksComnpo;
