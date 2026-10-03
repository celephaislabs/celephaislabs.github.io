(() => {
	"use strict";
	const canvas = document.getElementById("lensing-field");
	const hero = canvas?.closest(".hero");
	if (!canvas || !hero) return;
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	const motion = matchMedia("(prefers-reduced-motion: reduce)");
	let width = 1, height = 1, stars = [], frame = 0, previous = 0;
	let visible = true, active = false, strength = 0;
	let lastPointerMove = -Infinity, wanderTime = 0;
	const target = { x: 0, y: 0 }, lens = { x: 0, y: 0 };
	let seed = 7219;
	const random = () => {
		seed = (seed * 1664525 + 1013904223) >>> 0;
		return seed / 4294967296;
	};
	function resize() {
		const rect = hero.getBoundingClientRect();
		width = rect.width;
		height = rect.height;
		const ratio = Math.min(devicePixelRatio || 1, 2);
		canvas.width = Math.round(width * ratio);
		canvas.height = Math.round(height * ratio);
		ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
		seed = 7219;
		stars = Array.from({ length: Math.min(2400, Math.round(width * height / 580)) }, () => ({
			x: random() * width, y: random() * height,
			r: .35 + Math.pow(random(), 5) * 1.55,
			alpha: .2 + random() * .7, phase: random() * Math.PI * 2,
			cool: random() > .7,
		}));
		if (!active) {
			target.x = lens.x = width * .73;
			target.y = lens.y = height * .42;
		}
		if (motion.matches) render(0);
	}
	// A tapered annular ribbon follows the lens curvature instead of a straight ellipse.
	function drawImage(radius, angle, thickness, stretch) {
		ctx.beginPath();
		if (stretch < 1.25 || radius < 1) {
			ctx.arc(lens.x + Math.cos(angle) * radius, lens.y + Math.sin(angle) * radius,
				thickness, 0, Math.PI * 2);
		} else {
			const halfAngle = Math.min(.9, thickness * stretch / radius);
			const segments = Math.max(8, Math.ceil(halfAngle * 24));
			for (const side of [1, -1]) {
				for (let i = 0; i <= segments; i++) {
					const t = side === 1 ? -1 + 2 * i / segments : 1 - 2 * i / segments;
					const a = angle + t * halfAngle;
					const r = radius + side * thickness * Math.sqrt(Math.max(0, 1 - t * t));
					const x = lens.x + Math.cos(a) * r, y = lens.y + Math.sin(a) * r;
					if (side === 1 && i === 0) ctx.moveTo(x, y);
					else ctx.lineTo(x, y);
				}
			}
			ctx.closePath();
		}
		ctx.fill();
	}
	function render(time) {
		ctx.clearRect(0, 0, width, height);
		const radius = Math.min(width, height) * .15 * strength;
		const radiusSquared = radius * radius;
		for (const star of stars) {
			const drift = motion.matches ? 0 : Math.sin(time * .000035 + star.phase) * 3;
			const sx = star.x + drift, sy = star.y;
			const dx = sx - lens.x, dy = sy - lens.y;
			const distance = Math.max(.1, Math.hypot(dx, dy));
			// Point-mass lens equation: an outer image and a faint inner image.
			const outer = (distance + Math.sqrt(distance * distance + 4 * radiusSquared)) / 2;
			const influence = Math.exp(-distance * distance / (radiusSquared * 32 + 1));
			const mapped = distance + (outer - distance) * influence;
			const angle = Math.atan2(dy, dx);
			const twinkle = motion.matches ? 1 : .88 + .12 * Math.sin(time * .0008 + star.phase);
			ctx.fillStyle = star.cool ? "#b8d9ff" : "#f0f2f6";
			ctx.globalAlpha = star.alpha * twinkle;
			const stretch = 1 + Math.min(28, radiusSquared / (distance * distance + 36)) * influence;
			drawImage(mapped, angle, star.r, stretch);
			if (radius > 1 && distance < radius * 3.5) {
				const inner = radiusSquared / outer;
				ctx.globalAlpha = star.alpha * .42 * influence;
				drawImage(inner, angle + Math.PI, Math.max(.3, star.r * .65), stretch);
			}
		}
		if (radius > 1) {
			const halo = ctx.createRadialGradient(lens.x, lens.y, radius * .7, lens.x, lens.y, radius * 1.4);
			halo.addColorStop(0, "rgba(150,190,255,0)");
			halo.addColorStop(.4, "rgba(150,190,255,.025)");
			halo.addColorStop(1, "rgba(150,190,255,0)");
			ctx.globalAlpha = strength;
			ctx.fillStyle = halo;
			ctx.fillRect(lens.x - radius * 1.4, lens.y - radius * 1.4, radius * 2.8, radius * 2.8);
			ctx.fillStyle = "#020305";
			ctx.beginPath();
			ctx.arc(lens.x, lens.y, radius * .42, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.globalAlpha = 1;
	}
	function draw(time) {
		frame = 0;
		if (!visible || document.hidden || motion.matches) return;
		const dt = previous ? Math.min(50, time - previous) : 16;
		previous = time;
		wanderTime += dt / 1000;
		const idle = !active || time - lastPointerMove > 2200;
		// Incommensurate waves create a smooth, bounded path with no obvious short loop.
		const t = wanderTime * 1.25;
		const wanderX = width * (.5 + .23 * Math.sin(t * .19 + 1.2) + .09 * Math.sin(t * .317 + .4));
		const wanderY = height * (.48 + .20 * Math.sin(t * .157 + .1) + .08 * Math.sin(t * .283 + 2.1));
		const ease = 1 - Math.exp(-dt / (idle ? 1800 : 115));
		lens.x += ((idle ? wanderX : target.x) - lens.x) * ease;
		lens.y += ((idle ? wanderY : target.y) - lens.y) * ease;
		strength += ((idle ? .85 : 1) - strength) * (1 - Math.exp(-dt / 350));
		render(time);
		frame = requestAnimationFrame(draw);
	}
	function start() {
		previous = 0;
		if (!frame && visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(draw);
	}
	hero.addEventListener("pointermove", event => {
		if (motion.matches || event.pointerType === "touch") return;
		const rect = hero.getBoundingClientRect();
		target.x = event.clientX - rect.left;
		target.y = event.clientY - rect.top;
		active = true;
		lastPointerMove = performance.now();
	}, { passive: true });
	hero.addEventListener("pointerleave", () => {
		active = false;

	});
	new ResizeObserver(resize).observe(hero);
	new IntersectionObserver(entries => {
		visible = entries[0].isIntersecting;
		start();
	}).observe(hero);
	document.addEventListener("visibilitychange", start);
	motion.addEventListener("change", () => {
		if (motion.matches) {
			cancelAnimationFrame(frame);
			frame = 0;
			strength = 0;
			render(0);
		} else start();
	});
	resize();
	start();
})();
