import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetail implements OnInit {
  course!: Course;
  activeTab: string = 'overview';
  userId = 5;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private purchaseService: PurchaseService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getCourseById(id).subscribe((course) => {
      this.course = course;
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
        alert('Registro exitoso. Completa el pago en el enlace.');
      },
      error: () => {
        alert('Error al procesar la compra');
      }
    });
  }

}
