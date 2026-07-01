import { Pencil, Phone, Star, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

function AddressCard({
    addressData,
    onDelete,
    onEdit,
    onSetDefault,
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white border border-border rounded-xl p-5 flex items-center justify-between gap-4 hover:shadow-md transition-shadow duration-200"
        >
            {/* Default Star */}
            <button
                onClick={onSetDefault}
                className="absolute top-3 right-3 cursor-pointer"
            >
                <Star
                    size={20}
                    className={
                        addressData.is_default
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                    }
                />
            </button>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-foreground">
                        {addressData.first_name} {addressData.last_name}
                    </p>

                    {addressData.is_default && (
                        <span className="px-2 py-0.5 text-[10px] font-medium bg-green-100 text-green-700 rounded-full">
                            Default
                        </span>
                    )}
                </div>

                <p className="text-xs text-muted-foreground mb-1">
                    {addressData.address_one}
                </p>

                <p className="text-xs text-muted-foreground mb-2">
                    {addressData.town}, {addressData.state},{" "}
                    {addressData.country}
                </p>

                <div className="flex items-center gap-1.5">
                    <Phone
                        size={11}
                        className="text-muted-foreground shrink-0"
                    />
                    <span className="text-xs text-muted-foreground">
                        {addressData.mobile}
                    </span>
                </div>
            </div>

            <div className="flex gap-2 shrink-0">
                <button
                    onClick={onDelete}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-destructive border border-destructive rounded-lg hover:bg-light-destructive"
                >
                    <Trash2 size={13} />
                    Delete
                </button>

                <button
                    onClick={onEdit}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-primary-foreground bg-primary rounded-lg"
                >
                    <Pencil size={13} />
                    Edit
                </button>
            </div>
        </motion.div>
    );
}

export default AddressCard;