import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { Star } from "lucide-react";

function Testimonial() {
    const data = [
        {
            rating: 5,
            description:
                "Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
            name: "Sabo Masties",
            designation: "Founder @ Rolex",
        },
        {
            rating: 4,
            description:
                "Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
            name: "John Smith",
            designation: "CEO @ Google",
        },
        {
            rating: 3,
            description:
                "Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
            name: "Alex Brown",
            designation: "Manager @ Microsoft",
        },

        {
            rating: 4,
            description:
                "Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.",
            name: "Alex Brown",
            designation: "Manager @ Microsoft",
        },
    ];

    return (
        <Section>
            <SectionTitle
                title="What Our Client Says"
                subtitle="Testimonials"
            />

            <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={3}
                spaceBetween={30}
                loop
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="overflow-visible !py-6 !pb-12"
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="  bg-white shadow p-10 mt-10 m-10 rounded-md">
                            {/* Rating */}
                            <div className="flex  gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        className={
                                            i < item.rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </div>

                            <p className="text-gray-600 mb-6 font-jost">
                                {item.description}
                            </p>

                            <h5 className="font-semibold text-lg font-jost">
                                {item.name}
                            </h5>

                            <h6 className="text-sm text-gray-500 font-jost ">
                                {item.designation}
                            </h6>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Section>
    );
}

export default Testimonial;