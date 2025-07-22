import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../../services/purchase.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetail implements OnInit {
  course!: Course;
  activeTab: string = 'overview';
  courseForm!: FormGroup;
  selectedFile: File | null = null;
  userId = 5;
  isLoading: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;


  alertMessage: string | null = null;
  alertClass: string = 'alert-success'

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private purchaseService: PurchaseService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getCourseById(id).subscribe((course) => {
      this.course = course;
    });


    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      discount: [0],
      level: ['BEGINNER', Validators.required],
      categoryId: [1, Validators.required],
      instructorId: [1, Validators.required],
    });


  }

  getOriginalPrice(price: number, discount: number): number {
    return Number((price / (1 - discount)).toFixed(2));
  }

  // COMPRAR
  purchaseCourse() {
    this.purchaseService.purchaseCourse(this.userId, this.course.id).subscribe({
      next: () => {
        window.open('https://mpago.la/1NPFM8r', '_blank');
        alert('Registration successful. Complete the payment using the link.');
      },
      error: () => {
        alert('error processing the purchase');
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  showAlert(message: string, type: 'success' | 'danger' | 'info' = 'success') {
    this.alertMessage = message;
    this.alertClass = `alert-${type}`;
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000);
  }

  submitCourse(): void {
    const formData = new FormData();
    formData.append('title', this.courseForm.value.title);
    formData.append('description', this.courseForm.value.description);
    formData.append('price', this.courseForm.value.price);
    formData.append('discount', this.courseForm.value.discount);
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }

    this.productService.createCourse(formData).subscribe({
      next: () => {
        const modalElement = document.getElementById('createCourseModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
          modal?.dispose();
        }

        this.showAlert('Curso creado exitosamente', 'success');
        this.courseForm.reset();
        this.selectedFile = null;

        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove(); 
        }

      },

      error: () => {
        this.showAlert('Hubo un error al crear el curso', 'danger');
      },
    });
  }

}