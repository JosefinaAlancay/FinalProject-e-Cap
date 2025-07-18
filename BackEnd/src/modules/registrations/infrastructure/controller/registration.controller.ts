import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateRegistrationDto } from '../../application/dto/CreateRegistrationDTO';
import { RegistrationService } from '../../application/service/registration.service';
import { RegistrationStatus } from '../../domain/value-objects/registration.enum';

@Controller('registration')
export class RegistrationController {
    constructor(private readonly registrationService: RegistrationService) { }

    @Post()
    create(@Body() dto: CreateRegistrationDto) {
        return this.registrationService.createRegistration(dto);
    }

    @Get()
    findAll() {
        return this.registrationService.findAll();
    }

    @Get('user/:userId')
    findByUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.registrationService.findByUser(userId);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status') status: RegistrationStatus
    ) {
        return this.registrationService.updateStatus(id, status);
    }
}
