# Clikey Chess

A small, standalone chess website written in Vey (`.vey`). Play pass-and-play
with another person or challenge the local computer opponent. The opponent
searches the position on this device; it does not send game state to a server.

## Run it

Requires Node.js 22.6 or newer.

```sh
npm install
npm run dev
```

## Test and build

```sh
npm test
npm run build
```

## Publish at clikey.store

Create an empty GitHub repository named `clikey-chess`, add it as this local
repository's `origin`, and push the `main` branch. A static host can build it
with `npm run build` and publish `dist/`. Point `clikey.store` DNS at that
host and configure a single-page-app fallback to `/index.html`.

## Website ads

Web ads use **Google AdSense** (AdMob is for native mobile apps). In AdSense,
add `clikey.store` and complete the ownership verification method Google gives
you. For code verification, configure the publisher ID below and deploy it to
the domain; the app loads the AdSense script on `clikey.store` when a valid
publisher ID is present, even before an ad slot is set. Wait until AdSense marks
the site ready, create a display ad unit, then set
`VITE_ADSENSE_SLOT_ID` (the numeric ad-unit ID) and redeploy. Configure both
`VITE_ADSENSE_CLIENT_ID` (`ca-pub-` plus the account's 16 digits) and
`VITE_ADSENSE_SLOT_ID` in your host's build environment; do not commit a real
`.env` file. The placement stays inactive until both IDs exist and only loads on
`clikey.store` or its subdomains. Local preview stays ad-free. Publish the
exact `ads.txt` seller line AdSense provides at `/ads.txt`; never guess the
publisher ID. Ad delivery and consent requirements depend on the approved
account/site configuration.

For a local production build, create `.env` from `.env.example`; for hosted
builds, set the two variables in the host's environment-variable settings and
trigger a fresh build. Vite embeds `VITE_` values in client files, so use only
the public AdSense publisher and ad-unit IDs there, never secrets.

## Vey

Game logic, interface and styles are `.vey`. `lang/` contains the small Vey
compiler/Vite adapter needed to build this repository; those compiler support
files remain TypeScript because Node and Vite load them directly.

## Clikey Games hub
The existing chess page stays at `/`. Open `/hub/` for ONE MORE FLOOR and chess side-by-side in the collection. The new hub interface is written in `.vey`, using this project's existing Vey/React toolchain.

To include ONE MORE FLOOR, build the sibling Godot project's **Web** preset, then run `python3 tools/publish_web_to_hub.py` in that project. It places the generated game in this project's `public/one-more-floor/` directory. `npm run build` then bundles the hub and copies the browser game into `dist/`. Publish that built directory; a fresh checkout needs the game export before building. The `/hub/index.html` entry is generated as a real page, so `/hub/` works without a catch-all route.

`/hub.webmanifest` lets supporting browsers offer an installed window. This does not add offline support. Website navigation connects the two games, but accounts, currency and saves are not shared. The native iPhone version has its own hub menu linking to clikey.store. No website deployment is performed by the copy/build commands.


## Production Pages deployment
GitHub Pages publishes the `main` branch using `.github/workflows/pages.yml`. Keep `CNAME` set to `clikey.store`. The packaged Godot Web files in `public/one-more-floor/` are included in production so CI does not need the sibling game repository. When the game changes, re-export it and run the copy tool before publishing. Never include `ads_release.cfg` in the website; native AdMob IDs cannot be used for AdSense.

The hub has an AdSense display placement on its selection page; it is unmounted while a game is open. The publisher is configured through the existing `VITE_ADSENSE_CLIENT_ID` repository variable. Set `VITE_ADSENSE_SLOT_ID` to your web display unit's numeric slot, then redeploy. When the slot is absent there is no fake banner or configuration message. The publisher script still supports site verification. Consent messages and serving approval are managed in AdSense Privacy & messaging; the website does not replace Google's certified CMP.


## Current advertising status — October 24, 2026

AdSense loading and placements are disabled across the website while addressing inventory-value feedback. Publisher/slot environment variables do not override this. No SDK is loaded for site verification. Builds use the existing public publisher variable to add Google’s supported ownership meta tag. Keep the existing seller record in ads.txt; select Meta tag verification in AdSense if needed, without reintroducing an ad SDK on utility screens.

`npm run build` now prerenders the same Vey/React components used by the browser into seven real routes, with a sitemap and recovery 404. Guides, about, help/contact and privacy text are available without JavaScript. The existing game remains playable at the root and the collection remains at /hub/. `tools/verify-build.mjs` checks built links, metadata and the absence of ad code. No new dependencies are required.

See docs/ADSENSE-FIXES.md for verified changes and account-only actions before requesting another review. Approval remains Google's decision; there is no traffic, word-count or approval guarantee.
