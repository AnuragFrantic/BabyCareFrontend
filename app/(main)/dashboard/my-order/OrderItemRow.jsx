import { IMAGE_API_URL } from "@/service/api";

function OrderItemRow({ item, showActions, orderId }) {
    const image = item.variant?.images?.[0]?.image;

    return (
        <div className="flex items-center gap-3">
            {/* Image */}
            <div
                className="w-14 h-14 rounded-lg border shrink-0 overflow-hidden flex items-center justify-center"
                style={{ borderColor: "var(--light-primary)", backgroundColor: "var(--light-primary)" }}
            >
                {image ? (
                    <img
                        src={`${IMAGE_API_URL}${image.replace(/\\/g, "/")}`}
                        alt={item.product?.title}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="w-full h-full" style={{ backgroundColor: "var(--light-primary)" }} />
                )}
            </div>

            {/* Name + price */}
            <div className="flex-1 min-w-0">
                <p
                    className="text-xs font-semibold leading-tight line-clamp-2"
                    style={{ color: "var(--foreground)" }}
                >
                    {item.product?.title}
                </p>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    {item.variant?.color && (
                        <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                            style={{
                                backgroundColor: "rgba(206,15,105,0.08)",
                                color: "var(--primary)",
                            }}
                        >
                            {item.variant.color}
                        </span>
                    )}
                    {item.size && (
                        <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: "var(--light-primary)", color: "var(--text)" }}
                        >
                            Size: {item.size}
                        </span>
                    )}
                </div>
                <p
                    className="text-xs font-semibold mt-1.5"
                    style={{ color: "var(--orange)" }}
                >
                    ₹ {item.price?.toLocaleString("en-IN")}
                </p>
            </div>

            {/* Quantity */}
            <p
                className="text-xs shrink-0 w-10 text-center"
                style={{ color: "var(--text)" }}
            >
                X {item.quantity}
            </p>

            {/* Actions — only first item */}
            {showActions ? (
                <div className="flex flex-col gap-2 shrink-0 w-28">
                    <button
                        className="py-2 text-xs rounded-full text-white"
                        style={{ backgroundColor: "var(--primary)" }}
                    >
                        Track Order
                    </button>
                    <button
                        className="py-2 text-xs rounded-full border"
                        style={{
                            borderColor: "var(--orange)",
                            color: "var(--orange)",
                            backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--light-primary)")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                        Cancel Item
                    </button>
                </div>
            ) : (
                <div className="w-28 shrink-0" />
            )}
        </div>
    );
}

export default OrderItemRow;