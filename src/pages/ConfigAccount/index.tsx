import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Card, TextField } from "@mui/material";
import { SocketAddress } from "net";
import React, { useContext, useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { AuthContext } from "../../contexts/auth";
import { updateUserService } from "../../services/updateUser.service";
import { IUser } from "../../types/user.type";
import "./index.scss";

var documentIcon = require('../../assets/documentIcon.svg');

interface INewPassword {
  password: string,
  repeatPassword: string
}

const ConfigAccount = () => {

  const {user, signed} = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateUser, setUpdateUser] = useState<IUser>({
    access_token: "",
    address: {
      address: "",
      city: "",
      state: "",
      zipCode: ""
    },
    email: "",
    id: "",
    phoneNumber: "",
    username: ""
  });
  const [newPassword, setNewPassword] = useState<INewPassword>({
    repeatPassword: "",
    password: ""
  });

  useEffect(() => {
    console.log("updateUser: ", updateUser);
  },[updateUser])

  useEffect(() => {
    if (user) setUpdateUser(user);
  },[user]);

  const validatePhoneNumber = () => {
    if (user && user.phoneNumber.length === 14) {
        return false
    } else {
        return true
    }
  }

  const handleUpdateUser = async () => {
    setLoading(true);
    await updateUserService(updateUser)
      .then((response: any) => {
          setError(false);
      })
      .catch((e) => {
          console.error(e);
          setError(true);
          setErrorMessage(e.response.data.message);
      });
    setLoading(false);
  }

  return (
    <>
      <div className="ConfigAccount">
        {signed ?
          <>
            <div className="top">
              <div className="title">
                <img src={documentIcon.default} alt="Icone" />
                <h2>Meus Dados</h2>
              </div>
              <div className="button">
                <LoadingButton 
                    className="saveButton"
                    loading={loading}
                    type="submit"
                    variant="contained"
                    onClick={() => handleUpdateUser()}
                > 
                  Salvar 
                </LoadingButton> 
              </div>
            </div>
            <div className="cards">
              <Card className="basicData">
                <h3>Dados básicos</h3>
                <TextField
                    label="Nome Completo"
                    className="textField" 
                    id="name" 
                    onChange={(e) => setUpdateUser({...updateUser, username: e.currentTarget.value})}
                    value={updateUser.username}
                />
                <PatternFormat 
                    format="(##)#####-####"
                    id="phoneNumber" 
                    label="Celular" 
                    className="textField"
                    value={updateUser.phoneNumber}
                    customInput={TextField}
                    required
                    error={validatePhoneNumber()}
                    variant="outlined"
                    onChange={(e) => setUpdateUser({...updateUser, phoneNumber: e.currentTarget.value.replace(/ /g, "")})}
                />
                <TextField  
                    className="textField" 
                    id="password"
                    value={newPassword.password}
                    required
                    label="Nova Senha"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setNewPassword({...newPassword, password: e.currentTarget.value})}
                />
                <TextField  
                    className="textField" 
                    id="repeatePassword"
                    value={newPassword.repeatPassword}
                    required
                    label="Confirme a senha"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setNewPassword({...newPassword, repeatPassword: e.currentTarget.value})}
                />
              </Card>

              <Card className="basicData">
                <h3>Endereços</h3>
                <TextField 
                    label="Endereço"
                    className="textField" 
                    id="address" 
                    onChange={(e) => setUpdateUser({...updateUser, address:{...updateUser.address, address: e.currentTarget.value}})}
                    value={updateUser.address.address}
                />
                <TextField 
                    label="CEP"
                    className="textField" 
                    id="zipCode" 
                    onChange={(e) => setUpdateUser({...updateUser, address:{...updateUser.address, zipCode: e.currentTarget.value}})}
                    value={updateUser.address.zipCode}
                />
                <TextField 
                    label="Cidade"
                    className="textField" 
                    id="city" 
                    onChange={(e) => setUpdateUser({...updateUser, address:{...updateUser.address, city: e.currentTarget.value}})}
                    value={updateUser.address.city}
                />
                <TextField 
                    label="Estado"
                    className="textField" 
                    id="state" 
                    onChange={(e) => setUpdateUser({...updateUser, address:{...updateUser.address, state: e.currentTarget.value}})}
                    value={updateUser.address.state}
                />
                
              </Card>
            </div>
          </>
          :
          <Alert className="AlertComponent" severity="error">
              <AlertTitle>Você deve estar logado!</AlertTitle>
          </Alert>
        }
      </div>
    </>
  );
};

export default ConfigAccount;
