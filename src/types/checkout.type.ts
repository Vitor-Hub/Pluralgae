interface IFinalPayment {
  userId: string;
  items:
    | [
        {
          id: string;
          quantity: number;
        }
      ]
    | [];
  payment: {
    paymentMethod: string;
    cardNumber: string;
    holderName: string;
    cvv: string;
    expirationYear: string;
    expirationMonth: string;
    installments: number;
  };
  address: {
    street: string;
    number: string;
    zipCode: string;
    city: string;
    district: string;
    state: string;
  };
  shipping: {
    carrierCode: string;
    code: string;
  };
}

export type { IFinalPayment };
