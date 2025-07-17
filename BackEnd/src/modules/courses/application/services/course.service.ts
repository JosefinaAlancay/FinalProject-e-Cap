import { Injectable, NotFoundException } from '@nestjs/common';
import { ICourseService } from '../interfaces/CourseInterface';
import { Course } from '../../domain/entities/course.entity';
import { ResponseCourseDTO } from '../dto/CourseReposeDTO';
import { CourseRepository } from '../../domain/repositories/course.repository';
import { CourseFilterDTO } from '../dto/CourseFilterDTO';

@Injectable()
export class CourseService implements ICourseService {
  constructor(private readonly courseRepository: CourseRepository) { }
  // MAPEO
  private toDTO(course: Course): ResponseCourseDTO {
    const lessons = course.lessons || [];
    const totalLessons = lessons.length;
    const totalMinutes = lessons.reduce((sum, l) => sum + Number(l.duration), 0);
    const formattedDuration = formatDuration(totalMinutes);

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      price: Number(course.price),
      discount: Number(course.discount),
      imagen_url: course.imagen_url,
      status: course.status,
      level: course.level,
      rating: course.rating,

      // lesson
      totalLessons,
      totalDuration: formattedDuration,

      category: course.category?.id
        ? {
          id: course.category.id,
          name: course.category.name,
        }
        : { id: null, name: 'Sin categoría' },
      instructor: course.instructor?.user
        ? { id: course.instructor.user.id, name: course.instructor.user.name, last_name: course.instructor.user.last_name, rating: course.instructor.rating }
        : { id: null, name: 'Sin', last_name: ' Instructor', rating: 0 }

    };
  }


  // BUSQUEDA
  async findById(id: number): Promise<ResponseCourseDTO> {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }

    return this.toDTO(course);
  }

  // FILTRO
  async findAllWithFilters(filters: CourseFilterDTO): Promise<ResponseCourseDTO[]> {
    const courses = await this.courseRepository.findWithFilters(filters);
    return courses.map(course => this.toDTO(course));
  }

  // TOP CURSOS
  async getTopCourses(category_id?: number): Promise<ResponseCourseDTO[]> {
    const courses = await this.courseRepository.findTopCourses(category_id);
    return courses.map(course => this.toDTO(course));
  }



  // ELIMINAR 
  async delete(id: number): Promise<{ message: string }> {
    const course_found = await this.courseRepository.findById(id);
    if (!course_found) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }

    await this.courseRepository.remove(course_found);
    return { message: `Course with id ${id} was successfully deleted.` }
  }

};


// Formatear duración
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return `${hours}h ${remaining}min`;
}




