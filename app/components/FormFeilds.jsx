"use client";

import { ChevronDown, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

// ─── Shared label + error wrapper ────────────────────────────────────────────

function FieldWrapper({
    label,
    id,
    error,
    className = "",
    children,
}) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label htmlFor={id} className="text-sm font-jost font-medium text-foreground">
                {label}
            </label>
            {children}
            {error && (
                <p className="text-xs text-destructive mt-0.5">
                    {error}
                </p>
            )}
        </div>
    );
}

// ─── Shared input className ───────────────────────────────────────────────────

const inputCls =
    "w-full px-3 py-3 text-xs text-foreground border border-[#DEDEDE] rounded-md placeholder:text-muted-foreground bg-[#F5F5F4] border border-border rounded-[6px] outline-none transition-colors duration-200 focus:border-primary focus:ring-1 focus:ring-primary/30";

// ─── 1. Text / Email Input ───────────────────────────────────────────────────

export function FormField({
    label,
    id,
    placeholder,
    error,
    className = "",
    ...rest
}) {
    return (
        <FieldWrapper
            label={label}
            id={id}
            error={error}
            className={className}
        >
            <input
                id={id}
                placeholder={placeholder}
                className={inputCls}
                {...rest}
            />
        </FieldWrapper>
    );
}

// ─── 2. Select Field ─────────────────────────────────────────────────────────

export function SelectField({
    label,
    id,
    placeholder,
    options = [],
    error,
    className = "",
    ...rest
}) {
    return (
        <FieldWrapper
            label={label}
            id={id}
            error={error}
            className={className}
        >
            <div className="relative">
                <select
                    id={id}
                    defaultValue=""
                    className={`${inputCls} appearance-none pr-8 cursor-pointer`}
                    {...rest}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}

                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
            </div>
        </FieldWrapper>
    );
}

// ─── 3. Image Upload Field ───────────────────────────────────────────────────

export function ImageUploadField({
    label,
    id,
    error,
    className = "",
    onChange,
    ...rest
}) {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [fileName, setFileName] = useState(null);

    function handleChange(e) {
        const file = e.target.files?.[0] || null;

        if (file) {
            setFileName(file.name);
            setPreview(URL.createObjectURL(file));

            if (onChange) {
                onChange(file);
            }
        }
    }

    function handleClear() {
        setPreview(null);
        setFileName(null);

        if (onChange) {
            onChange(null);
        }

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <FieldWrapper
            label={label}
            id={id}
            error={error}
            className={className}
        >
            <div
                onClick={() => inputRef.current?.click()}
                className="w-full border border-dashed border-border rounded-[6px] bg-white transition-colors duration-200 hover:border-primary hover:bg-primary/5 cursor-pointer"
            >
                {preview ? (
                    <div className="flex items-center gap-3 px-3 py-2.5">
                        <img
                            src={preview}
                            alt="preview"
                            className="w-9 h-9 rounded-md object-cover shrink-0 border border-border"
                        />

                        <span className="text-xs text-foreground truncate flex-1">
                            {fileName}
                        </span>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClear();
                            }}
                            className="shrink-0 p-0.5 rounded-full hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                        >
                            <X size={13} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-1 py-4 px-3">
                        <Upload
                            size={16}
                            className="text-muted-foreground"
                        />

                        <span className="text-xs text-muted-foreground">
                            Click to upload image
                        </span>
                    </div>
                )}
            </div>

            <input
                ref={inputRef}
                id={id}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
                {...rest}
            />
        </FieldWrapper>
    );
}