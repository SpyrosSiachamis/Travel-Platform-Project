export interface Event {
    event_id?: number;
    trip_creator_id: number;
    title: string;
    event_date: string;
    event_time: string;
    type: string;
    status: 'current' | 'upcoming' | 'completed';
    max_participants: number;
    price: number;
    description?: string;
    schedule?: string;
    address_id?: number;
    rating?: number;
    preview_image?: string;
}