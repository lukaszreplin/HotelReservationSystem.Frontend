import { Room } from './room';

export interface Reservation {
    id: string;
    number: string;
    from: Date;
    to: Date;
    room: Room;
}