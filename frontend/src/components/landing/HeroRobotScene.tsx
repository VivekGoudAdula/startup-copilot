import React, { Suspense } from 'react';
import { Canvas, ThreeElements } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { RobotModel } from './RobotModel';

declare global {
    namespace React {
        namespace JSX {
            interface IntrinsicElements extends ThreeElements { }
        }
    }
}

export const HeroRobotScene: React.FC = () => {
    return (
        <div className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing">
            <Canvas
                shadows
                camera={{ position: [0, 0, 6], fov: 40 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={2}
                        castShadow
                    />
                    <pointLight position={[-10, -10, -10]} color="#4F9CF9" intensity={1} />

                    <Float
                        speed={1.5}
                        rotationIntensity={0.5}
                        floatIntensity={0.5}
                    >
                        <RobotModel />
                    </Float>

                    <Environment preset="city" />

                    <ContactShadows
                        position={[0, -2.5, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={2.5}
                        far={4.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};
