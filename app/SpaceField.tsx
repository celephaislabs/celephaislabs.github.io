"use client";

import { useEffect, useRef } from "react";

type Star = {
	x: number;
	y: number;
	radius: number;
	depth: number;
	phase: number;
};

export function SpaceField() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const host = canvas?.parentElement;
		const context = canvas?.getContext("2d");

		if (!canvas || !host || !context) {
			return;
		}

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let frame = 0;
		let width = 0;
		let height = 0;
		let stars: Star[] = [];
		let pointerX = 0;
		let pointerY = 0;
		let targetX = 0;
		let targetY = 0;
		let seed = 8137;

		const random = () => {
			seed = (seed * 16807) % 2147483647;
			return (seed - 1) / 2147483646;
		};

		const rebuild = () => {
			const bounds = host.getBoundingClientRect();
			const scale = Math.min(window.devicePixelRatio || 1, 2);
			width = bounds.width;
			height = bounds.height;
			canvas.width = Math.max(1, Math.round(width * scale));
			canvas.height = Math.max(1, Math.round(height * scale));
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			context.setTransform(scale, 0, 0, scale, 0, 0);
			pointerX = targetX = width * 0.72;
			pointerY = targetY = height * 0.42;
			seed = 8137;
			const count = Math.max(38, Math.min(82, Math.round(width / 18)));
			stars = Array.from({ length: count }, () => ({
				x: random(),
				y: random(),
				radius: 0.45 + random() * 1.25,
				depth: 0.25 + random() * 0.75,
				phase: random() * Math.PI * 2,
			}));
		};

		const draw = (time: number) => {
			pointerX += (targetX - pointerX) * 0.045;
			pointerY += (targetY - pointerY) * 0.045;
			context.clearRect(0, 0, width, height);

			const glow = context.createRadialGradient(pointerX, pointerY, 0, pointerX, pointerY, 240);
			glow.addColorStop(0, "rgba(131, 205, 244, 0.11)");
			glow.addColorStop(0.42, "rgba(75, 151, 196, 0.045)");
			glow.addColorStop(1, "rgba(6, 19, 34, 0)");
			context.fillStyle = glow;
			context.fillRect(0, 0, width, height);

			const shiftX = (pointerX / Math.max(width, 1) - 0.5) * 20;
			const shiftY = (pointerY / Math.max(height, 1) - 0.5) * 16;
			for (const star of stars) {
				const alpha = reduceMotion ? 0.42 : 0.3 + Math.sin(time * 0.00055 + star.phase) * 0.13;
				context.beginPath();
				context.arc(star.x * width + shiftX * star.depth, star.y * height + shiftY * star.depth, star.radius, 0, Math.PI * 2);
				context.fillStyle = `rgba(188, 234, 255, ${alpha})`;
				context.fill();
			}

			context.save();
			context.translate(pointerX, pointerY);
			context.rotate(reduceMotion ? -0.22 : -0.22 + Math.sin(time * 0.00012) * 0.035);
			for (let index = 0; index < 3; index += 1) {
				context.beginPath();
				context.ellipse(0, 0, 92 + index * 42, 22 + index * 10, index * 0.48, 0, Math.PI * 2);
				context.strokeStyle = `rgba(131, 205, 244, ${0.13 - index * 0.025})`;
				context.lineWidth = 0.8;
				context.stroke();
			}
			context.restore();

			context.beginPath();
			context.arc(pointerX, pointerY, 3.2, 0, Math.PI * 2);
			context.fillStyle = "rgba(188, 234, 255, 0.82)";
			context.shadowColor = "rgba(131, 205, 244, 0.85)";
			context.shadowBlur = 14;
			context.fill();
			context.shadowBlur = 0;

			if (!reduceMotion) {
				frame = window.requestAnimationFrame(draw);
			}
		};

		const movePointer = (event: PointerEvent) => {
			const bounds = host.getBoundingClientRect();
			targetX = event.clientX - bounds.left;
			targetY = event.clientY - bounds.top;
			if (reduceMotion) {
				pointerX = targetX;
				pointerY = targetY;
				draw(0);
			}
		};

		const resetPointer = () => {
			targetX = width * 0.72;
			targetY = height * 0.42;
			if (reduceMotion) {
				pointerX = targetX;
				pointerY = targetY;
				draw(0);
			}
		};

		rebuild();
		draw(0);
		const observer = new ResizeObserver(() => {
			rebuild();
			if (reduceMotion) {
				draw(0);
			}
		});
		observer.observe(host);
		host.addEventListener("pointermove", movePointer);
		host.addEventListener("pointerleave", resetPointer);

		return () => {
			observer.disconnect();
			host.removeEventListener("pointermove", movePointer);
			host.removeEventListener("pointerleave", resetPointer);
			window.cancelAnimationFrame(frame);
		};
	}, []);

	return <canvas ref={canvasRef} className="space-field" aria-hidden="true" />;
}
