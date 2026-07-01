// components/Breadcrumb.jsx
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Reusable page header + breadcrumb.
 *
 * items: [{ label: "Home", href: "/" }, { label: "Baby Feeding Accessories" }]
 * The last item is treated as the current page (pink, non-link).
 */
export default function Breadcrumb({ title, items = [] }) {
    return (
        <div className="mb-6">
            {title && (
                <h1 className="font-jost text-3xl font-semibold text-foreground sm:text-4xl">
                    {title}
                </h1>
            )}

            <nav className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold sm:text-base">
                {items.map((item, idx) => {
                    const isLast = idx === items.length - 1;
                    return (
                        <React.Fragment key={item.label}>
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="text-foreground font-semibold font-jost transition-colors hover:text-primary"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={`font-jost font-semibold ${isLast ? "text-primary" : "text-text"}`}>
                                    {item.label}
                                </span>
                            )}

                            {!isLast && (
                                <ChevronRight size={14} className="text-black" />
                            )}
                        </React.Fragment>
                    );
                })}
            </nav>

            <div className="mt-5 border-b border-gray-100" />
        </div>
    );
}