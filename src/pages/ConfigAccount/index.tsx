import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Card, TextField } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { PatternFormat } from "react-number-format";
import { AuthContext } from "../../contexts/auth";
import { updateUserService } from "../../services/updateUser.service";
import "./index.scss";
import { IUpdateUser } from "../../types/updateUser.type";
import validator from "validator";

interface INewPassword {
  password: string;
  repeatPassword: string;
}

const ConfigAccount = () => {
  const { user, signed, setUser } = useContext(AuthContext);

  const formRef = useRef<HTMLFormElement>(null);
  const [alertMessage, setAlertMessage] = useState<string>();
  const [alert, setAlert] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateUser, setUpdateUser] = useState<IUpdateUser>({
    access_token: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    district: "",
    number: "",
    email: "",
    id: "",
    phoneNumber: "",
    username: "",
    birthdate: "",
    document: "",
  });
  const [newPassword, setNewPassword] = useState<INewPassword>({
    repeatPassword: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setUpdateUser({
        access_token: user.access_token,
        street: user.address.street,
        city: user.address.city,
        state: user.address.state,
        zipCode: user.address.zipCode,
        district: user.address.district,
        number: user.address.number,
        email: user.email,
        id: user.id,
        phoneNumber: user.phoneNumber.replace(/[+55]/g, ""),
        username: user.username,
        birthdate: convertBrithdateBack(user.birthdate),
        document: user.document,
      });
    }
  }, [user]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const handleUpdateUser = async () => {
    formRef?.current?.reportValidity();
    let { access_token, ...rest } = updateUser;

    if (!verifyPasswordEqual()) {
      rest = { ...rest, password: newPassword.password };
    }
    setLoading(true);
    rest.birthdate = formatDate(rest.birthdate);
    rest.phoneNumber = "+55" + rest.phoneNumber.replace(/[()-]/g, "");
    if (!verifyEmptyInputs(rest)) {
      await updateUserService(rest, access_token)
        .then(() => {
          setAlert(true);
          setSaved(true);
          setAlertMessage("Atualizado com sucesso!");
          setNewGlobalUser();
        })
        .catch((e: any) => {
          console.error(e);
          setAlert(true);
          setSaved(false);
          setAlertMessage(e.response.data.message);
        });
    } else {
      setAlert(true);
      setAlertMessage("Dados necessários do usuário não podem ficar vazios!");
    }
    setLoading(false);
  };

  const convertBrithdateBack = (date: string) => {
    const [year, month, day] = date.split("-");
    const result = [day, month, year].join("/");
    return result;
  };

  const setNewGlobalUser = () => {
    const storagedToken = localStorage.getItem("token");
    const data = {
      access_token: storagedToken,
      username: updateUser.username,
      email: updateUser.email,
      phoneNumber: updateUser.phoneNumber,
      document: updateUser.document,
      address: {
        street: updateUser.street,
        number: updateUser.number,
        district: updateUser.district,
        zipCode: updateUser.zipCode,
        city: updateUser.city,
        state: updateUser.state,
      },
      id: updateUser.id,
      birthdate: formatDate(updateUser.birthdate),
    };
    localStorage.setItem("user", JSON.stringify({ ...data }));
    setUser({ ...data });
  };

  const verifyPasswordEqual = () => {
    if (newPassword?.password !== newPassword?.repeatPassword) {
      return true;
    } else {
      return validatePassword();
    }
  };

  const validatePassword = () => {
    if (
      newPassword?.password.length >= 8 &&
      newPassword?.repeatPassword.length >= 8
    ) {
      return false;
    } else {
      return true;
    }
  };

  const validateBirthdate = () => {
    const today = new Date();
    const date = new Date(formatDate(updateUser?.birthdate));

    if (date < today) {
      return false;
    } else {
      return true;
    }
  };

  const verifyEmptyInputs = (data: any) => {
    return !!Object.values(data).filter((item) => item === "").length;
  };

  const formatDate = (date: string) => {
    var dia = date.split("/")[0];
    var mes = date.split("/")[1];
    var ano = date.split("/")[2];

    const dateFormated =
      ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
    return dateFormated;
  };

  const validateEmail = () => {
    if (updateUser?.email === "" || validator.isEmail(updateUser?.email)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {alert ? (
        <Alert
          className="AlertComponent"
          severity={saved ? "success" : "error"}
        >
          <AlertTitle>{alertMessage}</AlertTitle>
        </Alert>
      ) : (
        <></>
      )}
      <div className="ConfigAccount">
        {signed ? (
          <form
            ref={formRef}
            className="form"
            onSubmit={(event) => onSubmit(event)}
          >
            <div className="top">
              <div className="title">
                <ContactPageIcon />
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
                  onChange={(e) =>
                    setUpdateUser({
                      ...updateUser,
                      username: e.currentTarget.value,
                    })
                  }
                  value={updateUser?.username}
                  required
                  variant="outlined"
                />
                <PatternFormat
                  format="##/##/####"
                  id="birthdate"
                  label="Data de nascimento"
                  className="textField"
                  value={updateUser?.birthdate}
                  customInput={TextField}
                  required
                  error={validateBirthdate()}
                  variant="outlined"
                  onChange={(e) =>
                    setUpdateUser({
                      ...updateUser,
                      birthdate: e.currentTarget.value,
                    })
                  }
                />
                <TextField
                  label="CPF"
                  className="textField"
                  id="document"
                  onChange={(e) =>
                    setUpdateUser({
                      ...updateUser,
                      document: e.currentTarget.value.replace(/\D/g, ""),
                    })
                  }
                  value={updateUser?.document}
                  required
                />
              </Card>

              <Card className="basicData">
                <h3>Trocar Senha</h3>
                <div className="newPassword">
                  <TextField
                    className="textField"
                    id="password"
                    value={newPassword?.password}
                    helperText={
                      newPassword?.password !== "" && verifyPasswordEqual()
                        ? "A senha precisa ser igual e ter mais que 8 caracteres"
                        : ""
                    }
                    label="Nova Senha"
                    variant="outlined"
                    type="password"
                    error={
                      newPassword?.password !== "" && verifyPasswordEqual()
                    }
                    onChange={(e) => {
                      setNewPassword({
                        ...newPassword,
                        password: e.currentTarget.value,
                      });
                    }}
                  />
                  <TextField
                    className="textField"
                    id="repeatePassword"
                    value={newPassword?.repeatPassword}
                    label="Confirme a senha"
                    variant="outlined"
                    helperText={
                      newPassword?.repeatPassword !== "" &&
                      verifyPasswordEqual()
                        ? "A senha precisa ser igual e ter mais que 8 caracteres"
                        : ""
                    }
                    type="password"
                    error={
                      newPassword?.repeatPassword !== "" &&
                      verifyPasswordEqual()
                    }
                    onChange={(e) => {
                      setNewPassword({
                        ...newPassword,
                        repeatPassword: e.currentTarget.value,
                      });
                    }}
                  />
                </div>
              </Card>

              <Card className="basicData">
                <h3>Endereços</h3>
                <TextField
                  label="Rua"
                  className="textField"
                  id="address"
                  onChange={(e) =>
                    setUpdateUser({
                      ...updateUser,
                      street: e.currentTarget.value,
                    })
                  }
                  value={updateUser?.street}
                  required
                />
                <PatternFormat
                  format="########"
                  id="zipCode"
                  label="CEP"
                  required
                  className="textField"
                  value={updateUser?.zipCode}
                  variant="outlined"
                  customInput={TextField}
                  onChange={(e) =>
                    setUpdateUser({
                      ...updateUser,
                      zipCode: e.currentTarget.value,
                    })
                  }
                />
                <TextField
                  label="Cidade"
                  className="textField"
                  id="city"
                  onChange={(e) =>
                    setUpdateUser({
                      ...updateUser,
                      city: e.currentTarget.value,
                    })
                  }
                  value={updateUser?.city}
                  required
                />
                <TextField
                  label="Estado"
                  className="textField"
                  id="state"
                  onChange={(e) =>
                    setUpdateUser({
                      ...updateUser,
                      state: e.currentTarget.value,
                    })
                  }
                  value={updateUser?.state}
                  required
                />
                <TextField
                  label="Número da residência"
                  className="textField"
                  id="number"
                  onChange={(e) =>
                    setUpdateUser({
                      ...updateUser,
                      number: e.currentTarget.value,
                    })
                  }
                  value={updateUser?.number}
                  required
                />
              </Card>
            </div>
          </form>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ConfigAccount;
