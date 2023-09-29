import React, { RefObject, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.scss";
import { AuthContext } from "../../contexts/auth";
import { ModalControlContext } from "../../contexts/modals";

var Logo = require("../../assets/logo.png");

interface IHeaderMenuProps {
  AdvantagesRef: RefObject<HTMLDivElement>;
  ContactUsRef: RefObject<HTMLDivElement>;
  WhoWeAreRef: RefObject<HTMLDivElement>;
}

const HeaderMenu = (props: IHeaderMenuProps) => {
  const { WhoWeAreRef, AdvantagesRef, ContactUsRef } = props;
  const { setIsOpenSignInModal } = useContext(ModalControlContext);
  const { signed } = useContext(AuthContext);

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const responsiveWidth = 1060;

  const location = useLocation();

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  function renderMenus() {
    return (
      <>
        {location.pathname === "/" ? (
          <>
            <Link to="/" className="link" onClick={() => executeScroll(AdvantagesRef)}>
              <h5>Spirulina</h5>
            </Link>
            <Link to="/" className="link" onClick={() => executeScroll(ContactUsRef)}>
              <h5>Fale Conosco</h5>
            </Link>
            <Link to="/" className="link" onClick={() => executeScroll(WhoWeAreRef)}>
              <h5>Quem somos</h5>
            </Link>
          </>
        ) : (
          <></>
        )}
        <Link
          to={signed ? "/checkout" : "/"}
          className={location.pathname === "/" ? "link" : "buy"}
        >
          <span>
            <h5
              onClick={() => {
                !signed && setIsOpenSignInModal(true);
              }}
            >
              Comprar
            </h5>
          </span>
        </Link>
      </>
    );
  }

  const executeScroll = (ref: RefObject<HTMLDivElement>) =>
    ref?.current?.scrollIntoView({ block: "start", behavior: "smooth" });

  return (
    <>
      {windowSize.innerWidth > responsiveWidth ? (
        <div className="HeaderMenu">
          <div className="logo">
            <Link target="_self" to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>

          <div className="menus">{renderMenus()}</div>
        </div>
      ) : (
        <div className="HeaderMenu">
          <div className="top">
            <div className="logo">
              <Link target="_self" to="/">
                <img src={Logo} alt="Logo" />
              </Link>
            </div>
          </div>

          <hr />

          <div className="menus">{renderMenus()}</div>
        </div>
      )}
    </>
  );
};

export default HeaderMenu;
