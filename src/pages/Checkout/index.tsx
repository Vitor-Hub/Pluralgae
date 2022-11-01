import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React, { useEffect, useState } from "react";
import "./index.scss";
import { LoadingButton } from "@mui/lab";

var productImage = require('../../assets/productImage.png');

interface IProducts {
  title: string,
  price: number,
  quantidade: number
}

const Checkout = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalShipping, setTotalShipping] = useState<number>(5);
  const [totalProductValue, setTotalProductValue] = useState<number>(0);
  const [productInfo, setProductInfo] = useState<IProducts[]>([]);
  
  const handleCheckout = () => {

  }

  const convertNumber = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  useEffect(() => {
    setProductInfo(productsMock);
  },[]);

  useEffect(() => {
    calcProductsValue();
  },[productInfo])

  let productsMock: IProducts[] = [
    {
      title: "asfas",
      price: 20.99,
      quantidade: 0
    },
    {
      title: "asfasasfasasfasasfasasfasasfas",
      price: 13.45,
      quantidade: 0
    },
    {
      title: "asfasasfasasfasasfasas",
      price: 9.12,
      quantidade: 0
    },
    {
      title: "asfasasfasasfas",
      price: 29.04,
      quantidade: 0
    },
    {
      title: "asfasasfasasfasasfasasfasasfasasfasasfasasfasasfas asfasasfasasfas asfas",
      price: 23.49,
      quantidade: 0
    },
    {
      title: "asfasasfas asfasasfasasfas asfas",
      price: 6.99,
      quantidade: 0
    },
    {
      title: "asfas",
      price: 12.99,
      quantidade: 0
    },
    {
      title: "asfas",
      price: 56.99,
      quantidade: 0
    },
  ];

  const sumNumber = (i: number) => {
    let array = productInfo;
    array[i].quantidade ++;
    setProductInfo([...array]);
  }

  const minusNumber = (i: number) => {
    if (productInfo[i].quantidade > 0) {
      let array = productInfo;
      array[i].quantidade --;
      setProductInfo([...array]);
    }
  }

  const calcProductsValue = () => {
    let value = 0;
    productInfo.map((item) => {
      value = value + item.price * item.quantidade;
    });
    setTotalProductValue(value);
    setTotalValue(totalShipping + value)
  }  

  useEffect(() => {
    console.log("productInfo: ", productInfo);
  },[productInfo]);

  return (
    <div className="Checkout">
        <div className="title">
          <ShoppingCartCheckoutIcon/>
          <h2>Checkout</h2>
        </div>
        <div className="cards">
          <div className="leftCards">
            <Card className="addressData">
              <h3 className="title">Endereço</h3>
              <div className="address">
                <h4 className="name">Vitor Santos Pereira</h4>
                <h4 className="info">Rua Ministro Gabriel de Piza 71</h4>
                <h4 className="info">Número 71, apartamento 604</h4>
                <h4 className="info">Rio de Janeiro / RJ</h4>
                <div className="edit">
                  <Link to="/configAccount">Editar</Link>
                </div>
              </div>
            </Card>

            <Card className="productData">
              <h3 className="title">Produto e Frete</h3>
              {productInfo.map((item, index) => {
                return(
                  <div key={index} className="products">
                    <div className="productImage">
                      <img src={productImage} alt="spirulina" />
                    </div>
                    <div className="productInfos">
                      <h3 className="productTitle">{item.title}</h3>
                      <div className="creditInfo">
                        <h4 className="credit">Parcelado no cartão em até 10x sem juros de {convertNumber(item.price / 10)}</h4>
                      </div>
                    </div>
                    <div className="productQuantity">
                      <h4 className="quantTitle">Quantidade</h4>
                      <div className="setQuant">
                        <button onClick={() => minusNumber(index)}><KeyboardArrowLeftIcon/></button>
                        <div className="showQuant">
                          <h4>{item.quantidade}</h4>
                        </div>
                        <button onClick={() => sumNumber(index)}><KeyboardArrowRightIcon/></button>
                      </div>
                    </div>
                    <div className="productPrice">
                      <h4 className="priceTitle">Preço à vista:</h4>
                      <h3 className="price">{`${convertNumber(item.price)}`}</h3>
                    </div>
                  </div>
                )
              })}
            </Card>
          </div>
          <div className="rightCards">
            <Card className="checkoutCard">
                <h3 className="title">Resumo</h3>
                <div className="resume">
                  <div>
                    <h4>Valor dos produtos:</h4>
                    <h4 className="value">{convertNumber(totalProductValue)}</h4>
                  </div>
                  <hr/>
                  <div>
                    <h4>Frete:</h4>
                    <h4 className="value">{convertNumber(totalShipping)}</h4>
                  </div>
                  <div className="total">
                    <div className="totalInfos">
                      <h4>Total:</h4>
                      <h4 className="totalValue">{convertNumber(totalValue)}</h4>
                    </div>
                    <h5>{`(em até 10x de ${convertNumber(totalValue / 10)} sem juros)`}</h5>
                  </div>
                </div>
                <LoadingButton 
                    className="button" 
                    variant="contained"
                    onClick={handleCheckout}
                    loading={isLoading}
                >
                    Ir para o pagamento
                </LoadingButton>
            </Card>
          </div>
        </div>
    </div>
  );
};

export default Checkout;
