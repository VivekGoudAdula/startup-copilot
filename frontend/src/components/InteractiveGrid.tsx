import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate, useTransform } from 'motion/react';

export const InteractiveGrid: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const cellSize = 48; // Standard grid size

    // Snap to grid logic: (Math.floor(val / cellSize) * cellSize) + (cellSize / 2)
    const snappedX = useTransform(mouseX, (x) => Math.floor(x / cellSize) * cellSize + cellSize / 2);
    const snappedY = useTransform(mouseY, (y) => Math.floor(y / cellSize) * cellSize + cellSize / 2);

    // Smooth pursuit for theSnapped cursor
    const springX = useSpring(snappedX, { stiffness: 400, damping: 40 });
    const springY = useSpring(snappedY, { stiffness: 400, damping: 40 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const background = useMotionTemplate`radial-gradient(120px circle at ${springX}px ${springY}px, rgba(99, 102, 241, 0.15), transparent 100%)`;
    const spotlight = useMotionTemplate`radial-gradient(80px circle at ${springX}px ${springY}px, rgba(99, 102, 241, 0.3), transparent 90%)`;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* The Hard Grid Lines */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #6366f1 1px, transparent 1px),
                        linear-gradient(to bottom, #6366f1 1px, transparent 1px)
                    `,
                    backgroundSize: `${cellSize}px ${cellSize}px`
                }}
            />

            {/* The Snapped Spotlight Glow - Lights up the boxes */}
            <motion.div
                className="absolute inset-0"
                style={{ background }}
            />

            {/* The Sharp Center Glow */}
            <motion.div
                className="absolute inset-0"
                style={{ background: spotlight }}
            />

            {/* Subtle trailing ambient layer */}
            <div className="absolute inset-0 bg-[#F8FAFC]/30" />
        </div>
    );
};
