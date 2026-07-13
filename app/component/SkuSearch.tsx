"use client";

import { useEffect, useState } from "react";
import { addToCollection } from "@/lib/api";

type Sku = {
  id: string;
  sku: string;
  name: string;
  image: string;
};

export default function SkuSearch({ onAdd }: { onAdd?: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Sku[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Wait 300ms after the user stops typing before searching
    const timeout = setTimeout(() => {
      fetch(`/api/skus?search=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then(setResults)
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="item-center justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a plushie..."
        className="w-full px-4 py-3 rounded-full border border-[#4A3B2E]/20 bg-[#FBF6EF] text-[#4A3B2E] placeholder:text-[#4A3B2E]/40 focus:outline-none focus:ring-2 focus:ring-[#8B6F52]/40"
      />

      {loading && (
        <p className="text-sm text-[#4A3B2E]/40 mt-2">Searching...</p>
      )}

      {!loading && query && results.length === 0 && (
        <p className="text-sm text-[#4A3B2E]/40 mt-2">No plushies found.</p>
      )}

      {!loading && results.length > 0 && (
        <ul className="mt-3 grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 gap-4">
          {results.map((sku) => (
            <li
              key={sku.id}
              className="bg-[#FFFFFF] border border-[#4A3B2E]/10 rounded-xl p-3 text-sm flex flex-col"
            >
              <img src={sku.image} alt={sku.name} className="w-full h-32 object-contain mb-2" />
              <p className="font-medium text-[#4A3B2E]">{sku.name}</p>
              <p className="text-xs text-[#4A3B2E]/40 mt-1">{sku.sku}</p>
              <div className="mt-auto pt-2 flex gap-2">
                <button
                  className="flex-1 px-3 py-1 rounded-full bg-[#8B6F52] text-[#FBF6EF] hover:bg-[#8B6F52]/90 transition text-xs"
                  onClick={() =>
                    addToCollection(sku.id, false).then(() => {
                      setResults((prev) => prev.filter((s) => s.id !== sku.id));
                      onAdd?.();
                    })
                  }
                >
                  + Collection
                </button>
                <button
                  className="flex-1 px-3 py-1 rounded-full border border-[#8B6F52] text-[#8B6F52] hover:bg-[#8B6F52]/10 transition text-xs"
                  onClick={() =>
                    addToCollection(sku.id, true).then(() => {
                      setResults((prev) => prev.filter((s) => s.id !== sku.id));
                      onAdd?.();
                    })
                  }
                >
                  + Wishlist
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}