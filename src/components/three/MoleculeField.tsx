"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 46;
const CONNECT_DISTANCE = 2.1;
const FIELD_SIZE = 9;

function generateNodes() {
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * FIELD_SIZE,
        (Math.random() - 0.5) * FIELD_SIZE * 0.6,
        (Math.random() - 0.5) * 2
      )
    );
  }
  return nodes;
}

function buildConnections(nodes: THREE.Vector3[]) {
  const positions: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].distanceTo(nodes[j]);
      if (dist < CONNECT_DISTANCE) {
        positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
        positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
      }
    }
  }
  return new Float32Array(positions);
}

function Field({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const nodes = useMemo(() => generateNodes(), []);

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      positions[i * 3] = n.x;
      positions[i * 3 + 1] = n.y;
      positions[i * 3 + 2] = n.z;
    });
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [nodes]);

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(buildConnections(nodes), 3)
    );
    return geo;
  }, [nodes]);

  useEffect(() => {
    if (reducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    const targetX = mouse.current.x * 0.25;
    const targetY = mouse.current.y * 0.15;
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * delta * 0.8;
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * delta * 0.8;
  });

  return (
    <group ref={groupRef} scale={viewport.width < 6 ? 0.7 : 1}>
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="#4FE3C1" transparent opacity={0.08} />
      </lineSegments>
      <points geometry={pointsGeometry}>
        <pointsMaterial color="#4FE3C1" size={0.045} transparent opacity={0.35} sizeAttenuation />
      </points>
    </group>
  );
}

export function MoleculeField() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Field reducedMotion={reducedMotion} />
    </Canvas>
  );
}