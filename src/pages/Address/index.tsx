import {
  Card,
  TextField
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.scss";
import { AuthContext } from "../../contexts/auth";
import AlertComponent from "../../components/AletComponent";
import {ContactPage, KeyboardArrowRight, ShoppingBasket} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { PatternFormat } from "react-number-format";
import { IUserAddress } from "../../types/userAddress.type";
import { updateUserService } from "../../services/updateUser.service";
import { useHistory } from "react-router-dom";

const Address = () => {
  const { user, setUser } = useContext(AuthContext);

  const formRef = useRef<HTMLFormElement>(null);
  const [updateUserAddress, setUpdateUserAddress] = useState<IUserAddress>({
    access_token: "",
    zipCode: "",
    city: "",
    state: "",
    street: "",
    district: "",
    number: "",
    id: ""
  });
  const [alertMessage, setAlertMessage] = useState<string>();
  const [alert, setAlert] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setUpdateUserAddress({
        access_token: user.access_token,
        street: user.address.street,
        city: user.address.city,
        state: user.address.state,
        zipCode: user.address.zipCode,
        district: user.address.district,
        number: user.address.number,
        id: user.id
      });
    }
  }, [user]);

  const verifyEmptyInputs = (data: any) => {
    return !!Object.values(data).filter((item) => item === "").length;
  };

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const setNewGlobalUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    const updatedUser = {
      ...storedUser,
      address:{
        street: updateUserAddress.street,
        number: updateUserAddress.number,
        district: updateUserAddress.district,
        zipCode: updateUserAddress.zipCode,
        city: updateUserAddress.city,
        state: updateUserAddress.state
      }
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleUpdateAddressUser = async () => {
    formRef?.current?.reportValidity();
    let { access_token, ...rest } = updateUserAddress;
    setLoading(true);
    if (!verifyEmptyInputs(rest)) {
      await updateUserService(rest, access_token)
        .then(() => {
          setAlert(true);
          setSaved(true);
          setNewGlobalUser();
          const history = useHistory();
          history.push("/checkout");
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

  return (
    <>
      {alert ? (
        <AlertComponent type="error">{alertMessage}</AlertComponent>
      ) : (
        <></>
      )}
      <div className="Address">
        <div className="topContent">
          <div className="title">
            <ContactPage />
            <h2>Endereço</h2>
          </div>
          <div className="changeData">
            <Link to={saved ? "/checkout" : ""}>
              <LoadingButton 
                className="button" 
                variant="contained" 
                loading={loading} 
                type="submit"
                onClick={() => handleUpdateAddressUser()}
              >
                <ShoppingBasket />
                <h4 className="buttonLabel">Prosseguir para pagamento</h4>
                <KeyboardArrowRight />
              </LoadingButton>
            </Link>
          </div>
        </div>
        <div className="cards">
          <Card className="basicData">
            <form
              ref={formRef}
              className="form"
              onSubmit={(event) => onSubmit(event)}
            >
              <div className="inputs">
                <PatternFormat
                  format="########"
                  id="zipCode"
                  label="CEP"
                  required
                  className="textField"
                  value={updateUserAddress?.zipCode}
                  variant="outlined"
                  customInput={TextField}
                  onChange={(e) =>
                    setUpdateUserAddress({
                      ...updateUserAddress,
                      zipCode: e.currentTarget.value,
                    })
                  }
                />
                <TextField
                  className="textField"
                  id="district"
                  value={updateUserAddress?.district}
                  required
                  label="Bairro"
                  variant="outlined"
                  type="text"
                  onChange={(e) =>
                    setUpdateUserAddress({
                      ...updateUserAddress,
                      district: e.currentTarget.value,
                    })
                  }
                />
                <TextField
                  className="textField"
                  id="street"
                  value={updateUserAddress?.street}
                  required
                  label="Rua"
                  variant="outlined"
                  type="text"
                  onChange={(e) =>
                    setUpdateUserAddress({
                      ...updateUserAddress,
                      street: e.currentTarget.value,
                    })
                  }
                />
                <TextField
                  className="textField"
                  id="city"
                  value={updateUserAddress?.city}
                  required
                  label="Cidade"
                  variant="outlined"
                  type="text"
                  onChange={(e) =>
                    setUpdateUserAddress({ ...updateUserAddress, city: e.currentTarget.value })
                  }
                />
                <TextField
                  className="textField"
                  id="state"
                  value={updateUserAddress?.state}
                  required
                  label="Estado"
                  variant="outlined"
                  type="text"
                  onChange={(e) =>
                    setUpdateUserAddress({ ...updateUserAddress, state: e.currentTarget.value })
                  }
                />
                <TextField
                  className="textField"
                  id="number"
                  value={updateUserAddress?.number}
                  required
                  label="Número da residência"
                  variant="outlined"
                  type="text"
                  onChange={(e) =>
                    setUpdateUserAddress({
                      ...updateUserAddress,
                      number: e.currentTarget.value,
                    })
                  }
                />
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Address;
