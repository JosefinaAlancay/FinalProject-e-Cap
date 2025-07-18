import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = 'http://localhost:3000/sale/purchase';

  constructor(private http: HttpClient) { }

  purchaseCourse(userId: number, courseId: number): Observable<any> {
    return this.http.post(this.apiUrl, { userId, courseId });
  }
}
