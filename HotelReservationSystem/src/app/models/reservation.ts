import { Room } from './room';
import { Client } from './client';

export interface Reservation {
    id: string;
    client: Client;
    number: string;
    from: Date;
    to: Date;
    room: Room;
}