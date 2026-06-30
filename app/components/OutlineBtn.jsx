import { ArrowRight } from "lucide-react";

const sizeStyles = {
    sm: "px-6 py-2 text-xs gap-1.5",
    md: "px-10 py-3.5 text-sm gap-2",
    lg: "px-12 py-4 text-base gap-2.5",
};

const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
};

function OutlineBtn({
    onClick,
    icon = false,
    title = "Shop Now",
    type = "button",
    size = "md",
    disabled = false,
    ariaLabel,
    className = "",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel ?? title}
            className={`
        group
        inline-flex items-center justify-center
        rounded-full
        border border-primary
        bg-transparent
        text-primary
        font-jost
        font-semibold
        transition-all
        duration-300
        hover:bg-primary
        hover:text-white
        hover:-translate-y-1
        hover:shadow-lg
        active:translate-y-0
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${sizeStyles[size]}
        ${className}
      `}
        >
            <span>{title}</span>

            {icon && (
                <ArrowRight
                    size={iconSizes[size]}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                />
            )}
        </button>
    );
}

export default OutlineBtn;