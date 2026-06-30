"use client";

import { useState } from "react";

import ProductCard from "@/components/ProductCard";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";

import toy from "@/assets/product1.png";
import shoes from "@/assets/product1.png";
import cap from "@/assets/product1.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function FeatureProduct() {
    const [activeTab, setActiveTab] = useState("All");

    const products = [
        {
            id: 1,
            name: "Blocks Sorting Toy",
            category: "Sipper Cup",
            price: 250,
            image: toy,
        },
        {
            id: 2,
            name: "Soft Shoes",
            category: "Strollers",
            price: 250,
            image: shoes,
        },
        {
            id: 3,
            name: "Woolen Cap",
            category: "High Chairs",
            price: 250,
            image: cap,
        },
        {
            id: 4,
            name: "Blocks Sorting Toy",
            category: "Car Seats",
            price: 250,
            image: toy,
        },
        {
            id: 5,
            name: "Soft Shoes",
            category: "Feeding Bottles",
            price: 250,
            image: shoes,
        },
        {
            id: 6,
            name: "Woolen Cap",
            category: "Sipper Cup",
            price: 250,
            image: cap,
        },
    ];

    const categories = [
        "All",
        "Sipper Cup",
        "Strollers",
        "High Chairs",
        "Car Seats",
        "Feeding Bottles",
    ];

    const filteredProducts =
        activeTab === "All"
            ? products
            : products.filter(
                (product) => product.category === activeTab
            );

    return (
        <Section>
            <SectionTitle
                title="Featured Products"
                subtitle="Quality Products"
            />

            {/* Tabs */}
            <div className="mt-8 mb-12 flex flex-wrap items-center justify-center gap-4 md:gap-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`font-nunito rounded-full px-6 py-3 text-[16px] font-semibold transition-all duration-300 md:px-10
              ${activeTab === category
                                ? "bg-primary text-white shadow-lg"
                                : "text-foreground hover:text-primary"
                            }
            `}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Products Slider */}
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
                className="pb-14"
            >
                {filteredProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Section>
    );
}

export default FeatureProduct;