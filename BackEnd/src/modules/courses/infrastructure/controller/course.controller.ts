import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CourseService } from '../../application/services/course.service';
import { CourseFilterDTO } from '../../application/dto/CourseFilterDTO';
import { RegistrationService } from 'src/modules/registrations/application/service/registration.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { CreateCourseDto } from '../../application/dto/CreateCourseDTO';
import { diskStorage } from 'multer';
import { multerConfig } from 'src/config/multer.config';

@Controller('courses')
export class CourseController {
    constructor(
        private readonly courseService: CourseService,
        private readonly registrationService: RegistrationService,
    ) { }


    // BUSQUEDAS
    @Get()
    findAll(@Query() filters: CourseFilterDTO) {
        return this.courseService.findAllWithFilters(filters);
    }


    @Get(':id')
    findById(@Param('id') id: number) {
        return this.courseService.findById(id);
    }


    // TOP CURSOS
    @Get('top')
    getTopCourses(@Query('category_id') category_id?: number) {
        return this.courseService.getTopCourses(category_id);
    }


    // ELIMINAR
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.courseService.delete(id);
    }

    // CONTADOR DE ESTUDIANTES EN CURSO
    @Get('/course/:courseId/students-count')
    countByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
        return this.registrationService.countStudentsInCourse(courseId);
    }


    // CREAR
    @Post()
    @UseInterceptors(FileInterceptor('imagen', multerConfig))
    async createCourse(
        @Body() body: CreateCourseDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.courseService.createCourse(body, file);
    }
}
