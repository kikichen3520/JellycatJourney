export type CollectionItem = {
    id: string;
    quantity: number;
    dateAcquired: string;
    isWishlist: boolean;
    sku: {
        id: string;
        sku: string;
        name: string;
        image: string;
    };
};
