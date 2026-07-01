"use client"
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import OutlineBtn from "@/components/OutlineBtn";
import FilledBtn from "@/components/Filledbtn";

const filters = {
    category: [
        { label: "Feeding Accessories" },
        { label: "Bath Accessories" },
    ],
    color: [
        { label: "Black", count: 7, dot: "#000000" },
        { label: "Blue", count: 4, dot: "#2b9af3" },
        { label: "Red", count: 2, dot: "#ef4444" },
        { label: "Green", count: 2, dot: "#22c55e" },
    ],
    price: [
        { label: "Below Rs 2500", count: 8 },
        { label: "Rs 2500 To Rs 3500", count: 6 },
        { label: "Rs 3500 To Rs 4500", count: 6 },
        { label: "Rs 4500 To Rs 5500", count: 6 },
    ],
    age: [
        { label: "0 - 6 Months" },
        { label: "6 - 12 Months" },
        { label: "12 - 24 Months" },
        { label: "2 - 8 Years" },
    ],
};

function FilterSection({ title, items, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-100 py-4">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex w-full items-center justify-between text-left"
            >
                <span className="font-jost text-sm font-bold text-foreground">{title}</span>
                {open ? (
                    <ChevronUp size={16} className="text-gray-400" />
                ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                )}
            </button>

            {open && (
                <div className="mt-3 flex flex-col gap-2.5">
                    {items.map((item) => (
                        <label
                            key={item.label}
                            className="flex cursor-pointer items-center gap-2.5 text-xs text-text"
                        >
                            <input
                                type="checkbox"
                                className="h-3.5 w-3.5 rounded border-gray-300 accent-primary"
                            />
                            {item.dot && (
                                <span
                                    className="h-3.5 w-3.5 rounded-full"
                                    style={{ background: item.dot }}
                                />
                            )}
                            <span className="flex-1 text-foreground font-jost text-sm">{item.label}</span>
                            {item.count !== undefined && (
                                <span className="text-gray-400">({item.count})</span>
                            )}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function FilterSidebar() {
    return (
        <div className="flex max-h-[calc(100vh-160px)] flex-col">
            <div className="filter-scroll flex-1 overflow-y-auto pr-3">
                <FilterSection title="Category" items={filters.category} />
                <FilterSection title="Color" items={filters.color} />
                <FilterSection title="Price" items={filters.price} />
                <FilterSection title="Age" items={filters.age} />
            </div>

            <div className="mt-6 flex items-center gap-3 pr-3">
                <OutlineBtn title="Clear All" className="w-full" size="sm" />
                <FilledBtn title="Apply" className="w-full" size="sm" />
            </div>

            <style jsx>{`
                .filter-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: var(--color-primary, #d6336c) transparent;
                }
                .filter-scroll::-webkit-scrollbar {
                    width: 4px;
                }
                .filter-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .filter-scroll::-webkit-scrollbar-thumb {
                    background-color: var(--color-primary, #d6336c);
                    border-radius: 9999px;
                }
            `}</style>
        </div>
    );
}