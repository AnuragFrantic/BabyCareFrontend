import React from "react";

function SectionTitle({
    title,
    subtitle,
    className = "",
}) {
    return (
        <div className={`text-center ${className}`}>
            <h2 className="font-baloo text-primary text-4xl md:text-5xl lg:text-6xl font-bold">
                {title}
            </h2>

            {subtitle && (
                <div className="mt-4 flex items-center justify-center gap-4">
                    <span className="h-[2px] w-10 bg-[#B5A7A7]"></span>

                    <p className="font-nunito text-lg md:text-2xl text-text">
                        {subtitle}
                    </p>

                    <span className="h-[2px] w-10 bg-[#B5A7A7]"></span>
                </div>
            )}
        </div>
    );
}

export default SectionTitle;