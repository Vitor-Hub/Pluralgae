import React, {RefObject, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./index.scss";

var iconCart = require('../../assets/icon_cart.png');
var Logo = require('../../assets/logo.png');

interface IHeaderMenuProps {
  AdvantagesRef: RefObject<HTMLDivElement>
  ContactUsRef: RefObject<HTMLDivElement>
  WhoWeAreRef: RefObject<HTMLDivElement>
}

const HeaderMenu = (props:IHeaderMenuProps) => {

  const {WhoWeAreRef, AdvantagesRef, ContactUsRef} = props;

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

  function renderMenus() {
    return(
      <>
        <span className="link"><h5 onClick={() => executeScroll(AdvantagesRef)}>Spirulina</h5></span>
        <span className="link"><h5 onClick={() => executeScroll(ContactUsRef)}>Fale Conosco</h5></span>
        <span className="link"><h5 onClick={() => executeScroll(WhoWeAreRef)}>Quem somos</h5></span>
        <span className="link"><h5 onClick={() => {}}>Comprar</h5></span>
      </>
    )
  }

  const executeScroll = (ref: RefObject<HTMLDivElement>) => ref?.current?.scrollIntoView({ block: 'start',  behavior: 'smooth' });

  return (
    <>  
        {windowSize.innerWidth > responsiveWidth ?
          <div className="HeaderMenu">
            <div className="logo">
              <Link target="_self" to="/"><img src={Logo} alt="Logo" /></Link>
            </div>

            <div className="menus">
              {renderMenus()}
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
              {renderMenus()}
            </div>
          </div>
        }    
    </>
  );
};

export default HeaderMenu;
