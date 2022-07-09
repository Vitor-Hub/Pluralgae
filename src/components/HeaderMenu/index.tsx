import React from "react";
import "./index.scss";

const HeaderMenu = () => {
  return (
    <>
      <div className="HeaderMenu">
        <div className="logo">
          <h5>PluralGae</h5>
        </div>
        <div className="menus">
          <h5>Spirulina</h5>
          <h5>Fale Conosco</h5>
          <h5>Comprar</h5>
          <h5>Quem somos</h5>
          <div className="cart">
          <h5>Carrinho</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;
