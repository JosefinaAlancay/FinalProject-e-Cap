import { Component } from '@angular/core';

@Component({
  selector: 'app-course',
  imports: [],
  templateUrl: './course.html',
  styleUrl: './course.css'
})

export class Course{
  
}

export interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
