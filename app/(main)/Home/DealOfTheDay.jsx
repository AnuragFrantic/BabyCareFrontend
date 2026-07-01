"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import product from '@/assets/product1.png'
import FilledBtn from '@/components/Filledbtn'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const deals = [
    {
        id: 1,
        name: "Baby Bear Ears Beanie",
        price: 450,
        image: product,
    },
    {
        id: 2,
        name: "Baby Bear Ears Beanie",
        price: 450,
        image: product,
    },
];

export default function DealOfTheDay() {
    return (
        <section className="py-8">
            <div className="mx-auto max-w-[1140px] px-4">
                <h3 className="text-center text-2xl font-bold text-pink-600">Deal Of The Day</h3>

                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={24}
                    slidesPerView={1}
                    navigation={{ clickable: true }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                    }}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    className="mt-6"
                >
                    {deals.map((d) => (
                        <SwiperSlide key={d.id}>
                            <div className="rounded-[18px] border border-pink-100 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                                <div className="flex items-start gap-4">
                                    <div className="relative w-40 flex-shrink-0 overflow-hidden rounded-[14px] bg-[#fff0f0] p-4">
                                        <span className="absolute top-3 left-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold">Hot</span>
                                        <Image src={d.image} alt={d.name} className="h-40 w-full object-contain" />
                                    </div>

                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <h4 className="text-lg font-semibold text-[#111827]">{d.name}</h4>
                                            <p className="mt-2 text-sm text-gray-500">Rs. {d.price}.00</p>

                                            <div className="mt-4 flex items-center gap-3">
                                                <div className="inline-flex items-center gap-2">
                                                    <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-xs font-semibold">12</div>
                                                    <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-xs font-semibold">15</div>
                                                    <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-xs font-semibold">32</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <FilledBtn title={"Add To Cart"} size="sm" />
                                            <div className="text-xs text-gray-400">Ends in</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
