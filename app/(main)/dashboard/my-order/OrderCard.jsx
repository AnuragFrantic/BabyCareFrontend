import OrderItemRow from "./OrderItemRow";
import { formatDate, getTabFromStatus, orderStatusBadge, paymentStatusStyles } from "./OrderType";

function OrderCard({ order }) {
    const totalItems = order.cart_ids.reduce((acc, i) => acc + (i.quantity || 0), 0);

    return (
        <div
            className="bg-white rounded-2xl overflow-hidden border shadow-sm"
            style={{ borderColor: "var(--light-primary)", fontFamily: "var(--nunito)" }}
        >
            {/* Header */}
            <div
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
                style={{ backgroundColor: "var(--light-primary)" }}
            >
                <div>
                    <p
                        className="text-sm font-bold"
                        style={{ color: "var(--foreground)" }}
                    >
                        Order No :{" "}
                        <span className="font-bold">{order.order_id}</span>
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--text)" }}>
                        Order date : {formatDate(order.createdAt)}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${orderStatusBadge(
                            order.order_status
                        )}`}
                    >
                        {order.order_status}
                    </span>
                    <p
                        className="text-xs text-right shrink-0"
                        style={{ color: "var(--text)" }}
                    >
                        Total ({totalItems} Items) :{" "}
                        <span
                            className="font-bold text-sm"
                            style={{ color: "var(--orange)" }}
                        >
                            ₹ {order.total_amount?.toLocaleString("en-IN")}
                        </span>
                    </p>
                </div>
            </div>

            {/* Meta row */}
            <div
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b"
                style={{ borderColor: "var(--light-primary)" }}
            >
                <p className="text-xs" style={{ color: "var(--text)" }}>
                    Payment Method :{" "}
                    <span className="font-medium" style={{ color: "var(--foreground)" }}>
                        {order.payment_method}
                    </span>
                </p>
                <p className="text-xs" style={{ color: "var(--text)" }}>
                    Payment Status :{" "}
                    <span className={`font-semibold ${paymentStatusStyles(order.payment_status)}`}>
                        {order.payment_status}
                    </span>
                </p>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-4 px-4 py-4">
                {order.cart_ids.map((item, idx) => (
                    <OrderItemRow
                        key={item._id}
                        item={item}
                        showActions={idx === 0 && getTabFromStatus(order.order_status) === "Active"}
                        orderId={order._id}
                    />
                ))}
            </div>
        </div>
    );
}

export default OrderCard;