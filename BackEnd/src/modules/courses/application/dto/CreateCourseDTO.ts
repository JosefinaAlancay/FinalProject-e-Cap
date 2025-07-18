import { IsString, IsNumber, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { CourseLevel, CourseStatus } from '../../domain/value-objects/course.enum';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    discount: number;

    @IsEnum(CourseLevel)
    level: CourseLevel;

    @IsOptional()
    @IsEnum(CourseStatus)
    status?: CourseStatus;

    @IsNumber()
    categoryId: number;

    @IsNumber()
    instructorId: number;
}