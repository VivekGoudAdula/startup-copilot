import React, { useRef, useEffect } from "react";
import { useFrame, useThree, ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

declare global {
    namespace React {
        namespace JSX {
            interface IntrinsicElements extends ThreeElements { }
        }
    }
}

export const RobotModel: React.FC = () => {
    const group = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const leftArmRef = useRef<THREE.Group>(null);
    const rightArmRef = useRef<THREE.Group>(null);

    const { mouse, size } = useThree();

    // Use internal state for mouse tracking if needed, 
    // but useThree().mouse is better for R3F.
    // However, the prompt asked for direct window listener style too.
    // We'll stick to a hybrid but cleaner approach.

    useFrame((state) => {
        if (!group.current) return;

        // targetX/Y from -1 to 1
        const targetX = mouse.x;
        const targetY = mouse.y;

        // Smooth interpolation for body rotation
        group.current.rotation.y = THREE.MathUtils.lerp(
            group.current.rotation.y,
            targetX * 0.4,
            0.05
        );

        // Head rotation (more sensitive)
        if (headRef.current) {
            headRef.current.rotation.y = THREE.MathUtils.lerp(
                headRef.current.rotation.y,
                targetX * 0.8,
                0.1
            );
            headRef.current.rotation.x = THREE.MathUtils.lerp(
                headRef.current.rotation.x,
                -targetY * 0.4,
                0.1
            );
        }

        // Arm follow Y axis
        if (leftArmRef.current && rightArmRef.current) {
            const armRotation = THREE.MathUtils.lerp(
                leftArmRef.current.rotation.x,
                targetY * 0.3,
                0.08
            );
            leftArmRef.current.rotation.x = armRotation;
            rightArmRef.current.rotation.x = armRotation;
        }

        // Floating effect
        group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;

        // Parallax depth
        group.current.position.x = THREE.MathUtils.lerp(
            group.current.position.x,
            targetX * 0.2,
            0.05
        );
    });

    return (
        <group ref={group}>
            {/* Body */}
            <mesh position={[0, -0.2, 0]}>
                <capsuleGeometry args={[0.7, 1.2, 8, 16]} />
                <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Head Group */}
            <group ref={headRef} position={[0, 1.1, 0]}>
                <mesh>
                    <sphereGeometry args={[0.55, 32, 32]} />
                    <meshStandardMaterial color="#0d0d0d" metalness={1} roughness={0.05} />
                </mesh>

                {/* Glow Eyes */}
                <mesh position={[-0.2, 0.1, 0.45]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial
                        color="#4F9CF9"
                        emissive="#4F9CF9"
                        emissiveIntensity={12}
                        toneMapped={false}
                    />
                </mesh>
                <mesh position={[0.2, 0.1, 0.45]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial
                        color="#4F9CF9"
                        emissive="#4F9CF9"
                        emissiveIntensity={12}
                        toneMapped={false}
                    />
                </mesh>

                {/* Visor Area */}
                <mesh position={[0, 0.08, 0.4]} scale={[1.2, 0.4, 0.2]}>
                    <sphereGeometry args={[0.45, 32, 32]} />
                    <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
                </mesh>
            </group>

            {/* Arms */}
            <group ref={leftArmRef} position={[-1, 0.4, 0]}>
                <mesh>
                    <capsuleGeometry args={[0.22, 0.8, 8, 16]} />
                    <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>
            <group ref={rightArmRef} position={[1, 0.4, 0]}>
                <mesh>
                    <capsuleGeometry args={[0.22, 0.8, 8, 16]} />
                    <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>

            {/* Bottom Glow Plate */}
            <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
                <meshStandardMaterial
                    color="#4F9CF9"
                    emissive="#4F9CF9"
                    emissiveIntensity={4}
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </group>
    );
};
