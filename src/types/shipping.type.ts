interface IPostShipping {
    items: {
        id?: string,
        quantity?: number
    }[],
    cep?: string
}

interface IResultShipping {
    carrier: string,
    carrierCode: string,
    code: string,
    deliveryTime: string,
    description: string,
    price: number
}

export type {
    IPostShipping,
    IResultShipping
}