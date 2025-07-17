import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Course } from '../../models/course.model';
import { CourseCard } from '../../components/course-card/course-card';
import { Category } from '../../models/category.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule, CourseCard, RouterModule, FormsModule],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.css'
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  paginatedCourses: Course[] = [];

  categories: Category[] = [];
  levels: string[] = ['BÁSICO', 'INTERMEDIO', 'AVANZADO'];

  selectedCategories: string[] = [];
  selectedLevels: string[] = [];
  searchTerm: string = '';
  sortOption: string = 'new';

  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;

  viewMode: 'grid' | 'list' = 'grid';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.fetchCourses();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe((cats) => {
      console.log('Cursos recibidos:', this.categories);
      this.categories = cats;
    });

  }

  fetchCourses(): void {
    const offset = (this.currentPage - 1) * this.itemsPerPage;

    this.productService
      .getCourses({
        name: this.searchTerm,
        categoryIds: this.selectedCategories,
        levels: this.selectedLevels,
        limit: this.itemsPerPage,
        offset,
        sort: this.sortOption,
      })
      .subscribe((courses) => {
        this.courses = courses;
        this.filteredCourses = courses;
        this.totalPages = Math.ceil(courses.length / this.itemsPerPage);
        this.paginate();
      });
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedCourses = this.filteredCourses.slice(
      start,
      start + this.itemsPerPage
    );
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchCourses();
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.fetchCourses();
  }

  onCategoryChange(event: any): void {
    const id = event.target.value;
    if (event.target.checked) {
      this.selectedCategories.push(id);
    } else {
      this.selectedCategories = this.selectedCategories.filter((c) => c !== id);
    }
    this.currentPage = 1;
    this.fetchCourses();
  }

  onLevelChange(event: any): void {
    const level = event.target.value;
    if (event.target.checked) {
      this.selectedLevels.push(level);
    } else {
      this.selectedLevels = this.selectedLevels.filter((l) => l !== level);
    }
    this.currentPage = 1;
    this.fetchCourses();
  }

  onSortChange(): void {
    this.currentPage = 1;
    this.fetchCourses();
  }

  setView(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }
  
}