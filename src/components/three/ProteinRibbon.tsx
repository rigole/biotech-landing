"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedurally generates a stylized protein backbone made of
 * alpha-helix segments (twisted tubes) and beta-sheet segments
 * (flat twisted ribbons), connected by thin loop tubes.
 *
 * This is not a real folded structure (no PDB data) — it's a
 * deliberate stylization meant to evoke AlphaFold-style ribbon
 * diagrams without the weight of a real molecular dataset.
 */

const BIO = "#4FE3C1";
const SIGNAL = "#FF9B4A";
const LOOP = "#3A4550";

type SegmentType = "helix" | "sheet" | "loop";

type Segment = {
  type: SegmentType;
  points: THREE.Vector3[];
};

function buildBackbone(): Segment[] {
  const segments: Segment[] = [];
  let cursor = new THREE.Vector3(0, 0, 0);
  let direction = new THREE.Vector3(1, 0.2, 0);

  const pattern: SegmentType[] = [
    "helix",
    "loop",
    "sheet",
    "loop",
    "helix",
    "loop",
    "sheet",
    "loop",
    "helix",
  ];

  pattern.forEach((type) => {
    const points: THREE.Vector3[] = [];

    if (type === "helix") {
      const turns = 3;
      const stepsPerTurn = 10;
      const radius = 0.35;
      const rise = 0.09;
      const steps = turns * stepsPerTurn;

      const axis = direction.clone().normalize();
      const arbitrary = Math.abs(axis.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
      const perp1 = new THREE.Vector3().crossVectors(axis, arbitrary).normalize();
      const perp2 = new THREE.Vector3().crossVectors(axis, perp1).normalize();

      for (let s = 0; s <= steps; s++) {
        const t = s / stepsPerTurn;
        const angle = t * Math.PI * 2;
        const along = axis.clone().multiplyScalar(s * rise);
        const out = perp1
          .clone()
          .multiplyScalar(Math.cos(angle) * radius)
          .add(perp2.clone().multiplyScalar(Math.sin(angle) * radius));
        points.push(cursor.clone().add(along).add(out));
      }
      cursor = points[points.length - 1].clone();
      direction = axis.clone().applyAxisAngle(perp1, 0.35);
    } else if (type === "sheet") {
      const steps = 14;
      const length = 1.6;
      const amplitude = 0.06;
      const axis = direction.clone().normalize();
      const arbitrary = Math.abs(axis.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
      const perp = new THREE.Vector3().crossVectors(axis, arbitrary).normalize();

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const along = axis.clone().multiplyScalar(t * length);
        const wobble = perp.clone().multiplyScalar(Math.sin(t * Math.PI * 2) * amplitude);
        points.push(cursor.clone().add(along).add(wobble));
      }
      cursor = points[points.length - 1].clone();
      direction = axis.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), 0.5);
    } else {
      const steps = 8;
      const length = 0.6;
      const axis = direction.clone().normalize();
      const bend = new THREE.Vector3(
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.6
      );

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const curve = axis.clone().multiplyScalar(t * length).add(bend.clone().multiplyScalar(Math.sin(t * Math.PI) * 0.3));
        points.push(cursor.clone().add(curve));
      }
      cursor = points[points.length - 1].clone();
      direction = axis.clone().add(bend).normalize();
    }

    segments.push({ type, points });
  });

  return segments;
}

function HelixOrLoop({ segment }: { segment: Segment }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(segment.points);
    const radius = segment.type === "helix" ? 0.045 : 0.02;
    const tubularSegments = Math.max(segment.points.length * 4, 16);
    return new THREE.TubeGeometry(curve, tubularSegments, radius, 8, false);
  }, [segment]);

  const color = segment.type === "helix" ? BIO : LOOP;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        roughness={0.35}
        metalness={0.1}
        emissive={segment.type === "helix" ? BIO : "#000000"}
        emissiveIntensity={segment.type === "helix" ? 0.25 : 0}
      />
    </mesh>
  );
}

function Sheet({ segment }: { segment: Segment }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(segment.points);
    const width = 0.22;
    const segmentsAlong = segment.points.length * 3;
    const positions: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i <= segmentsAlong; i++) {
      const t = i / segmentsAlong;
      const point = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);
      const up = new THREE.Vector3(0, 1, 0);
      const normal = new THREE.Vector3().crossVectors(tangent, up).normalize().multiplyScalar(width / 2);

      const a = point.clone().add(normal);
      const b = point.clone().sub(normal);

      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);

      if (i < segmentsAlong) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [segment]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={SIGNAL}
        roughness={0.3}
        metalness={0.15}
        emissive={SIGNAL}
        emissiveIntensity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function ProteinModel({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const segments = useMemo(() => buildBackbone(), []);

  const bounds = useMemo(() => {
    const box = new THREE.Box3();
    segments.forEach((seg) => seg.points.forEach((p) => box.expandByPoint(p)));
    const center = new THREE.Vector3();
    box.getCenter(center);
    return center;
  }, [segments]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0002) * 0.1;
  });

  return (
    <group ref={groupRef} position={[-bounds.x, -bounds.y, -bounds.z]}>
      {segments.map((segment, i) =>
        segment.type === "sheet" ? (
          <Sheet key={i} segment={segment} />
        ) : (
          <HelixOrLoop key={i} segment={segment} />
        )
      )}
    </group>
  );
}

export function ProteinRibbon() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.8]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 4]} intensity={1.2} color="#EAF2F0" />
      <pointLight position={[-3, -2, -3]} intensity={0.6} color="#4FE3C1" />
      <ProteinModel reducedMotion={reducedMotion} />
    </Canvas>
  );
}