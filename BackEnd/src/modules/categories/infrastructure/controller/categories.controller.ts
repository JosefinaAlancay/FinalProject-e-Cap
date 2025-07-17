import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCategoryDTO } from '../../application/dto/CreateCategoryDTO';
import { UpdateCategoryDTO } from '../../application/dto/UpdateCategoryDTO';
import { CategoriesService } from '../../application/service/categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly service: CategoriesService) { }

    @Post()
    create(@Body() data: CreateCategoryDTO) {
        return this.service.create(data);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.service.findById(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: UpdateCategoryDTO) {
        return this.service.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }
}
