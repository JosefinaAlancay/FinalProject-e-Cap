import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard {
  @Input() course!: Course;

  getOriginalPrice(price: number, discount: number): number {
    return Number((price / (1 - discount / 100)).toFixed(2));
  }
}
