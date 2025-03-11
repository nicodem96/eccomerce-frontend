export interface ProductPurchaseRequest {
    productId: string;
    quantity: number;
}

export interface ProductPurchaseResponse {
    productId: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    status?: PurchaseStatus;
    message?: string;
}

export enum PurchaseStatus {
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    INSUFFICIENT_STOCK = 'INSUFFICIENT_STOCK'
}