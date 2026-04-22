import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';

/* ──────────────────────────────────────────────
   Video list from public/videos
   ────────────────────────────────────────────── */
const VIDEOS = [
    { name: 'LAZONE', src: '/videos/LAZONE.mp4' },
    { name: 'LM VOX SPOT', src: '/videos/LM VOX SPOT.mp4' },
    { name: 'LMVox Agency', src: '/videos/LMVox Agency.mp4' },
    { name: 'LMvox', src: '/videos/LMvox.mp4' },
    { name: 'NovaHair', src: '/videos/NovaHair.mp4' },
    { name: 'PALMHAIR', src: '/videos/PALMHAIR.mp4' },
    { name: 'Scentless', src: '/videos/Scentless.mp4' },
];

/** Returns true if aspect ratio is portrait (phone-like) */
function isPortraitRatio(ratio: number): boolean {
    return ratio < 1;
}

/* ──────────────────────────────────────────────
   TV Button (cylinder with hover glow)
   ────────────────────────────────────────────── */
function TVButton({
    position,
    color = '#444',
    hoverColor = '#a855f7',
    onClick,
}: {
    position: [number, number, number];
    color?: string;
    hoverColor?: string;
    onClick?: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    const { gl } = useThree();

    return (
        <group position={position}>
            <mesh
                rotation={[Math.PI / 2, 0, 0]}
                onPointerOver={() => { setHovered(true); gl.domElement.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHovered(false); gl.domElement.style.cursor = 'auto'; }}
                onClick={(e) => { e.stopPropagation(); onClick?.(); }}
            >
                <cylinderGeometry args={[0.12, 0.12, 0.08, 32]} />
                <meshStandardMaterial
                    color={hovered ? hoverColor : color}
                    emissive={hovered ? hoverColor : '#000'}
                    emissiveIntensity={hovered ? 0.6 : 0}
                    metalness={0.6}
                    roughness={0.3}
                />
            </mesh>
        </group>
    );
}

/* Icons */
function PlayIcon({ position }: { position: [number, number, number] }) {
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(-0.04, -0.05);
        s.lineTo(-0.04, 0.05);
        s.lineTo(0.06, 0);
        s.closePath();
        return s;
    }, []);
    return (
        <mesh position={position}>
            <shapeGeometry args={[shape]} />
            <meshBasicMaterial color="#e2e8f0" />
        </mesh>
    );
}

function PauseIcon({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh position={[-0.025, 0, 0]}>
                <planeGeometry args={[0.03, 0.08]} />
                <meshBasicMaterial color="#e2e8f0" />
            </mesh>
            <mesh position={[0.025, 0, 0]}>
                <planeGeometry args={[0.03, 0.08]} />
                <meshBasicMaterial color="#e2e8f0" />
            </mesh>
        </group>
    );
}

function ArrowIcon({ position, flip = false }: { position: [number, number, number]; flip?: boolean }) {
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(-0.04, -0.04);
        s.lineTo(-0.04, 0.04);
        s.lineTo(0.04, 0);
        s.closePath();
        return s;
    }, []);
    return (
        <mesh position={position} rotation={[0, 0, flip ? Math.PI : 0]}>
            <shapeGeometry args={[shape]} />
            <meshBasicMaterial color="#e2e8f0" />
        </mesh>
    );
}

/* Scanlines */
function Scanlines({ position, size }: { position: [number, number, number]; size: [number, number] }) {
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 4;
        canvas.height = 200;
        const ctx = canvas.getContext('2d')!;
        for (let y = 0; y < 200; y++) {
            ctx.fillStyle = y % 3 === 0 ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0)';
            ctx.fillRect(0, y, 4, 1);
        }
        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1, 8);
        return tex;
    }, []);

    return (
        <mesh position={position}>
            <planeGeometry args={size} />
            <meshBasicMaterial map={texture} transparent opacity={0.35} depthWrite={false} />
        </mesh>
    );
}

/* ──────────────────────────────────────────────
   Phone 3D Model (for portrait videos)
   ────────────────────────────────────────────── */
function PhoneModel({
    scrollProgress,
    videoTexture,
    isPlaying,
    onPrev,
    onNext,
    onPlayPause,
    screenW,
    screenH,
}: {
    scrollProgress: number;
    videoTexture: THREE.VideoTexture | null;
    isPlaying: boolean;
    onPrev: () => void;
    onNext: () => void;
    onPlayPause: () => void;
    screenW: number;
    screenH: number;
}) {
    const groupRef = useRef<THREE.Group>(null!);

    const bodyW = screenW + 0.3;
    const bodyH = screenH + 0.6;
    const bodyD = 0.2;

    useFrame(() => {
        if (!groupRef.current) return;
        let targetRotY: number;
        if (scrollProgress <= 0.25) {
            targetRotY = Math.PI * (1 - scrollProgress / 0.25);
        } else if (scrollProgress <= 0.75) {
            targetRotY = 0;
        } else {
            targetRotY = -Math.PI * ((scrollProgress - 0.75) / 0.25);
        }
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.12);
        if (videoTexture) videoTexture.needsUpdate = true;
    });

    return (
        <group ref={groupRef} rotation={[0, Math.PI, 0]}>
            {/* Phone body — sleek rounded rectangle */}
            <RoundedBox args={[bodyW, bodyH, bodyD]} radius={0.15} smoothness={4}>
                <meshStandardMaterial color="#1a1a1e" metalness={0.7} roughness={0.3} />
            </RoundedBox>

            {/* Screen bezel */}
            <RoundedBox args={[screenW + 0.1, screenH + 0.1, 0.02]} radius={0.08} smoothness={4} position={[0, 0.1, bodyD / 2 + 0.005]}>
                <meshStandardMaterial color="#0d0d0f" metalness={0.3} roughness={0.5} />
            </RoundedBox>

            {/* Screen — video */}
            <mesh position={[0, 0.1, bodyD / 2 + 0.02]}>
                <planeGeometry args={[screenW, screenH]} />
                {videoTexture ? (
                    <meshBasicMaterial map={videoTexture} toneMapped={false} />
                ) : (

                    <meshStandardMaterial color="#0a0a14" emissive="#1a0a3e" emissiveIntensity={0.3} />
                )}
            </mesh>

            {/* Scanlines on screen */}
            <Scanlines position={[0, 0.1, bodyD / 2 + 0.025]} size={[screenW, screenH]} />

            {/* Camera notch */}
            <mesh position={[0, bodyH / 2 - 0.15, bodyD / 2 + 0.01]}>
                <circleGeometry args={[0.04, 32]} />
                <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, bodyH / 2 - 0.15, bodyD / 2 + 0.015]}>
                <circleGeometry args={[0.02, 32]} />
                <meshStandardMaterial color="#1a1a3e" emissive="#2a1a5e" emissiveIntensity={0.3} />
            </mesh>

            {/* Side buttons — volume */}
            <mesh position={[-bodyW / 2 - 0.02, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.02, 0.2, 8, 16]} />
                <meshStandardMaterial color="#2a2a2e" metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh position={[-bodyW / 2 - 0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.02, 0.2, 8, 16]} />
                <meshStandardMaterial color="#2a2a2e" metalness={0.6} roughness={0.3} />
            </mesh>

            {/* Power button — right side */}
            <mesh position={[bodyW / 2 + 0.02, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.02, 0.3, 8, 16]} />
                <meshStandardMaterial color="#2a2a2e" metalness={0.6} roughness={0.3} />
            </mesh>

            {/* Bottom bar — control buttons */}
            <RoundedBox args={[bodyW * 0.7, 0.2, 0.04]} radius={0.04} smoothness={2} position={[0, -bodyH / 2 + 0.2, bodyD / 2 + 0.01]}>
                <meshStandardMaterial color="#1f1f24" metalness={0.3} roughness={0.6} />
            </RoundedBox>

            {/* Prev button */}
            <TVButton position={[-0.35, -bodyH / 2 + 0.2, bodyD / 2 + 0.05]} color="#333" hoverColor="#8b5cf6" onClick={onPrev} />
            <ArrowIcon position={[-0.35, -bodyH / 2 + 0.2, bodyD / 2 + 0.09]} flip />

            {/* Play/Pause button */}
            <TVButton position={[0, -bodyH / 2 + 0.2, bodyD / 2 + 0.05]} color="#333" hoverColor="#22c55e" onClick={onPlayPause} />
            {isPlaying ? (
                <PauseIcon position={[0, -bodyH / 2 + 0.2, bodyD / 2 + 0.09]} />
            ) : (
                <PlayIcon position={[0, -bodyH / 2 + 0.2, bodyD / 2 + 0.09]} />
            )}

            {/* Next button */}
            <TVButton position={[0.35, -bodyH / 2 + 0.2, bodyD / 2 + 0.05]} color="#333" hoverColor="#8b5cf6" onClick={onNext} />
            <ArrowIcon position={[0.35, -bodyH / 2 + 0.2, bodyD / 2 + 0.09]} />

            {/* Home indicator bar */}
            <mesh position={[0, -bodyH / 2 + 0.08, bodyD / 2 + 0.01]}>
                <boxGeometry args={[0.5, 0.03, 0.01]} />
                <meshStandardMaterial color="#444" metalness={0.5} roughness={0.3} />
            </mesh>
        </group>
    );
}

/* ──────────────────────────────────────────────
   CRT TV Model (for landscape videos)
   ────────────────────────────────────────────── */
function TVModel({
    scrollProgress,
    videoTexture,
    isPlaying,
    onPrev,
    onNext,
    onPlayPause,
    screenW,
    screenH,
}: {
    scrollProgress: number;
    videoTexture: THREE.VideoTexture | null;
    isPlaying: boolean;
    onPrev: () => void;
    onNext: () => void;
    onPlayPause: () => void;
    screenW: number;
    screenH: number;
}) {
    const groupRef = useRef<THREE.Group>(null!);

    const bodyW = screenW + 1.0;
    const bodyH = screenH + 0.9;
    const bodyD = 2.2;

    useFrame(() => {
        if (!groupRef.current) return;
        let targetRotY: number;
        if (scrollProgress <= 0.25) {
            targetRotY = Math.PI * (1 - scrollProgress / 0.25);
        } else if (scrollProgress <= 0.75) {
            targetRotY = 0;
        } else {
            targetRotY = -Math.PI * ((scrollProgress - 0.75) / 0.25);
        }
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.12);
        if (videoTexture) videoTexture.needsUpdate = true;
    });

    const btnY = -bodyH / 2 + 0.15;

    return (
        <group ref={groupRef} rotation={[0, Math.PI, 0]}>
            {/* TV Body */}
            <RoundedBox args={[bodyW, bodyH, bodyD]} radius={0.2} smoothness={4} position={[0, 0, 0]}>
                <meshStandardMaterial color="#3a3632" metalness={0.1} roughness={0.8} />
            </RoundedBox>

            {/* Inner screen bezel */}
            <RoundedBox args={[screenW + 0.2, screenH + 0.15, 0.1]} radius={0.08} smoothness={4} position={[0, 0.2, bodyD / 2 + 0.01]}>
                <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.6} />
            </RoundedBox>

            {/* Screen — video */}
            <mesh position={[0, 0.2, bodyD / 2 + 0.07]}>
                <planeGeometry args={[screenW, screenH]} />
                {videoTexture ? (
                    <meshBasicMaterial map={videoTexture} toneMapped={false} />
                ) : (
                    <meshStandardMaterial color="#0a1628" emissive="#1a0a3e" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
                )}
            </mesh>

            {/* Scanlines */}
            <Scanlines position={[0, 0.2, bodyD / 2 + 0.09]} size={[screenW, screenH]} />

            {/* TV Stand / Base */}
            <RoundedBox args={[bodyW * 0.65, 0.2, 1.4]} radius={0.05} smoothness={4} position={[0, -bodyH / 2 - 0.2, 0]}>
                <meshStandardMaterial color="#2d2a26" metalness={0.2} roughness={0.7} />
            </RoundedBox>

            {/* TV Legs */}
            <mesh position={[-bodyW * 0.25, -bodyH / 2 - 0.45, 0]}>
                <cylinderGeometry args={[0.06, 0.08, 0.3, 16]} />
                <meshStandardMaterial color="#1a1816" metalness={0.3} roughness={0.5} />
            </mesh>
            <mesh position={[bodyW * 0.25, -bodyH / 2 - 0.45, 0]}>
                <cylinderGeometry args={[0.06, 0.08, 0.3, 16]} />
                <meshStandardMaterial color="#1a1816" metalness={0.3} roughness={0.5} />
            </mesh>

            {/* Antenna - left */}
            <mesh position={[-0.6, bodyH / 2 + 0.4, -0.3]} rotation={[0, 0, 0.3]}>
                <cylinderGeometry args={[0.02, 0.015, 1.2, 8]} />
                <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Antenna - right */}
            <mesh position={[0.6, bodyH / 2 + 0.4, -0.3]} rotation={[0, 0, -0.3]}>
                <cylinderGeometry args={[0.02, 0.015, 1.2, 8]} />
                <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Antenna tips */}
            <mesh position={[-0.95, bodyH / 2 + 0.95, -0.3]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#aaa" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.95, bodyH / 2 + 0.95, -0.3]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#aaa" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Speaker grille (right side) */}
            <mesh position={[bodyW / 2 - 0.25, 0.2, bodyD / 2 + 0.01]}>
                <planeGeometry args={[0.25, screenH * 0.8]} />
                <meshStandardMaterial color="#2a2725" metalness={0.1} roughness={0.9} />
            </mesh>
            {Array.from({ length: 6 }).map((_, i) => (
                <mesh key={`sp-${i}`} position={[bodyW / 2 - 0.25, 0.2 + (i - 2.5) * 0.18, bodyD / 2 + 0.02]}>
                    <boxGeometry args={[0.22, 0.04, 0.01]} />
                    <meshStandardMaterial color="#1a1816" />
                </mesh>
            ))}

            {/* Control buttons area */}
            <RoundedBox args={[1.6, 0.35, 0.1]} radius={0.04} smoothness={2} position={[0, btnY, bodyD / 2 + 0.01]}>
                <meshStandardMaterial color="#2d2a26" metalness={0.1} roughness={0.8} />
            </RoundedBox>

            {/* Prev */}
            <TVButton position={[-0.4, btnY, bodyD / 2 + 0.1]} color="#555" hoverColor="#8b5cf6" onClick={onPrev} />
            <ArrowIcon position={[-0.4, btnY, bodyD / 2 + 0.15]} flip />

            {/* Play/Pause */}
            <TVButton position={[0, btnY, bodyD / 2 + 0.1]} color="#555" hoverColor="#22c55e" onClick={onPlayPause} />
            {isPlaying ? <PauseIcon position={[0, btnY, bodyD / 2 + 0.15]} /> : <PlayIcon position={[0, btnY, bodyD / 2 + 0.15]} />}

            {/* Next */}
            <TVButton position={[0.4, btnY, bodyD / 2 + 0.1]} color="#555" hoverColor="#8b5cf6" onClick={onNext} />
            <ArrowIcon position={[0.4, btnY, bodyD / 2 + 0.15]} />

            {/* Channel/Volume knobs */}
            <mesh position={[bodyW / 2 - 0.15, btnY + 0.5, bodyD / 2 + 0.01]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.15, 32]} />
                <meshStandardMaterial color="#444" metalness={0.5} roughness={0.4} />
            </mesh>
            <mesh position={[bodyW / 2 - 0.15, btnY + 0.1, bodyD / 2 + 0.01]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.15, 32]} />
                <meshStandardMaterial color="#444" metalness={0.5} roughness={0.4} />
            </mesh>

            {/* Brand label */}
            <mesh position={[0, btnY + 0.35, bodyD / 2 + 0.02]}>
                <planeGeometry args={[0.8, 0.12]} />
                <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

/* ──────────────────────────────────────────────
   Scene wrapper — picks Phone or TV model
   ────────────────────────────────────────────── */
function TVScene({
    scrollProgress,
    videoElement,
    isPlaying,
    onPrev,
    onNext,
    onPlayPause,
    aspectRatio,
}: {
    scrollProgress: number;
    videoElement: HTMLVideoElement | null;
    isPlaying: boolean;
    onPrev: () => void;
    onNext: () => void;
    onPlayPause: () => void;
    aspectRatio: number;
}) {
    const videoTexture = useMemo(() => {
        if (!videoElement) return null;
        const tex = new THREE.VideoTexture(videoElement);
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
    }, [videoElement]);

    // Calculate screen dimensions from aspect ratio
    // Max screen height ~3.0 for portrait, max screen width ~3.5 for landscape
    const isPortrait = isPortraitRatio(aspectRatio);
    let screenW: number;
    let screenH: number;

    if (isPortrait) {
        // Phone: tall screen, max height = 3.2
        screenH = 3.2;
        screenW = screenH * aspectRatio;
        // Ensure min width
        if (screenW < 1.4) screenW = 1.4;
    } else {
        // TV: wide screen, max width = 3.0
        screenW = 3.0;
        screenH = screenW / aspectRatio;
        // Clamp height
        if (screenH > 2.5) { screenH = 2.5; screenW = screenH * aspectRatio; }
        if (screenH < 1.2) screenH = 1.2;
    }

    return (
        <>
            <ambientLight intensity={0.3} color="#e8e0ff" />
            <spotLight position={[3, 4, 5]} angle={0.5} penumbra={0.8} intensity={1.5} color="#c4b5fd" castShadow />
            <spotLight position={[-3, 2, 4]} angle={0.6} penumbra={0.5} intensity={0.8} color="#818cf8" />
            <pointLight position={[0, 0, 3]} intensity={0.4} color="#a78bfa" />
            <group scale={isPortrait ? 1.0 : 1.15}>
                {isPortrait ? (
                    <PhoneModel
                        scrollProgress={scrollProgress}
                        videoTexture={videoTexture}
                        isPlaying={isPlaying}
                        onPrev={onPrev}
                        onNext={onNext}
                        onPlayPause={onPlayPause}
                        screenW={screenW}
                        screenH={screenH}
                    />
                ) : (
                    <TVModel
                        scrollProgress={scrollProgress}
                        videoTexture={videoTexture}
                        isPlaying={isPlaying}
                        onPrev={onPrev}
                        onNext={onNext}
                        onPlayPause={onPlayPause}
                        screenW={screenW}
                        screenH={screenH}
                    />
                )}
            </group>
        </>
    );
}

/* ──────────────────────────────────────────────
   Horizontal video strip (wheel-like)
   ────────────────────────────────────────────── */
function VideoStrip({
    videos,
    activeIndex,
    onSelect,
}: {
    videos: typeof VIDEOS;
    activeIndex: number;
    onSelect: (index: number) => void;
}) {
    const stripRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!stripRef.current) return;
        const activeEl = stripRef.current.children[activeIndex] as HTMLElement;
        if (activeEl) {
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [activeIndex]);

    return (
        <div className="w-[80%] mx-auto relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-base-100 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-base-100 to-transparent z-10 pointer-events-none" />

            <div
                ref={stripRef}
                className="flex gap-4 overflow-x-auto py-4 px-8 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
                {videos.map((video, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <button
                            key={video.src}
                            onClick={() => onSelect(i)}
                            className={`
                                relative shrink-0 snap-center rounded-2xl overflow-hidden
                                transition-all duration-400 ease-out cursor-pointer group
                                ${isActive
                                    ? 'w-44 h-28 ring-2 ring-purple-500 ring-offset-2 ring-offset-base-100 scale-105 shadow-lg shadow-purple-500/30'
                                    : 'w-36 h-24 opacity-50 hover:opacity-80 hover:scale-102'
                                }
                            `}
                        >
                            <video
                                src={video.src}
                                muted
                                preload="metadata"
                                className="w-full h-full object-cover"
                                onLoadedData={(e) => { (e.target as HTMLVideoElement).currentTime = 1; }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300">
                                {isActive && (
                                    <div className="w-8 h-8 rounded-full bg-purple-500/80 backdrop-blur-sm flex items-center justify-center">
                                        <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                                            <polygon points="0,0 12,7 0,14" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-1.5 left-2 right-2">
                                <span className={`text-[9px] font-bold tracking-wider uppercase text-white ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                    {video.name}
                                </span>
                            </div>
                            {isActive && (
                                <div className="absolute -inset-[2px] rounded-2xl border-2 border-purple-400 animate-pulse pointer-events-none" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────
   Main exported component
   ────────────────────────────────────────────── */
export default function RetroTV() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
    const [aspectRatio, setAspectRatio] = useState(16 / 9); // default landscape

    // Create hidden video element
    useEffect(() => {
        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.muted = false;
        video.playsInline = true;
        video.preload = 'auto';
        video.src = VIDEOS[0].src;
        videoRef.current = video;
        setVideoElement(video);

        // Detect aspect ratio when metadata loads
        const onMeta = () => {
            if (video.videoWidth && video.videoHeight) {
                setAspectRatio(video.videoWidth / video.videoHeight);
            }
        };
        video.addEventListener('loadedmetadata', onMeta);
        video.addEventListener('ended', () => setIsPlaying(false));

        return () => {
            video.removeEventListener('loadedmetadata', onMeta);
            video.pause();
            video.src = '';
            video.load();
        };
    }, []);

    // Switch video source
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const wasPlaying = !video.paused;
        video.src = VIDEOS[activeVideoIndex].src;
        video.load();

        const onMeta = () => {
            if (video.videoWidth && video.videoHeight) {
                setAspectRatio(video.videoWidth / video.videoHeight);
            }
            video.removeEventListener('loadedmetadata', onMeta);
        };
        video.addEventListener('loadedmetadata', onMeta);

        if (wasPlaying) {
            video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        }
    }, [activeVideoIndex]);

    // Scroll handler
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const containerHeight = containerRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;
            const totalTravel = containerHeight + viewportHeight;
            const traveled = viewportHeight - rect.top;
            const progress = Math.max(0, Math.min(1, traveled / totalTravel));
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handlePlayPause = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play().then(() => setIsPlaying(true)).catch(() => {
                video.muted = true;
                video.play().then(() => setIsPlaying(true));
            });
        } else {
            video.pause();
            setIsPlaying(false);
        }
    }, []);

    const handleNext = useCallback(() => {
        setActiveVideoIndex((prev) => (prev + 1) % VIDEOS.length);
    }, []);

    const handlePrev = useCallback(() => {
        setActiveVideoIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
    }, []);

    const handleSelectVideo = useCallback((index: number) => {
        setActiveVideoIndex(index);
        const video = videoRef.current;
        if (video) {
            setTimeout(() => {
                video.play().then(() => setIsPlaying(true)).catch(() => {
                    video.muted = true;
                    video.play().then(() => setIsPlaying(true));
                });
            }, 200);
        }
    }, []);

    const isPortrait = isPortraitRatio(aspectRatio);

    return (
        <div ref={containerRef} className="relative" style={{ height: '150vh' }}>
            <div className="sticky top-0 h-screen flex flex-col items-center justify-end pb-8">
                {/* Section badge */}
                <div className="pt-6 pb-2 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase">
                        {t('videoPortfolio.retroTV.badge')}
                    </span>
                    {/* Device type indicator */}
                    <p className="text-[9px] text-base-content/30 font-bold tracking-widest uppercase mt-1">
                        {isPortrait ? `📱 ${t('videoPortfolio.retroTV.mobile')}` : `📺 ${t('videoPortfolio.retroTV.crt')}`} • {Math.round(aspectRatio * 100) / 100}:1
                    </p>
                </div>

                {/* 3D Canvas */}
                <div className="w-full max-w-5xl" style={{ height: '55vh' }}>
                    <Canvas
                        camera={{ position: [0, 0, 6], fov: 40 }}
                        dpr={[1, 2]}
                        gl={{ antialias: true, alpha: true }}
                        style={{ background: 'transparent' }}
                    >
                        <TVScene
                            scrollProgress={scrollProgress}
                            videoElement={videoElement}
                            isPlaying={isPlaying}
                            onPrev={handlePrev}
                            onNext={handleNext}
                            onPlayPause={handlePlayPause}
                            aspectRatio={aspectRatio}
                        />
                    </Canvas>
                </div>

                {/* Now playing indicator */}
                <div className="text-center py-2">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400/60">
                        {t('videoPortfolio.retroTV.nowPlaying')}
                    </span>
                    <p className="text-sm font-bold text-base-content mt-0.5">
                        {VIDEOS[activeVideoIndex].name}
                    </p>
                </div>

                {/* Video strip */}
                <VideoStrip
                    videos={VIDEOS}
                    activeIndex={activeVideoIndex}
                    onSelect={handleSelectVideo}
                />
            </div>
        </div>
    );
}
