import api from "../http-commom";

export const deleteProductService = (
  productId: string,
  token: string | undefined
) => {
  return api.delete<string>(`products/${productId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
