import assert from "node:assert/strict";
import test from "node:test";

async function render() {
	const workerUrl = new URL("../dist/server/index.js", import.meta.url);
	workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
	const { default: worker } = await import(workerUrl.href);

	return worker.fetch(
		new Request("http://localhost/", { headers: { accept: "text/html" } }),
		{ ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
		{ waitUntil() {}, passThroughOnException() {} },
	);
}

test("server-renders the Celephais Labs portfolio", async () => {
	const response = await render();
	assert.equal(response.status, 200);
	assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

	const html = await response.text();
	assert.match(html, /Celephais Labs \| Software Engineering/);
	assert.match(html, /Engineering for/);
	assert.match(html, /SailCat VPN/);
	assert.match(html, /Geant4 &amp; MEGAlib/);
	assert.match(html, /Previously consulted for science and research organisations/);
	assert.match(html, /Industry and logistics companies/);
	assert.match(html, /European Space Agency/);
	assert.match(html, /https:\/\/www\.esa\.int\//);
	assert.match(html, /esa-logo\.jpg/);
	assert.match(html, /Websites for artists, teams, events &amp; professionals/);
	assert.match(html, /Snap! Screen Translator/);
	assert.match(html, /CRM &amp; project management/);
	assert.match(html, /https:\/\/sailcat\.space/);
	assert.match(html, /sailcat-icon\.png/);
	assert.match(html, /nasa-logo\.svg/);
	assert.match(html, /thermo-fisher-logo\.svg/);
	assert.match(html, /axisray-logo\.png/);
	assert.match(html, /heartboner-tattoos\.com/);
	assert.match(html, /jpbreuer\.com\/snapscreentranslator/);
	assert.doesNotMatch(html, /DTU Space/);
	assert.match(html, /celephais\.labs@gmail\.com/);
	assert.match(html, /id="contact"/);
	assert.match(html, /action="https:\/\/formsubmit\.co\/celephais\.labs@gmail\.com"/);
	assert.match(html, /name="message"/);
	assert.doesNotMatch(html, /mailto:/i);
	assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});
