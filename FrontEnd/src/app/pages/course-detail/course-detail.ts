import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

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

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getCourseById(id).subscribe((course) => {
      this.course = course;
    });
  }

  getOriginalPrice(price: number, discount: number): number {
    return Number((price / (1 - discount / 100)).toFixed(2));
  }
}
