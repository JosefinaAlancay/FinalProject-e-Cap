import { Injectable } from '@angular/core';
import { Course } from '../models/course/course';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  private courses: Course[] = [
    {id: 1, name: 'Zapatillas', description: 'Zapatillas deportivas', price:
    12000, image: 'assets/img/zapatillas.jpg', category: 'calzado'}
  ];

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return of(this.courses.find(c => c.id === id));
  }
}
