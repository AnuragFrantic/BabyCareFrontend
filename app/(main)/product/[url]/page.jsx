"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Heart, ShoppingCart, Truck, ShieldCheck, CreditCard } from "lucide-react";
import Section from "@/components/Section";
import productImg from "@/assets/product1.png";
import truck from "@/assets/truck.png";
import payment from "@/assets/payment.png";
import cod from "@/assets/cod.png";
import productdetail from "@/assets/productdetail.png";

import toy from "@/assets/product1.png";
import shoes from "@/assets/product1.png";
import cap from "@/assets/product1.png";





import thunder from "@/assets/thunder.png"
import FilledBtn from "@/components/Filledbtn";
import OutlineBtn from "@/components/OutlineBtn";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import { useCartStore } from "@/store/useCartStore";

export default function ProductPage() {
    const [activeImage, setActiveImage] = useState(0);
    const [activeColor, setActiveColor] = useState(0);
    const [activeSize, setActiveSize] = useState(1);
    const [pincode, setPincode] = useState("");
    const [activeTab, setActiveTab] = useState("desc");

    const images = [productImg, productImg, productImg];

    const product = {
        title: "Blocks Sorting Toy",
        price: 450,
        oldPrice: 550,
        discount: 23,
        rating: 5,
        reviews: 14,
        colors: [
            { hex: "#2b9af3", name: "Blue" },
            { hex: "#f97316", name: "Orange" },
            { hex: "#10b981", name: "Green" },
            { hex: "#f43f5e", name: "Red" },
            { hex: "#22c55e", name: "Lime" },
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        description:
            "Lorem ipsum dolor sit amet consectetur. Eget pretium enim pulvinar habitasse at id viverra. Adipiscing eget malesuada lorem tincidunt.",
    };


    const data = [
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

    ];

    const features = [
        { icon: truck, label: "Free Delivery" },
        { icon: payment, label: "Secured Payments" },
        { icon: cod, label: "COD Available" },
    ];

    const handleAddCart = () => {
        useCartStore.getState().openSidebar();
    }

    return (
        <>
            <Section>
                <div className="">
                    <nav className="mb-6 text-sm font-jost text-text">
                        <span className="text-foreground font-semibold">Home / </span><span className="text-primary">{product.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        {/* Left - Images */}
                        <div className="col-span-5">
                            <div className="relative rounded-[18px] bg-[#fde9ea] p-6">
                                {/* discount badge */}
                                {/* <div className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-center text-[11px] font-bold leading-tight text-white">
                                {product.discount}%<br />off
                            </div> */}

                                <div className="relative h-[500px] w-full overflow-hidden rounded-[14px]">
                                    <Image
                                        src={images[activeImage]}
                                        alt={product.title}
                                        className="object-contain"
                                        fill
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex gap-3">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`overflow-hidden rounded-[10px] border-2 bg-[#fde9ea] ${activeImage === idx ? "border-primary" : "border-transparent"
                                            }`}
                                    >
                                        <div className="relative h-20 w-20">
                                            <Image src={img} alt={`thumb-${idx}`} className="object-contain p-2" fill />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right - Details */}
                        <div className="col-span-7">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="inline-flex items-center gap-1 text-sm font-bold font-jost text-orange">

                                        <Image src={thunder} /> Extra 2% off

                                    </div>
                                    <h1 className="mt-1 font-baloo text-3xl font-bold text-foreground">{product.title}</h1>
                                    <div className="mt-2 flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={i < product.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}
                                            />
                                        ))}
                                        <span className="ml-1 text-xs text-text">({product.reviews} Reviews)</span>
                                    </div>
                                </div>

                                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-foreground">
                                    <Heart size={18} />
                                </button>
                            </div>

                            <div className="mt-4 flex items-baseline gap-3">
                                <span className="font-jost text-2xl font-bold text-primary">
                                    Rs. {product.price}.00
                                </span>
                                <span className="text-lg text-text/50 line-through font-jost">
                                    Rs. {product.oldPrice}.00
                                </span>
                            </div>

                            <p className="mt-4 max-w-[560px] font-jost text-sm leading-relaxed text-text">
                                {product.description}
                            </p>

                            <div className="mt-6 space-y-4 gap-10 border-t border-primary/10 pt-5">
                                <div>
                                    <div className="font-jost text-sm text-text">
                                        Color: <span className="font-semibold">{product.colors[activeColor].name}</span>
                                    </div>
                                    <div className="mt-2 flex gap-2">
                                        {product.colors.map((c, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveColor(i)}
                                                style={{ background: c.hex }}
                                                className={`h-6 w-6 rounded-full border-2 ${activeColor === i ? "border-primary" : "border-white"
                                                    } shadow-sm`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="font-jost text-sm text-text">
                                        Size: <span className="font-semibold">{product.sizes[activeSize]}</span>
                                    </div>
                                    <div className="mt-2 flex gap-2">
                                        {product.sizes.map((s, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveSize(i)}
                                                className={`flex h-8 w-8 text-foreground items-center font-jost justify-center rounded-xl border text-xs font-semibold ${activeSize === i
                                                    ? "border-primary bg-primary text-white"
                                                    : "border-primary/30 text-text"
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-primary/10 pt-5">
                                <label className="mb-2 block font-jost text-sm font-semibold text-text">
                                    Pincode
                                </label>

                                <div className="flex w-full max-w-md items-center rounded-lg border border-gray-200 bg-white "
                                >
                                    <input
                                        placeholder="Pincode"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        className="h-12 flex-1 rounded-full bg-transparent px-5 text-sm text-text outline-none placeholder:text-gray-400"
                                    />
                                    <button className="h-12 shrink-0 font-jost rounded-lg bg-primary/10 px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20">
                                        Check Delivery
                                    </button>
                                </div>

                                <div className="mt-5 flex items-center gap-4">
                                    <FilledBtn onClick={() => handleAddCart()} title="Add To Cart" className="w-60" />
                                    <OutlineBtn title="Buy Now" className="w-60" />

                                </div>
                            </div>



                            <div className="mt-8 flex items-stretch gap-10 border-t border-primary/10 pt-6">
                                {features.map((feature, idx) => (
                                    <div
                                        key={feature.label}
                                        className={`flex flex-col items-center  gap-2 px-4 ${idx !== features.length - 1 ? "border-r-[1.6px] border-[#DBE2E5]" : ""
                                            }`}
                                    >
                                        <Image src={feature.icon} alt={feature.label} className="h-7 w-7" />
                                        <div className="font-jost text-xs font-semibold text-foreground">
                                            {feature.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-10">
                        <div className="flex gap-8 border-b border-primary/10">
                            {[
                                { key: "desc", label: "Description" },
                                { key: "ship", label: "Shipping Information" },
                                { key: "reviews", label: "Reviews" },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`pb-3 font-jost text-sm font-semibold ${activeTab === tab.key
                                        ? "border-b-2 border-primary text-primary"
                                        : "text-text/60"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6">
                            {activeTab === "desc" && (
                                <div className="max-w-none space-y-4 font-jost text-sm leading-relaxed text-text">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur. Eros sagittis orci eu parturient lectus
                                        quis. Lorem ipsum dolor sit amet consectetur. Eros sagittis orci eu parturient
                                        lectus quis. Tellus risus ultrices sed est. Lorem ipsum dolor sit amet
                                        consectetur. Ac dui lobortis lectus cursus lorem. Tellus risus ultrices sed est.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur. Eros sagittis orci eu parturient lectus
                                        quis. Ac dui lobortis lectus cursus lorem. Tellus risus ultrices sed est. Lorem
                                        ipsum dolor sit amet consectetur. Eros sagittis orci eu parturient lectus quis.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur. Eros sagittis orci eu parturient lectus
                                        quis. Ac dui lobortis lectus cursus lorem. Tellus risus ultrices sed est.
                                    </p>
                                </div>
                            )}
                            {activeTab === "ship" && (
                                <div className="font-jost text-sm text-text">Shipping details will be shown here.</div>
                            )}
                            {activeTab === "reviews" && (
                                <div className="font-jost text-sm text-text">Customer reviews will be shown here.</div>
                            )}
                        </div>
                    </div>
                </div>
            </Section>
            <Section>
                <Image src={productdetail} className="w-full" />
            </Section>
            <Section>
                <Image src={productdetail} className="w-full" />
            </Section>


            <Section>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3">
                        <SectionTitle title={"Similar Products"} className="mb-4" />

                    </div>
                    {data.map((item) => {
                        return (
                            <>
                                <ProductCard product={item} />

                            </>
                        )
                    })}
                </div>
            </Section>
        </>



    );
}