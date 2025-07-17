import { Course } from "../../domain/entities/course.entity";

export interface ICourseService {

    //BUSQUEDA
    findAll(): Promise<Course[]>;

    findById(id:number): Promise<Course | null>;
}
