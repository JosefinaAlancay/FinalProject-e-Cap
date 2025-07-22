import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/courses/${id}`);
  }

  getTopCourses(category_id?: number): Observable<Course[]> {
    let params = new HttpParams();
    if (category_id) {
      params = params.set('category_id', category_id);
    }
    return this.http.get<Course[]>(`${this.baseUrl}/courses/top`, { params });
  }

  createCourse(formData: FormData) {
    return this.http.post(`${this.baseUrl}/courses`, formData);
  }


  // FILTRO
  getCourses(filters: Record<string, any>): Observable<{ data: Course[]; total: number }> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, rawValue]) => {
      if (
        rawValue === null ||
        rawValue === undefined ||
        (typeof rawValue === 'string' && rawValue.trim() === '') ||
        (Array.isArray(rawValue) && rawValue.length === 0)
      ) {
        return;
      }

      if (Array.isArray(rawValue)) {
        rawValue.forEach(v => (params = params.append(key, String(v))));
        return;
      }

      params = params.set(key, String(rawValue));
    });

    return this.http.get<{ data: Course[]; total: number }>(
      `${this.baseUrl}/courses`,
      { params }
    );
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('http://localhost:3010/courses');
  }

}

