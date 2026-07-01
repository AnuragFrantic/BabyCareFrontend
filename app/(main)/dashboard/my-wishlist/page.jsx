"use client";


import { ferryWellAPI } from "@/service/api";
import { useEffect, useState, useCallback } from "react";

import { PackageX } from "lucide-react";

import ProductCard from "@/components/ProductCard";

function MyWishlist() {
    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(true);

    const handleGetWishlist = useCallback(async () => {
        try {
            setFetching(true);
            const res = await ferryWellAPI.get(`wishlist`);
            setData(res.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setFetching(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        handleGetWishlist();
    }, [handleGetWishlist]);

    // Remove item instantly from grid when user un-hearts it in ProductBox
    const handleWishlistChange = useCallback((variantId, isWishlisted) => {
        if (!isWishlisted) {
            setData((prev) => prev.filter((item) => item.variant._id !== variantId));
        }
    }, []);



    if (!data.length) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 px-4 gap-4">
                <div className="relative w-22 h-22">
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: "rgba(206,15,105,0.08)" }}
                    />
                    <div
                        className="absolute inset-3.5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "var(--light-primary)" }}
                    >
                        <PackageX className="w-7 h-7" style={{ color: "var(--primary)" }} />
                    </div>
                </div>
                <div>
                    <h3
                        className="text-base font-semibold mb-1"
                        style={{ color: "var(--foreground)" }}
                    >
                        Your wishlist is empty
                    </h3>
                    <p className="text-sm max-w-xs" style={{ color: "var(--text)" }}>
                        Save items you love by tapping the heart icon on any product.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 container-padding section-space">
            {data.map((item, index) => {
                // Reshape variant to match ProductBox's expected `product.variants[0]` structure
                const productData = {
                    _id: item.variant.product._id,
                    title: item.variant.product.title,
                    slug: item.variant.product.slug,
                    variants: [
                        {
                            ...item.variant,
                            isWishlisted: true,
                        },
                    ],
                };

                return (
                    <ProductCard
                        key={item._id}
                        product={productData}
                        loading={false}
                        index={index}
                        wishlist={true}
                        cartbtnShow={false}
                        shopnowbtn={true}
                        variant={true}
                        onWishlistChange={handleWishlistChange}
                    />
                );
            })}
        </div>
    );
}

export default MyWishlist;