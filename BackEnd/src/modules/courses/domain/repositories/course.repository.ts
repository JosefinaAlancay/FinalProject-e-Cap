import { Injectable } from "@nestjs/common";
import { Repository, DataSource, ILike, FindManyOptions } from "typeorm";
import { Course } from "../entities/course.entity";
import { CourseFilterDTO } from "../../application/dto/CourseFilterDTO";

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

    // FILTRO
    async findWithFilters(filters: CourseFilterDTO): Promise<Course[]> {
        const { limit = 10, offset = 0, category_id, title, level } = filters;

        const where: any = {};
        if (category_id) where.category = { id: category_id };
        if (title) where.title = ILike(`%${title}%`);
        if (level) where.level = level;


        const options: FindManyOptions<Course> = {
            skip: offset,
            take: limit,
            relations: ['category', 'instructor.user', 'lessons'],
            where,
        };

        return this.repository.find(options);
    }

    // ELIMINAR
    async remove(course: Course): Promise<void> {
        await this.repository.remove(course);
    }
}