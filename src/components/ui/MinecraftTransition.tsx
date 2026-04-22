import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useTransition } from '../../context/TransitionContext';

const GRID_SIZE = 20; // 20x20 blocks
const BLOCK_GAP = 0.02;
const TOTAL_BLOCKS = GRID_SIZE * GRID_SIZE;

function Blocks() {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const { isTransitioning, finishTransition } = useTransition();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < TOTAL_BLOCKS; i++) {
            const x = (i % GRID_SIZE) - GRID_SIZE / 2;
            const y = Math.floor(i / GRID_SIZE) - GRID_SIZE / 2;
            temp.push({
                x,
                y,
                z: 0,
                baseX: x,
                baseY: y,
                baseZ: 0,
                scale: 0,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
            });
        }
        return temp;
    }, []);

    useEffect(() => {
        if (isTransitioning) {
            // Reset particles
            particles.forEach((p) => {
                p.x = p.baseX;
                p.y = p.baseY;
                p.z = -5; // Start from distant
                p.scale = 0;
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    // Stay for a bit then fade out
                    gsap.to(particles, {
                        duration: 1.5,
                        z: 10,
                        x: (i) => particles[i].x + (Math.random() - 0.5) * 20,
                        y: (i) => particles[i].y + (Math.random() - 0.5) * 20,
                        rotationX: () => Math.random() * Math.PI * 4,
                        rotationY: () => Math.random() * Math.PI * 4,
                        scale: 0,
                        stagger: { amount: 0.8, from: "center" },
                        ease: "power2.in",
                        onComplete: finishTransition
                    });
                }
            });

            // Materialize
            tl.to(particles, {
                duration: 0.8,
                z: 0,
                scale: 1,
                stagger: { amount: 0.5, from: "center" },
                ease: "back.out(1.7)"
            });
        }
    }, [isTransitioning, particles, finishTransition]);

    useFrame(() => {
        if (!meshRef.current) return;

        particles.forEach((particle, i) => {
            dummy.position.set(particle.x, particle.y, particle.z);
            dummy.rotation.set(particle.rotationX, particle.rotationY, particle.rotationZ);
            dummy.scale.setScalar(particle.scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, TOTAL_BLOCKS]}>
            <boxGeometry args={[0.95, 0.95, 0.95]} />
            <meshStandardMaterial color="#5841d8" metalness={0.5} roughness={0.2} />
        </instancedMesh>
    );
}

export default function MinecraftTransition() {
    const { isTransitioning, transitionType } = useTransition();

    if (!isTransitioning || transitionType !== 'minecraft') return null;

    return (
        <div className="fixed inset-0 z-100 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <Blocks />
            </Canvas>
        </div>
    );
}
