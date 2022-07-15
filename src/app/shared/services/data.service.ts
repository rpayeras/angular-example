import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../interfaces/store.interface';
import { Order, OrderDetail } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}/stores`);
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  saveDetailsOrder(details: OrderDetail[]): Observable<OrderDetail[]> {
    return this.http.post<OrderDetail[]>(
      `${this.apiUrl}/detailsOrders`,
      details
    );
  }
}
