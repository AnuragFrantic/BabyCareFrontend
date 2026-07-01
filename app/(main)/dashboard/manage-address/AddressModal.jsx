"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


import { ferryWellAPI } from "@/service/api";
import { useApp } from "@/context/AppContext";
import FilledBtn from "@/components/Filledbtn";
import { FormField } from "@/components/FormFeilds";


function AddressModal({
    open,
    onClose,
    title = "Add New Address",
    initialData = {},
    fetchAddress,
}) {
    const { setLoading } = useApp();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        street: "",
        country: "",
        city: "",
        state: "",
    });

    useEffect(() => {
        if (open) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm({
                firstName: initialData?.first_name || "",
                lastName: initialData?.last_name || "",
                phone: initialData?.mobile || "",
                email: initialData?.email || "",
                street: initialData?.address_one || "",
                country: initialData?.country || "",
                city: initialData?.town || "",
                state: initialData?.state || "",
            });
        }
    }, [initialData, open]);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const payload = {
                first_name: form.firstName,
                last_name: form.lastName,
                mobile: form.phone,
                email: form.email,
                address_one: form.street,
                town: form.city,
                state: form.state,
                country: form.country,
            };

            if (initialData?._id) {
                await ferryWellAPI.put(
                    `/address/${initialData._id}`,
                    payload
                );
            } else {
                await ferryWellAPI.post("/address", payload);
            }

            await fetchAddress();
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
                        initial={{
                            opacity: 0,
                            y: 16,
                            scale: 0.98,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 16,
                            scale: 0.98,
                        }}
                        transition={{
                            duration: 0.22,
                            ease: "easeOut",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="pt-6 pb-2 text-center px-6">
                            <h2 className="text-lg font-semibold text-foreground">
                                {title}
                            </h2>
                        </div>

                        {/* Body */}
                        <div className="px-6 pb-6 pt-4 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    label="First Name"
                                    id="firstName"
                                    placeholder="First Name"
                                    value={form.firstName}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            firstName: e.target.value,
                                        }))
                                    }
                                />

                                <FormField
                                    label="Last Name"
                                    id="lastName"
                                    placeholder="Last Name"
                                    value={form.lastName}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            lastName: e.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    label="Phone Number"
                                    id="phone"
                                    placeholder="Phone Number"
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            phone: e.target.value,
                                        }))
                                    }
                                />

                                <FormField
                                    label="Email Address"
                                    id="email"
                                    placeholder="Email Address"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            email: e.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <FormField
                                label="Street Address"
                                id="street"
                                placeholder="Street Address"
                                value={form.street}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        street: e.target.value,
                                    }))
                                }
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    label="Country"
                                    id="country"
                                    placeholder="Country"
                                    value={form.country}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            country: e.target.value,
                                        }))
                                    }
                                />

                                <FormField
                                    label="Town / City"
                                    id="city"
                                    placeholder="Town / City"
                                    value={form.city}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            city: e.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <FormField
                                label="State"
                                id="state"
                                placeholder="State"
                                value={form.state}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        state: e.target.value,
                                    }))
                                }
                            />

                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 text-sm font-semibold text-foreground bg-transparent border border-border rounded-full cursor-pointer hover:bg-muted transition-colors duration-200"
                                >
                                    Cancel
                                </button>


                                <FilledBtn title={
                                    initialData?._id
                                        ? "Update Address"
                                        : "Save Address"
                                }
                                    onClick={handleSubmit} />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default AddressModal;