export interface ProductRequest {
    id?: number
    name: string;
    description: string;
    price: number;
    categoryId?: string;
}