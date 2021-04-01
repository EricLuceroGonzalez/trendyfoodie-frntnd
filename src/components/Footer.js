import React from "react";
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
      <div className="col-2 fade-in-left">
        <a href="https://www.facebook.com/dannyduranmusica">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
      <div className="col-2 fade-in-bottom">
      <a href="https://open.spotify.com/artist/5p6qkdDXlxWTxpPW94Dg0X">
        <FontAwesomeIcon icon={faSpotify} />
        </a>
      </div>
      <div className="col-2 fade-in-right">
        <a href='https://www.youtube.com/channel/UCvHLR6Tj2YXTIGQFvUMAIIw'>
        <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default FooterCompo;
