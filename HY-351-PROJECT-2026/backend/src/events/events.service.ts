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

    async create(event: Object, file: any, creatorID: number) {
        console.log(file); // file moves to backend, couldnt find a way to put it in public/images
        const raw = event as Record<string, string>;

        const eventData: Event = {
            trip_creator_id: creatorID,
            title: raw.eventtitle,
            event_date: raw.eventdate,
            event_time: undefined,
            type: raw.eventtype,
            status: undefined,
            max_participants: Number(raw.eventparticipants),
            price: Number(raw.eventprice),
            description: raw.description,
            schedule: raw.eventschedule,
            address_id: undefined,
            rating: undefined,
            preview_image: file ? `/images/${file.originalname}` : undefined,
        };

        return this.db.query(`
            INSERT INTO events 
            (trip_creator_id, title, event_date, event_time, type, status, max_participants, price, description, schedule, address_id, rating, preview_image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            eventData.trip_creator_id || 1,
            eventData.title,
            eventData.event_date,
            eventData.event_time || '10:00:00',
            eventData.type,
            eventData.status || 'upcoming',
            eventData.max_participants,
            eventData.price || 0,
            eventData.description || '',
            eventData.schedule || '',
            eventData.address_id || 1,
            eventData.rating || 0,
            eventData.preview_image || null,
        ]);
    }
}