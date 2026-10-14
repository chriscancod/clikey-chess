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

Web ads use **Google AdSense** (AdMob is for native mobile apps). First add and
verify `clikey.store` in the AdSense account and wait for site approval. Create
a display ad unit, then copy `.env.example` to `.env` and set
`VITE_ADSENSE_CLIENT_ID` (`ca-pub-` plus the account's 16 digits) and
`VITE_ADSENSE_SLOT_ID` (the ad unit ID). The ad component only loads Google's
script on `clikey.store`, only when both values are present, and labels the
placement as sponsored. Local preview stays ad-free. Publish the account's
exact `ads.txt` seller line at `/ads.txt` after AdSense provides it; do not use
a guessed publisher ID. Ad delivery and consent requirements depend on the
approved account/site configuration.

## Vey

Game logic, interface and styles are `.vey`. `lang/` contains the small Vey
compiler/Vite adapter needed to build this repository; those compiler support
files remain TypeScript because Node and Vite load them directly.
