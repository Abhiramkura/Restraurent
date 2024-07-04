import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

import "./index.css";

const FooterComp = () => (
  <div>
    <div className="follow-us-section">
      <div>
        <h1 className="follow-us-section-heading">Follow Us</h1>
      </div>
      <div>
        <div className="images-container">
          <div className="follow-us-image">
            <FaTwitter className="icon" />
          </div>
          <div className="follow-us-image">
            <FaInstagram className="icon" />
          </div>
          <div className="follow-us-image">
            <FaFacebook className="icon" />
          </div>
        </div>
      </div>
    </div>
    <div className="footer-section">
      <img
        src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-munch-logo-light.png"
        className="nav-image"
        alt="nav"
      />
      <p className="footer-section-mail">orderfood@foodmunch.com</p>
      <p className="footer-section-address">
        123 Ayur Vigyan Nagar,New Delhi,India
      </p>
    </div>
  </div>
);

export default FooterComp;
