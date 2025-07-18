import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { PaymentService } from '../../application/service/payment.service';
import { CreatePaymentDTO } from '../../application/dto/CreatePaymentDTO';
import { Response } from 'express';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post()
    createPayment(@Body() dto: CreatePaymentDTO) {
        return this.paymentService.registerPayment(dto);
    }
    @Get('link')
    redirectToPayment(@Res({ passthrough: true }) res: Response) {
        return res.redirect('https://mpago.la/1NPFM8r');
    }
}

