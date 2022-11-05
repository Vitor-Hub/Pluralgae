export default interface IOders {
    id: string,
    purchaseDate: string,
    status: string,
    total: number,
    address: {
        street: string,
        number: number,
        zipCode: string
        city: string,
        neighboor: string,
        state: string,
    },
    items: [{
        productId: string,
        quantity: number,
        total: number
        name: string,
        price: number,
    }],
    shipping: {
        carrier: string,
        deliveryTime: string,
        description: string,
        price: number
    }
}