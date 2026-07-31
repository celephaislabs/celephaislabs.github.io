"use client";

// Adapted from React Bits Antigravity by David Haz.
// Licensed under MIT + Commons Clause; see THIRD_PARTY_NOTICES.md.

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";

interface AntigravityProps {
	count?: number;
	magnetRadius?: number;
	ringRadius?: number;
	waveSpeed?: number;
	waveAmplitude?: number;
	particleSize?: number;
	lerpSpeed?: number;
	color?: string;
	autoAnimate?: boolean;
	particleVariance?: number;
	rotationSpeed?: number;
	depthFactor?: number;
	pulseSpeed?: number;
	particleShape?: "capsule" | "sphere" | "box" | "tetrahedron";
	fieldStrength?: number;
}

type Particle = {
	t: number;
	speed: number;
	mx: number;
	my: number;
	mz: number;
	cx: number;
	cy: number;
	cz: number;
	randomRadiusOffset: number;
};

function AntigravityInner({
	pointerRef,
	...props
}: AntigravityProps & { pointerRef: MutableRefObject<{ x: number; y: number }> }) {
	const {
		count = 300,
		magnetRadius = 10,
		ringRadius = 10,
		waveSpeed = 0.4,
		waveAmplitude = 1,
		particleSize = 2,
		lerpSpeed = 0.1,
		color = "#ff9ffc",
		autoAnimate = false,
		particleVariance = 1,
		rotationSpeed = 0,
		depthFactor = 1,
		pulseSpeed = 3,
		particleShape = "capsule",
		fieldStrength = 10,
	} = props;
	const meshRef = useRef<THREE.InstancedMesh>(null);
	const { viewport } = useThree();
	const dummy = useMemo(() => new THREE.Object3D(), []);
	const lastMousePos = useRef({ x: 0, y: 0 });
	const lastMouseMoveTime = useRef(0);
	const virtualMouse = useRef({ x: 0, y: 0 });

	const particles = useMemo<Particle[]>(() => {
		const width = viewport.width || 100;
		const height = viewport.height || 100;
		const random = (index: number, salt: number) => {
			const value = Math.sin(index * 12.9898 + salt * 78.233 + width * 0.17 + height * 0.31) * 43758.5453;
			return value - Math.floor(value);
		};

		return Array.from({ length: count }, (_, index) => {
			const x = (random(index, 1) - 0.5) * width;
			const y = (random(index, 2) - 0.5) * height;
			const z = (random(index, 3) - 0.5) * 20;

			return {
				t: random(index, 4) * 100,
				speed: 0.01 + random(index, 5) / 200,
				mx: x,
				my: y,
				mz: z,
				cx: x,
				cy: y,
				cz: z,
				randomRadiusOffset: (random(index, 6) - 0.5) * 2,
			};
		});
	}, [count, viewport.width, viewport.height]);

	useFrame((state) => {
		const mesh = meshRef.current;
		if (!mesh) {
			return;
		}

		const { viewport: currentViewport } = state;
		const pointer = pointerRef.current;
		const mouseDistance = Math.hypot(pointer.x - lastMousePos.current.x, pointer.y - lastMousePos.current.y);

		if (mouseDistance > 0.001) {
			lastMouseMoveTime.current = Date.now();
			lastMousePos.current = { x: pointer.x, y: pointer.y };
		}

		let destinationX = (pointer.x * currentViewport.width) / 2;
		let destinationY = (pointer.y * currentViewport.height) / 2;

		if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
			const time = state.clock.getElapsedTime();
			destinationX = Math.sin(time * 0.5) * (currentViewport.width / 4);
			destinationY = Math.cos(time) * (currentViewport.height / 4);
		}

		virtualMouse.current.x += (destinationX - virtualMouse.current.x) * 0.05;
		virtualMouse.current.y += (destinationY - virtualMouse.current.y) * 0.05;

		const targetX = virtualMouse.current.x;
		const targetY = virtualMouse.current.y;
		const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

		particles.forEach((particle, index) => {
			particle.t += particle.speed / 2;
			const projectionFactor = 1 - particle.cz / 50;
			const projectedTargetX = targetX * projectionFactor;
			const projectedTargetY = targetY * projectionFactor;
			const distanceX = particle.mx - projectedTargetX;
			const distanceY = particle.my - projectedTargetY;
			const distance = Math.hypot(distanceX, distanceY);
			const targetPosition = {
				x: particle.mx,
				y: particle.my,
				z: particle.mz * depthFactor,
			};

			if (distance < magnetRadius) {
				const angle = Math.atan2(distanceY, distanceX) + globalRotation;
				const wave = Math.sin(particle.t * waveSpeed + angle) * (0.5 * waveAmplitude);
				const deviation = particle.randomRadiusOffset * (5 / (fieldStrength + 0.1));
				const currentRingRadius = ringRadius + wave + deviation;
				targetPosition.x = projectedTargetX + currentRingRadius * Math.cos(angle);
				targetPosition.y = projectedTargetY + currentRingRadius * Math.sin(angle);
				targetPosition.z = particle.mz * depthFactor + Math.sin(particle.t) * waveAmplitude * depthFactor;
			}

			particle.cx += (targetPosition.x - particle.cx) * lerpSpeed;
			particle.cy += (targetPosition.y - particle.cy) * lerpSpeed;
			particle.cz += (targetPosition.z - particle.cz) * lerpSpeed;
			dummy.position.set(particle.cx, particle.cy, particle.cz);
			dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
			dummy.rotateX(Math.PI / 2);

			const currentDistance = Math.hypot(particle.cx - projectedTargetX, particle.cy - projectedTargetY);
			const distanceFromRing = Math.abs(currentDistance - ringRadius);
			const ringScale = Math.max(0, Math.min(1, 1 - distanceFromRing / 10));
			const pulse = 0.8 + Math.sin(particle.t * pulseSpeed) * 0.2 * particleVariance;
			const scale = ringScale * pulse * particleSize;
			dummy.scale.set(scale, scale, scale);
			dummy.updateMatrix();
			mesh.setMatrixAt(index, dummy.matrix);
		});

		mesh.instanceMatrix.needsUpdate = true;
	});

	return (
		<instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
			{particleShape === "capsule" && <capsuleGeometry args={[0.1, 0.4, 4, 8]} />}
			{particleShape === "sphere" && <sphereGeometry args={[0.2, 12, 12]} />}
			{particleShape === "box" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
			{particleShape === "tetrahedron" && <tetrahedronGeometry args={[0.3]} />}
			<meshBasicMaterial color={color} transparent opacity={0.62} />
		</instancedMesh>
	);
}

export default function Antigravity(props: AntigravityProps) {
	const [reduceMotion, setReduceMotion] = useState(false);
	const fieldRef = useRef<HTMLDivElement>(null);
	const pointerRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduceMotion(media.matches);
		const updatePointer = (event: PointerEvent) => {
			const bounds = fieldRef.current?.getBoundingClientRect();
			if (!bounds) {
				return;
			}

			pointerRef.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
			pointerRef.current.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
		};

		update();
		media.addEventListener("change", update);
		window.addEventListener("pointermove", updatePointer, { passive: true });
		return () => {
			media.removeEventListener("change", update);
			window.removeEventListener("pointermove", updatePointer);
		};
	}, []);

	if (reduceMotion) {
		return null;
	}

	return (
		<div className="antigravity-field" ref={fieldRef} aria-hidden="true">
			<Canvas
				camera={{ position: [0, 0, 50], fov: 35 }}
				dpr={[1, 1.5]}
				gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
			>
				<AntigravityInner {...props} pointerRef={pointerRef} />
			</Canvas>
		</div>
	);
}
