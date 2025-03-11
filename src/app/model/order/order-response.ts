import { PaymentMethod } from "../payment/payment-method";

export interface OrderResponse {
  id?: number;
  reference: string;
  amount: number;
  paymentMethod: PaymentMethod;
  customerId: string;
}
