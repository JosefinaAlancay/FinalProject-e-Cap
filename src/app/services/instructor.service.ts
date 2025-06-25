import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
    // Role
  private role: Role[] = [
    {id:1, name:"Instructor"},
    {id:2, name:"Administrator"}
  ];
  
  //  Instructor
  private instructors: User[] = [
    {id:1, name:"Mercedes", lastname:"Sosa", email:"merSosa@gmail.com", password:"123", studies:"Programer",rol_id:1, image:"https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg" ,created_at: new Date()},
    {id:2, name:"Lucas", lastname:"Mendez", email:"luMendez@gmail.com", password:"123", studies:"Designer",rol_id:1, image:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg" ,created_at: new Date()},
    {id:3, name:"Franciso", lastname:"Herrera", email:"franHerrera@gmail.com", password:"123", studies:"Architect",image:"https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg" ,rol_id:1 ,created_at: new Date()},
    {id:3, name:"Pablo", lastname:"Valdes", email:"paValdes@gmail.com", password:"123", studies:"Gardener",rol_id:3, image:"mercedes.jpg" ,created_at: new Date()}
  ];

  // Obtener Instructores
  getInstructors(): Observable<User[]> {
    const filtered = this.instructors.filter(user => user.rol_id === 1);
    return of (filtered);
  }


  constructor() { }
}
