"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { CollectionItem } from "@/lib/types";
import { updateWishlistStatus, uploadCustomImage } from "@/lib/api";

type Props = {
    item: CollectionItem;
    deleteItem: (id: string) => void;
    refreshCollection?: () => void;
};

const MAX_DIM = 1200;

const convertToJpeg = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
            let { naturalWidth: w, naturalHeight: h } = img;
            if (w > MAX_DIM || h > MAX_DIM) {
                if (w > h) { h = Math.round(h * MAX_DIM / w); w = MAX_DIM; }
                else { w = Math.round(w * MAX_DIM / h); h = MAX_DIM; }
            }
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            if (!ctx) { URL.revokeObjectURL(url); reject(new Error("Canvas unavailable")); return; }
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL("image/jpeg", 0.88));
        };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Could not read image")); };
        img.src = url;
    });

export default function CollectionCard({ item, deleteItem, refreshCollection }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const jpeg = await convertToJpeg(file);
            const res = await uploadCustomImage(item.sku.id, jpeg);
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error((body as { error?: string }).error ?? `Upload failed (${res.status})`);
            }
            refreshCollection?.();
            toast.success("Image updated!");
        } catch (err) {
            console.error("Upload error:", err);
            const isHeic = ["image/heic", "image/heif"].includes(file.type.toLowerCase()) ||
                /\.heic$|\.heif$/i.test(file.name);
            toast.error(
                isHeic
                    ? "HEIC images can't be processed on this browser. Please convert to JPEG first, or upload from Safari."
                    : err instanceof Error ? err.message : "Failed to upload image. Please try again."
            );
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <li className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#D9B98C] rounded-t-full border border-[#4A3B2E]/10 flex items-start justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FBF6EF] mt-0.5" />
            </div>
            <div className="bg-[#FFFFFF] border border-[#4A3B2E]/10 rounded-2xl p-4 pt-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition relative h-full flex flex-col">
                <button
                    onClick={() => deleteItem(item.id)}
                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full text-[#4A3B2E]/50 hover:text-[#4A3B2E] hover:bg-[#4A3B2E]/10 transition text-2xl font-bold leading-none"
                    aria-label="Remove"
                >
                    ×
                </button>
                <div className="relative mb-2">
                    <img src={item.customImage ?? item.sku.image} alt={item.sku.name} className="w-full h-32 object-contain" />
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#D9B98C] text-white flex items-center justify-center text-sm hover:bg-[#D9B98C]/80 transition shadow-sm disabled:opacity-50"
                        aria-label="Upload custom image"
                    >
                        {uploading ? "…" : "+"}
                    </button>
                </div>
                <p className="text-xs uppercase tracking-wide text-[#4A3B2E]/40">{item.sku.sku}</p>
                <p className="font-[family-name:var(--font-display)] font-medium text-[#4A3B2E] mt-1">{item.sku.name}</p>
                <div className="mt-auto pt-2 flex items-center gap-2">
                    <p className="text-xs text-[#4A3B2E]/50">Qty</p>
                    <select
                        className="flex-1 border border-[#4A3B2E]/10 rounded-md py-1 text-[#4A3B2E] bg-white"
                        value={item.quantity ?? 1}
                        onChange={(e) => {
                            const newQuantity = parseInt(e.target.value);
                            updateWishlistStatus(item.id, item.isWishlist, newQuantity).then(() => refreshCollection?.());
                        }}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button
                    className={`mt-2 w-full px-3 py-1 rounded-full transition ${item.isWishlist ? "text-[#4A3B2E] bg-[#D9B98C]/50 hover:bg-[#D9B98C]/90" : " text-[#FFFFFF] bg-[#D9B98C] hover:bg-[#D9B98C]/70"}`}
                    onClick={() =>
                        updateWishlistStatus(item.id, !item.isWishlist).then(() => refreshCollection?.())
                    }
                >
                    {item.isWishlist ? "Move to collection" : "Move to wishlist"}
                </button>
            </div>
        </li>
    );
}
