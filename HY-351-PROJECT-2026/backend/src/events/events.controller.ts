import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';

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

    @Post()
    create(@Body() body: any) {
        return this.eventsService.create(body);
    }
}