import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Course } from '../../models/course.model';
import { CourseCard } from '../../components/course-card/course-card';
import { Category } from '../../models/category.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  levels: string[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

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
    this.loadCourses();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe((cats) => {
      console.log('Cursos recibidos:', this.categories);
      this.categories = cats;
    });

  }

  setView(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }


  // FILTRO
  loadCourses(): void {
    const filters: any = {
      offset: (this.currentPage - 1) * this.itemsPerPage,
      limit: this.itemsPerPage,
      sort: this.sortOption
    };

    if (this.searchTerm.trim()) {
      filters.title = this.searchTerm;
    }

    if (this.selectedCategories.length > 0) {
      filters.category_id = this.selectedCategories;
    }

    if (this.selectedLevels.length > 0) {
      filters.level = this.selectedLevels;
    }

    this.productService.getCourses(filters).subscribe((response) => {
      this.courses = response.data;
      this.filteredCourses = response.data;
      this.totalPages = Math.ceil(response.total / this.itemsPerPage);
      this.paginatedCourses = response.data;
    });
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.loadCourses();
  }

  onCategoryChange(event: any): void {
    const categoryId = event.target.value;
    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }
    this.currentPage = 1;
    this.loadCourses();
  }

  onLevelChange(event: any): void {
    const level = event.target.value;
    if (event.target.checked) {
      this.selectedLevels.push(level);
    } else {
      this.selectedLevels = this.selectedLevels.filter(l => l !== level);
    }
    this.currentPage = 1;
    this.loadCourses();
  }

  onSortChange(): void {
    this.currentPage = 1;
    this.loadCourses();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadCourses();
  }
}