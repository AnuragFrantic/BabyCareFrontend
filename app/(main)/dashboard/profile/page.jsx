"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";


import { FormField, SelectField } from "@/components/FormFeilds";
import { ferryWellAPI } from "@/service/api";
import { useApp } from "@/context/AppContext";


const GENDER_OPTIONS = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
];

// ── Component ────────────────────────────────────────────────────────────────────

function Profile() {
    const { profile, fetchProfile, profileLoading } = useApp();

    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    // ── Profile form state ────────────────────────────────────────────────────

    const [profileForm, setProfileForm] = useState({
        fullName: "",
        email: "",
        gender: "",
    });
    const [profileErrors, setProfileErrors] = useState({});

    // ── Password form state ───────────────────────────────────────────────────

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordErrors, setPasswordErrors] = useState({});

    // ── Sync form with profile from context ──────────────────────────────────

    useEffect(() => {
        if (profile) {
            const fullName = [profile.first_name, profile.last_name]
                .filter(Boolean)
                .join(" ");

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProfileForm({
                fullName: fullName || "",
                email: profile.email ?? "",
                gender: profile.gender ?? "",
            });
        }
    }, [profile]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileForm((prev) => ({ ...prev, [name]: value }));
        setProfileErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({ ...prev, [name]: value }));
        setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // ── Validation ────────────────────────────────────────────────────────────

    const validateProfile = () => {
        const errors = {};

        if (!profileForm.fullName.trim()) errors.fullName = "Full name is required";

        if (!profileForm.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(profileForm.email)) {
            errors.email = "Enter a valid email";
        }

        if (!profileForm.gender) errors.gender = "Please select a gender";

        setProfileErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validatePassword = () => {
        const errors = {};

        if (!passwordForm.currentPassword) errors.currentPassword = "Current password is required";

        if (!passwordForm.newPassword) {
            errors.newPassword = "New password is required";
        } else if (passwordForm.newPassword.length < 6) {
            errors.newPassword = "Password must be at least 6 characters";
        }

        if (!passwordForm.confirmPassword) {
            errors.confirmPassword = "Please confirm your new password";
        } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setPasswordErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // ── Submit: profile ───────────────────────────────────────────────────────

    const onProfileSubmit = async (e) => {
        e.preventDefault();
        if (!validateProfile()) return;

        setSaving(true);

        try {
            const [firstName, ...rest] = profileForm.fullName.trim().split(" ");
            const lastName = rest.join(" ");

            const formData = new FormData();
            formData.append("first_name", firstName || "");
            formData.append("last_name", lastName || "");
            formData.append("email", profileForm.email);
            formData.append("gender", profileForm.gender);

            const res = await ferryWellAPI.put("user/update", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data?.success) {
                toast.success(res.data?.message || "Profile updated successfully");
                await fetchProfile();
            } else {
                toast.error(res.data?.message || "Failed to update profile");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    // ── Submit: change password ──────────────────────────────────────────────

    const onPasswordSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword()) return;

        setChangingPassword(true);

        try {
            const res = await ferryWellAPI.put("user/change-password", {
                current_password: passwordForm.currentPassword,
                new_password: passwordForm.newPassword,
            });

            if (res.data?.success) {
                toast.success(res.data?.message || "Password changed successfully");
                setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } else {
                toast.error(res.data?.message || "Failed to change password");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to change password");
        } finally {
            setChangingPassword(false);
        }
    };

    if (profileLoading && !profile) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="animate-spin" size={28} style={{ color: "var(--primary)" }} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-10">
            {/* ── Profile ─────────────────────────────────────────────────────── */}
            <form onSubmit={onProfileSubmit}>
                <h2
                    className="text-4xl font-bold mb-5 font-jost "
                    style={{ color: "var(--foreground)", fontFamily: "var(--baloo)" }}
                >
                    Profile
                </h2>

                <div className="flex flex-col gap-4">
                    <FormField
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        placeholder="Full Name"
                        value={profileForm.fullName}
                        onChange={handleProfileChange}
                        error={profileErrors.fullName}
                    />

                    <FormField
                        id="email"
                        name="email"
                        label="Email Address"
                        placeholder="Email Address"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        error={profileErrors.email}
                    />

                    <SelectField
                        id="gender"
                        name="gender"
                        label="Gender"
                        placeholder="Select Gender"
                        options={GENDER_OPTIONS}
                        value={profileForm.gender}
                        onChange={handleProfileChange}
                        error={profileErrors.gender}
                    />

                    <div className="mt-1">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 text-xs font-jost font-semibold text-white rounded-full disabled:opacity-60"
                            style={{ backgroundColor: "var(--primary)" }}
                        >
                            {saving ? "Updating…" : "Update Profile"}
                        </button>
                    </div>
                </div>
            </form>

            {/* ── Change Password ────────────────────────────────────────────── */}
            <form onSubmit={onPasswordSubmit}>
                <h2
                    className="text-4xl font-bold mb-5 font-jost"
                    style={{ color: "var(--foreground)", fontFamily: "var(--baloo)" }}
                >
                    Change Password
                </h2>

                <div className="flex flex-col gap-4">
                    <FormField
                        id="currentPassword"
                        name="currentPassword"
                        label="Current Password"
                        placeholder="Current Password"
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        error={passwordErrors.currentPassword}
                    />

                    <FormField
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        placeholder="New Password"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        error={passwordErrors.newPassword}
                    />

                    <FormField
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm New Password"
                        placeholder="Confirm New Password"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        error={passwordErrors.confirmPassword}
                    />

                    <div className="mt-1">
                        <button
                            type="submit"
                            disabled={changingPassword}
                            className="px-6 py-2.5 text-xs font-jost font-semibold text-white rounded-full disabled:opacity-60"
                            style={{ backgroundColor: "var(--primary)" }}
                        >
                            {changingPassword ? "Changing…" : "Change Password"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Profile;