export type CollectionItem = {
    id: string;
    customImage?: string | null;
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
