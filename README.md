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
