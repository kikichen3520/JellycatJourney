import { CollectionItem } from "@/lib/types";
import { updateWishlistStatus } from "@/lib/api";

type Props = {
    item: CollectionItem;
    deleteItem: (id: string) => void;
    refreshCollection?: () => void;
};

export default function CollectionCard({ item, deleteItem, refreshCollection }: Props) {
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
                <img src={item.sku.image} alt={item.sku.name} className="w-full h-32 object-contain mb-2" />
                <p className="text-xs uppercase tracking-wide text-[#4A3B2E]/40">{item.sku.sku}</p>
                <p className="font-[family-name:var(--font-display)] font-medium text-[#4A3B2E] mt-1">{item.sku.name}</p>
                <div className="mt-auto pt-2 flex items-center gap-2">
                    <p className="text-xs text-[#4A3B2E]/50">Qty</p>
                    <select
                        className="flex-1 border border-[#4A3B2E]/10 rounded-md py-1"
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
