# AdSense remediation — October 24, 2026

VERIFIED source findings: the previous hub called ChessAd on a game-selection/navigation screen; chess called it beside controls. ChessAd loaded Google's SDK whenever a configured publisher was present, even without a display slot. Auto ads could therefore run independently of the manual placement. Delivered HTML had an empty React root before JavaScript.

## Changes

- Removed all calls to the ad component and disabled the adapter. Removed unused ad CSS. Publisher and slot variables cannot re-enable serving. No SDK on game, hub, guide, error, loading or direct-game pages.
- Added original, implementation-specific chess and castle guides, about, help/contact and privacy/storage pages. Existing playable games remain central. No copied policy text, fake testimonials, claimed traffic, invented operator credentials or stock content.
- Prerendered seven real routes from the same Vey/React components used in the browser; no crawler/user differences. Built HTML includes content, links, titles and descriptions. Canonical links, sitemap, robots and a recovery 404 are generated.
- Preserved manifest, game files, CNAME and ads.txt. Existing public publisher variable produces a google-adsense-account meta tag for ownership verification without loading ads.
- Added route rendering, content, disabled-ad and error-state tests; build checks actual HTML, links, metadata, manifest, sitemap and entry-bundle absence of advertising code.

## Policy references checked

- https://support.google.com/publisherpolicies/answer/11112688?hl=en — no ads on no-content, navigation or behavioral screens.
- https://support.google.com/adsense/answer/10015918 — original value, useful content, clear navigation and review through the Sites page.
- https://support.google.com/adsense/answer/7584263?hl=en — supported Meta tag ownership verification option.

Google makes the approval decision. Content additions and disabled placements do not prove genuine audience interest, guarantee approval, or establish a required traffic/page/word-count threshold. No such threshold is claimed. Maintain the guides as gameplay changes and correct actual reader-reported problems; do not manufacture visits or encourage ad clicks.

## Verification and deploy checklist

- Tests: `npm test` (12 pass, 0 fail).
- Build: `npm run build`; seven prerendered routes, local links, canonical URLs, manifest, sitemap, recovery 404 and ad-free HTML/entry bundle verified.
- Browser: guides render; e2→e4 works after root hydration (Black to move, one ply). Full controller/mobile gameplay not re-tested in this content change.
- Existing hosting workflow preserved; CI runs tests and build. No dependency added, account created or game save changed.
- Rollback: revert this remediation commit if chess input/hydration or game loading fails. Reverting also restores prior ad behavior; if rollback is needed, leave the ad-disable changes in place or deploy a separate ad-disable patch.
- After deploy: check /, /hub/, both guides, /about/, /help/, /privacy/, sitemap and a missing route; confirm live HTML contains content and the entry bundle has no ad loader. Do not request a review until the published changes are verified.

## Account owner actions

1. In AdSense Sites, open clikey.store. If ownership must be verified again, use Meta tag (or the already provided ads.txt method), rather than restoring the SDK on the hub. The meta tag comes from the existing public publisher variable during CI build.
2. Inspect Auto ads settings and keep serving off during review preparation. This build does not change account settings. Google CMP/consent requirements and future eligible placements need review before adding serving code again.
3. Review the published guides and disclosures for accuracy, then request review from the account's Sites page. No review request was submitted by this code change.

No legal-compliance or approval certification is made. Account-only decisions remain with the account owner.
