"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    ShoppingBag,
    Minus,
    Plus,
    Trash2,
    ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { IMAGE_API_URL } from "../service/api";


function getImageUrl(raw) {
    if (!raw) return null;

    const normalized = raw.replace(/\\/g, "/");
    return `${IMAGE_API_URL}${normalized}`;
}

export default function CartSidebar() {
    const isOpen = useCartStore((state) => state.sidebarOpen);
    const closeSidebar = useCartStore((state) => state.closeSidebar);
    const cart = useCartStore((state) => state.cart);
    const summary = useCartStore((state) => state.summary);
    const updateQuantity = useCartStore(
        (state) => state.updateQuantity
    );
    const removeFromCart = useCartStore(
        (state) => state.removeCart
    );

    const overlayRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e) =>
            e.key === "Escape" && closeSidebar();

        window.addEventListener("keydown", onKey);

        return () =>
            window.removeEventListener("keydown", onKey);
    }, [isOpen, closeSidebar]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const subtotal =
        summary?.subtotal ??
        cart.reduce(
            (sum, item) =>
                sum + (item.price ?? 0) * item.quantity,
            0
        );

    const itemCount =
        summary?.item_count ?? cart.length;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        ref={overlayRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={closeSidebar}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 28,
                            stiffness: 280,
                        }}
                        className="fixed right-0 top-0 z-50 h-full w-full max-w-[420px] bg-background flex flex-col shadow-2xl"
                        aria-label="Shopping cart"
                    >
                        <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
                            <div className="flex items-center gap-2.5">
                                <ShoppingBag
                                    size={20}
                                    className="text-primary"
                                />

                                <span className="text-[17px] font-semibold text-foreground">
                                    Your Cart
                                </span>

                                {itemCount > 0 && (
                                    <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </div>

                            <button
                                onClick={closeSidebar}
                                aria-label="Close cart"
                                className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-150"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                            {cart.length === 0 ? (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 12,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: 0.15,
                                    }}
                                    className="flex flex-col items-center justify-center h-full gap-4 pb-16 text-center"
                                >
                                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                        <ShoppingBag
                                            size={32}
                                            className="text-primary opacity-60"
                                        />
                                    </div>

                                    <p className="text-[15px] font-medium text-foreground">
                                        Your cart is empty
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Add items to get started
                                    </p>

                                    <button
                                        onClick={closeSidebar}
                                        className="mt-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-destructive transition-colors duration-200"
                                    >
                                        Continue Shopping
                                    </button>
                                </motion.div>
                            ) : (
                                <AnimatePresence initial={false}>
                                    {cart.map((item) => {
                                        const imageUrl =
                                            getImageUrl(
                                                item.variant
                                                    ?.images?.[0]
                                                    ?.image
                                            );

                                        const title =
                                            item.product?.title;

                                        const subtitle = [
                                            item.variant
                                                ?.color,
                                            item.size,
                                        ]
                                            .filter(Boolean)
                                            .join(" · ");

                                        return (
                                            <motion.div
                                                key={item._id}
                                                layout
                                                initial={{
                                                    opacity: 0,
                                                    y: 10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    x: 40,
                                                    transition:
                                                    {
                                                        duration:
                                                            0.2,
                                                    },
                                                }}
                                                transition={{
                                                    duration:
                                                        0.22,
                                                }}
                                                className="flex gap-3 p-3 rounded-xl border border-border bg-card"
                                            >
                                                <div className="w-[72px] h-[72px] rounded-lg bg-secondary flex-shrink-0 overflow-hidden">
                                                    {imageUrl ? (
                                                        <Image
                                                            src={
                                                                imageUrl
                                                            }
                                                            alt={
                                                                title ||
                                                                "Product image"
                                                            }
                                                            width={
                                                                72
                                                            }
                                                            height={
                                                                72
                                                            }
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-primary/10 rounded-lg" />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                    <div>
                                                        <p className="text-[12px] font-semibold text-foreground leading-snug line-clamp-2">
                                                            {
                                                                title
                                                            }
                                                        </p>

                                                        {subtitle && (
                                                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                                                {
                                                                    subtitle
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center gap-0.5 rounded-full border border-border bg-background px-1 h-7">
                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item._id,
                                                                        item.quantity -
                                                                        1,
                                                                        item.size
                                                                    )
                                                                }
                                                                className="w-6 h-6 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                                                            >
                                                                <Minus
                                                                    size={
                                                                        11
                                                                    }
                                                                />
                                                            </button>

                                                            <span className="w-6 text-center text-[13px] font-semibold text-foreground">
                                                                {
                                                                    item.quantity
                                                                }
                                                            </span>

                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item._id,
                                                                        item.quantity +
                                                                        1,
                                                                        item.size
                                                                    )
                                                                }
                                                                className="w-6 h-6 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                                                            >
                                                                <Plus
                                                                    size={
                                                                        11
                                                                    }
                                                                />
                                                            </button>
                                                        </div>

                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[13px] font-bold text-destructive">
                                                                ₹
                                                                {item.total?.toLocaleString(
                                                                    "en-IN"
                                                                ) ??
                                                                    (
                                                                        item.price *
                                                                        item.quantity
                                                                    ).toLocaleString(
                                                                        "en-IN"
                                                                    )}
                                                            </span>

                                                            <button
                                                                onClick={() =>
                                                                    removeFromCart(
                                                                        item._id
                                                                    )
                                                                }
                                                                aria-label="Remove item"
                                                                className="w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                                                            >
                                                                <Trash2
                                                                    size={
                                                                        12
                                                                    }
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: 0.1,
                                }}
                                className="border-t border-border px-6 py-5 space-y-3 bg-background flex-shrink-0"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-muted-foreground">
                                        Subtotal (
                                        {itemCount}{" "}
                                        {itemCount === 1
                                            ? "item"
                                            : "items"}
                                        )
                                    </span>

                                    <span className="text-[18px] font-bold text-foreground">
                                        ₹
                                        {subtotal.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                </div>

                                <p className="text-[11px] text-muted-foreground">
                                    Shipping & taxes
                                    calculated at
                                    checkout
                                </p>

                                <Link
                                    href="/checkout"
                                    onClick={closeSidebar}
                                    className="group/cta w-full rounded-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-semibold text-[15px] hover:bg-destructive transition-colors duration-300"
                                >
                                    Proceed to Checkout

                                    <ArrowRight
                                        size={16}
                                        className="transition-transform duration-300 group-hover/cta:translate-x-1"
                                    />
                                </Link>

                                <button
                                    onClick={closeSidebar}
                                    className="w-full py-2.5 rounded-full border border-border text-[14px] font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200"
                                >
                                    Continue Shopping
                                </button>
                            </motion.div>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}