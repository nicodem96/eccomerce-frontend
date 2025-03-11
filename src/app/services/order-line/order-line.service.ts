import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderLine } from '../../model/order/order-line/order-line';

@Injectable({
  providedIn: 'root'
})
export class OrderLineService {
  private apiUrl = 'http://localhost:8222/api/v1/order-lines';

  constructor(private httpClient: HttpClient) {}

  getOrderLines(orderId: number): Observable<OrderLine[]> {
    return this.httpClient.get<OrderLine[]>(`${this.apiUrl}/order/${orderId}`);
  }
}