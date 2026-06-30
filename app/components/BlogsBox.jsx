import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { Star } from "lucide-react";

function BlogsBox() {


    return (
        <Section>
            <SectionTitle
                title="Latest blogs"
                subtitle="Quality Products"
            />

            <div className="grid grid-cols-3 gap-4">

            </div>

        </Section>
    );
}

export default BlogsBox;