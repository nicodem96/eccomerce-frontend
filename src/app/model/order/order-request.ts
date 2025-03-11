import { PaymentMethod } from "../payment/payment-method";
import { ProductPurchaseRequest } from "../product/product-purchase";

export interface OrderRequest {
  id?: number;
  reference: string;
  amount: number;
  paymentMethod: PaymentMethod;
  customerId: string;
  products: ProductPurchaseRequest[];
}