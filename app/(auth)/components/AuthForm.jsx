import Image from "next/image";
import authbg from "@/app/assets/authbg.png";
import logo from "@/app/assets/logo.png";

export default function AuthForm({ type = "login" }) {
    const isSignup = type === "signup";

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafafa]">
            {/* Background */}
            <Image
                src={authbg}
                alt="Background"
                fill
                priority
                className="object-cover pointer-events-none"
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-6">
                <div className="flex flex-col items-center">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={90}
                        height={90}
                        className="mb-3"
                    />

                    <h1 className="font-baloo text-5xl text-primary font-bold">
                        {isSignup ? "Sign Up" : "Log In"}
                    </h1>

                    <p className="mt-2 text-sm text-text">
                        Please login to continue to your account
                    </p>
                </div>

                <form className="mt-8 space-y-5">
                    {isSignup && (
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-primary"
                            />
                        </div>
                    )}

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-full bg-primary py-4 font-semibold text-white transition hover:opacity-90"
                    >
                        {isSignup ? "Sign Up" : "Log In"}
                    </button>

                    <p className="text-center text-sm text-text">
                        {isSignup ? (
                            <>
                                Already have an account?{" "}
                                <span className="text-primary font-semibold cursor-pointer">
                                    Login
                                </span>
                            </>
                        ) : (
                            <>
                                Don&apos;t have an account?{" "}
                                <span className="text-primary font-semibold cursor-pointer">
                                    Sign up
                                </span>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
}