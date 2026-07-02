"use client";


import Image from "next/image";



import banner1 from "../../assets/banner1.png";

import Section from "@/components/Section";
import Cat1img from "@/assets/cat1.png"
import Cat2img from "@/assets/cat2.png"
import cerified from "@/assets/certified.png"
import makeinindia from "@/assets/makeinindia.png"
import bpafree from "@/assets/BPA-FREE.png"
import premium from "@/assets/PremiumQuality.png"





import FeatureProduct from "./FeatureProduct";

import FeatureBanner from "./FeatureBanner";
import ShopByAge from "./ShopByAge";
import SectionTitle from "@/components/SectionTitle";
import product1 from "@/assets/product1.png"
import ProductCard from "@/components/ProductCard";
import FilledBtn from "@/components/Filledbtn";
import ShopNow from "./ShopNow";
import Testimonial from "@/components/Testimonial";
import BlogsBox from "@/components/BlogsBox";
import Loader from "@/components/Loader";
import { useApp } from "@/context/AppContext";



const bestProducts = [
    {
        id: 1,
        name: "Premium Baby Stroller",
        category: "Strollers",
        price: 2999,
        image: product1,
    },
    {
        id: 2,
        name: "Convertible High Chair",
        category: "High Chairs",
        price: 1899,
        image: product1,
    },
    {
        id: 3,
        name: "Anti-Colic Feeding Bottle",
        category: "Feeding Bottles",
        price: 499,
        image: product1,
    },
    {
        id: 4,
        name: "Travel Safety Car Seat",
        category: "Car Seats",
        price: 3499,
        image: product1,
    },
    {
        id: 5,
        name: "Training Sipper Cup",
        category: "Sipper Cup",
        price: 299,
        image: product1,
    },
    {
        id: 6,
        name: "Wooden Learning Blocks",
        category: "Educational Toys",
        price: 799,
        image: product1,
    },
];





function HomePage() {



    const categories = [
        {
            title: "Baby Feeding Accessories",
            image: Cat1img,
        },
        {
            title: "Baby Gears",
            image: Cat2img,
        },
    ];

    const data = [
        {
            image: cerified,
            name: "Globally certified"
        },
        {
            image: makeinindia,
            name: "Make In India"
        },
        {
            image: bpafree,
            name: "BPA-FREE"
        },
        {
            image: premium,
            name: "Premium Quality"
        },
    ]

    const formatName = (name) => {
        const words = name.split(" ");
        const lines = [];

        for (let i = 0; i < words.length; i++) {
            if (i > 0 && words[i].length <= 2) {
                // Join short word with previous line
                lines[lines.length - 1] += ` ${words[i]}`;
            } else {
                lines.push(words[i]);
            }
        }

        return lines;
    };



    return (
        <>

            {/* <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                loop
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                className="overflow-hidden "
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={banner}
                            alt={`Banner ${index + 1}`}
                            className="h-[220px] md:h-[400px] lg:h-[550px] w-full object-cover"
                            priority={index === 0}
                        />
                    </SwiperSlide>
                ))}
            </Swiper> */}
            <div className="bg-[#fff8f8]">
                <section>
                    <Image src={banner1} alt="banner" className="w-full" />
                </section>
                <Section>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {categories.map((item) => (
                            <div
                                key={item.title}
                                className="group relative overflow-hidden"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute bottom-6 left-1/2 w-[90%] -translate-x-1/2 bg-white py-8 text-center">
                                    <h2 className="font-baloo text-primary text-2xl md:text-4xl font-bold">
                                        {item.title}
                                    </h2>

                                    <button className="mt-4 flex w-full flex-col items-center justify-center text-primary">
                                        <span className="font-nunito font-semibold">
                                            Shop Now
                                        </span>

                                        <span className="mt-1 h-[2px] w-8 bg-primary transition-all duration-300 group-hover:w-20"></span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                <FeatureProduct />

                <FeatureBanner />
                <ShopByAge />

                <Section>
                    <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12">
                            <SectionTitle title={"Best Sellers"} subtitle={"Quality Products"} />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {bestProducts?.map((item, index) => {
                            return (
                                <>
                                    <ProductCard product={item} key={index} />
                                </>
                            )
                        })}
                        <div className="col-span-4">
                            <div className="flex justify-center mt-4">
                                <FilledBtn title={"View All"} />
                            </div>
                        </div>

                    </div>
                </Section>

                <ShopNow />
                <Testimonial />

                <Section className="bg-white">
                    <div className="grid grid-cols-4 gap-10">
                        {data.map((item, index) => {
                            return (
                                <>
                                    <div className="text-center">
                                        <div className="flex justify-center">
                                            <Image src={item.image} className="w-40"></Image>
                                        </div>
                                        <h6 className="font-jost font-medium text-2xl text-primary mt-2">
                                            {formatName(item.name).map((line, index) => (
                                                <span key={index} className="block">
                                                    {line}
                                                </span>
                                            ))}
                                        </h6>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </Section>

                <BlogsBox />
            </div>
        </>
    );
}

export default HomePage;