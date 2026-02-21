import React, { useEffect, ReactNode } from "react";

let stylesInjected = false;

const injectGlobalStyles = () => {
    if (stylesInjected) return;
    const style = document.createElement("style");
    style.innerHTML = `
    @keyframes move-gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
    document.head.appendChild(style);
    stylesInjected = true;
};

interface NeonGradientProps {
    children: ReactNode;
    className?: string;
    colors?: string; // e.g. "from-pink-600 via-purple-600 to-blue-500"
    blurSize?: string; // e.g. "blur-2xl"
    padding?: string; // e.g. "p-0.5"
    rounded?: string; // e.g. "rounded-xl"
}

const NeonGradient = ({
    children,
    className = "",
    colors = "from-pink-600 via-purple-600 to-blue-500",
    blurSize = "blur-2xl",
    padding = "p-[1px]",
    rounded = "rounded-[2.5rem]",
}: NeonGradientProps) => {
    useEffect(() => {
        injectGlobalStyles();
    }, []);

    const gradientStyle = {
        backgroundSize: "200% 200%",
        animation: "move-gradient 4s ease-in-out infinite",
    };

    return (
        <div className={`relative group ${className}`}>
            {/* Blurred glow layer */}
            <div
                className={`absolute -inset-2 bg-gradient-to-r ${colors} ${rounded} ${blurSize} opacity-60 group-hover:opacity-90 transition duration-700 group-hover:duration-200`}
                style={gradientStyle}
            />
            {/* Border gradient layer */}
            <div
                className={`relative ${rounded} bg-gradient-to-r ${colors} ${padding} transition-all duration-500`}
                style={gradientStyle}
            >
                {children}
            </div>
        </div>
    );
};

export default NeonGradient;
