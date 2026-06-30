import React from "react";
import shop1 from "@/assets/shopnow1.png";
import shop2 from "@/assets/shopnow2.png";
import shop3 from "@/assets/shopnow3.png";

function ShopNow() {
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Large Image */}
                <div className="lg:col-span-2">
                    <img
                        src={shop1}
                        alt="Shop Now"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Right Side Images */}
                <div className="flex flex-col gap-4">
                    <img
                        src={shop2}
                        alt="Baby Collection"
                        className="w-full object-cover rounded-lg"
                    />
                    <img
                        src={shop3}
                        alt="New Collection"
                        className="w-full object-cover rounded-lg"
                    />
                </div>
            </div>
        </section>
    );
}

export default ShopNow;