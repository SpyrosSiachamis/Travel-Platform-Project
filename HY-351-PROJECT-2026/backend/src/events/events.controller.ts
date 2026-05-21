import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.model';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    findAll() {
        return this.eventsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.eventsService.getById(parseInt(id, 10));
        return result[0];
    }

    @Post('/add')
    create(@Body() event: Event) {
        return this.eventsService.create(event);
    }
}