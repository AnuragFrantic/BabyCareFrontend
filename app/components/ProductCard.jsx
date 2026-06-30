"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/product/${product.name}`)} className="group rounded-[24px] border border-primary/15 bg-white p-3 transition-all duration-300 hover:shadow-lg">
            {/* Image */}
            <div className="relative overflow-hidden rounded-[22px] bg-[#FFF0F0]">
                <Image
                    src={product.image}
                    alt={product.name}
                    className="h-[260px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Icons */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-md transition-all hover:bg-primary hover:text-white">
                        <Heart size={24} />
                    </button>

                    <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-md transition-all hover:bg-primary hover:text-white">
                        <ShoppingCart size={24} />
                    </button>

                    <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-md transition-all hover:bg-primary hover:text-white">
                        <Eye size={24} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="py-6 text-center">
                <h3 className="font-baloo text-primary text-3xl font-bold">
                    {product.name}
                </h3>

                <p className="mt-2 font-jost text-2xl text-text">
                    Rs. {product.price}.00
                </p>
            </div>
        </div>
    );
}