export interface GoodsItem {
    _id: string;
    type: string;
    productName: string;
    count: number;
    packing: string;
    size: string;
    photo: string;
    isBought: boolean;
    createdAt: Date;
    updatedAt: Date;
}