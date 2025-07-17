import { CourseFilterDTO } from "../dto/CourseFilterDTO";
import { ResponseCourseDTO } from "../dto/CourseReposeDTO";

export interface ICourseService {
    // BUSQUEDA
    findAllWithFilters(filters: CourseFilterDTO): Promise<ResponseCourseDTO[]>;
    findById(id:number): Promise<ResponseCourseDTO | null>;

    delete(id: number): Promise<{ message: string }>;
}