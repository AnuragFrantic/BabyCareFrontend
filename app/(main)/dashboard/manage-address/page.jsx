"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Phone, Plus } from "lucide-react";

import AddressModal from "./AddressModal";
import AddressCard from "./AddressCard";


import { ferryWellAPI } from "@/service/api";
import { useApp } from "@/context/AppContext";

function StatCard({ label, value, colorClass }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-[var(--light-primary)] rounded-xl p-5 flex flex-col gap-1"
        >
            <span
                className="text-xs font-medium"
                style={{ color: "var(--text)", fontFamily: "var(--jost)" }}
            >
                {label}
            </span>

            <span
                className={`text-2xl font-bold ${colorClass}`}
                style={{ fontFamily: "var(--baloo)" }}
            >
                {value}
            </span>
        </motion.div>
    );
}

export default function AddressPage() {
    const { setLoading } = useApp();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add New Address");

    const fetchAddress = async () => {
        setLoading(true);

        try {
            const res = await ferryWellAPI.get("/address");

            setAddresses(res?.data?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAddress();
    }, []);

    const handleDelete = async (id) => {
        try {
            await ferryWellAPI.delete(`/address/${id}`);

            setAddresses((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const openAddModal = () => {
        setSelectedAddress(null);
        setModalTitle("Add New Address");
        setModalOpen(true);
    };

    const openEditModal = (address) => {
        setSelectedAddress(address);
        setModalTitle("Edit Address");
        setModalOpen(true);
    };

    const defaultAddress = addresses.find((item) => item.is_default);

    const handleSetDefault = async (id) => {
        try {
            await ferryWellAPI.patch(`/address/default/${id}`);

            fetchAddress();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: "var(--light-primary)", fontFamily: "var(--nunito)" }}
        >
            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* Header */}
                <motion.div
                    className="flex items-center justify-between mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div
                                className="w-16 h-16 rounded-full overflow-hidden border-2"
                                style={{ borderColor: "var(--light-primary)" }}
                            >
                                <img
                                    src="https://i.pravatar.cc/64?img=47"
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div
                                className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-white border flex items-center justify-center"
                                style={{ borderColor: "var(--light-primary)" }}
                            >
                                <Pencil size={10} style={{ color: "var(--primary)" }} />
                            </div>
                        </div>

                        <div>
                            <h1
                                className="text-base font-semibold"
                                style={{ color: "var(--foreground)", fontFamily: "var(--baloo)" }}
                            >
                                Saved Addresses
                            </h1>

                            <p className="text-xs" style={{ color: "var(--text)" }}>
                                Manage your delivery locations
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border"
                        style={{ color: "var(--orange)", borderColor: "var(--orange)" }}
                    >
                        <Plus size={14} />
                        Add New Address
                    </button>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <StatCard
                        label="Saved Addresses"
                        value={addresses.length}
                        colorClass=""
                    // color applied inline below via style override in StatCard's value span
                    />

                    <StatCard
                        label="Default Address"
                        value={defaultAddress ? "1" : "0"}
                        colorClass=""
                    />
                </div>

                {/* Content */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Addresses */}
                    <div className="col-span-2 flex flex-col gap-4">
                        <h2
                            className="text-sm font-semibold"
                            style={{ color: "var(--foreground)", fontFamily: "var(--baloo)" }}
                        >
                            Saved Addresses
                        </h2>

                        <AnimatePresence>
                            {addresses.map((addr, i) => (
                                <motion.div
                                    key={addr._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <AddressCard
                                        addressData={addr}
                                        onDelete={() => handleDelete(addr._id)}
                                        onSetDefault={() => handleSetDefault(addr._id)}
                                        onEdit={() => openEditModal(addr)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar */}
                    <motion.div
                        className="col-span-1 flex flex-col gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div
                            className="rounded-xl p-5 border"
                            style={{
                                backgroundColor: "var(--light-primary)",
                                borderColor: "rgba(206,15,105,0.2)",
                            }}
                        >
                            <h3
                                className="font-semibold mb-3"
                                style={{ color: "var(--primary)", fontFamily: "var(--baloo)" }}
                            >
                                💡 Address Tips
                            </h3>

                            <ul className="text-xs space-y-2" style={{ color: "var(--text)" }}>
                                <li>• Keep your default address updated.</li>
                                <li>• Save multiple addresses for faster checkout.</li>
                                <li>• Edit addresses anytime.</li>
                            </ul>
                        </div>

                        {defaultAddress && (
                            <div
                                className="bg-white rounded-xl p-5 border"
                                style={{ borderColor: "var(--light-primary)" }}
                            >
                                <p
                                    className="text-xs uppercase mb-3"
                                    style={{ color: "var(--text)" }}
                                >
                                    Default Address
                                </p>

                                <p
                                    className="font-semibold"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    {defaultAddress.first_name} {defaultAddress.last_name}
                                </p>

                                <p className="text-xs mt-2" style={{ color: "var(--text)" }}>
                                    {defaultAddress.address_one}
                                </p>

                                <div className="flex items-center gap-2 mt-3">
                                    <Phone size={12} style={{ color: "var(--text)" }} />

                                    <span className="text-xs" style={{ color: "var(--foreground)" }}>
                                        {defaultAddress.mobile}
                                    </span>
                                </div>

                                <span
                                    className="inline-block mt-4 px-3 py-1 text-xs rounded-full"
                                    style={{
                                        backgroundColor: "var(--light-primary)",
                                        color: "var(--primary)",
                                    }}
                                >
                                    ✓ Default
                                </span>
                            </div>
                        )}

                        <button
                            onClick={openAddModal}
                            className="w-full py-3 text-white rounded-xl"
                            style={{ backgroundColor: "var(--primary)" }}
                        >
                            + Add New Address
                        </button>
                    </motion.div>
                </div>
            </div>

            <AddressModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                initialData={selectedAddress}
                fetchAddress={fetchAddress}
            />
        </div>
    );
}