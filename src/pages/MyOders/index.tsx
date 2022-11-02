import { Alert, AlertTitle, Button, Card, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import EmailIcon from '@mui/icons-material/Email';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "./index.scss";
import { getOders } from "../../services/oders.service";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";

interface IOders{
  id: string,
  purchaseDate: string,
  status: string,
  total: number
}

const MyOders = () => {

  const {user} = useContext(AuthContext);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [oders, setOders] = useState<IOders[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserOders = async () => {
    setLoading(true);
    if (user) {
      console.log(user.access_token);
      await getOders(user.id, user.access_token)
        .then((response: any) => {
          setOders(response.data);
        })
        .catch((e) => {
            console.error(e);
            setError(true);
            setErrorMessage(e.response.data.message);
        });
    }
    setLoading(false);
  }

  const convertNumber = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  useEffect(() => {
    getUserOders();
  },[user]);

  useEffect(() => {
    console.log("oders: ", oders);
  },[oders]);

  return (
    <>
      {error ? 
        <Alert className="AlertComponent" severity="error">
            <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
        :
        <></>
      }
      <div className="MyOders">
        <div className="topContent">
          <div className="title">
            <ShoppingBasketIcon/>
            <h2>Minha conta</h2>
          </div>
          <div className="changeData">
            <Link to="/configaccount"><Button className="button" variant="contained"><ManageAccountsIcon/><h4 className="buttonLabel">Alterar Dados</h4></Button></Link>
          </div>
        </div>
        <div className="cards">
          <Card className="welcome">
            <h2 className="userName">{`Bem-vindo, ${user?.username}`}</h2>
            <div className="userEmail">
              <EmailIcon/>
              <h4>{user?.email}</h4>
            </div>
          </Card>
          <div className="cardOder">
            <h3 className="title">Meus pedidos</h3>
            {loading ?
              <div className="circular">
                <CircularProgress color="success" />
              </div>
              :
              <div className="oders">
                {oders && !!oders.length && oders.map((item, index) => (
                  <>
                    <Card className="cardOrders" key={index}>
                      <div className="topInfo">
                        <div>
                          <h3>Número do pedido</h3>
                          <h4>{item.id}</h4>
                        </div>
                        <div>
                          <h3>Status</h3>
                          <h4>{item.status}</h4>
                        </div>
                        <div>
                          <h3>Data da compra</h3>
                          <h4>{item.purchaseDate}</h4>
                        </div>
                      </div>
                      <div className="bottomInfo">
                        <div>
                          <h3>Endereço</h3>
                          <div className="address">
                            <h4>Rua do meu pau</h4>
                            <h4>Número 24</h4>
                            <h4>CEP 24246969 - MEU PAU, MP</h4>
                          </div>
                        </div>
                        <div>
                          <h3>Frete</h3>
                          <h4>{convertNumber(25.00)}</h4>
                        </div>
                        <div>
                          <h3>Valor</h3>
                          <h4>{convertNumber(item.total)}</h4>
                        </div>
                      </div>
                    </Card>

                    <Card className="cardOrders" key={index}>
                      <div className="topInfo">
                        <div>
                          <h3>Número do pedido</h3>
                          <h4>{item.id}</h4>
                        </div>
                        <div>
                          <h3>Status</h3>
                          <h4>{item.status}</h4>
                        </div>
                        <div>
                          <h3>Data da compra</h3>
                          <h4>{item.purchaseDate}</h4>
                        </div>
                      </div>
                      <div className="bottomInfo">
                        <div>
                          <h3>Endereço</h3>
                          <div className="address">
                            <h4>Rua do meu pau</h4>
                            <h4>Número 24</h4>
                            <h4>CEP 24246969 - MEU PAU, MP</h4>
                          </div>
                        </div>
                        <div>
                          <h3>Frete</h3>
                          <h4>{convertNumber(25.00)}</h4>
                        </div>
                        <div>
                          <h3>Valor</h3>
                          <h4>{convertNumber(item.total)}</h4>
                        </div>
                      </div>
                    </Card>

                    <Card className="cardOrders" key={index}>
                      <div className="topInfo">
                        <div>
                          <h3>Número do pedido</h3>
                          <h4>{item.id}</h4>
                        </div>
                        <div>
                          <h3>Status</h3>
                          <h4>{item.status}</h4>
                        </div>
                        <div>
                          <h3>Data da compra</h3>
                          <h4>{item.purchaseDate}</h4>
                        </div>
                      </div>
                      <div className="bottomInfo">
                        <div>
                          <h3>Endereço</h3>
                          <div className="address">
                            <h4>Rua do meu pau</h4>
                            <h4>Número 24</h4>
                            <h4>CEP 24246969 - MEU PAU, MP</h4>
                          </div>
                        </div>
                        <div>
                          <h3>Frete</h3>
                          <h4>{convertNumber(25.00)}</h4>
                        </div>
                        <div>
                          <h3>Valor</h3>
                          <h4>{convertNumber(item.total)}</h4>
                        </div>
                      </div>
                    </Card>
                  </>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOders;
