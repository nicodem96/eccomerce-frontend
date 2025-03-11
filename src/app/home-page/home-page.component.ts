import {Component, inject, OnInit} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {ProductService} from "../services/product/product.service";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {OrderService} from "../services/order/order.service";
import {take, switchMap, catchError} from 'rxjs/operators';
import {LoadingService} from "../services/loading/loading.service";
import { Observable } from 'rxjs';
import { OrderRequest } from '../model/order/order-request';
import { ProductPurchaseRequest } from '../model/product/product-purchase';
import { PaymentMethod } from '../model/payment/payment-method';
import { ProductResponse } from '../model/product/product-response';

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule
  ],
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly productService = inject(ProductService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  isAuthenticated = false;
  products: Array<ProductResponse> = [];
  quantityIsNull = false;
  orderSuccess = false;
  orderFailed = false;
  loading$: Observable<boolean>;
  errorMessage = '';
  selectedPaymentMethod: PaymentMethod = PaymentMethod.CREDIT_CARD;
  readonly PaymentMethod = PaymentMethod;

  constructor(
    private loadingService: LoadingService

  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({isAuthenticated}) => {
        this.isAuthenticated = isAuthenticated;
        this.productService.getProducts()
          .pipe(
            catchError(error => {
              this.errorMessage = 'Failed to load products';
              return [];
            })
          )
          .subscribe(products => {
            this.products = products;
          });
      }
    );
  }

  goToCreateProductPage() {
    this.router.navigateByUrl('/add-product');
  }

  orderProduct(product: ProductResponse, quantity: string) {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.validateOrder(quantity)) {
      return;
    }

    const purchaseRequest: ProductPurchaseRequest = {
      productId: product.id?.toString() || '',
      quantity: Number(quantity)
    };

    this.loadingService.setLoading(true);
    this.oidcSecurityService.userData$.pipe(
      take(1),
      switchMap(result => {
        const orderRequest: OrderRequest = {
          customerId: result.userData.sub,
          products: [purchaseRequest],
          amount: product.price * Number(quantity),
          reference: `ORD-${Date.now()}-${product.id}`,
          paymentMethod: this.selectedPaymentMethod
        };

        return this.orderService.createOrder(orderRequest);
      })
    ).subscribe({
      next: (orderId) => {
        this.loadingService.setLoading(false);
        this.orderSuccess = true;
        this.orderFailed = false;
        this.router.navigate(['/orders', orderId, 'confirmation']);
      },
      error: (error) => {
        this.loadingService.setLoading(false);
        this.orderSuccess = false;
        this.orderFailed = true;
        this.errorMessage = error.error?.message || 'An error occurred while processing your order';
      }
    });
  }

  private validateOrder(quantity: string): boolean {
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      this.errorMessage = 'Please enter a valid quantity';
      this.orderFailed = true;
      this.orderSuccess = false;
      this.quantityIsNull = true;
      return false;
    }
    return true;
  }
}