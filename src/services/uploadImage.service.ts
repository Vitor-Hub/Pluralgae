import api from "../http-commom";
import { IUploadImage } from "../types/uploadImage.type";

export const uploadImageService = (file: File, token: string | undefined) => {
  const formData = new FormData();
  formData.append("productImage", file);

  console.log("service image: ", file);
  return api.post<IUploadImage>("products/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });
};
