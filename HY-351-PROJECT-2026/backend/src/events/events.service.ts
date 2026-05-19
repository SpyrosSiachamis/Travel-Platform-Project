import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';

@Injectable()
export class EventsService {
    constructor(private readonly db: DatabaseService) {}

    async findAll() {
        return await this.db.query(`
            SELECT 
                e.event_id,
                e.title,
                e.event_date,
                e.event_time,
                e.type,
                e.status,
                e.max_participants,
                e.price,
                e.description,
                e.schedule,
                e.rating,
                e.preview_image,
                a.city,
                a.street,
                a.number,
                a.postal_code
            FROM events e
            LEFT JOIN addresses a ON e.address_id = a.address_id
            ORDER BY e.event_date ASC
        `);
    }

    async getById(id: number) {
        return await this.db.query(`
            SELECT 
                e.event_id,
                e.trip_creator_id,
                e.title,
                e.event_date,
                e.event_time,
                e.type,
                e.status,
                e.max_participants,
                e.price,
                e.description,
                e.schedule,
                e.rating,
                e.preview_image,
                a.city,
                a.street,
                a.number,
                a.postal_code
            FROM events e
            LEFT JOIN addresses a ON e.address_id = a.address_id
            WHERE e.event_id = ?
        `, [id]);
    }

    async create(body: any) {
        return await this.db.query(`
            INSERT INTO events 
            (trip_creator_id, title, event_date, event_time, type, status, max_participants, price, description, schedule, address_id, rating, preview_image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            body.trip_creator_id || 1,
            body.title,
            body.event_date,
            body.event_time || '10:00:00',
            body.type,
            body.status || 'upcoming',
            body.max_participants,
            body.price || 0,
            body.description || '',
            body.schedule || '',
            body.address_id || 1,
            body.rating || 0,
            body.preview_image || null,
        ]);
    }
}