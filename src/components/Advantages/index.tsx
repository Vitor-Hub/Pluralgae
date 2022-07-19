import React from "react";
import "./index.scss";
import Button from '@mui/material/Button';

var workIcon = require('../../assets/gicon_work.png');
var heartIcon = require('../../assets/gicon_heart.png');
var organicIcon = require('../../assets/gicon_organic.png');
var chemistryIcon = require('../../assets/gicon_chemistry.png');
var productImg = require('../../assets/product_alt.png');

const Advantages = () => {
  return (
    <>
      <div className="Advantages">
        <div className="mainDiv">
            <div className="leftContent">
                <h1 className="title">Por que adicionar a spirulina pluralgae no seu dia a dia?</h1>
                <div className="infos">
                    <div className="infosTop">
                        <div className="strength">
                            <img src={workIcon} alt="icon" />
                            <h3>Contribui para melhorar a força e resistência muscular e auxilia na perda de peso</h3>
                        </div>
                        <div className="cholesterol">
                            <img src={heartIcon} alt="icon" />
                            <h3>Auxilia na redução do colesterol, contribui para a redução da pressão arterial e ajuda a controlar o açúcar no sangue</h3>
                        </div>
                    </div>
                    <div className="infosBottom">
                        <div className="antioxidants">
                            <img src={organicIcon} alt="icon" />
                            <h3>Possui antioxidantes e propriedades anti-inflamatórias e anti-câncer</h3>
                        </div>
                        <div className="safe">
                            <img src={chemistryIcon} alt="icon" />
                            <h3>A Pluralgae é uma empresa comprometida com uma produção de matéria-prima segura e sustentável.</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rightContent">
                <div className="img">
                    <img src={productImg} alt="image" />
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Advantages;
