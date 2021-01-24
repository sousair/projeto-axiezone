import { Card } from 'src/app/models/card.model';
export interface Axie {
    id: number,
    name: string,
    class: string,
    parts: Card[],
    image: string,
    stats: object,
}