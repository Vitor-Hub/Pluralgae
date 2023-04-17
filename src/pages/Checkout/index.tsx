import {
  Card,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import PaymentIcon from "@mui/icons-material/Payment";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.scss";
import { LoadingButton } from "@mui/lab";
import { PatternFormat } from "react-number-format";
import Shipping from "../../services/shipping.service.";
import { IPostShipping, IResultShipping } from "../../types/shipping.type";
import IGetProducts from "../../types/products.type";
import { getProducts } from "../../services/product.service";
import { AuthContext } from "../../contexts/auth";
import { IFinalPayment } from "../../types/checkout.type";
import { checkoutService } from "../../services/checkout.service";
import AlertComponent from "../../components/AletComponent";

var productImage = require("../../assets/productImage.png");

interface ICreditCard {
  paymentMethod: string;
  cardNumber: string;
  holderName: string;
  cvv: string;
  expirationYear: string;
  expirationMonth: string;
  installments: number;
}

enum View {
  Checkout = "Checkout",
  Payment = "Payment",
}

const Checkout = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [shippingCheckoutData, setShippingCheckoutData] =
    useState<IResultShipping>({
      carrier: "",
      carrierCode: "",
      code: "",
      deliveryTime: "",
      description: "",
      price: 0,
    });
  const [shippingPostData, setShippingPostData] = useState<IPostShipping>(
    {} as IPostShipping
  );
  const [shippingResultData, setShippingResultData] = useState<
    IResultShipping[]
  >([]);
  const [totalProductValue, setTotalProductValue] = useState<number>(0);
  const [productInfo, setProductInfo] = useState<IGetProducts[]>([]);
  const [changeView, setChangeView] = useState<string>(View.Checkout);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [cardData, setCardData] = useState<ICreditCard>({} as ICreditCard);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const handleCheckout = () => {
    if (totalProductValue === 0) {
      setError(true);
      setErrorMessage("Escolha algum produto!");
    } else if (shippingCheckoutData.carrier === "") {
      setError(true);
      setErrorMessage("Selecione o frete!");
    } else {
      setError(false);
      setChangeView(View.Payment);
    }
  };

  const handlePayment = async () => {
    formRef?.current?.reportValidity();
    setIsLoading(true);
    if (user) {
      var data = {} as IFinalPayment;
      data = {
        userId: user?.id,
        items: shippingPostData.items,
        address: user.address,
        payment: cardData,
        shipping: {
          carrierCode: shippingCheckoutData.carrierCode,
          code: shippingCheckoutData.code,
        },
      };
      await checkoutService(data, user.access_token)
        .then(() => {
          setError(true);
          setErrorMessage("Pedido Realisado!");
        })
        .catch((e) => {
          console.error(e);
          setError(true);
          setErrorMessage(e.response.data.message);
        });
    }
    setIsLoading(false);
  };

  const convertNumber = (price: number) => {
    return price?.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const PostShipping = async (data: IPostShipping) => {
    setIsShippingLoading(true);
    await Shipping(data)
      .then((response: any) => {
        setError(false);
        setShippingResultData(response.data);
        setShippingCheckoutData({
          carrier: "",
          carrierCode: "",
          code: "",
          deliveryTime: "",
          description: "",
          price: 0,
        });
      })
      .catch((e) => {
        console.error(e);
        setError(true);
        setErrorMessage(e.response.data.message);
      });
    setIsShippingLoading(false);
  };

  const GetProducts = async () => {
    setIsLoading(true);
    await getProducts()
      .then((response: any) => {
        setError(false);
        let result: IGetProducts[] = response.data;
        if (result && !!result.length) {
          response.data.map((item: IGetProducts, index: number) => {
            result[index].quantity = 0;
            return item;
          });
        }
        setProductInfo(response.data);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
        setErrorMessage(e.response.data.message);
      });
    setIsLoading(false);
  };

  const addShippingItems = () => {
    let data: any = {
      items: [],
      cep: user?.address.zipCode,
    };
    if (productInfo && !!productInfo.length) {
      productInfo.map((item) =>
        data.items.push({
          id: item?.id,
          quantity: item?.quantity,
        })
      );
    }
    removeElementsWithZero(data.items);
    setShippingPostData(data);
  };

  const removeElementsWithZero = (arr: any) => {
    var i = arr && arr.length;
    while (i--) {
      if (arr[i].quantity === 0) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  useEffect(() => {
    calcProductsValue();
    addShippingItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productInfo]);

  useEffect(() => {
    if (
      shippingPostData &&
      shippingPostData.items &&
      !!shippingPostData?.items.length
    )
      PostShipping(shippingPostData);
  }, [shippingPostData]);

  useEffect(() => {
    GetProducts();
  }, []);

  useEffect(() => {
    calcProductsValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingCheckoutData]);

  const sumNumber = (i: number) => {
    let array = productInfo;
    array[i].quantity++;
    setProductInfo([...array]);
  };

  const minusNumber = (i: number) => {
    let array = productInfo;
    if (productInfo[i].quantity > 0) {
      array[i].quantity--;
    }
    setProductInfo([...array]);
  };

  const calcProductsValue = () => {
    let value = 0;
    productInfo.map((item) => {
      value = value + item.price * item.quantity;
      return null;
    });
    setTotalProductValue(value);
    setTotalValue(shippingCheckoutData.price + value);
  };

  const verifyYearAndMonth = () => {
    var today = new Date();
    const creditDate = new Date(
      parseInt(cardData.expirationYear),
      parseInt(cardData.expirationMonth)
    );
    today = new Date(today.getFullYear(), today.getMonth());
    if (creditDate < today) {
      return true;
    } else {
      return false;
    }
  };

  const renderCheckoutResume = () => {
    return (
      <Card className="checkoutCard">
        <h3 className="title">Resumo</h3>
        <div className="resume">
          <div>
            <h4>Valor dos produtos:</h4>
            <h4 className="value">{convertNumber(totalProductValue)}</h4>
          </div>
          <hr />
          <div>
            <h4>Frete:</h4>
            <h4 className="value">
              {convertNumber(shippingCheckoutData.price)}
            </h4>
          </div>
          <div className="total">
            <div className="totalInfos">
              <h4>Total:</h4>
              <h4 className="totalValue">{convertNumber(totalValue)}</h4>
            </div>
            <h5>{`(em até 12x de ${convertNumber(
              totalValue / 12
            )} sem juros)`}</h5>
          </div>
        </div>
        <LoadingButton
          className="button"
          variant="contained"
          onClick={
            changeView === View.Checkout ? handleCheckout : handlePayment
          }
          loading={isLoading}
        >
          {changeView === View.Checkout ? "Ir para o pagamento" : "Pagar"}
        </LoadingButton>
        {isShippingLoading ? (
          <div className="circular">
            <CircularProgress color="success" />
          </div>
        ) : changeView === View.Checkout &&
          shippingPostData.items &&
          !!shippingPostData.items.length ? (
          <FormControl>
            <FormLabel id="radio-buttons">Frete</FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons"
              name="controlled-radio-buttons-group"
              value={
                shippingCheckoutData.carrier === ""
                  ? null
                  : shippingResultData.indexOf(shippingCheckoutData)
              }
              onChange={(e: any) =>
                setShippingCheckoutData(shippingResultData[e.target.value])
              }
            >
              {shippingResultData &&
                !!shippingResultData.length &&
                shippingResultData.map((item, index) => (
                  <div key={index} className="shipping">
                    <FormControlLabel
                      value={index}
                      control={<Radio />}
                      label={`${item.description}: ${convertNumber(
                        item.price
                      )}`}
                    />
                  </div>
                ))}
            </RadioGroup>
          </FormControl>
        ) : (
          <></>
        )}
      </Card>
    );
  };

  return (
    <>
      {error ? (
        <AlertComponent type="error">{errorMessage}</AlertComponent>
      ) : (
        <></>
      )}
      {changeView === View.Checkout ? (
        <div className="Checkout">
          <div className="title">
            <ShoppingCartCheckoutIcon />
            <h2>Checkout</h2>
          </div>
          <div className="cards">
            <div className="leftCards">
              <Card className="addressData">
                <h3 className="title">Endereço</h3>
                <div className="address">
                  <h4 className="name">{user?.username}</h4>
                  <h4 className="info">{user?.address.street}</h4>
                  <h4 className="info">Bairro: {user?.address.district}</h4>
                  <h4 className="info">Número: {user?.address.number}</h4>
                  <h4 className="info">
                    {user?.address.state} {user?.address.city}
                  </h4>
                  <h4 className="info">CEP: {user?.address.zipCode}</h4>
                  <div className="edit">
                    <Link to="/configAccount">Editar</Link>
                  </div>
                </div>
              </Card>
              {isLoading ? (
                <div className="circular">
                  <CircularProgress color="success" />
                </div>
              ) : (
                <Card className="productData">
                  <h3 className="title">Produto e Frete</h3>
                  {productInfo.map((item, index) => {
                    return (
                      <div key={index} className="products">
                        <div className="productImage">
                          <img src={productImage} alt="spirulina" />
                        </div>
                        <div className="productInfos">
                          <h3 className="productTitle">{item.name}</h3>
                          <div className="creditInfo">
                            <h4 className="credit">{item.description}</h4>
                          </div>
                        </div>
                        <div className="productQuantity">
                          <h4 className="quantTitle">Quantidade</h4>
                          <div className="setQuant">
                            <button onClick={() => minusNumber(index)}>
                              <KeyboardArrowLeftIcon />
                            </button>
                            <div className="showQuant">
                              <h4>{item.quantity ? item.quantity : "0"}</h4>
                            </div>
                            <button onClick={() => sumNumber(index)}>
                              <KeyboardArrowRightIcon />
                            </button>
                          </div>
                        </div>
                        <div className="productPrice">
                          <h4 className="priceTitle">Preço à vista:</h4>
                          <h3 className="price">{`${convertNumber(
                            item.price
                          )}`}</h3>
                        </div>
                      </div>
                    );
                  })}
                </Card>
              )}
            </div>
            <div className="rightCards">{renderCheckoutResume()}</div>
          </div>
        </div>
      ) : (
        <div className="Payment">
          <KeyboardReturnIcon onClick={() => setChangeView(View.Checkout)} />
          <div className="title">
            <PaymentIcon />
            <h2>Pagamento</h2>
          </div>
          <div className="cards">
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
                      const rgx = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
                      if (value !== "" && !rgx.test(value)) {
                        return;
                      }
                      setCardData({ ...cardData, holderName: value });
                    }}
                    value={cardData?.holderName}
                    required
                  />
                  <TextField
                    id="cardNumber"
                    label="Número do cartão"
                    className="textField"
                    value={cardData?.cardNumber}
                    required
                    onChange={(e) => {
                      const value = e.currentTarget.value;
                      const rgx = /^[0-9]+$/;
                      if (value !== "" && !rgx.test(value)) {
                        return;
                      }
                      setCardData({
                        ...cardData,
                        cardNumber: e.currentTarget.value,
                      });
                    }}
                    variant="outlined"
                  />
                  <div className="info">
                    <FormControl fullWidth className="textField">
                      <InputLabel id="month-select">Mês</InputLabel>
                      <Select
                        labelId="month-select"
                        id="month-simple-select"
                        value={cardData?.expirationMonth}
                        error={verifyYearAndMonth()}
                        label="Month"
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            expirationMonth: e.target.value,
                          })
                        }
                      >
                        <MenuItem value={0}>Janeiro</MenuItem>
                        <MenuItem value={1}>Fevereiro</MenuItem>
                        <MenuItem value={2}>Março</MenuItem>
                        <MenuItem value={3}>Abril</MenuItem>
                        <MenuItem value={4}>Maio</MenuItem>
                        <MenuItem value={5}>Junho</MenuItem>
                        <MenuItem value={6}>Julho</MenuItem>
                        <MenuItem value={7}>Agosto</MenuItem>
                        <MenuItem value={8}>Setembro</MenuItem>
                        <MenuItem value={9}>Outubro</MenuItem>
                        <MenuItem value={10}>Novembro</MenuItem>
                        <MenuItem value={11}>Dezembro</MenuItem>
                      </Select>
                    </FormControl>
                    <PatternFormat
                      format="####"
                      id="validityYear"
                      label="Ano"
                      required
                      error={verifyYearAndMonth()}
                      className="textField"
                      value={cardData?.expirationYear}
                      variant="outlined"
                      customInput={TextField}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          expirationYear: e.currentTarget.value,
                        })
                      }
                    />
                    <PatternFormat
                      format="###"
                      id="CVV"
                      label="CVV"
                      className="textField"
                      value={cardData?.cvv}
                      customInput={TextField}
                      required
                      onChange={(e) =>
                        setCardData({ ...cardData, cvv: e.currentTarget.value })
                      }
                      variant="outlined"
                    />
                  </div>
                  <FormControl className="select" fullWidth>
                    <InputLabel id="paymentId">Forma de pagamento</InputLabel>
                    <Select
                      labelId="paymentId"
                      id="select"
                      value={cardData?.paymentMethod}
                      label="Parcelas"
                      className="selectField"
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          paymentMethod: e.target.value,
                        })
                      }
                    >
                      <MenuItem value={1}>{`À vista de ${convertNumber(
                        totalValue
                      )}`}</MenuItem>
                      <MenuItem value={2}>{`2x de ${convertNumber(
                        totalValue / 2
                      )} sem juros`}</MenuItem>
                      <MenuItem value={3}>{`3x de ${convertNumber(
                        totalValue / 3
                      )} sem juros`}</MenuItem>
                      <MenuItem value={4}>{`4x de ${convertNumber(
                        totalValue / 4
                      )} sem juros`}</MenuItem>
                      <MenuItem value={5}>{`5x de ${convertNumber(
                        totalValue / 5
                      )} sem juros`}</MenuItem>
                      <MenuItem value={6}>{`6x de ${convertNumber(
                        totalValue / 6
                      )} sem juros`}</MenuItem>
                      <MenuItem value={7}>{`7x de ${convertNumber(
                        totalValue / 7
                      )} sem juros`}</MenuItem>
                      <MenuItem value={8}>{`8x de ${convertNumber(
                        totalValue / 8
                      )} sem juros`}</MenuItem>
                      <MenuItem value={9}>{`9x de ${convertNumber(
                        totalValue / 9
                      )} sem juros`}</MenuItem>
                      <MenuItem value={10}>{`10x de ${convertNumber(
                        totalValue / 10
                      )} sem juros`}</MenuItem>
                      <MenuItem value={11}>{`11x de ${convertNumber(
                        totalValue / 11
                      )} sem juros`}</MenuItem>
                      <MenuItem value={12}>{`12x de ${convertNumber(
                        totalValue / 12
                      )} sem juros`}</MenuItem>
                    </Select>
                  </FormControl>
                </Card>
              </form>
            </div>
            <div className="rightCard">{renderCheckoutResume()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
