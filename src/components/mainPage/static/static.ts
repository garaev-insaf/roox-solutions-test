export type UserStateType = {
    address: UserAddressType,
    company: UserCompanyType,
    email: string,
    id: number,
    name: string,
    phone: string,
    username: string,
    website: string,
    comment?: string,
}

export type UserAddressType = {
    city: string,
    geo: {
        lat: string,
        lng: string,
    }
    street: string,
    suite: string,
    zipcode: string,
}

export type UserCompanyType = {
    bs: string,
    catchPhrase: string,
    name: string,
}