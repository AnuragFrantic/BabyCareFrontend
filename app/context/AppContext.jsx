"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import { ferryWellAPI } from "@/service/api";
import Loader from "@/components/Loader";
import { usePathname } from "next/navigation";

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
    const [loading, setLoading] = useState(true);

    const pathname = usePathname();

    const [profile, setProfile] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);

    // Initialize directly from localStorage
    const [token, setTokenState] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("token");
        }
        return null;
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [pathname]);

    const [promocode, setpromocode] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("promo");
        }
        return null;
    });

    const [authChecked, setAuthChecked] = useState(false);

    const generateUniqueId = () => {
        const number = Math.floor(1000 + Math.random() * 9000);

        const dateTime = new Date()
            .toISOString()
            .replace("T", "-")
            .slice(0, 19)
            .replace(/:/g, "");

        const letters = Array.from({ length: 4 }, () =>
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]
        ).join("");

        return `${number}-${dateTime}-${letters}`;
    };

    // ── Token helpers ─────────────────────────────────────────────────────────

    const setToken = useCallback((newToken) => {
        if (newToken) {
            localStorage.setItem("token", newToken);
        } else {
            localStorage.removeItem("token");
        }

        setTokenState(newToken);
    }, []);

    // ── Fetch profile ─────────────────────────────────────────────────────────

    const fetchProfile = useCallback(async () => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            setProfile(null);
            return null;
        }

        setProfileLoading(true);

        try {
            const res = await ferryWellAPI.get("user/my_profile");
            const data = res.data?.data ?? res.data;

            setProfile(data);

            if (data?.jwt_token) {
                setToken(data.jwt_token);
            }

            return data;
        } catch (err) {
            console.error("[AppContext] Failed to fetch profile:", err);

            setToken(null);
            setProfile(null);

            return null;
        } finally {
            setProfileLoading(false);
        }
    }, [setToken]);

    // ── Logout ────────────────────────────────────────────────────────────────

    const logout = useCallback(() => {
        setToken(null);
        setProfile(null);

        localStorage.removeItem("userid");
        localStorage.removeItem("token");
    }, [setToken]);

    // ── Auth Init ─────────────────────────────────────────────────────────────

    useEffect(() => {
        queueMicrotask(() => {
            if (!token) {
                setAuthChecked(true);
                return;
            }

            fetchProfile().finally(() => {
                setAuthChecked(true);
            });
        });
    }, [token, fetchProfile]);

    if (loading) return <Loader />

    return (
        <AppContext.Provider
            value={{
                loading,
                setLoading,
                generateUniqueId,

                profile,
                setProfile,
                profileLoading,

                token,
                setToken,

                promocode,
                setpromocode,

                fetchProfile,
                logout,
                authChecked,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useApp must be used inside AppProvider");
    }

    return context;
}