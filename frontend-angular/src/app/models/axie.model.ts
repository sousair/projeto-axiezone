import { Card } from './card.model';
export interface Axie {
    id: number,
    name: string,
    class: string,
    parts: Card[],
    image: string,
    stats: object,
}