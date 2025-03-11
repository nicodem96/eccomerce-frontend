export interface ProductResponse {
    id?: number;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    categoryName?: string;
    categoryDescription?: string;
}