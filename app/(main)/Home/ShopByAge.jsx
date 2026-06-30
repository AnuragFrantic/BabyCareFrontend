"use client";

import { useState } from "react";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";

const ageGroups = [
    { range: "0-6", unit: "Months" },
    { range: "6-12", unit: "Months" },
    { range: "1-2", unit: "Years" },
    { range: "2-4", unit: "Years" },
    { range: "4-6", unit: "Years" },
];

function ShopByAge() {
    const [active, setActive] = useState(null);

    return (
        <Section>
            <SectionTitle
                title="Shop By Age"
                subtitle="Quality Products"
            />

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-8">
                {ageGroups.map((item) => {
                    const isActive = active === item.range;
                    return (
                        <button
                            key={item.range}
                            onClick={() => setActive(isActive ? null : item.range)}
                            className={`flex h-[110px] w-[110px] flex-col items-center justify-center rounded-full border-2 transition-all duration-300
                                ${isActive
                                    ? "border-primary bg-primary"
                                    : "border-primary bg-white hover:bg-primary"
                                }
                                group
                            `}
                        >
                            <span
                                className={`font-nunito text-xl font-bold transition-colors duration-300
                                    ${isActive ? "text-white" : "text-primary group-hover:text-white"}
                                `}
                            >
                                {item.range}
                            </span>
                            <span
                                className={`font-nunito text-sm transition-colors duration-300
                                    ${isActive ? "text-white" : "text-text group-hover:text-white"}
                                `}
                            >
                                {item.unit}
                            </span>
                        </button>
                    );
                })}
            </div>
        </Section>
    );
}

export default ShopByAge;