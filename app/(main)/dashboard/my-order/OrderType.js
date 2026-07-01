export const TABS = ["In Progress", "Completed", "Cancelled"];

// ─── Status helpers ───────────────────────────────────────────────────────────

export function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

export function paymentStatusStyles(status) {
    switch (status?.toUpperCase()) {
        case "PAID":
            return "text-green-600";
        case "FAILED":
            return "text-[var(--orange)]";
        default:
            return "text-amber-600";
    }
}

export function orderStatusBadge(status) {
    const styles = {
        PENDING: "bg-amber-50 text-amber-700 border-amber-200",
        CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
        SHIPPED: "bg-indigo-50 text-indigo-700 border-indigo-200",
        DELIVERED: "bg-green-50 text-green-700 border-green-200",
        CANCELLED: "bg-red-50 text-red-700 border-red-200",
        REFUNDED: "bg-red-50 text-red-700 border-red-200",
    };

    return (
        styles[status?.toUpperCase()] ||
        "bg-gray-50 text-gray-700 border-gray-200"
    );
}

export function getTabFromStatus(status) {
    const s = status?.toUpperCase();

    switch (s) {
        case "DELIVERED":
            return "Completed";

        case "CANCELLED":
        case "REFUNDED":
            return "Cancelled";

        case "PENDING":
        case "CONFIRMED":
        case "SHIPPED":
        default:
            return "In Progress";
    }
}