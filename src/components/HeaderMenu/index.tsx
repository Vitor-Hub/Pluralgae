import React from "react";
import "./index.scss";

var iconCart = require('../../assets/icon_cart.png');
var Logo = require('../../assets/logo.png');

const HeaderMenu = () => {
  return (
    <>
      <div className="HeaderMenu">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="menus">
          <h5>Spirulina</h5>
          <h5>Fale Conosco</h5>
          <h5>Comprar</h5>
          <h5>Quem somos</h5>
          <div className="cart">
            <img src={iconCart} alt="cart icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;
