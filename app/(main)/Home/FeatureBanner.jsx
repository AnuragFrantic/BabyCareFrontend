import { Swiper, SwiperSlide } from "swiper/react";

import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import banner4 from "../../assets/banner4.png";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

function FeatureBanner() {

    const banners = [banner2, banner3, banner4];
    return (
        <>
            <Swiper
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
            </Swiper>
        </>
    )
}

export default FeatureBanner
