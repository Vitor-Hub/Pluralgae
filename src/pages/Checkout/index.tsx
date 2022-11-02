import { Alert, AlertTitle, Card, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PaymentIcon from '@mui/icons-material/Payment';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { LoadingButton } from "@mui/lab";
import { PatternFormat } from "react-number-format";

var productImage = require('../../assets/productImage.png');

interface IProducts {
  title: string,
  price: number,
  quantidade: number
}

interface ICreditCard {
  cardName: string,
  cardNumber: string,
  cardValidity: string,
  CVV: string,
  cpfTitular: string,
  paymentWay: string | number
  
}

enum View {
  Checkout = "Checkout",
  Payment = "Payment"
}

const Checkout = () => {

  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalShipping, setTotalShipping] = useState<number>(5);
  const [totalProductValue, setTotalProductValue] = useState<number>(0);
  const [productInfo, setProductInfo] = useState<IProducts[]>([]);
  const [changeView, setChangeView] = useState<string>(View.Checkout);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [cardData, setCardData] = useState<ICreditCard>({
    cardName: "",
    cardNumber: "",
    cardValidity: "",
    CVV: "",
    cpfTitular: "",
    paymentWay: ""
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  
  const handleCheckout = () => {
    if (totalProductValue === 0) {
      setError(true);
      setErrorMessage("Escolha algum produto!");
    }
    else {
      setChangeView(View.Payment);
    }
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

  const renderCheckoutResume = () => {
    return (
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
            {changeView == View.Checkout ? "Ir para o pagamento" : "Pagar"}
        </LoadingButton>
      </Card>
    )
  }

  useEffect(() => {
    console.log("cardData: ", cardData);
  },[cardData]);

  return (
    <>
      {error ?
        <Alert className="AlertComponent" severity="error">
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
        :
        <></>
      }
      {changeView == View.Checkout ?
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
              {renderCheckoutResume()}
            </div>
          </div>
        </div>
        :
        <div className="Payment">
          <KeyboardReturnIcon onClick={() => setChangeView(View.Checkout)}/>
          <div className="title">
            <PaymentIcon/>
            <h2>Pagamento</h2>
          </div>
          <div className="leftCard">
            <form 
              ref={formRef}
              className="form"
              onSubmit={(event) => onSubmit(event)}
            >
              <Card className="paymentData">
                <TextField
                  label="Nome impresso no cartão"
                  className="textField" 
                  id="cardName" 
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    const rgx =  /^[a-zA-Z0-9-]+$/;
                    if (value !== "" && !rgx.test(value)) {
                      return;
                    }
                    setCardData({...cardData, cardName: value});
                  }}
                  value={cardData?.cardName}
                  required
                />
                <PatternFormat 
                  format="#### #### #### ####"
                  id="cardNumber" 
                  label="Número do cartão" 
                  className="textField"
                  value={cardData?.cardNumber}
                  customInput={TextField}
                  required
                  onChange={(e) => setCardData({...cardData, cardNumber: e.currentTarget.value})}
                  variant="outlined"
                />
                <div className="info">
                  <TextField
                    label="Validade"
                    className="textField" 
                    id="validity" 
                    onChange={(e) => setCardData({...cardData, cardValidity: e.currentTarget.value})}
                    value={cardData?.cardValidity}
                    required
                  />
                  <PatternFormat 
                    format="###"
                    id="CVV" 
                    label="CVV"
                    className="textField"
                    value={cardData?.CVV}
                    customInput={TextField}
                    required
                    onChange={(e) => setCardData({...cardData, CVV: e.currentTarget.value})}
                    variant="outlined"
                  />
                </div>
                <TextField
                  label="CPF do titular"
                  className="textField" 
                  id="CPF" 
                  onChange={(e) => setCardData({...cardData, cpfTitular: e.currentTarget.value})}
                  value={cardData?.cpfTitular}
                  required
                />
                <FormControl className="select" fullWidth>
                  <InputLabel id="paymentId">Forma de pagamento</InputLabel>
                  <Select
                    labelId="paymentId"
                    id="select"
                    value={cardData?.paymentWay}
                    label="Forma de pagamento"
                    className="selectField"
                    onChange={(e) => setCardData({...cardData, paymentWay: e.target.value})}
                  >
                    <MenuItem value={1}>À vista - </MenuItem>
                    <MenuItem value={2}>2x sem juros - </MenuItem>
                    <MenuItem value={3}>3x sem juros - </MenuItem>
                  </Select>
                </FormControl>
              </Card>
            </form>
          </div>
          <div className="rightCard">
            {renderCheckoutResume()}
          </div>
        </div>
      }
    </>
  );
};

export default Checkout;
