import React, {useEffect, useState} from "react";
import "./index.scss";

var iconCart = require('../../assets/icon_cart.png');
var Logo = require('../../assets/logo.png');

const HeaderMenu = () => {

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const responsiveWidth = 1060;

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  return (
    <>  
        {windowSize.innerWidth > responsiveWidth ?
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
          :
          <div className="HeaderMenu">
            <div className="top">
              <div className="logo">
                <img src={Logo} alt="Logo" />
              </div>
              <div className="cart">
                  <img src={iconCart} alt="cart icon" />
              </div>
            </div>
            
            <hr/>

            <div className="menus">
              <h5>Spirulina</h5>
              <h5>Fale Conosco</h5>
              <h5>Comprar</h5>
              <h5>Quem somos</h5>
            </div>
          </div>
        }    
    </>
  );
};

export default HeaderMenu;
