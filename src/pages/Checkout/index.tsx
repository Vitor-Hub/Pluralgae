import { Card, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import "./index.scss";

var addressIcon = require('../../assets/addressIcon.svg');
var checkoutIcon = require('../../assets/checkoutIcon.svg');

const Checkout = () => {

  return (
    <div className="Checkout">
        <div className="title">
          <img src={checkoutIcon.default} alt="Icone" />
          <h2>Checkout</h2>
        </div>
        <div className="leftCards">
          <Card className="basicData">
            <h3>Endereço</h3>
            <div className="address">
              <h4>Rua Ministro Gabriel de Piza 71</h4>
              <h4>Número 71, apartamento 604</h4>
              <h4>Rio de Janeiro / RJ</h4>
              <div className="edit">
                <Link to="/configAccount">Editar</Link>
              </div>
            </div>
          </Card>

          <Card className="basicData">
            <h3>Produto e Frete</h3>
            <TextField 
                label="Endereço"
                className="textField" 
                id="name" 
                //onChange={(e) => setEmailData({...emailData, name: e.currentTarget.value})}
                //value={emailData.name}
            />
            <TextField 
                label="CEP"
                className="textField" 
                id="name" 
                //onChange={(e) => setEmailData({...emailData, name: e.currentTarget.value})}
                //value={emailData.name}
            />
            <TextField 
                label="Cidade"
                className="textField" 
                id="name" 
                //onChange={(e) => setEmailData({...emailData, name: e.currentTarget.value})}
                //value={emailData.name}
            />
            <TextField 
                label="Estado"
                className="textField" 
                id="name" 
                //onChange={(e) => setEmailData({...emailData, name: e.currentTarget.value})}
                //value={emailData.name}
            />
            
          </Card>
        </div>
    </div>
  );
};

export default Checkout;
