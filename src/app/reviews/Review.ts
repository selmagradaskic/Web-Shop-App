export interface Review {
    id: number;
    author: string;
    review: string;
    stars: number;
    product: number;
    createdDate: Date;
    updatedDate: Date;
}