import { LoadingButton } from "@mui/lab";
import { Box, Modal, TextField } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import validator from "validator";
import { PatternFormat } from "react-number-format";
import { ModalControlContext } from "../../../contexts/modals";
import { signUpService } from "../../../services/signup.service";
import { ISignUp } from "../../../types/signup.type";
import "./index.scss";
import { AuthContext } from "../../../contexts/auth";
import AlertComponent from "../../AletComponent";

const SignUp = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { isOpenSignUpModal, setIsOpenSignUpModal } =
    useContext(ModalControlContext);
  const { signIn } = useContext(AuthContext);

  const [userData, setUserData] = useState<ISignUp>({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    birthdate: "",
    document: "",
    admin: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const resetData = () => {
    setUserData({
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      birthdate: "",
      document: "",
      admin: false,
    });
    setError(false);
  };

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const handleCloseModal = () => {
    resetData();
    setIsOpenSignUpModal(false);
  };

  const handleSignUp = async () => {
    formRef?.current?.reportValidity();
    setIsLoading(true);
    if (!verifyEmptyInputs()) {
      let data = { ...userData };
      data.birthdate = formatDate(data.birthdate);
      data.phoneNumber = "+55" + data.phoneNumber.replace(/[()-]/g, "");
      await signUpService(data)
        .then(() => {
          setIsOpenSignUpModal(false);
          setError(false);
          signIn({
            username: userData?.email,
            password: userData?.password,
          });
        })
        .catch((e) => {
          console.error(e);
          setError(true);
          if (
            e.response.data.message === "Esse endereço de email já está em uso"
          ) {
            setErrorMessage(e.response.data.message);
          } else {
            setErrorMessage("Revise os dados!");
          }
        });
    } else {
      setError(true);
      setErrorMessage("Preencha todos os campos!");
    }

    setUserData(userData);
    setIsLoading(false);
  };

  const validatePassword = () => {
    if (userData?.password === "" || userData?.password.length >= 8) {
      return false;
    } else {
      return true;
    }
  };

  const validatePhoneNumber = () => {
    if (userData?.phoneNumber === "" || userData?.phoneNumber.length === 14) {
      return false;
    } else {
      return true;
    }
  };

  const validateEmail = () => {
    if (userData?.email === "" || validator.isEmail(userData?.email)) {
      return false;
    } else {
      return true;
    }
  };

  const verifyEmptyInputs = () => {
    console.log("userData", userData)
    return !!Object.values(userData).filter((item) => item === "").length;
  };

  const validateBirthdate = () => {
    const today = new Date();
    const date = new Date(formatDate(userData?.birthdate));

    if (date < today) {
      return false;
    } else {
      return true;
    }
  };

  const formatDate = (date: string) => {
    var dia = date.split("/")[0];
    var mes = date.split("/")[1];
    var ano = date.split("/")[2];

    const dateFormated =
      ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
    return dateFormated;
  };

  return (
    <div className="Login">
      <Modal
        open={isOpenSignUpModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="BoxSignUp">
          <h1>Inscreva-se</h1>

          <div className="inputs">
            <form
              ref={formRef}
              className="form"
              onSubmit={(event) => onSubmit(event)}
            >
              <div className="mainContent">
                <div className="topContent">
                  <TextField
                    className="textField"
                    id="user"
                    value={userData?.username}
                    required
                    label="Nome completo"
                    type="name"
                    variant="outlined"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        username: e.currentTarget.value,
                      })
                    }
                  />
                  <TextField
                    className="textField"
                    id="e-mail"
                    value={userData?.email}
                    required
                    label="Email"
                    variant="outlined"
                    type="text"
                    error={validateEmail()}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.currentTarget.value })
                    }
                  />
                  <PatternFormat
                    format="(##)#####-####"
                    id="phoneNumber"
                    label="Celular"
                    className="textField"
                    value={userData?.phoneNumber}
                    customInput={TextField}
                    required
                    error={validatePhoneNumber()}
                    variant="outlined"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        phoneNumber: e.currentTarget.value.replace(/ /g, ""),
                      })
                    }
                  />
                  <PatternFormat
                    format="##/##/####"
                    id="birthdate"
                    label="Data de nascimento"
                    className="textField"
                    value={userData?.birthdate}
                    customInput={TextField}
                    required
                    error={validateBirthdate()}
                    variant="outlined"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        birthdate: e.currentTarget.value,
                      })
                    }
                  />
                  <TextField
                    className="textField"
                    id="document"
                    value={userData?.document}
                    required
                    label="document"
                    variant="outlined"
                    type="text"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        document: e.currentTarget.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>
                <TextField
                  className="textField"
                  id="password"
                  value={userData?.password}
                  required
                  label="Senha"
                  variant="outlined"
                  type="password"
                  helperText={
                    validatePassword()
                      ? "A senha precisa ter mais que 8 caracteres"
                      : ""
                  }
                  error={validatePassword()}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      password: e.currentTarget.value,
                    })
                  }
                />
                <LoadingButton
                  className="button"
                  variant="contained"
                  onClick={handleSignUp}
                  loading={isLoading}
                >
                  Cadastre-se
                </LoadingButton>
              </div>
            </form>
          </div>
          {error ? (
            <AlertComponent type="error">{errorMessage}</AlertComponent>
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default SignUp;
