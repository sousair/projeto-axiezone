export interface User {
    id: number,
    name: string,
    email: string,
    nickname: string,
    cell: string,
    walletAdress: string,
    hasTeam: boolean,
    admin: boolean,
    iat: number,
    exp: number,
    token: string
}