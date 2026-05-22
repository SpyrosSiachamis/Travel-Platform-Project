import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { Event } from './event.model';
import { AuthUser } from 'src/auth/auth.model';
import { Session } from 'inspector/promises';
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

    async create(event: Event) {
        return await this.db.query(`
            INSERT INTO events 
            (trip_creator_id, title, event_date, event_time, type, status, max_participants, price, description, schedule, address_id, rating, preview_image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            event.trip_creator_id || 1,
            event.title,
            event.event_date,
            event.event_time || '10:00:00',
            event.type,
            event.status || 'upcoming',
            event.max_participants,
            event.price || 0,
            event.description || '',
            event.schedule || '',
            event.address_id || 1,
            event.rating || 0,
            event.preview_image || null,
        ]);
    }
}