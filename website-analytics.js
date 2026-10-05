(() => {
	'use strict';
	const id = 'G-GYZG54XVGT';
	const hosts = ['celephaislabs.com', 'www.celephaislabs.com', 'sailcat.space', 'www.sailcat.space'];
	const path = window.location.pathname;
	if (!hosts.includes(window.location.hostname) || path.includes('hero-preview')) return;
	if (window.location.hostname.endsWith('sailcat.space') && !['/', '/protocols/', '/setup/', '/support/', '/privacy/', '/privacy-choices/', '/terms/', '/acceptable-use/'].includes(path)) return;
	if (document.querySelector('meta[http-equiv="refresh"]')) return;
	const key = 'celephais-website-analytics-v1';
	const blocked = navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;
	let loaded = false;
	let choice = null;
	try { choice = localStorage.getItem(key); } catch (_) { /* Consent remains optional when storage is unavailable. */ }
	function start() {
		if (loaded || blocked) return;
		loaded = true;
		window['ga-disable-' + id] = false;
		window.dataLayer = window.dataLayer || [];
		window.gtag = function () { window.dataLayer.push(arguments); };
		window.gtag('consent', 'default', {
			analytics_storage: 'granted', ad_storage: 'denied',
			ad_user_data: 'denied', ad_personalization: 'denied'
		});
		window.gtag('js', new Date());
		let referrer = '';
		try { referrer = new URL(document.referrer).origin + '/'; } catch (_) { /* No referrer. */ }
		window.gtag('config', id, {
			page_location: window.location.origin + path,
			page_referrer: referrer,
			allow_google_signals: false,
			allow_ad_personalization_signals: false,
			cookie_expires: 60 * 60 * 24 * 90,
			cookie_update: false
		});
		const tag = document.createElement('script');
		tag.async = true;
		tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
		document.head.append(tag);
	}
	function save(value) {
		choice = value;
		try { localStorage.setItem(key, value); } catch (_) { /* Respect the choice for this page. */ }
		if (value === 'granted') start();
		else {
			window['ga-disable-' + id] = true;
			for (const cookie of document.cookie.split(';')) {
				const name = cookie.trim().split('=')[0];
				if (!/^_ga(?:_|$)/.test(name)) continue;
				for (const domain of [null, window.location.hostname, '.' + window.location.hostname.replace(/^www\./, '')]) {
					document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '') + '; SameSite=Lax';
				}
			}
		}
	}
	const style = document.createElement('style');
	style.textContent = `.website-analytics-choice{position:fixed;left:16px;bottom:16px;z-index:9999;max-width:400px;padding:18px;border:1px solid #536077;border-radius:14px;background:#101622;color:#edf1f8;font:14px/1.5 system-ui,sans-serif;box-shadow:0 8px 30px #0005}.website-analytics-choice p{margin:0 0 12px}.website-analytics-choice a{color:#a6c8ff}.website-analytics-choice button,.website-analytics-settings{font:inherit;cursor:pointer;border:1px solid #687892;border-radius:7px;padding:8px 12px;background:#182335;color:#edf1f8}.website-analytics-choice button+button{margin-left:8px}.website-analytics-settings{position:fixed;right:12px;bottom:12px;z-index:9998;font:12px system-ui,sans-serif;padding:6px 9px}.website-analytics-choice button:focus-visible,.website-analytics-settings:focus-visible{outline:3px solid #a6c8ff;outline-offset:3px}@media(max-width:480px){.website-analytics-choice{left:12px;right:12px;bottom:48px;max-width:none}}`;
	document.head.append(style);
	const settings = document.createElement('button');
	settings.className = 'website-analytics-settings';
	settings.textContent = 'Cookie choices';
	settings.type = 'button';
	function show(focus) {
		if (document.querySelector('.website-analytics-choice')) return;
		const panel = document.createElement('section');
		panel.className = 'website-analytics-choice';
		panel.setAttribute('aria-label', 'Optional website analytics');
		const copy = document.createElement('p');
		copy.textContent = blocked ? 'Your browser privacy preference disables website analytics.' : 'Allow optional Google Analytics cookies to help us understand visits to our public websites? This does not measure app use or VPN activity.';
		const policy = document.createElement('a');
		policy.href = 'https://celephaislabs.com/website-privacy.html';
		policy.textContent = 'Website privacy details';
		copy.append(' ', policy);
		panel.append(copy);
		for (const [label, value] of blocked ? [['Close', 'denied']] : [['Decline', 'denied'], ['Allow analytics', 'granted']]) {
			const button = document.createElement('button');
			button.type = 'button';
			button.textContent = label;
			button.addEventListener('click', () => {
				const wasLoaded = loaded;
				save(value);
				panel.remove();
				settings.focus();
				if (wasLoaded && value === 'denied') window.location.reload();
			});
			panel.append(button);
		}
		document.body.append(panel);
		if (focus) panel.querySelector('button').focus();
	}
	settings.addEventListener('click', () => show(true));
	document.body.append(settings);
	if (choice === 'granted' && !blocked) start();
	else if (!choice && !blocked) show(false);
})();
