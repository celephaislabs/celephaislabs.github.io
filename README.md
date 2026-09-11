# Celephais Labs

Static company website for Celephais Laboratories.

## Local preview

```bash
python3 -m http.server 8000
```

The production site is plain HTML, CSS, and JavaScript published directly from the root of the `main` branch through GitHub Pages. There is no package installation or build step.

## Snap! Screen Translator migration

`snapscreentranslator/` is a standalone copy of the current jpbreuer.com site, including its screenshots, branding, support, privacy, terms, and privacy choices. Selected Work links to this copy.

During preparation, jpbreuer.com remains the canonical site. Canonical tags, current support contact, legal wording, and App Store links are retained. The personal site's Google Analytics tag is omitted from the Celephais copy. Neither the personal site nor the app/store configuration is changed.

When the Celephais account is active, review legal ownership and support details, switch canonical and Open Graph URLs to celephaislabs.com, update store metadata and in-app website links, and configure company analytics if needed. Before changing the store developer website, confirm the correct publisher authorization at the new domain's root `/app-ads.txt`; the mirrored subdirectory file alone is insufficient. Redirects from the old site should only be introduced as part of that later cutover.
