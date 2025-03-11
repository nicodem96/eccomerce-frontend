import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ProductPurchaseRequest, ProductPurchaseResponse } from '../../model/product/product-purchase';
import { ProductRequest } from '../../model/product/product-request';
import { ProductResponse } from '../../model/product/product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8222/api/v1/products';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Array<ProductResponse>> {
    return this.httpClient.get<Array<ProductResponse>>(this.apiUrl);
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: ProductRequest): Observable<number> {
    return this.httpClient.post<number>(this.apiUrl, product);
  }

  purchaseProducts(purchases: ProductPurchaseRequest[]): Observable<ProductPurchaseResponse[]> {
    return this.httpClient.post<ProductPurchaseResponse[]>(`${this.apiUrl}/purchase`, purchases);
  }
}
