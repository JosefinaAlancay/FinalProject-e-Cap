import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseCard } from "../course-card/course-card";
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-top-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, CourseCard],
  templateUrl: './top-courses.html',
  styleUrl: './top-courses.css'
})
export class TopCourses implements OnInit {
  categories: Category[] = [];
  filteredCourses: Course[] = [];
  selectedCategory: number | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadTopCourses();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  loadTopCourses(): void {
    this.productService.getTopCourses(this.selectedCategory || undefined).subscribe((courses) => {
      this.filteredCourses = courses;
    });
  }

  selectCategory(category_id: number): void {
    this.selectedCategory = category_id;
    this.loadTopCourses();
  }
}