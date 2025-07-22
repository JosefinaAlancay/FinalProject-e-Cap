import { Course } from "../../domain/entities/course.entity";
import { CourseFilterDTO } from "../dto/CourseFilterDTO";
import { ResponseCourseDTO } from "../dto/CourseReposeDTO";
import { CreateCourseDto } from "../dto/CreateCourseDTO";

export interface ICourseService {
    findAll(): Promise<ResponseCourseDTO[]>;
    findById(id:number): Promise<ResponseCourseDTO | null>;
    delete(id: number): Promise<{ message: string }>;
    getTopCourses(category_id?: number): Promise<ResponseCourseDTO[]>
    delete(id: number): Promise<{ message: string }>
    createCourse(dto: CreateCourseDto, file: Express.Multer.File): Promise<Course>
}