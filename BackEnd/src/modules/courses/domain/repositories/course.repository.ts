import { Injectable } from "@nestjs/common";
import { Repository, DataSource, ILike, FindManyOptions } from "typeorm";
import { Course } from "../entities/course.entity";
import { CourseFilterDTO } from "../../application/dto/CourseFilterDTO";
import { CourseStatus } from "../value-objects/course.enum";

@Injectable()
export class CourseRepository {
    private repository: Repository<Course>;

    constructor(private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getRepository(Course);
    }

    // BUSQUEDAS
    async findById(id: number): Promise<Course | null> {
        return this.repository.findOne({ where: { id }, relations: ['category', 'lessons', 'instructor.user'] })
    }

    async findAll(): Promise<Course[]> {
        return this.repository.find({
            relations: ['category', 'instructor.user', 'lessons'],
            order: { id: 'DESC' },
        });
    }

    // FILTRO
    async filterCourses(dto: CourseFilterDTO): Promise<[Course[], number]> {
        const { limit = 10, offset = 0, category_id, title, level } = dto;

        const query = this.repository.createQueryBuilder('course')
            .leftJoinAndSelect('course.category', 'category')
            .leftJoinAndSelect('course.instructor', 'instructor')
            .where('course.status = :status', { status: CourseStatus.ACTIVE });

        if (title) {
            query.andWhere('course.title LIKE :title', { title: `%${title}%` });
        }

        if (category_id) {
            query.andWhere('category.id = :category_id', { category_id });
        }

        if (level) {
            query.andWhere('course.level = :level', { level });
        }

        query.skip(offset).take(limit);

        return query.getManyAndCount(); 
    }


    // TOP CURSOS
    async findTopCourses(category_id?: number): Promise<Course[]> {
        const query = this.repository
            .createQueryBuilder('course')
            .leftJoinAndSelect('course.category', 'category')
            .leftJoinAndSelect('course.instructor', 'instructor')
            .leftJoinAndSelect('instructor.user', 'user')
            .leftJoinAndSelect('course.lessons', 'lessons')
            .orderBy('course.rating', 'DESC')
            .limit(4);

        if (category_id) {
            query.where('course.category.id = :categoryId', { category_id });
        }

        return query.getMany();
    }


    // ELIMINAR
    async remove(course: Course): Promise<void> {
        await this.repository.remove(course);
    }

    // CREAR    
    createCourse(courseData: Partial<Course>): Course {
        return this.repository.create(courseData); // método de TypeORM que crea una instancia pero no guarda
    }

    async saveCourse(course: Course): Promise<Course> {
        return await this.repository.save(course); // método de TypeORM que guarda la instancia
    }

}