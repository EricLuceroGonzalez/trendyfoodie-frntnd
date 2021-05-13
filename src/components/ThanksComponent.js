import React from "react";
import "./Thanks.css";
import FooterCompo from "./Footer";
import Button from "../UIElements/Button";
import { Link } from "react-router-dom";

const ThanksComnpo = () => {
  return (
    <div className="thanks-bg content">
      <div className="name-brand col-12 mr-auto ml-auto fade-in-left">
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
      <div className="embed-responsive embed-responsive-16by9 col-xl-7 col-lg-8 col-md-6 col-10 mt-5 mr-auto ml-auto">
       
      </div>

      <div className="ml-auto mr-auto thanks-msg col-12 mt-5">
        <span>
          <span className="pink-text">Gracias</span>, ahora puedes darle click
          al botón de descarga para obtener
        </span>
        <br />
        <span>
          <span className="pink-text">Misterio</span> ft Alkilados
        </span>
      </div>

      <div className="col-12 mt-5">
        <Link
          to="/media_assets/Danny_Duran_ft_Alkilados_Misterio.mp3"
          target="_blank"
          download="Danny_Duran_ft_Alkilados_Misterio.mp3"
        >
          <Button >
              <span role="img" aria-label="tiger emoji">
                🐯{" "}
              </span>
              DESCARGAR
          </Button>
        </Link>
      </div>
      <FooterCompo />
    </div>
  );
};

export default ThanksComnpo;
