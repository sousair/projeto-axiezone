export interface Team {
    id: number,
    name: string,
    type: string,
    rent: number,
    playerId?: number,
    description: string,
    cashPolitic: string,
    devolutionPolitic: string,
    addInfo?: string,
    accountId: string,
    imgUrl?: string
}