import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { OrderRequest } from '../../model/order/order-request';
import { OrderResponse } from '../../model/order/order-response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8222/api/order';

  constructor(private httpClient: HttpClient) {}

  createOrder(orderRequest: OrderRequest): Observable<string> {
    return this.httpClient.post<string>(this.apiUrl, orderRequest);
  }

  getAllOrders(): Observable<OrderResponse[]> {
    return this.httpClient.get<OrderRequest[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<OrderResponse> {
    return this.httpClient.get<OrderRequest>(`${this.apiUrl}/${id}`);
  }
}