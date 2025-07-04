import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private category: Category[] = [
      {id:1, name:"Tecnología"},
      {id:2, name:"Diseño"},
      {id:3, name:"Negocio"},
      {id:4, name:"Lenguas"},
    ]

    private courses: Course[] = [
      {id:1, title:"Informática", instructor_id:1, description:"Esto es Informática", price:14.1, discount:0.0, imagen:"https://images.pexels.com/photos/32664038/pexels-photo-32664038.jpeg",level:"PRINCIPIANTE" ,category_id:1, state:true,created_at:new Date()},
      {id:2, title:"Matemáticas", instructor_id:2, description:"Esto es", price:15.1, discount:10.0, imagen:"https://images.pexels.com/photos/714699/pexels-photo-714699.jpeg",level:"AVANZADO" ,category_id:2, state:true,created_at:new Date()},
      {id:3, title:"Lengua", instructor_id:3, description:"Esto es", price:91.5, discount:0.0, imagen:"https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg" ,level:"MEDIO" ,category_id:3, state:true,created_at:new Date()},
      {id:4, title:"Historia", instructor_id:4, description:"Esto es", price:20, discount:20.0, imagen:"https://images.pexels.com/photos/36006/renaissance-schallaburg-figures-facade.jpg" ,level:"PRINCIPIANTE" ,category_id:1, state:true,created_at:new Date()},
      {id:5, title:"Ciencias Sociales", instructor_id:5, description:"Esto es", price:9.10, discount:2.0, imagen:"https://images.pexels.com/photos/5428258/pexels-photo-5428258.jpeg" ,level:"AVANZADO" ,category_id:1, state:true,created_at:new Date()},
      {id:6, title:"Psicología", instructor_id:6, description:"Esto es", price:5.50, discount:0.0, imagen:"https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg" ,level:"MEDIO" ,category_id:1, state:true,created_at:new Date()},
      {id:7, title:"Química", instructor_id:1, description:"Esto es", price:80, discount:0.0, imagen:"https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg" ,level:"MEDIO" ,category_id:1, state:true, created_at:new Date()},
    ];

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }
}

