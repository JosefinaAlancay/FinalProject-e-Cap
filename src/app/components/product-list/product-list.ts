import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  selectedCategory: number = 0;

  categories = [
    { id: 1, name: 'Desarrollo' },
    { id: 2, name: 'Diseño' },
    { id: 3, name: 'Negocios' }
  ];

  constructor(private courseService: ProductService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data.slice(0, 4); 
      this.filteredCourses = this.courses;
      this.categories.unshift({ id: 0, name: 'All Courses' });
    });
  }

  selectCategory(categoryId: number): void {
    this.selectedCategory = categoryId;
    this.filteredCourses = categoryId === 0
      ? this.courses
      : this.courses.filter(c => c.category_id === categoryId);
  }

  getCategoryName(categoryId: number): string {
  const category = this.categories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Sin categoría';
}

}

