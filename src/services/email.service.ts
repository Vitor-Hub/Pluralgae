import api from "../http-commom";
import ISendEmailData from "../types/email.type";

const SendEmail = (data: ISendEmailData) => {
      return api.post<ISendEmailData>("/contact", data);
}

export default SendEmail;