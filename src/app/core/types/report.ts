import { Photo } from "./photo";
import { Product } from "./product";

export interface Report {
    _id: string;
    photos: Photo[];
    description: string;
    products: Product[];
    createdAt: string;
    price: number;
}