import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useTransition } from '../../context/TransitionContext';

function WavePlane() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { isTransitioning, finishTransition } = useTransition();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uColorA: { value: new THREE.Color('#0ea5e9') }, // Cyan
        uColorB: { value: new THREE.Color('#5841d8') }, // Purple
    }), []);

    useEffect(() => {
        if (isTransitioning) {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.to(uniforms.uProgress, {
                        duration: 1.2,
                        value: 0,
                        ease: "power2.inOut",
                        onComplete: finishTransition
                    });
                }
            });

            // Rise up
            tl.to(uniforms.uProgress, {
                duration: 1.0,
                value: 1,
                ease: "power3.out"
            });
        }
    }, [isTransitioning, uniforms, finishTransition]);

    useFrame((state) => {
        if (!meshRef.current) return;
        uniforms.uTime.value = state.clock.getElapsedTime();
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[30, 20, 64, 64]} />
            <shaderMaterial
                transparent
                uniforms={uniforms}
                vertexShader={`
                    uniform float uTime;
                    uniform float uProgress;
                    varying vec2 vUv;
                    varying float vElevation;

                    void main() {
                        vUv = uv;
                        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                        
                        // Wave logic
                        float elevation = sin(modelPosition.x * 0.5 + uTime * 2.0) * 0.5;
                        elevation += sin(modelPosition.z * 0.3 + uTime * 1.5) * 0.3;
                        
                        // Apply progress (rise from bottom)
                        modelPosition.y += elevation + (uProgress * 15.0) - 7.5;
                        
                        vec4 viewPosition = viewMatrix * modelPosition;
                        vec4 projectionPosition = projectionMatrix * viewPosition;
                        gl_Position = projectionPosition;
                        vElevation = elevation;
                    }
                `}
                fragmentShader={`
                    uniform vec3 uColorA;
                    uniform vec3 uColorB;
                    uniform float uProgress;
                    varying vec2 vUv;
                    varying float vElevation;

                    void main() {
                        float mixStrength = (vElevation + 0.8) * 0.5;
                        vec3 color = mix(uColorA, uColorB, mixStrength);
                        
                        // Fade out at edges and based on progress
                        float alpha = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
                        alpha *= smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
                        alpha *= uProgress * 1.5;

                        gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.9));
                    }
                `}
            />
        </mesh>
    );
}

export default function WaveTransition() {
    const { isTransitioning, transitionType } = useTransition();

    if (!isTransitioning || transitionType !== 'wave') return null;

    return (
        <div className="fixed inset-0 z-100 pointer-events-none">
            <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <WavePlane />
            </Canvas>
        </div>
    );
}
