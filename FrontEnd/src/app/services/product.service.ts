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

  getCourses(filters: {
    name?: string;
    categoryIds?: string[];
    levels?: string[];
    limit?: number;
    offset?: number;
    sort?: string;
  }): Observable<Course[]> {
    let params = new HttpParams()
      .set('limit', filters.limit?.toString() || '9')
      .set('offset', filters.offset?.toString() || '0');

    if (filters.name) params = params.set('name', filters.name);
    if (filters.categoryIds?.length)
      params = params.set('categoryId', filters.categoryIds.join(','));
    if (filters.levels?.length)
      params = params.set('level', filters.levels.join(','));
    if (filters.sort) params = params.set('sort', filters.sort);

    return this.http.get<Course[]>(`${this.baseUrl}/courses`, { params });
  }

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



}

