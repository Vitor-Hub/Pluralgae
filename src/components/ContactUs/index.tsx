import React from "react";
import "./index.scss";

var StarIcon = require('../../assets/icon_star.png');
var FavoriteIcon = require('../../assets/icon_favorite.png');
var HandIcon = require('../../assets/icon_hand.png');

const ContactUs = () => {
  return (
    <>
      <div className="ContactUs">
        <div className="infos">
            <h2 className="contactTitle">Entre em contato conosco</h2>
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
                <label htmlFor="fname">Nome</label>
                <input type="text" id="fname" name="fname"/>

                <label htmlFor="lname">E-mail</label>
                <input type="text" id="lname" name="lname"/>

                <label htmlFor="lname">Assunto</label>
                <input type="submit" value="Submit"/>
                
                <label htmlFor="lname">Assunto</label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
