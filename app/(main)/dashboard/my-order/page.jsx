"use client";

import { useState, useEffect, useCallback } from "react";

import { PackageX } from "lucide-react";
import { ferryWellAPI } from "@/service/api";
import { getTabFromStatus } from "./OrderType";
import TabBar from "./TapBar";
import OrderSkeleton from "./OrderSkeleton";
import OrderCard from "./OrderCard";

export default function MyOrders() {
    const [activeTab, setActiveTab] = useState("Active");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(false);

        try {
            const res = await ferryWellAPI.get("order/list");
            setOrders(res.data?.data ?? []);
        } catch (err) {
            console.error("[MyOrders] fetch error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchOrders();
    }, [fetchOrders]);

    // ── Group by tab ──────────────────────────────────────────────────────────

    const grouped = {
        Active: [],
        Cancelled: [],
        Completed: [],
    };

    orders.forEach((order) => {
        grouped[getTabFromStatus(order.order_status)].push(order);
    });

    const counts = {
        Active: grouped.Active.length,
        Cancelled: grouped.Cancelled.length,
        Completed: grouped.Completed.length,
    };

    const visibleOrders = grouped[activeTab];

    return (
        <div>
            <h2
                className="text-4xl font-bold mb-5 font-jost "
                style={{ color: "var(--foreground)", fontFamily: "var(--baloo)" }}
            >
                Orders
            </h2>
            <TabBar active={activeTab} onChange={setActiveTab} counts={counts} />

            {loading ? (
                <div className="flex flex-col gap-4">
                    <OrderSkeleton />
                    <OrderSkeleton />
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                    <PackageX size={32} style={{ color: "var(--text)" }} />
                    <p className="text-sm" style={{ color: "var(--text)" }}>
                        Failed to load orders.
                    </p>
                    <button
                        onClick={fetchOrders}
                        className="text-sm font-semibold hover:underline"
                        style={{ color: "var(--primary)" }}
                    >
                        Retry
                    </button>
                </div>
            ) : visibleOrders.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {visibleOrders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
                    <PackageX size={32} style={{ color: "var(--text)" }} />
                    <p className="text-sm" style={{ color: "var(--text)" }}>
                        No {activeTab.toLowerCase()} orders found.
                    </p>
                </div>
            )}
        </div>
    );
}