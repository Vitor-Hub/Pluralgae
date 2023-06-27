import { Card, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useContext, useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./index.scss";
import { AuthContext } from "../../contexts/auth";
import AlertComponent from "../../components/AletComponent";
import { IRegisterProducts } from "../../types/registerProduct.type";
import { registerProductService } from "../../services/registerProduct.service";
import { uploadImageService } from "../../services/uploadImage.service";
import { getProducts } from "../../services/product.service";
import IGetProducts from "../../types/products.type";
import { deleteProductService } from "../../services/deleteProduct.service";

const Admin = () => {
  const { user } = useContext(AuthContext);
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [productInfo, setProductInfo] = useState<IGetProducts[]>([]);
  const [registerProduct, setRegisterProduct] = useState<IRegisterProducts>({
    name: "",
    description: "",
    price: 0,
    sku: "",
    category: "",
    informations: "",
    height: 0,
    length: 0,
    weight: 0,
    width: 0,
    imagePath: "",
  });

  useEffect(() => {
    GetProducts();
  }, []);

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

  const handleRegisterProduct = async () => {
    formRef?.current?.reportValidity();
    let data = { ...registerProduct };
    setIsLoading(true);
    if (user) {
      await registerProductService(data, user.access_token)
        .then(() => {
          setMessage("Salvo");
          setRegisterProduct({
            name: "",
            description: "",
            price: 0,
            sku: "",
            category: "",
            informations: "",
            height: 0,
            length: 0,
            weight: 0,
            width: 0,
            imagePath: "",
          });
          setSelectedImage(null);
          setError(false);
        })
        .catch((e: any) => {
          setMessage("Erro ao salvar");
          console.error(e);
          setErrorMessage(e.response.data.message);
          setError(true);
        });
    }
    setIsLoading(false);
    GetProducts();
  };

  useEffect(() => {
    console.log("registerProduct: ", registerProduct);
  }, [registerProduct]);

  const handleImageUpload = async (event: any) => {
    setIsLoading(true);
    const file = event.target.files[0];
    await uploadImageService(file, user?.access_token)
      .then((response: any) => {
        setSelectedImage(file);
        console.log("response: ", response.data);
        setRegisterProduct({ ...registerProduct, imagePath: response.data });
      })
      .catch((e: any) => {
        console.error(e);
        setErrorMessage(e.response.data.message);
        setError(true);
      });
    setIsLoading(false);
  };

  const convertNumber = (price: number) => {
    return price?.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleDeleteProduct = async (productId: string | undefined) => {
    if (productId && user) {
      await deleteProductService(productId, user?.access_token)
        .then(() => {
          GetProducts();
        })
        .catch((e: any) => {
          console.error(e);
          setErrorMessage(e.response.data.message);
          setError(true);
        });
    }
  };

  return (
    <>
      {error ? (
        <AlertComponent type="error">{errorMessage}</AlertComponent>
      ) : (
        <></>
      )}
      <div className="Admin">
        <div className="topContent">
          <div className="title">
            <h2>Admin</h2>
          </div>
        </div>
        <div className="cards">
          <Card className="basicData">
            <TextField
              label="Título"
              className="textField"
              id="title"
              onChange={(e) =>
                setRegisterProduct({
                  ...registerProduct,
                  name: e.currentTarget.value,
                })
              }
              value={registerProduct?.name}
              required
              variant="outlined"
            />

            <TextField
              label="Descrição"
              className="textField"
              id="description"
              onChange={(e) =>
                setRegisterProduct({
                  ...registerProduct,
                  description: e.currentTarget.value,
                })
              }
              value={registerProduct?.description}
              required
              variant="outlined"
            />

            <TextField
              label="Preço"
              className="textField"
              id="price"
              onChange={(e) =>
                setRegisterProduct({
                  ...registerProduct,
                  price: parseFloat(e.currentTarget.value),
                })
              }
              value={registerProduct?.price}
              required
              variant="outlined"
            />

            <TextField
              label="SKU"
              className="textField"
              id="sku"
              onChange={(e) =>
                setRegisterProduct({
                  ...registerProduct,
                  sku: e.currentTarget.value,
                })
              }
              value={registerProduct?.sku}
              required
              variant="outlined"
            />

            <TextField
              label="Categoria"
              className="textField"
              id="category"
              onChange={(e) =>
                setRegisterProduct({
                  ...registerProduct,
                  category: e.currentTarget.value,
                })
              }
              value={registerProduct?.category}
              required
              variant="outlined"
            />

            <TextField
              label="Informações"
              className="textField"
              id="informations"
              onChange={(e) =>
                setRegisterProduct({
                  ...registerProduct,
                  informations: e.currentTarget.value,
                })
              }
              value={registerProduct?.informations}
              required
              variant="outlined"
            />

            <div className="dimensions">
              <TextField
                label="Altura"
                className="textField"
                id="height"
                onChange={(e) =>
                  setRegisterProduct({
                    ...registerProduct,
                    height: parseFloat(e.currentTarget.value),
                  })
                }
                value={registerProduct?.height}
                required
                variant="outlined"
              />

              <TextField
                label="Comprimento"
                className="textField"
                id="length"
                onChange={(e) =>
                  setRegisterProduct({
                    ...registerProduct,
                    length: parseFloat(e.currentTarget.value),
                  })
                }
                value={registerProduct?.length}
                required
                variant="outlined"
              />

              <TextField
                label="Largura"
                className="textField"
                id="width"
                onChange={(e) =>
                  setRegisterProduct({
                    ...registerProduct,
                    width: parseFloat(e.currentTarget.value),
                  })
                }
                value={registerProduct?.width}
                required
                variant="outlined"
              />

              <TextField
                label="Peso"
                className="textField"
                id="weight"
                onChange={(e) =>
                  setRegisterProduct({
                    ...registerProduct,
                    weight: parseFloat(e.currentTarget.value),
                  })
                }
                value={registerProduct?.weight}
                required
                variant="outlined"
              />
            </div>

            <input
              accept="image/*"
              className="image"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={handleImageUpload}
            />

            <label htmlFor="raised-button-file">
              <LoadingButton
                variant="contained"
                component="span"
                className="image"
                loading={isLoading}
              >
                Upload Image
              </LoadingButton>
            </label>
            {selectedImage && (
              <img src={URL.createObjectURL(selectedImage)} alt="Uploaded" />
            )}

            <LoadingButton
              className="button"
              variant="contained"
              onClick={handleRegisterProduct}
              loading={isLoading}
            >
              Cadastrar
            </LoadingButton>
            <h3>{message}</h3>
          </Card>
          <Card className="productData">
            <h3 className="title">Produto e Frete</h3>
            {productInfo.map((item, index) => {
              return (
                <div key={item.id} className="products">
                  <div className="productImage">
                    <img src={item.imagePath} alt="spirulina" />
                  </div>
                  <div className="productInfos">
                    <h3 className="productTitle">{item.name}</h3>
                    <div className="creditInfo">
                      <h4 className="credit">{item.description}</h4>
                    </div>
                  </div>
                  <div className="productPrice">
                    <h4 className="priceTitle">Preço à vista:</h4>
                    <h3 className="price">{`${convertNumber(item.price)}`}</h3>
                  </div>
                  <div
                    className="delete"
                    onClick={() => handleDeleteProduct(item.id)}
                  >
                    <DeleteIcon className="deleteIcon" />
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Admin;
