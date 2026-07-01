import React from 'react'
import gif from '@/assets/gif.gif'

function Loader() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="relative flex items-center justify-center" role="status" aria-live="polite">
                <div className="absolute h-40 w-40 rounded-full bg-pink-200/40 blur-3xl" />
                <img
                    src={gif.src}
                    alt="Loading"
                    className="relative h-50 w-50 rounded-full border border-white/80 object-contain shadow-[0_0_30px_rgba(244,114,182,0.25)]"
                />
            </div>
        </div>
    )
}

export default Loader
