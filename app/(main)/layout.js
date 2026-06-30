// import Header from "../components/Header";
// import Footer from "../components/Footer";


// import "swiper/css";
// import "swiper/css/pagination";

// export default function MainLayout({ children }) {
//     return (
//         <>
//             <Header />

//             <main className="flex-1">
//                 {children}
//             </main>

//             <Footer />
//         </>
//     );
// }


"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";




import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




import "swiper/css";
import "swiper/css/pagination";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";
import { useCartStore } from "../store/useCartStore";
import { AppProvider } from "../context/AppContext";
import RefreshOnBack from "../utils/RefreshOnBack";
import { ModalProvider } from "../context/ModalContext";



export default function MainLayout({
    children,
}) {
    const pathname = usePathname();

    const hideLayout =
        pathname === "/sign-in" ||
        pathname === "/sign-up";

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            useCartStore.getState().fetchCart();
        }
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [pathname]);


    const clearAppCache = async () => {
        if ('caches' in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map(key => caches.delete(key)));
        }

    };

    useEffect(() => {
        clearAppCache()
    }, [])

    return (
        <AppProvider>
            {/* <PageLoader /> */}
            <RefreshOnBack />
            <ModalProvider>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    theme="light"
                />
                {!hideLayout && <Header />}

                <div className={!hideLayout ? "" : ""}>
                    {children}
                </div>

                {!hideLayout && <Footer />}
                <CartSidebar />
            </ModalProvider>
        </AppProvider>
    );
}