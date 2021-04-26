import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

const FooterCompo = () => {
  return (
    <div className="footer-box d-flex">
      <div className="col-3"></div>
      <div className="col-2 fade-in-right">
        <a href="https://www.instagram.com/dannyduranmusic/">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>

      <div className="col-2 fade-in-left">
        <a href="https://www.facebook.com/dannyduranmusica">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
      <div className="col-2 fade-in-bottom">
        <a href="https://www.youtube.com/channel/UCvHLR6Tj2YXTIGQFvUMAIIw">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default FooterCompo;
