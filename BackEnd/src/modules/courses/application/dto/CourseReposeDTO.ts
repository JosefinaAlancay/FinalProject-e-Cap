import { CourseLevel, CourseStatus } from "../../domain/value-objects/course.enum";

export class ResponseCourseDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  imagen_url: string;
  status: CourseStatus;
  level: CourseLevel;
  rating: number;

  //lesson
  totalDuration: string;
  totalLessons: number;

  category: {
    id: number | null;
    name: string | null;
  };

  instructor: {
    id: number | null;
    name: string | null;
    last_name: string | null;
    rating: number | null; 
  };
}