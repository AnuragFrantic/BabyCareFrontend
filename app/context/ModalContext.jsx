// /context/ModalContext.jsx
"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const ModalContext = createContext(undefined);

export function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);

    const [options, setOptions] = useState({
        closeOnOverlayClick: true,
        showCloseButton: true,
        maxWidth: "max-w-md",
    });

    const openModal = useCallback((node, opts = {}) => {
        setContent(node);
        setOptions((prev) => ({
            ...prev,
            ...opts,
        }));
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);

        // Delay clearing content until exit animation finishes
        setTimeout(() => {
            setContent(null);
        }, 200);
    }, []);

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                openModal,
                closeModal,
            }}
        >
            {children}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Overlay */}
                        <motion.div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() =>
                                options.closeOnOverlayClick && closeModal()
                            }
                        />

                        {/* Modal */}
                        <motion.div
                            className={`relative w-full ${options.maxWidth} bg-white rounded-3xl shadow-xl overflow-hidden`}
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeOut",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {options.showCloseButton && (
                                <button
                                    onClick={closeModal}
                                    aria-label="Close"
                                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200"
                                >
                                    <X size={18} />
                                </button>
                            )}

                            {content}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("useModal must be used inside ModalProvider");
    }

    return context;
}