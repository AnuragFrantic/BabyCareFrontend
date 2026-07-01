import React from 'react'
import productImage from '@/assets/product1.png'
import ProductCard from '@/components/ProductCard'
import FilterSidebar from './FilterSidebar'
import Section from '@/components/Section'
import Breadcrumb from '@/components/BreadCrumb'

const products = [
    { name: 'Woolen cap', price: 250, image: productImage },
    { name: 'Back belt shoe', price: 250, image: productImage },
    { name: 'Baby nipple', price: 250, image: productImage },
    { name: 'Woolen cap', price: 250, image: productImage },
    { name: 'Back belt shoe', price: 250, image: productImage },
    { name: 'Baby nipple', price: 250, image: productImage },
    { name: 'Woolen cap', price: 250, image: productImage },
    { name: 'Back belt shoe', price: 250, image: productImage },
    { name: 'Baby nipple', price: 250, image: productImage },
]

export default function Categories({ params }) {
    return (
        <Section>
            <div className="">
                <Breadcrumb
                    title="Baby Feeding Accessories"
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Baby Feeding Accessories" },
                    ]}
                />
            </div>
            <div className="flex w-full gap-10">

                <aside className="hidden w-full max-w-[320px] shrink-0 lg:block">

                    <FilterSidebar />
                </aside>

                <main className="flex-1">


                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product, index) => (
                            <ProductCard key={`${product.name}-${index}`} product={product} />
                        ))}
                    </div>
                </main>
            </div>
        </Section>
    )
}
