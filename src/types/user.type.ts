interface IUser {
    access_token: string,
	username: string,
	email: string,
	phoneNumber: string,
    document: string,
	address: {
		street: string,
		number: string,
		district: string,
		zipCode: string,
		city: string,
		state: string
	},
	id: string,
    birthdate: string
}

export type {
    IUser
}