import React from "react";
import shop1 from "@/assets/shopnow1.png";
import shop2 from "@/assets/shopnow2.png";
import shop3 from "@/assets/shopnow3.png";
import Image from "next/image";
import FilledBtn from "@/components/Filledbtn";

function ShopNow() {
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">



                <div className="lg:col-span-2 relative">
                    <Image src={shop1} className="w-full" />
                    <div className="absolute top-50 w-70 right-20">
                        <h4 className="text-primary text-3xl font-bold font-baloo">Everything you need for your baby</h4>
                        <p className="text-text font-jost text-sm mt-2">Explore our collection of new and popular baby clothes, designed with both style and comfort in mind.</p>
                        <div className="flex  mt-4">
                            <FilledBtn title={"Show Now"} className="w-40" />
                        </div>
                    </div>
                </div>

                {/* Right Side Images */}
                <div className="flex flex-col gap-4">
                    <Image src={shop2} className="w-full" />
                    <div className="relative">
                        <Image src={shop3} className="w-full" />
                        <div className="flex  mt-4 absolute right-10 bottom-10">
                            <FilledBtn title={"Show Now"} className="" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default ShopNow;