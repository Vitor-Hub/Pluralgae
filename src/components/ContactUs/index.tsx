import React, {useEffect, useState} from "react";
import "./index.scss";
import Button from '@mui/material/Button';

var StarIcon = require('../../assets/icon_star.png');
var FavoriteIcon = require('../../assets/icon_favorite.png');
var HandIcon = require('../../assets/icon_hand.png');

const ContactUs = () => {

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
      <div className="ContactUs">
        <div className="infos">
            <h2 className="contactTitle">{windowSize.innerWidth > responsiveWidth ? "Entre em contato conosco" : "Entre em contato"}</h2>
            <div className="iconInfos">
                <div className="star">
                    <img src={StarIcon} alt="icon" />
                    <h3>Se torne sócio investidor</h3>
                </div>
                <div className="favorite">
                    <img src={FavoriteIcon} alt="icon" />
                    <h3>Receba mais informações</h3>
                </div>
                <div className="hand">
                    <img src={HandIcon} alt="icon" />
                    <h3>Tire suas dúvidas</h3>
                </div>
            </div>
            <div className="follow">
                <h2 className="title">Nos siga</h2>
                <div className="socialIcons">
                    <div className="instagram">icon</div>
                    <div className="facebook">icon</div>
                    <div className="linkedin">icon</div>
                </div>
            </div>
        </div>
        <div className="inputs">
            <form action="/action_page.php" method="get">
                <label htmlFor="name">Nome</label>
                <input className="textField" id="name"/>

                <label htmlFor="email">E-mail</label>
                <input className="textField" id="email"/>

                <label htmlFor="subject">Assunto</label>
                <input className="textField" id="subject"/>
                
                <label htmlFor="field">Assunto</label>
                <textarea className="areaField" id="field"/>

                <Button className="sendMessage" variant="contained">Enviar mensagem</Button>
            </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
