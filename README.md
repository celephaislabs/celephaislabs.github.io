# Celephais Labs

Static company website for Celephais Laboratories.

## Local preview

```bash
python3 -m http.server 8000
```

The production site is plain HTML, CSS, and JavaScript published directly from the root of the `main` branch through GitHub Pages. There is no package installation or build step.

## Snap! Screen Translator migration

`snapscreentranslator/` contains the current Snap website, including its iPhone setup video with 12 subtitle languages, screenshots, approved wordmark icon, support, privacy, terms, and privacy choices. Selected Work links to this copy. Personal-site Google Analytics is omitted.

The September 30, 2026 deployment changes the five canonical URLs and homepage Open Graph URL to `celephaislabs.com`, and adds `/snap/` plus support/privacy/terms/privacy-choices aliases. The aliases are static HTML/JavaScript redirects with link fallbacks, not HTTP 301 redirects. Query strings and fragments are retained by the JavaScript path.

The individual app developer and existing support address remain explicit. The new company Apple account does not itself transfer the app. Privacy wording reflects optional ad personalization and iOS tracking permission, and removes the obsolete statement that ad services collect no data. Review it with the actual ads release and update the provider only when the app transfer takes effect.

Published September 30, 2026 in commit `12b61b2f`. GitHub Pages reported a successful build, and public verification passed for all five content routes, five short aliases, seven image assets, CSS, canonical tags, tutorial links, and both company `app-ads.txt` locations. The personal domain root also serves the verified company record alongside its legacy seller. No App Store metadata or Apple account transfer has been changed. Keep the personal site available until the company deployment, store metadata, and released-app links are verified. Do not change the site's CNAME or redirect jpbreuer.com's entire domain.

### Verified company AdMob authorization

The Celephais Labs AdMob account was checked directly on September 30, 2026. Its publisher is `pub-7634328471959505`, and the registered Snap iOS app ID is `ca-app-pub-7634328471959505~3930566711`. The exact seller record is:

```text
google.com, pub-7634328471959505, DIRECT, f08c47fec0942fa0
```

The record is maintained in repository-root `app-ads.txt` and `snapscreentranslator/app-ads.txt`. AdMob discovers it at `https://celephaislabs.com/app-ads.txt`. The same record is appended at `https://jpbreuer.com/app-ads.txt` while that domain remains the App Store developer website; its existing legacy seller record is retained. Pending `.example` files have been removed. Public HTTP availability and AdMob crawler verification are separate checks; confirm the latter in AdMob before relying on production serving.

The canonical source and detailed deployment/store mapping are maintained in `/Users/jpbreuer/Scripts/Translatte_old/SnapScreenTranslator/website/README.md`. Copy only the named marketing content and the `domain-root/snap/` alias directory from there; the README is not a marketing-page asset. Deploy `domain-root/app-ads.txt` to the repository root too. Website publishing and App Store transfer are separate operations.
