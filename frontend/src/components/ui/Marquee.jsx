import React from 'react';

export default function Marquee({ children }) {
    return (
        <div className="bg-black my-10 opacity-20 overflow-clip whitespace-nowrap relative flex py-4 select-none font-bold mask-[linear-gradient(to_right,transparent_0%,background_10%,background_90%,transparent_100%)] text-zinc-600/90 border-zinc-600/90 border-t border-b">
            <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around uppercase">
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around uppercase">
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
            </div>
        </div>
    );
};