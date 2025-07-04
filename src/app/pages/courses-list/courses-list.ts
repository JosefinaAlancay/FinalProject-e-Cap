import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class CoursesList {
  viewMode: 'grid' | 'list' = 'grid';
  
  setView(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  courses: Course[] = [];
  filteredCourses: Course[] = [];
  categories: Category[] = [];
  selectedCategories: number[] = [];
  selectedLevels: string[] = [];
  levels: string[] = ['PRINCIPIANTE', 'MEDIO', 'AVANZADO'];
  sortOption: string = 'new';

  // Búsqueda
  searchTerm: string = '';

  // Paginación
  currentPage: number = 1;
  pageSize: number = 6;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCourses().subscribe((data) => {
      this.courses = data;
      this.filteredCourses = [...this.courses];
      this.onSortChange();
    });

    this.categories = this.productService['category']; // mock de categorías
  }

  get paginatedCourses(): Course[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredCourses.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCourses.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onCategoryChange(event: any): void {
    const id = +event.target.value;
    if (event.target.checked) {
      this.selectedCategories.push(id);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== id);
    }
    this.applyFilters();
  }

  onLevelChange(event: any): void {
    const level = event.target.value;
    if (event.target.checked) {
      this.selectedLevels.push(level);
    } else {
      this.selectedLevels = this.selectedLevels.filter(l => l !== level);
    }
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.currentPage = 1;

    this.filteredCourses = this.courses.filter(course => {
      const matchCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(course.category_id);

      const matchLevel =
        this.selectedLevels.length === 0 ||
        this.selectedLevels.includes(course.level);

      const matchSearch =
        this.searchTerm.trim() === '' ||
        course.title.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchCategory && matchLevel && matchSearch;
    });

    this.onSortChange();
  }

  onSortChange(): void {
    switch (this.sortOption) {
      case 'priceLow':
        this.filteredCourses.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        this.filteredCourses.sort((a, b) => b.price - a.price);
        break;
      case 'new':
      default:
        this.filteredCourses.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
    }
  }
}
