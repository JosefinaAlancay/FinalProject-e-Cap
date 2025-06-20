import { Injectable } from '@angular/core';
import { Course } from '../models/course/course';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Course[] = [];
  private cart= new BehaviorSubject<Course[]> ([]);
  
  getCart(){
    return this.cart.asObservable();
  }

  addToCart(course: Course) {
    this.items.push(course);
    this.cart.next(this.items);
  }

  removeFromCart(courseId: number) {
    this.items = this.items.filter(c => c.id !== courseId);
    this.cart.next(this.items);
  }

  getTotal(): number {
    return this.items.reduce((sum, c)=> sum + c.price, 0);
  }
}
