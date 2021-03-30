import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faSpotify,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

const FooterCompo = () => {
  return (
    <div className="footer-box d-flex">
      <div className="col-3"></div>
      <div className="col-2">
        <FontAwesomeIcon icon={faFacebook} />
      </div>
      <div className="col-2">
        <FontAwesomeIcon icon={faSpotify} />
      </div>
      <div className="col-2">
        <FontAwesomeIcon icon={faInstagram} />
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default FooterCompo;
