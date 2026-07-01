"use client";

import React, { useState } from "react";
import { CreditCard } from "lucide-react";
import toy from "@/assets/product1.png";
import shoes from "@/assets/product1.png";
import cap from "@/assets/product1.png";
import Image from "next/image";
import FilledBtn from "@/components/Filledbtn";
import Loader from "@/components/Loader";

// ── Static Data ──────────────────────────────────────────────────────────

const cartItems = [
    { id: 1, title: "Blocks Sorting Toy", quantity: 1, price: 450, image: toy },
    { id: 2, title: "Blocks Sorting Toy", quantity: 1, price: 450, image: shoes },
    { id: 3, title: "Blocks Sorting Toy", quantity: 1, price: 450, image: cap },
];

const orderTotals = {
    subtotal: 450,
    shipping: 450,
    taxes: 450,
    total: 450,
};

const paymentLogos = ["visa", "mastercard", "amex", "rupay", "gpay", "paypal"];

// ── Small UI helpers ─────────────────────────────────────────────────────

function Input({ placeholder, type = "text", className = "" }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`h-11 w-full font-jost rounded-lg border border-gray-200 bg-[#f5f5f5] px-4 text-sm text-text outline-none placeholder:text-gray-400 focus:border-primary/40 ${className}`}
        />
    );
}

function Select({ placeholder, className = "" }) {
    return (
        <select
            defaultValue=""
            className={`h-11 w-full font-jost  rounded-lg border border-gray-200 bg-[#f5f5f5] px-4 text-sm text-gray-400 outline-none focus:border-primary/40 ${className}`}
        >
            <option value="" disabled>
                {placeholder}
            </option>
        </select>
    );
}

function RadioOption({ label, selected, onSelect, children }) {
    return (
        <div
            onClick={onSelect}
            className={`cursor-pointer rounded-xl  py-1 transition-colors `}
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${selected ? "border-primary" : "border-gray-300"
                            }`}
                    >
                        {selected && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </span>
                    <span className="text-sm font-semibold text-foreground font-jost">{label}</span>
                </div>
                {children}
            </div>
        </div>
    );
}

function SectionCard({ title, subtitle, children }) {
    return (
        <div className="mb-8">
            <h2 className="font-jost text-xl font-semibold text-foreground">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-text font-jost">{subtitle} </p>}
            <div className="mt-4">{children}</div>
        </div>
    );
}

// ── Order Summary (static) ──────────────────────────────────────────────

function OrderSummary() {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex flex-col gap-4 border-b border-[#F2D4D7] pb-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[#fde9ea]">
                            {/* <img src={item.image} alt={item.title} className="h-full w-full object-contain p-1" /> */}
                            <Image src={item.image} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground font-jost">{item.title}</p>
                            <p className="mt-0.5 text-[11px] text-text font-jost">Quantity : {item.quantity}</p>
                        </div>
                        <span className="flex-shrink-0 text-xs font-bold  font-jost text-primary">
                            Rs. {item.price.toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2 border-b border-[#F2D4D7] py-4 text-xs">
                <div className="flex justify-between">
                    <span className="text-foreground font-medium font-jost">Subtotal • {cartItems.length} Items</span>
                    <span className="font-semibold text-primary font-jost">Rs. {orderTotals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-foreground font-medium">Shipping</span>
                    <span className="font-semibold text-primary font-jost">Rs. {orderTotals.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-foreground font-medium">Taxes</span>
                    <span className="font-semibold text-primary font-jost">Rs. {orderTotals.taxes.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4">
                <span className="text-sm font-bold text-foregorund  font-jost">Total</span>
                <span className="text-sm font-bold text-primary font-jost">Rs. {orderTotals.total.toFixed(2)}</span>
            </div>
        </div>
    );
}

// ── Main Checkout Page ───────────────────────────────────────────────────

export default function CheckoutPage() {
    const [shippingOption, setShippingOption] = useState("same");
    const [paymentMethod, setPaymentMethod] = useState("credit");

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto w-full max-w-[1100px] px-4 py-10 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
                    {/* ── LEFT ── */}
                    <div className="border-r pe-10 border-[#DEDEDE]">
                        {/* Contact */}
                        <SectionCard title="Contact">
                            <Input placeholder="Email" type="email" />
                            <label className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300 font-jost" />
                                <span className="text-foreground font-jost text-sm">Email me with news and offers</span>
                            </label>
                        </SectionCard>

                        {/* Delivery */}
                        <SectionCard title="Delivery">
                            <div className="flex flex-col gap-3">
                                <Select placeholder="Select Country" />
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <Input placeholder="First Name" />
                                    <Input placeholder="Last Name" />
                                </div>
                                <Input placeholder="Address" />
                                <Input placeholder="Apartment, Street, etc." />
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    <Input placeholder="City" />
                                    <Select placeholder="State" />
                                    <Input placeholder="PIN Code" />
                                </div>
                                <label className="flex items-center gap-2 text-xs text-gray-500">
                                    <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" />

                                    <span className="text-foreground font-jost text-sm"> Save this information for next time</span>
                                </label>
                            </div>
                        </SectionCard>

                        {/* Shipping Method */}
                        <SectionCard
                            title="Shipping Method"
                            subtitle="Select the address that matches your card or payment method"
                        >
                            <div className="flex flex-col gap-2.5">
                                <RadioOption
                                    label="Same as Billing address"
                                    selected={shippingOption === "same"}
                                    onSelect={() => setShippingOption("same")}
                                />
                                <RadioOption
                                    label="Use a different shipping address"
                                    selected={shippingOption === "different"}
                                    onSelect={() => setShippingOption("different")}
                                />
                            </div>
                        </SectionCard>

                        {/* Payment Method */}
                        {/* <SectionCard title="Payment Method" subtitle="All transactions are secure and encrypted.">
                            <div className="flex flex-col gap-2.5">
                                <div
                                    className={`rounded-xl border px-4 py-3 transition-colors ${paymentMethod === "credit" ? "border-primary bg-primary/5" : "border-gray-200 bg-white"
                                        }`}
                                >
                                    <div
                                        onClick={() => setPaymentMethod("credit")}
                                        className="flex cursor-pointer items-center justify-between gap-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${paymentMethod === "credit" ? "border-primary" : "border-gray-300"
                                                    }`}
                                            >
                                                {paymentMethod === "credit" && (
                                                    <span className="h-2 w-2 rounded-full bg-primary" />
                                                )}
                                            </span>
                                            <span className="text-sm font-semibold text-text">Credit Card</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            {paymentLogos.map((logo) => (
                                                <span
                                                    key={logo}
                                                    className="flex h-5 w-7 items-center justify-center rounded bg-gray-100 text-[8px] font-bold uppercase text-gray-400"
                                                >
                                                    {logo.slice(0, 4)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {paymentMethod === "credit" && (
                                        <div className="mt-4 flex flex-col gap-3">
                                            <Input placeholder="Card Number" />
                                            <Input placeholder="Name on Card" />
                                            <div className="grid grid-cols-2 gap-3">
                                                <Input placeholder="Expiry Date (MM/YY)" />
                                                <Input placeholder="CVV" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <RadioOption label="COD" selected={paymentMethod === "cod"} onSelect={() => setPaymentMethod("cod")}>
                                    <CreditCard size={18} className="text-emerald-500" />
                                </RadioOption>
                            </div>
                        </SectionCard> */}

                        {/* Pay Now */}
                        <FilledBtn title="Pay Now" className="w-full" />
                    </div>

                    {/* ── RIGHT — Order Summary ── */}
                    <div className="lg:sticky lg:top-10">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}