import { Controller, Get, Post, Body, Param, Session, UnauthorizedException, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { EventsService } from './events.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

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
    @UseInterceptors(FileInterceptor('imageFile'))
    create(@Body() event: Object, @Session() session: Record<string, any>, @UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 5000000 }),
            new FileTypeValidator({ fileType: /(image\/jpeg|image\/png)$/ }),
        ],
    }),
    )
    file: any,) {
        if (!session || !session.user) {
            throw new UnauthorizedException('You must be logged in to create an event.');
        }
        const creatorid = parseInt(session.user.user_id.toString(), 10);
        return this.eventsService.create(event, file, creatorid);
    }
}