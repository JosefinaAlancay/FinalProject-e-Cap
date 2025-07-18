import { Body, Controller, Post } from '@nestjs/common';
import { SaleService } from '../../application/service/sale/sale.service';
import { CreateSaleDTO } from '../../application/dto/CreateSaleDTO';

@Controller('sale')
export class SaleController {
    constructor(private readonly saleService: SaleService) { }

    @Post('purchase')
    createSale(@Body() dto: CreateSaleDTO) {
        return this.saleService.createSale(dto);
    }
}
