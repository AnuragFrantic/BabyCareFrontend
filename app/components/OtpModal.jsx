// /components/auth/OtpModal.jsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import OtpInput from "@/app/components/common/OtpInput";

import { ferryWellAPI } from "@/service/api";
import { useModal } from "@/app/context/ModalContext";
import { useApp } from "@/app/context/AppContext";

const RESEND_SECONDS = 30;
const PHONE_REGEX = /^[6-9]\d{9}$/; // Indian mobile numbers

export default function OtpModal({
    onVerified,
    title = "Login / Sign Up",
    subtitle = "Enter your mobile number to continue",
}) {
    const { closeModal } = useModal();
    const { loading, setLoading, setToken, fetchProfile } = useApp();

    const [step, setStep] = useState("phone");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [otpError, setOtpError] = useState("");
    const [resendTimer, setResendTimer] = useState(0);

    const timerRef = useRef(null);

    // ── Resend timer ─────────────────────────────────────────────────────────

    useEffect(() => {
        if (resendTimer <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }
        timerRef.current = setInterval(() => {
            setResendTimer((t) => (t <= 1 ? 0 : t - 1));
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [resendTimer]);

    // ── Send OTP ─────────────────────────────────────────────────────────────

    const handleSendOtp = useCallback(
        async (isResend = false) => {
            if (!PHONE_REGEX.test(phone)) {
                setPhoneError("Please enter a valid 10-digit mobile number");
                return;
            }
            setPhoneError("");
            setLoading(true);

            try {
                const res = await ferryWellAPI.post("user/send-otp", {
                    mobile: phone,
                    country_code: "+91",
                });

                toast.success(
                    isResend ? `OTP resent successfully ` : `OTP sent successfully. OTP is ${res.data.data}`
                );
                setStep("otp");
                setOtp("");
                setOtpError("");
                setResendTimer(RESEND_SECONDS);
            } catch (err) {
                const message =
                    err?.response?.data?.message || "Failed to send OTP. Try again.";
                toast.error(message);
            } finally {
                setLoading(false);
            }
        },
        [phone, setLoading]
    );

    // ── Verify OTP ───────────────────────────────────────────────────────────

    const handleVerifyOtp = useCallback(async () => {
        if (otp.length !== 4) {
            setOtpError("Please enter the complete 4-digit OTP");
            return;
        }
        setOtpError("");
        setLoading(true);

        try {
            const res = await ferryWellAPI.post("user/verify-otp", {
                mobile: phone,
                country_code: "+91",
                otp,
            });

            const newToken = res?.data?.data;

            console.log("neww", res.data);
            if (res.data.success == "0") {
                console.log("otp");
                res.data.errors.map((item) => {
                    return toast.error(item.message);
                });
            } else {
                if (newToken) {
                    setToken(newToken);
                    localStorage.setItem("token", newToken);
                }
                await fetchProfile();

                setStep("success");
                toast.success("Phone number verified!");

                setTimeout(() => {
                    onVerified?.({ phone, token: newToken });
                    closeModal();
                }, 1200);
            }
        } catch (err) {
            const message =
                err?.response?.data?.message || "Invalid OTP. Please try again.";
            setOtpError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [phone, otp, onVerified, closeModal, setLoading]);

    // Auto-submit when all 4 digits are filled
    useEffect(() => {
        if (step === "otp" && otp.length === 4 && !loading) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            handleVerifyOtp();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otp]);

    // ── Phone input handler ──────────────────────────────────────────────────

    const handlePhoneChange = (val) => {
        const digits = val.replace(/[^0-9]/g, "").slice(0, 10);
        setPhone(digits);
        if (phoneError) setPhoneError("");
    };

    return (
        <div className="px-6 sm:px-8 pt-10 pb-8">
            <AnimatePresence mode="wait">
                {/* ── STEP: PHONE ─────────────────────────────────────────── */}
                {step === "phone" && (
                    <motion.div
                        key="phone"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex flex-col items-center text-center mb-6">
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                                style={{ backgroundColor: "var(--light-primary)" }}
                            >
                                <Phone size={28} style={{ color: "var(--primary)" }} />
                            </div>
                            <h2
                                className="text-xl sm:text-2xl font-bold"
                                style={{ color: "var(--foreground)", fontFamily: "var(--baloo)" }}
                            >
                                {title}
                            </h2>
                            <p className="text-sm mt-1.5" style={{ color: "var(--text)" }}>
                                {subtitle}
                            </p>
                        </div>

                        <label
                            className="block text-sm font-semibold mb-2"
                            style={{ color: "var(--foreground)" }}
                        >
                            Mobile Number
                        </label>
                        <div
                            className="flex items-center gap-2 border-2 rounded-xl px-4 py-3 transition-colors duration-150"
                            style={
                                phoneError
                                    ? { borderColor: "var(--orange)", backgroundColor: "rgba(227,89,70,0.05)" }
                                    : { borderColor: "var(--light-primary)", backgroundColor: "#FAFAFA" }
                            }
                        >
                            <span
                                className="font-semibold text-sm pr-2 border-r"
                                style={{ color: "var(--text)", borderColor: "#D1D5DB" }}
                            >
                                +91
                            </span>
                            <input
                                type="tel"
                                inputMode="numeric"
                                placeholder="Enter 10-digit number"
                                value={phone}
                                onChange={(e) => handlePhoneChange(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                                className="flex-1 bg-transparent outline-none text-sm sm:text-base font-medium"
                                style={{ color: "var(--foreground)" }}
                                autoFocus
                            />
                        </div>
                        {phoneError && (
                            <p
                                className="text-xs font-medium mt-1.5"
                                style={{ color: "var(--orange)" }}
                            >
                                {phoneError}
                            </p>
                        )}

                        <button
                            onClick={() => handleSendOtp(false)}
                            disabled={loading}
                            className="w-full mt-6 text-white font-semibold text-sm sm:text-base rounded-full py-3.5 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ backgroundColor: "var(--primary)" }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Sending OTP...
                                </>
                            ) : (
                                "Send OTP"
                            )}
                        </button>

                        <p
                            className="text-[11px] sm:text-xs text-center mt-4 leading-relaxed"
                            style={{ color: "var(--text)" }}
                        >
                            By continuing, you agree to our{" "}
                            <span className="font-medium cursor-pointer" style={{ color: "var(--primary)" }}>
                                Terms of Service
                            </span>{" "}
                            &{" "}
                            <span className="font-medium cursor-pointer" style={{ color: "var(--primary)" }}>
                                Privacy Policy
                            </span>
                        </p>
                    </motion.div>
                )}

                {/* ── STEP: OTP ───────────────────────────────────────────── */}
                {step === "otp" && (
                    <motion.div
                        key="otp"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            onClick={() => setStep("phone")}
                            className="flex items-center gap-1 text-sm font-medium mb-4 transition-colors"
                            style={{ color: "var(--text)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
                        >
                            <ArrowLeft size={16} />
                            Change number
                        </button>

                        <div className="flex flex-col items-center text-center mb-6">
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                                style={{ backgroundColor: "var(--light-primary)" }}
                            >
                                <ShieldCheck size={28} style={{ color: "var(--primary)" }} />
                            </div>
                            <h2
                                className="text-xl sm:text-2xl font-bold"
                                style={{ color: "var(--foreground)", fontFamily: "var(--baloo)" }}
                            >
                                Verify OTP
                            </h2>
                            <p className="text-sm mt-1.5" style={{ color: "var(--text)" }}>
                                Enter the 6-digit code sent to{" "}
                                <span className="font-semibold" style={{ color: "var(--foreground)" }}>
                                    +91 {phone}
                                </span>
                            </p>
                        </div>

                        <OtpInput
                            length={4}
                            value={otp}
                            onChange={(val) => {
                                setOtp(val);
                                if (otpError) setOtpError("");
                            }}
                            error={!!otpError}
                            disabled={loading}
                        />
                        {otpError && (
                            <p
                                className="text-xs font-medium mt-3 text-center"
                                style={{ color: "var(--orange)" }}
                            >
                                {otpError}
                            </p>
                        )}

                        <button
                            onClick={handleVerifyOtp}
                            disabled={loading || otp.length !== 4}
                            className="w-full mt-6 text-white font-semibold text-sm sm:text-base rounded-full py-3.5 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ backgroundColor: "var(--primary)" }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify & Continue"
                            )}
                        </button>

                        <div className="text-center mt-5">
                            {resendTimer > 0 ? (
                                <p className="text-sm" style={{ color: "var(--text)" }}>
                                    Resend OTP in{" "}
                                    <span className="font-semibold" style={{ color: "var(--foreground)" }}>
                                        {resendTimer}s
                                    </span>
                                </p>
                            ) : (
                                <button
                                    onClick={() => handleSendOtp(true)}
                                    disabled={loading}
                                    className="text-sm font-semibold hover:underline disabled:opacity-60"
                                    style={{ color: "var(--primary)" }}
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* ── STEP: SUCCESS ───────────────────────────────────────── */}
                {step === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col items-center text-center py-6"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                            style={{ backgroundColor: "var(--light-primary)" }}
                        >
                            <ShieldCheck size={36} style={{ color: "var(--primary)" }} />
                        </motion.div>
                        <h2
                            className="text-xl sm:text-2xl font-bold"
                            style={{ color: "var(--foreground)", fontFamily: "var(--baloo)" }}
                        >
                            Verified Successfully!
                        </h2>
                        <p className="text-sm mt-1.5" style={{ color: "var(--text)" }}>
                            You&apos;re all set. Redirecting...
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}