export const addToCollection = (skuId: string, isWishlist = false) =>
    fetch("/api/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skuId, isWishlist }),
    });

export const updateWishlistStatus = (id: string, isWishlist: boolean, quantity?: number) =>
    fetch("/api/collection", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isWishlist, quantity }),
    });

export const uploadCustomImage = (skuId: string, customImage: string) =>
    fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skuId, customImage }),
    });
