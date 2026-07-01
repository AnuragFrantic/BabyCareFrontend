import React from 'react'
import flower from "@/assets/footer.png"
import footerbg from "@/assets/footerbg.png"

import Section from './Section'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'

function Footer() {

    const columns = [
        {
            title: "Baby Feeding Accessories",
            links: ["Feeding Bottles", "Cups", "Sipper Bottles", "Plates", "Feeding Spoons", "Bottle Sterilizer"],
        },
        {
            title: "Baby Gears",
            links: ["Car Seats", "Strollers", "Carry Cots", "Carriers", "High Chairs"],
        },
        {
            title: "Help",
            links: ["Contact Us", "FAQs", "Track Order", "Store Locator", "Return & Exchange"],
        },
        {
            title: "About Us",
            links: ["Our Story", "Blogs"],
        },
    ]
    return (
        <>
            <div className="  footersection" >
                <Section className='pb-0'>
                    {/* Link columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-10">
                        {columns.map((col) => (
                            <div key={col.title}>
                                <h6 className="font-jost text-lg font-bold  text-foreground mb-4">
                                    {col.title}
                                </h6>
                                <ul className="space-y-2.5">
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="font-jost  font-medium text-md text-foreground/80 hover:text-primary transition-colors"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div>
                            <h6 className="font-jost font-semibold text-sm text-foreground mb-4">
                                Get In Touch
                            </h6>
                            <div className="flex gap-2">
                                {[Mail, Phone].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        aria-label="contact link"
                                        className="w-7 h-7 rounded-full flex items-center justify-center bg-white text-primary hover:opacity-80 transition-opacity"
                                    >
                                        <Icon size={12} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>



                </Section>
                <div className="relative">
                    <div className="w-full ">
                        <div className="absolute left-110 -top-20 text-center max-w-2xl  py-6">
                            <h6 className="font-baloo text-4xl font-bold text-foreground mb-4">
                                Caution Notice
                            </h6>
                            <p className="font-jost text-md leading-relaxed text-foreground mb-3">
                                &quot;Pay Safe, Pay Right Only pay via our official website/app or to your delivery
                                partner (COD). Never pay via WhatsApp, UPI links, or QR codes.&quot;
                            </p>
                            <p className="font-jost text-md leading-relaxed text-foreground">
                                &quot;Fraud Alert We never ask for a second payment. If someone calls
                                requesting money — it&apos;s a fraud. Stay alert!&quot;
                            </p>


                        </div>
                    </div>
                    <Image src={flower} className='w-full mt-20' />
                </div>
            </div>
        </>
    )
}

export default Footer
