"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RefreshOnBack() {
    const router = useRouter();

    useEffect(() => {
        const handlePopState = () => {
            router.refresh();
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [router]);

    return null;
}