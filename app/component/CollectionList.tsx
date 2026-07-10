"use client";

import { useEffect, useState } from "react";
import SkuSearch from "@/app/component/SkuSearch";
import CollectionCard from "./CollectionCard";
import { CollectionItem } from "@/lib/types";
import AddCard from "./AddCard";

export default function CollectionList() {
    const [items, setItems] = useState<CollectionItem[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchCollection = () => {
        fetch("/api/collection")
            .then((res) => {
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                return res.json();
            })
            .then(setItems)
            .catch((err) => setError(err.message));
    };

    useEffect(() => { fetchCollection(); }, []);

    const deleteItem = (id: string) => {
        fetch("/api/collection", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        }).then(() => fetchCollection());
    };

    const updateItem = (id: string, updatedData: Partial<CollectionItem>) => {
        fetch("/api/collection", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, ...updatedData }),
        }).then(() => fetchCollection());
    }

    const closeModal = () => {
        setShowModal(false);
    };

    if (error) {
        return (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                Couldn't load your collection — {error}
            </p>
        );
    }

    if (items === null) {
        return <p className="text-sm text-[#4A3B2E]/50">Loading your collection...</p>;
    }

    const owning = items.filter(item => !item.isWishlist);
    const wishlist = items.filter(item => item.isWishlist);

    return (
        <>
            {/* Owning collection list */}
            {owning.length === 0 ? (
                <div className="border-2 border-dashed border-[#4A3B2E]/20 rounded-2xl py-16 text-center">
                    <p className="font-[family-name:var(--font-display)] text-lg text-[#4A3B2E]/70">
                        No plushies yet
                    </p>
                    <p className="text-sm text-[#4A3B2E]/50 mt-1 mb-4">
                        Your collection is waiting to be started.
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-sm px-4 py-2 rounded-full bg-[#8B6F52] text-[#FBF6EF] hover:bg-[#8B6F52]/90 transition"
                    >
                        Add a Jelly!
                    </button>
                </div>
            ) : (
                <div className="border-2 border-solid border-[#4A3B2E]/20 bg-[#FBF6EF] rounded-3xl mb-4 pb-6">
                    <h2 className="font-[family-name:var(--font-display)] bg-[#D9B98C] rounded-t-2xl text-lg font-bold text-[#4A3B2E]/70 mb-4 px-6 pt-6 pb-4">
                        Your Collection
                    </h2>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-5 px-6 py-4">
                        {owning.map((item) => (
                            <CollectionCard key={item.id} item={item} deleteItem={deleteItem} refreshCollection={fetchCollection} />
                        ))}
                        <AddCard setShowModal={setShowModal} />
                    </ul>
                </div>
            )}

            {/* Wishlist collection list */}
            {wishlist.length > 0 && (
                <div className="border-2 border-solid border-[#4A3B2E]/20 bg-[#FBF6EF] rounded-3xl pb-6">
                    <h2 className="font-[family-name:var(--font-display)] bg-[#D9B98C]/50 rounded-t-2xl text-lg font-bold text-[#4A3B2E]/70 mb-4 px-6 pt-6 pb-4">
                        Wishlist
                    </h2>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-5 px-6 py-4">
                        {wishlist.map((item) => (
                            <CollectionCard key={item.id} item={item} deleteItem={deleteItem} refreshCollection={fetchCollection} />
                        ))}
                        <AddCard setShowModal={setShowModal} />
                    </ul>
                </div>
            )}

            {showModal && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50"
                    onClick={() => closeModal()}
                >
                    <div
                        className="bg-[#FBF8F4] rounded-2xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#4A3B2E]">
                                Find a plushie
                            </h2>
                            <button
                                onClick={() => closeModal()}
                                className="text-[#4A3B2E]/50 hover:text-[#4A3B2E] text-xl leading-none"
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                        <SkuSearch onAdd={fetchCollection} />
                    </div>
                </div>
            )}
        </>
    );
}