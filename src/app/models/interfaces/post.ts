import { Photo } from "./photo";

export interface Post {
    _id: string;
    photos: Photo[];
    description: string;
    title: string;
    timeToRead: number;
    views: number;
    createdAt: string;
}