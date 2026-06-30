import React from "react";

function Section({ children, className = "" }) {
    return (
        <section className={`section-padding ${className}`}>
            <div className="mx-auto max-w-[1440px] container-padding">
                {children}
            </div>
        </section>
    );
}

export default Section;