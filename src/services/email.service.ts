import http from "../http-commom";
import ISendEmailData from "../types/email.type";

const SendEmail = (data: ISendEmailData) => {
      return http.post<ISendEmailData>("/contact", data);
}

export default SendEmail;