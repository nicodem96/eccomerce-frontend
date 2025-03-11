import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { LoadingService } from '../../services/loading/loading.service';
import { OrderResponse } from '../../model/order/order-response';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html',
})
export class OrderConfirmationComponent implements OnInit {
  order?: OrderResponse;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    this.loadingService.setLoading(true);
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderById(Number(orderId)).subscribe({
        next: (order) => {
          this.order = order;
          this.loadingService.setLoading(false);
        },
        error: (error) => {
          console.error('Error loading order:', error);
          this.loadingService.setLoading(false);
        }
      });
    }
  }
}