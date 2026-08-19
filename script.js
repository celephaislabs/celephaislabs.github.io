(() => {
	"use strict";

	const year = document.getElementById("current-year");
	if (year) {
		year.textContent = String(new Date().getFullYear());
	}

	const form = document.getElementById("contact-form");
	if (form instanceof HTMLFormElement) {
		const status = document.getElementById("contact-form-status");
		const button = form.querySelector("button[type='submit']");
		const label = form.querySelector(".contact-submit-label");

		const setStatus = (kind, message) => {
			if (status) {
				status.innerHTML = message
					? `<p class="contact-form-${kind}">${message}</p>`
					: "";
			}
		};

		form.addEventListener("submit", async (event) => {
			event.preventDefault();

			const data = new FormData(form);
			if (data.get("_honey")) {
				form.reset();
				setStatus("success", "Thank you. Your message has been sent.");
				return;
			}

			const endpoint = form.dataset.ajaxEndpoint;
			if (!endpoint) {
				form.submit();
				return;
			}

			if (button instanceof HTMLButtonElement) {
				button.disabled = true;
			}
			if (label) {
				label.textContent = "Sending…";
			}
			setStatus("success", "");

			try {
				const response = await fetch(endpoint, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(Object.fromEntries(data.entries())),
				});

				const result = await response.json().catch(() => null);
				const rejected = result && (result.success === false || result.success === "false");
				if (!response.ok || rejected) {
					throw new Error("Submission rejected");
				}

				form.reset();
				setStatus("success", "Thank you. Your message has been sent.");
			} catch (error) {
				console.error("Contact form submission failed:", error);
				setStatus("error", "The message could not be sent. Please check your connection and try again.");
			} finally {
				if (button instanceof HTMLButtonElement) {
					button.disabled = false;
				}
				if (label) {
					label.textContent = "Send enquiry";
				}
			}
		});
	}


	/* Plain-canvas port of the original Antigravity hero. */
	const canvas = document.getElementById("particle-field");
	const field = canvas?.parentElement;
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	if (!(canvas instanceof HTMLCanvasElement) || !field || reduceMotion.matches) return;
	const context = canvas.getContext("2d", { alpha: true });
	if (!context) return;

	const S = Object.freeze({
		count: 1000, magnetRadius: 8.5, ringRadius: 5.8, waveSpeed: 0.34,
		waveAmplitude: 0.85, particleSize: 1.15, lerpSpeed: 0.085,
		color: "#9dddff", particleVariance: 0.7, rotationSpeed: 0.06,
		depthFactor: 0.9, pulseSpeed: 2.2, fieldStrength: 12,
		cameraZ: 50, cameraFovDegrees: 35, sphereRadius: 0.2, materialOpacity: 0.62,
	});
	let width=1, height=1, ratio=1, viewportWidth=1, viewportHeight=1;
	let particles=[], frame=0, previous=0, visible=true;
	let lastPointerMoveTime=Number.NEGATIVE_INFINITY;
	const pointer={x:0,y:0}, virtualMouse={x:0,y:0};
	const fov=S.cameraFovDegrees*Math.PI/180, tanHalf=Math.tan(fov/2);
	const random=(a,b)=>a+Math.random()*(b-a);
	const buildParticles=()=>Array.from({length:S.count},()=>{
		const x=random(-viewportWidth/2,viewportWidth/2), y=random(-viewportHeight/2,viewportHeight/2), z=random(-10,10);
		return {t:random(0,100),speed:random(.01,.015),mx:x,my:y,mz:z,cx:x,cy:y,cz:z,randomRadiusOffset:random(-1,1),drawX:0,drawY:0,drawRadius:0,drawZ:z};
	});
	const project=(x,y,z)=>{const depth=Math.max(1,S.cameraZ-z), ppw=height/(2*tanHalf*depth); return {x:width/2+x*ppw,y:height/2-y*ppw,ppw};};
	const resize=()=>{
		const b=field.getBoundingClientRect(); width=Math.max(1,b.width); height=Math.max(1,b.height); ratio=Math.min(window.devicePixelRatio||1,1.5);
		canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio); canvas.style.width=`${width}px`; canvas.style.height=`${height}px`; context.setTransform(ratio,0,0,ratio,0,0);
		viewportHeight=2*tanHalf*S.cameraZ; viewportWidth=viewportHeight*(width/height); particles=buildParticles(); virtualMouse.x=0; virtualMouse.y=0; previous=0;
	};
	const updatePointer=e=>{const b=field.getBoundingClientRect(); pointer.x=((e.clientX-b.left)/b.width)*2-1; pointer.y=-(((e.clientY-b.top)/b.height)*2-1); lastPointerMoveTime=performance.now();};
	window.addEventListener("pointermove",updatePointer,{passive:true}); window.addEventListener("resize",resize,{passive:true});
	document.addEventListener("visibilitychange",()=>{visible=!document.hidden;if(visible&&!frame){previous=0;frame=requestAnimationFrame(draw);}});
	function draw(time){
		frame=0;if(!visible)return; const seconds=time/1000; const fm=previous?Math.min(2,Math.max(.25,(time-previous)/(1000/60))):1; previous=time;
		let dx=(pointer.x*viewportWidth)/2,dy=(pointer.y*viewportHeight)/2; if(time-lastPointerMoveTime>2000){dx=Math.sin(seconds*.5)*(viewportWidth/4);dy=Math.cos(seconds)*(viewportHeight/4);} virtualMouse.x+=(dx-virtualMouse.x)*.05*fm; virtualMouse.y+=(dy-virtualMouse.y)*.05*fm;
		const tx=virtualMouse.x,ty=virtualMouse.y,rotation=seconds*S.rotationSpeed,drawList=[]; context.clearRect(0,0,width,height); context.fillStyle=S.color;
		for(const p of particles){
			p.t+=(p.speed/2)*fm; const projectionFactor=1-p.cz/50, ptx=tx*projectionFactor, pty=ty*projectionFactor, ddx=p.mx-ptx, ddy=p.my-pty, distance=Math.hypot(ddx,ddy);
			let x=p.mx,y=p.my,z=p.mz*S.depthFactor; if(distance<S.magnetRadius){const angle=Math.atan2(ddy,ddx)+rotation,wave=Math.sin(p.t*S.waveSpeed+angle)*(.5*S.waveAmplitude),deviation=p.randomRadiusOffset*(5/(S.fieldStrength+.1)),radius=S.ringRadius+wave+deviation;x=ptx+radius*Math.cos(angle);y=pty+radius*Math.sin(angle);z=p.mz*S.depthFactor+Math.sin(p.t)*S.waveAmplitude*S.depthFactor;}
			const lerp=Math.min(1,S.lerpSpeed*fm);p.cx+=(x-p.cx)*lerp;p.cy+=(y-p.cy)*lerp;p.cz+=(z-p.cz)*lerp; const currentDistance=Math.hypot(p.cx-ptx,p.cy-pty),distanceFromRing=Math.abs(currentDistance-S.ringRadius),ringScale=Math.max(0,Math.min(1,1-distanceFromRing/10)); if(ringScale<=.001)continue;
			const pulse=.8+Math.sin(p.t*S.pulseSpeed)*.2*S.particleVariance,scale=ringScale*pulse*S.particleSize,q=project(p.cx,p.cy,p.cz);p.drawX=q.x;p.drawY=q.y;p.drawRadius=S.sphereRadius*scale*q.ppw;p.drawZ=p.cz;drawList.push(p);
		}
		drawList.sort((a,b)=>a.drawZ-b.drawZ);context.globalAlpha=S.materialOpacity;for(const p of drawList){if(p.drawRadius<.15||p.drawX<-20||p.drawX>width+20||p.drawY<-20||p.drawY>height+20)continue;context.beginPath();context.arc(p.drawX,p.drawY,p.drawRadius,0,Math.PI*2);context.fill();}context.globalAlpha=1;frame=requestAnimationFrame(draw);
	}
	resize();frame=requestAnimationFrame(draw);
})();
