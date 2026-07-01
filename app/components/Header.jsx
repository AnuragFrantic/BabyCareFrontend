"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Search,
    ShoppingCart,
    Heart,
    User,
    ChevronDown,
    Mic,
} from "lucide-react";

import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

import logo from "../assets/logo.png";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

export default function Header() {
    const [search, setSearch] = useState("");
    const router = useRouter()
    const [showCategories, setShowCategories] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { transcript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const startListening = () => {
        SpeechRecognition.startListening({
            continuous: false,
            language: "en-US",
        });
    };

    const handleAddToCart = () => {
        useCartStore.getState().openSidebar();
    }

    return (
        <header className="border-b border-gray-100 bg-white">
            <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-4 lg:px-8">
                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <Image
                        src={logo}
                        alt="Buchiki Logo"
                        className="h-20 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center gap-10">
                    {/* Categories Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setShowCategories(true)}
                        onMouseLeave={() => setShowCategories(false)}
                    >
                        <button className="flex  items-center gap-1 font-nunito text-[16px] font-semibold text-foreground transition-colors hover:text-primary">
                            All Categories
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${showCategories ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {showCategories && (
                            <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                                <Link
                                    href="/categories/baby-toys"
                                    className="block  rounded-lg px-4 py-3 font-nunito text-foreground hover:bg-pink-50 hover:text-primary"
                                >
                                    Baby Feeding Accessories
                                </Link>

                                <Link
                                    href="/categories/educational"
                                    className="block rounded-lg px-4 py-3 font-nunito text-foreground hover:bg-pink-50 hover:text-primary"
                                >
                                    Baby Gears
                                </Link>


                            </div>
                        )}
                    </div>

                    <Link
                        href="/categories/shop-by-age"
                        className="font-nunito text-[16px] font-semibold text-foreground transition-colors hover:text-primary"
                    >
                        Shop By Age
                    </Link>

                    <Link
                        href="/new-arrival"
                        className="font-nunito text-[16px] font-semibold text-foreground transition-colors hover:text-primary"
                    >
                        New Arrivals
                    </Link>
                </nav>

                {/* Search */}
                <div className="hidden md:flex items-center">
                    <div className="flex h-12 w-[340px] items-center rounded-full border border-primary px-4">
                        <input
                            type="text"
                            value={transcript || search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="flex-1 bg-transparent font-nunito text-sm text-foreground outline-none placeholder:text-text"
                        />

                        {mounted && browserSupportsSpeechRecognition && (
                            <button
                                onClick={startListening}
                                className="mr-3 text-primary transition-transform hover:scale-110"
                            >
                                <Mic size={18} />
                            </button>
                        )}

                        <button className="text-foreground transition-colors hover:text-primary">
                            <Search size={18} className="text-primary" />
                        </button>
                    </div>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-5 text-foreground">
                    <button className="transition-colors hover:text-primary">
                        <ShoppingCart size={22} onClick={() => handleAddToCart()} />
                    </button>

                    <button className="transition-colors hover:text-primary">
                        <Heart size={22} onClick={() => router.push('/dashboard?tab=wishlist')} />
                    </button>

                    <button className="transition-colors hover:text-primary">
                        <User size={22} onClick={() => router.push('/dashboard')} />
                    </button>
                </div>
            </div>
        </header>
    );
}