import Image from "next/image";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import banner1 from "@/assets/banner1.png";
import banner2 from "@/assets/banner2.png";
import banner3 from "@/assets/banner3.png";

const blogs = [
    {
        id: 1,
        image: banner1,
        date: "22 , May",
        title: "Why Is Scarf So Important For Baby Health",
        excerpt: "Discover breathable fabrics and gentle care tips that keep baby cozy and protected all day.",
    },
    {
        id: 2,
        image: banner2,
        date: "22 , May",
        title: "10 Best One-Piece Products For Your Lovely Kids",
        excerpt: "From easy dressing to playful comfort, these top picks make every day fun and hassle-free.",
    },
    {
        id: 3,
        image: banner3,
        date: "22 , May",

        title: "Comfortable T-Shirt Is Key Of Happiness For Kids",
        excerpt: "Learn how soft fabrics and smart fits help little ones move freely and feel their best.",
    },
];

function BlogsBox() {


    return (
        <Section>
            <SectionTitle
                title="Latest blogs"
                subtitle="Quality Products"
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="group overflow-hidden   "
                    >
                        <div className="relative   ">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                className="h-[260px] rounded-[24px] w-full object-cover transition duration-500 "
                            />

                            <div className="absolute right-50 -bottom-6  p-1 bg-white rounded-2xl  text-center text-sm font-semibold text-white shadow-lg">
                                <h6 className="  rounded-2xl  bg-primary px-4 py-2 text-center text-sm font-semibold text-white shadow-lg">
                                    {blog.date.split(",").map((part, index) => (
                                        <span key={index} className="block">
                                            {part.trim()}
                                        </span>
                                    ))}
                                </h6>
                            </div>
                        </div>

                        <div className="space-y-4 p-6 text-center">
                            <h3 className="font-baloo text-2xl mt-4 font-bold text-text">
                                {blog.title}
                            </h3>

                        </div>
                    </div>
                ))}
            </div>

        </Section>
    );
}

export default BlogsBox;