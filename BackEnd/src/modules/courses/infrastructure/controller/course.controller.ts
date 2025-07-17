import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { CourseService } from '../../application/services/course.service';
import { CourseFilterDTO } from '../../application/dto/CourseFilterDTO';

@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }


    // BUSQUEDAS
    @Get()
    findAll(@Query() filters: CourseFilterDTO) {
        return this.courseService.findAllWithFilters(filters);
    }


    @Get(':id')
    findById(@Param('id') id: number) {
        return this.courseService.findById(id);
    }

    // ELIMINAR
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.courseService.delete(id);
    }
}
