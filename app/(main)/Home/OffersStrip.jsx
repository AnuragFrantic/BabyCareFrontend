import React from 'react'

export default function OffersStrip() {
    return (
        <section className="py-8">
            <div className="mx-auto max-w-[1140px] px-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 p-6 text-white shadow-md">
                        <h4 className="text-lg font-semibold">10% OFF</h4>
                        <p className="mt-2 text-sm">ORDERS OF Rs. 450.00</p>
                    </div>

                    <div className="rounded-lg bg-gradient-to-r from-indigo-400 to-purple-400 p-6 text-white shadow-md">
                        <h4 className="text-lg font-semibold">15% OFF</h4>
                        <p className="mt-2 text-sm">ORDERS OF Rs. 450.00</p>
                    </div>

                    <div className="rounded-lg bg-gradient-to-r from-pink-400 to-amber-400 p-6 text-white shadow-md">
                        <h4 className="text-lg font-semibold">20% OFF</h4>
                        <p className="mt-2 text-sm">ORDERS OF Rs. 450.00</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
