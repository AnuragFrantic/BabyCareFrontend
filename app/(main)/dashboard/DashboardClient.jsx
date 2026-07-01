"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";





import {
    User,
    ShoppingBag,
    Heart,
    MapPin,
    Bell,
    Settings as SettingsIcon,
    LogOutIcon,
} from "lucide-react";

import Profile from "./profile/page";
import MyOrder from "./my-order/page";
import MyWishlist from "./my-wishlist/page";
import ManageAddress from "./manage-address/page";


import Section from "@/components/Section";
import { useApp } from "@/context/AppContext";

// import Orders from "./orders/page";
// import Wishlist from "./wishlist/page";
// import ManageAddresses from "./manage-addresses/page";
// import PaymentMethods from "./payment-methods/page";
// import Notifications from "./notifications/page";
// import SettingsPage from "./settings/page";

// ─────────────────────────────────────────────────────────────

function NavItem({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            className={`flex items-center gap-3 px-4 py-3 font-jost text-sm font-medium transition-all duration-200 cursor-pointer ${active ? "w-fit border-b-2 border-primary" : "w-full"
                }`}

            onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = "var(--light-primary)";
            }}
            onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = "transparent";
            }}
        >
            {/* <span style={{ color: active ? "#fff" : "var(--text)" }}>{icon}</span> */}

            {label}
        </button>
    );
}

// ─────────────────────────────────────────────────────────────

const SIDEBAR_ITEMS = [
    {
        key: "profile",
        label: "Account Information",
        icon: <User size={16} />,
    },
    {
        key: "orders",
        label: "My Orders",
        icon: <ShoppingBag size={16} />,
    },
    {
        key: "wishlist",
        label: "My Wishlists",
        icon: <Heart size={16} />,
    },
    {
        key: "manage-addresses",
        label: "Manage Addresses",
        icon: <MapPin size={16} />,
    },

    {
        key: "Logout",
        label: "Logout",
        icon: <LogOutIcon size={16} />,
    },
];

// ─────────────────────────────────────────────────────────────

export default function DashboardClient() {
    const router = useRouter();

    const searchParams = useSearchParams();

    const { profile } = useApp();

    // valid tabs
    const validTabs = SIDEBAR_ITEMS.map((item) => item.key);

    // active tab from url
    const activeTab = useMemo(() => {
        const tab = searchParams.get("tab");

        return validTabs.includes(tab || "") ? tab : "profile";
    }, [searchParams]);

    // update url
    const handleTabChange = (tab) => {
        if (tab === "Logout") {
            localStorage.clear();
            sessionStorage.clear();

            // eslint-disable-next-line react-hooks/immutability
            window.location.href = "/";

            return;
        }

        const params = new URLSearchParams(searchParams.toString());

        params.set("tab", tab);

        router.replace(`?${params.toString()}`, {
            scroll: false,
        });
    };

    return (
        <div className="min-h-screen py-8 px-4">
            {/* Page Title */}


            <Section>
                <div className="mx-auto flex flex-col lg:flex-row gap-5">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <div className=" rounded-2xl  overflow-hidden">
                            {/* User Info */}
                            <div className="flex items-center gap-3 mb-5 p-4">


                                <div>


                                    <p
                                        className="text-xl font-medium font-jost leading-tight"
                                        style={{ color: "var(--foreground)" }}
                                    >
                                        Hello  {profile?.first_name ?? "User"}
                                    </p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="flex flex-col gap-1 pb-2">
                                {SIDEBAR_ITEMS.map((item) => (
                                    <NavItem
                                        key={item.key}
                                        icon={item.icon}
                                        label={item.label}
                                        active={activeTab === item.key}
                                        onClick={() => handleTabChange(item.key)}
                                    />
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-h-[500px] transition-all duration-300">
                        {activeTab === "profile" && <Profile />}

                        {activeTab === "orders" && <MyOrder />}

                        {activeTab === "wishlist" && <MyWishlist />}

                        {activeTab === "manage-addresses" && <ManageAddress />}
                    </main>
                </div>
            </Section>
        </div>
    );
}