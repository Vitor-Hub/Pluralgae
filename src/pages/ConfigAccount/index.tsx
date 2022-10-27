import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Card, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { PatternFormat } from "react-number-format";
import { AuthContext } from "../../contexts/auth";
import { updateUserService } from "../../services/updateUser.service";
import "./index.scss";
import { IUser } from "../../types/user.type";

interface INewPassword {
  password: string,
  repeatPassword: string
}

interface IUpdateUser extends IUser {
  password: string,
  repeatPassword: string
}

const ConfigAccount = () => {

  const {user, signed, setUser} = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateUser, setUpdateUser] = useState<IUser>({
    access_token: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
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
    if (user) {
      setUpdateUser({...user});
    }
  },[user]);

  const validatePhoneNumber = () => {
    if (user && user.phoneNumber.length === 14) {
        return false
    } else {
        return true
    }
  }

  const handleUpdateUser = async () => {
    const {access_token, ...rest} = updateUser;
    console.log("rest: ", rest);

    setLoading(true);
    await updateUserService(rest)
      .then(() => {
          setError(false);
          setNewGlobalUser();
          setSaved(true);
          //window.location.href = "";
      })
      .catch((e) => {
          console.error(e);
          setError(true);
          setErrorMessage(e.response.data.message);
          setSaved(false);
      });
    setLoading(false);
  }

  const setNewGlobalUser = () => {
    const storagedToken = localStorage.getItem("token");
    localStorage.setItem("user", JSON.stringify({...updateUser, access_token: storagedToken}));
    setUser({...updateUser, access_token: storagedToken});
  }

  const verifyNewPassword = () => {
    if(newPassword.password != "" && newPassword.repeatPassword != "" 
    && newPassword.password.length >= 8 && newPassword.repeatPassword.length >= 8) {
      setUpdateUser({...updateUser, })
    }
  }

  return (
    <>
      <div className="ConfigAccount">
        {signed ?
          <>
            <div className="top">
              <div className="title">
                <ContactPageIcon/>
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
                {saved ? 
                  <Alert className="SuccessComponent" severity="success">
                    <AlertTitle>Salvo!</AlertTitle>
                  </Alert>
                  :
                  <></>
                }
              </div>
            </div>
            {error ?
              <Alert className="AlertComponent" severity="error">
                <AlertTitle>{errorMessage}</AlertTitle>
              </Alert>
              :
              <></>
            }
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
                    onChange={(e) => setUpdateUser({...updateUser, address: e.currentTarget.value})}
                    value={updateUser.address}
                />
                <TextField 
                    label="CEP"
                    className="textField" 
                    id="zipCode" 
                    onChange={(e) => setUpdateUser({...updateUser, zipCode: e.currentTarget.value})}
                    value={updateUser.zipCode}
                />
                <TextField 
                    label="Cidade"
                    className="textField" 
                    id="city" 
                    onChange={(e) => setUpdateUser({...updateUser, city: e.currentTarget.value})}
                    value={updateUser.city}
                />
                <TextField 
                    label="Estado"
                    className="textField" 
                    id="state" 
                    onChange={(e) => setUpdateUser({...updateUser, state: e.currentTarget.value})}
                    value={updateUser.state}
                />
                
              </Card>
            </div>
          </>
          :
          <></>
        }
      </div>
    </>
  );
};

export default ConfigAccount;
