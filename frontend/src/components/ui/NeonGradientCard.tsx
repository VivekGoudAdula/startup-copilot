import React, { ReactNode } from "react";

interface NeonGradientCardProps {
    children: ReactNode;
    className?: string;
    borderRadius?: string;
}

export const NeonGradientCard = ({ children, className = "", borderRadius = "3xl" }: NeonGradientCardProps) => {
    return (
        <div className={`relative group ${className}`}>
            {/* Neon Glow Layer */}
            <div
                className={`absolute -inset-0.5 bg-gradient-to-r from-accent via-purple-500 to-cyan-400 rounded-${borderRadius} blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
                style={{
                    backgroundSize: "200% 200%",
                    animation: "move-gradient 4s ease-in-out infinite",
                }}
            />

            {/* Border Layer */}
            <div
                className={`relative rounded-${borderRadius} bg-gradient-to-r from-accent via-purple-500 to-cyan-400 p-[1px] transition-all duration-500 h-full`}
                style={{
                    backgroundSize: "200% 200%",
                    animation: "move-gradient 4s ease-in-out infinite",
                }}
            >
                {/* Main Content Container (Glass Card Effect) */}
                <div className={`h-full bg-[#0B0F19] rounded-[calc(var(--radius-${borderRadius})-1px)] overflow-hidden`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
