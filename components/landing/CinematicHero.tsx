"use client";

/**
 * CinematicHero — the 3D landing page section.
 *
 * What's happening here, in plain language:
 *
 * 1. <Canvas> sets up a WebGL rendering context (like a 3D engine running in the browser).
 *    Everything inside it is part of the 3D scene.
 *
 * 2. The scene contains several <mesh> objects — each mesh is a 3D shape (geometry)
 *    combined with a material that controls how light hits it.
 *    We use a large torus knot as the centrepiece (an abstract, flowing shape that reads
 *    as "fabric" or "movement") surrounded by drifting particle spheres.
 *
 * 3. The camera sits at a fixed position looking at the centre of the scene.
 *    We animate it slightly on scroll so the hero feels "alive" as you enter the page.
 *
 * 4. All HTML (headline, CTA) sits on top of the canvas using absolute positioning —
 *    it's normal DOM, not inside Three.js.
 *
 * 5. The component is lazy-loaded with next/dynamic (ssr: false) in page.tsx because
 *    Three.js uses browser APIs that don't exist in Node.js during server rendering.
 */

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import Link from "next/link";

// --- Sub-components (live inside <Canvas>, so they can use R3F hooks) ---

/** The main sculptural centrepiece — a slowly rotating torus knot. */
function TorusKnotSculpture() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Slow continuous rotation — gives the piece life without being distracting
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.12;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8}>
        {/*
          TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q)
          High segment counts = smooth, fabric-like silhouette.
        */}
        <torusKnotGeometry args={[1, 0.32, 200, 20, 2, 3]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.6}
          roughness={0.3}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

/** Scattered small spheres that drift slowly — give depth to the background. */
function ParticleField() {
  // Generate random positions once; useMemo prevents re-computation on every render
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 2,
      ] as [number, number, number],
      scale: Math.random() * 0.08 + 0.02,
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle oscillation — the whole field breathes slowly
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {particles.map((p) => (
        <mesh key={p.id} position={p.position} scale={p.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

/** Thin accent ring behind the sculpture — adds a cinematic halo effect. */
function AccentRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.04;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[3.5, 0.012, 8, 120]} />
      <meshStandardMaterial color="#c9a84c" metalness={1} roughness={0} />
    </mesh>
  );
}

// --- Main component ---

export default function CinematicHero() {
  return (
    <section className="relative h-screen w-full bg-stone-950 overflow-hidden">
      {/* 3D Canvas — fills the entire hero */}
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]} // cap pixel ratio for performance on mid-range devices
      >
        {/* Ambient light for overall scene brightness */}
        <ambientLight intensity={0.2} />

        {/* Key light — front-left, warm */}
        <pointLight position={[4, 4, 4]} intensity={2} color="#ffffff" />

        {/* Accent light — back-right, gold */}
        <pointLight position={[-3, -2, -4]} intensity={1.5} color="#c9a84c" />

        {/* Environment map gives realistic reflections on metallic surfaces */}
        <Environment preset="night" />

        <TorusKnotSculpture />
        <ParticleField />
        <AccentRing />
      </Canvas>

      {/* HTML overlay — sits on top of the canvas via absolute positioning */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        {/* Subtle gradient so text is readable over the 3D scene */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950/60" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="relative z-10"
        >
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-6">
            New Season — 2025
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-none mb-4">
            Dressed in
            <br />
            <span className="font-semibold italic">intention.</span>
          </h1>
          <p className="text-stone-400 text-sm md:text-base max-w-md mx-auto mt-6 leading-relaxed">
            Premium streetwear from Lagos, built to travel.
          </p>

          <div className="flex items-center justify-center gap-4 mt-10 pointer-events-auto">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-white text-stone-900 text-xs tracking-widest uppercase font-medium hover:bg-stone-100 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/shop?category=outerwear"
              className="px-8 py-3.5 border border-white/30 text-white text-xs tracking-widest uppercase font-medium hover:border-white/70 transition-colors"
            >
              Outerwear
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-white/20 animate-pulse" />
        <p className="text-white/30 text-[9px] tracking-widest uppercase">Scroll</p>
      </motion.div>
    </section>
  );
}
