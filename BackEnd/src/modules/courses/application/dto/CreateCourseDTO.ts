import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    discount: number;

    @IsString()
    imagen_url: string;

    @IsString()
    status: string;

    @IsString()
    level: string;

    @IsNumber()
    categoryId: number;

    @IsNumber()
    userId: number;
}
