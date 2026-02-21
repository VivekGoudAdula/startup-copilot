import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

interface CopilotCatProps {
    mode: 'login' | 'signup' | 'thinking' | 'happy' | 'concerned';
}

function getPupilOffset(
    cursorX: number, cursorY: number,
    eyeCenterSvgX: number, eyeCenterSvgY: number,
    svgRect: DOMRect | null,
    maxOffset: number
) {
    if (!svgRect) return { x: 0, y: 0 };
    const scaleX = svgRect.width / 260;
    const scaleY = svgRect.height / 260;
    const eyeScreenX = svgRect.left + eyeCenterSvgX * scaleX;
    const eyeScreenY = svgRect.top + eyeCenterSvgY * scaleY;
    const dx = cursorX - eyeScreenX;
    const dy = cursorY - eyeScreenY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return { x: 0, y: 0 };
    const scale = Math.min(dist, 80) / 80;
    return { x: (dx / dist) * maxOffset * scale, y: (dy / dist) * maxOffset * scale };
}

export const CopilotCat: React.FC<CopilotCatProps> = ({ mode }) => {
    const [blink, setBlink] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const svgRef = useRef<SVGSVGElement>(null);
    const [pupilLeft, setPupilLeft] = useState({ x: 0, y: 0 });
    const [pupilRight, setPupilRight] = useState({ x: 0, y: 0 });
    const isHappy = mode === 'happy';
    const isThinking = mode === 'thinking';

    // Blinking
    useEffect(() => {
        if (shouldReduceMotion) return;
        const trigger = () => {
            setBlink(true);
            setTimeout(() => setBlink(false), 130);
            return setTimeout(trigger, Math.random() * 3000 + 2500);
        };
        const t = trigger();
        return () => clearTimeout(t);
    }, [shouldReduceMotion]);

    // Cursor tracking
    useEffect(() => {
        if (shouldReduceMotion) return;
        const onMove = (e: MouseEvent) => {
            const rect = svgRef.current?.getBoundingClientRect() ?? null;
            setPupilLeft(getPupilOffset(e.clientX, e.clientY, 90, 118, rect, 7));
            setPupilRight(getPupilOffset(e.clientX, e.clientY, 155, 118, rect, 7));
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [shouldReduceMotion]);

    const getHeadRotation = () => {
        switch (mode) {
            case 'signup': return -5; case 'login': return 5;
            case 'thinking': return -10; case 'concerned': return 8;
            default: return 0;
        }
    };

    return (
        <div className="relative w-80 h-80 flex items-center justify-center overflow-visible select-none">

            {/* Dreamy layered glow pool under cat */}
            <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-44 h-8 rounded-full"
                style={{ background: 'radial-gradient(ellipse, #c4b5fd 0%, #818cf8 40%, transparent 70%)' }}
                animate={{ opacity: [0.25, 0.55, 0.25], scaleX: [0.9, 1.15, 0.9] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />

            <svg ref={svgRef} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible">
                <defs>
                    {/* Rich deep navy-to-indigo body */}
                    <linearGradient id="bodyGrad" x1="130" y1="30" x2="150" y2="215" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#2E1065" />
                        <stop offset="55%" stopColor="#1E0B52" />
                        <stop offset="100%" stopColor="#0D0728" />
                    </linearGradient>
                    {/* Top gloss on body */}
                    <radialGradient id="bodyGloss" cx="0.4" cy="0.18" r="0.55" gradientUnits="objectBoundingBox">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.30" />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                    </radialGradient>
                    {/* Teal-jade eye iris */}
                    <radialGradient id="irisGrad" cx="0.42" cy="0.38" r="0.65" gradientUnits="objectBoundingBox">
                        <stop offset="0%" stopColor="#6EE7D8" />
                        <stop offset="35%" stopColor="#14B8A6" />
                        <stop offset="70%" stopColor="#0D9488" />
                        <stop offset="100%" stopColor="#134E4A" />
                    </radialGradient>
                    {/* Pupil */}
                    <radialGradient id="pupilGrad" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
                        <stop offset="0%" stopColor="#1E1040" />
                        <stop offset="100%" stopColor="#080414" />
                    </radialGradient>
                    {/* Paw pad */}
                    <linearGradient id="pawGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                        <stop offset="0%" stopColor="#3B1882" />
                        <stop offset="100%" stopColor="#1E0B4A" />
                    </linearGradient>
                    {/* Drop shadow */}
                    <filter id="catShadow" x="-25%" y="-25%" width="150%" height="160%">
                        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1A0B4D" floodOpacity="0.4" />
                    </filter>
                    {/* Eye inner glow */}
                    <filter id="eyeGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* ── Tail – elegant swoosh to the right ── */}
                <motion.path
                    d="M196 185C215 180 238 192 240 174C242 157 224 145 206 158"
                    stroke="#1E0D52" strokeWidth="16" strokeLinecap="round" fill="none"
                    style={{ transformOrigin: '200px 185px' }}
                    animate={{ rotate: mode === 'signup' ? [-12, 12, -12] : [-6, 6, -6] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
                />

                {/* ── Floating animation wrapper ── */}
                <motion.g
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {/* ── Head tilt ── */}
                    <motion.g
                        animate={{ rotate: getHeadRotation() }}
                        transition={{ type: 'spring', stiffness: 70, damping: 16 }}
                        style={{ transformOrigin: '130px 150px' }}
                    >
                        {/* ══ BODY: Perfect round blob ══ */}
                        <circle cx="130" cy="140" r="95" fill="url(#bodyGrad)" filter="url(#catShadow)" />
                        {/* Gloss sheen */}
                        <ellipse cx="102" cy="90" rx="54" ry="44" fill="url(#bodyGloss)" />
                        {/* Subtle rim-light on right side */}
                        <path d="M210 100 Q226 140 210 185" stroke="#6D28D9" strokeWidth="8" strokeLinecap="round" opacity="0.12" fill="none" />

                        {/* ── Ears ── */}
                        {/* Left */}
                        <path d="M66 70L44 20L100 58" fill="#241054" stroke="#241054" strokeWidth="3" strokeLinejoin="round" />
                        <path d="M70 67L52 26L90 55" fill="#F9A8D4" opacity="0.65" />
                        {/* Right */}
                        <path d="M194 70L216 20L160 58" fill="#241054" stroke="#241054" strokeWidth="3" strokeLinejoin="round" />
                        <path d="M190 67L208 26L170 55" fill="#F9A8D4" opacity="0.65" />

                        {/* ══ EYES ══ */}
                        <motion.g
                            animate={{ scaleY: blink ? 0.04 : 1 }}
                            transition={{ duration: 0.09 }}
                            style={{ transformOrigin: '122px 118px' }}
                        >
                            {/* ── Left Eye ── */}
                            <circle cx="90" cy="118" r="36" fill="url(#irisGrad)" filter="url(#eyeGlow)" />
                            {/* Pupil tracks cursor */}
                            <motion.circle
                                r="19" fill="url(#pupilGrad)"
                                animate={{ cx: 90 + pupilLeft.x, cy: 118 + pupilLeft.y }}
                                transition={{ type: 'spring', stiffness: 800, damping: 18 }}
                            />
                            {/* Crescent glint */}
                            <ellipse cx="100" cy="106" rx="9" ry="6" fill="white" opacity="0.92" transform="rotate(-25 100 106)" />
                            {/* Small dot glint */}
                            <circle cx="80" cy="112" r="3.5" fill="white" opacity="0.65" />

                            {/* ── Right Eye ── */}
                            <circle cx="155" cy="118" r="36" fill="url(#irisGrad)" filter="url(#eyeGlow)" />
                            <motion.circle
                                r="19" fill="url(#pupilGrad)"
                                animate={{ cx: 155 + pupilRight.x, cy: 118 + pupilRight.y }}
                                transition={{ type: 'spring', stiffness: 800, damping: 18 }}
                            />
                            <ellipse cx="165" cy="106" rx="9" ry="6" fill="white" opacity="0.92" transform="rotate(-25 165 106)" />
                            <circle cx="145" cy="112" r="3.5" fill="white" opacity="0.65" />
                        </motion.g>

                        {/* ── Nose ── */}
                        <ellipse cx="122" cy="160" rx="7" ry="6" fill="#F9A8D4" />

                        {/* ── Cute upturned mouth ── */}
                        <path d="M109 170 Q116 179 122 173 Q128 179 135 170"
                            stroke="#F9A8D4" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />

                        {/* ── Cheek blushes – bigger & softer ── */}
                        <ellipse cx="66" cy="158" rx="18" ry="10" fill="#F9A8D4" opacity="0.22" />
                        <ellipse cx="178" cy="158" rx="18" ry="10" fill="#F9A8D4" opacity="0.22" />

                        {/* ── Whiskers – animated ── */}
                        <motion.g
                            animate={{ opacity: [0.55, 0.80, 0.55] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <path d="M16 150  L62 155" stroke="#F9A8D4" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M10 163  L60 163" stroke="#F9A8D4" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M16 176  L64 171" stroke="#F9A8D4" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M244 150 L182 155" stroke="#F9A8D4" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M250 163 L184 163" stroke="#F9A8D4" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M244 176 L180 171" stroke="#F9A8D4" strokeWidth="2.2" strokeLinecap="round" />
                        </motion.g>

                        {/* ── Little paws peeking at the bottom ── */}
                        {/* Left paw */}
                        <ellipse cx="94" cy="222" rx="22" ry="14" fill="url(#pawGrad)" />
                        <ellipse cx="80" cy="218" rx="8" ry="6.5" fill="url(#pawGrad)" />
                        <ellipse cx="76" cy="212" rx="5" ry="4.5" fill="#F9A8D4" opacity="0.35" />
                        <ellipse cx="87" cy="211" rx="5" ry="4.5" fill="#F9A8D4" opacity="0.35" />
                        <ellipse cx="98" cy="212" rx="5" ry="4.5" fill="#F9A8D4" opacity="0.35" />
                        {/* Right paw */}
                        <ellipse cx="162" cy="222" rx="22" ry="14" fill="url(#pawGrad)" />
                        <ellipse cx="176" cy="218" rx="8" ry="6.5" fill="url(#pawGrad)" />
                        <ellipse cx="168" cy="211" rx="5" ry="4.5" fill="#F9A8D4" opacity="0.35" />
                        <ellipse cx="179" cy="211" rx="5" ry="4.5" fill="#F9A8D4" opacity="0.35" />
                        <ellipse cx="188" cy="212" rx="5" ry="4.5" fill="#F9A8D4" opacity="0.35" />

                        {/* ── Thinking dots ── */}
                        {isThinking && (
                            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                {[0, 1, 2].map(i => (
                                    <motion.circle key={i} cx={172 + i * 11} cy={55} r={3.5 - i * 0.5} fill="#A78BFA"
                                        animate={{ y: [0, -16, 0], opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.4 }} />
                                ))}
                            </motion.g>
                        )}

                        {/* ── Happy sparkles ── */}
                        {isHappy && (
                            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                {[
                                    { x: 44, y: 50, s: 6, d: 0, color: '#FDE68A' },
                                    { x: 214, y: 58, s: 5, d: 0.45, color: '#FDE68A' },
                                    { x: 188, y: 34, s: 4, d: 0.9, color: '#C4B5FD' },
                                    { x: 56, y: 36, s: 4, d: 0.6, color: '#C4B5FD' },
                                ].map((sp, i) => (
                                    <motion.polygon key={i}
                                        points={`${sp.x},${sp.y - sp.s} ${sp.x + sp.s * 0.4},${sp.y} ${sp.x},${sp.y + sp.s} ${sp.x - sp.s * 0.4},${sp.y}`}
                                        fill={sp.color}
                                        animate={{ scale: [0, 1.2, 0], rotate: [0, 30, 0], opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.8, delay: sp.d }}
                                        style={{ transformOrigin: `${sp.x}px ${sp.y}px` }}
                                    />
                                ))}
                            </motion.g>
                        )}
                    </motion.g>
                </motion.g>

                {/* ── Ambient floating sparkle particles ── */}
                {!shouldReduceMotion && [
                    { cx: 32, cy: 60, r: 2, delay: 0 },
                    { cx: 230, cy: 50, r: 1.5, delay: 1 },
                    { cx: 22, cy: 120, r: 1.8, delay: 2 },
                    { cx: 238, cy: 130, r: 2, delay: 1.5 },
                ].map((p, i) => (
                    <motion.circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#C4B5FD"
                        animate={{ opacity: [0, 0.8, 0], y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3.5, delay: p.delay, ease: 'easeInOut' }} />
                ))}
            </svg>
        </div>
    );
};
