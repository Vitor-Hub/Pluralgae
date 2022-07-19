import React from "react";
import "./index.scss";

var iconCart = require('../../assets/icon_cart.png');
var Logo = require('../../assets/logo.png');

const Footer = () => {
  return (
    <>
      <div className="Footer">
        <h4 className="pluralgae">
            © 2022 PLURALGAE - TODOS OS DIREITOS RESERVADOS
        </h4>
        <div className="socialIcons">
            <div className="instagram">icon</div>
            <div className="facebook">icon</div>
            <div className="linkedin">icon</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
