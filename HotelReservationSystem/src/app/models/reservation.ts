import { Room } from './room';

export interface Reservation {
    id: string;
    numer: string;
    from: Date;
    to: Date;
    room: Room;
}