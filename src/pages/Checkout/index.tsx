import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from "react";
import "./index.scss";

var productImage = require('../../assets/productImage.png');

const Checkout = () => {

  return (
    <div className="Checkout">
        <div className="title">
          <ShoppingCartCheckoutIcon/>
          <h2>Checkout</h2>
        </div>
        <div className="leftCards">
          <Card className="addressData">
            <h3 className="title">Endereço</h3>
            <div className="address">
              <h4 className="name">Vitor Santos Pereira</h4>
              <h4>Rua Ministro Gabriel de Piza 71</h4>
              <h4>Número 71, apartamento 604</h4>
              <h4>Rio de Janeiro / RJ</h4>
              <div className="edit">
                <Link to="/configAccount">Editar</Link>
              </div>
            </div>
          </Card>

          <Card className="productData">
            <h3 className="title">Produto e Frete</h3>
            
            <div className="products">
              <div className="productImage">
                <img src={productImage} alt="spirulina" />
              </div>
              <div className="productInfos">
                <h3 className="productTitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla augue, vulputate eget lorem ac.</h3>
                <div className="creditInfo">
                  <h4 className="credit">Parcelado no cartão em até 10x sem juros: R$ 317,64</h4>
                </div>
              </div>
              <div className="productQuantity">
                <h4 className="quantTitle">Quantidade</h4>
                <div className="setQuant">
                  <button><KeyboardArrowLeftIcon/></button>
                  <div className="showQuant">
                    <h4>1</h4>
                  </div>
                  <button><KeyboardArrowRightIcon/></button>
                </div>
                <div className="remove">
                  <DeleteForeverIcon/>
                  <h4>Remover</h4>
                </div>
              </div>
              <div className="productPrice">
                <h4 className="priceTitle">Preço à vista:</h4>
                <h3 className="price">R$ 244,58</h3>
              </div>
            </div>
          </Card>
        </div>
    </div>
  );
};

export default Checkout;
