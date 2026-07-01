function OrderSkeleton() {
    return (
        <div
            className="bg-white rounded-2xl overflow-hidden border shadow-sm animate-pulse"
            style={{ borderColor: "var(--light-primary)" }}
        >
            <div className="px-4 py-3 h-14" style={{ backgroundColor: "var(--light-primary)" }} />
            <div className="px-4 py-4 flex flex-col gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div
                            className="w-14 h-14 rounded-lg shrink-0"
                            style={{ backgroundColor: "var(--light-primary)" }}
                        />
                        <div className="flex-1 flex flex-col gap-2">
                            <div
                                className="h-3 rounded w-3/4"
                                style={{ backgroundColor: "var(--light-primary)" }}
                            />
                            <div
                                className="h-3 rounded w-1/2"
                                style={{ backgroundColor: "var(--light-primary)" }}
                            />
                            <div
                                className="h-3 rounded w-1/4"
                                style={{ backgroundColor: "var(--light-primary)" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderSkeleton;