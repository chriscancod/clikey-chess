// Validate the published artifact, not only the source components.
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
const routes = ['/', '/hub/', '/guides/chess/', '/guides/one-more-floor/', '/about/', '/privacy/', '/help/']
for (const route of routes) {
  const html = readFileSync(`dist${route}index.html`, 'utf8')
  assert.match(html, /<h1>/, route)
  assert.match(html, /Privacy &amp; storage/, route)
  assert.match(html, /Help &amp; contact/, route)
  assert.doesNotMatch(html, /adsbygoogle|googlesyndication|doubleclick|data-ad-client|data-ad-slot/, route)
  assert.ok(html.includes(`rel="canonical" href="https://clikey.store${route}"`), route)
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const target = 'dist' + match[1]
    assert.ok(existsSync(target) || existsSync(target + '/index.html'), `${route}: broken ${match[1]}`)
  }
}
assert.match(readFileSync('dist/hub/index.html', 'utf8'), /rel="manifest"/)
assert.match(readFileSync('dist/404.html', 'utf8'), /noindex/)
assert.match(readFileSync('dist/404.html', 'utf8'), /Page not found/)
for (const file of ['dist/one-more-floor/index.html', 'dist/404.html']) assert.doesNotMatch(readFileSync(file, 'utf8'), /googlesyndication|adsbygoogle|data-ad-slot/)
const entry = readFileSync('dist/index.html', 'utf8').match(/src="(\/assets\/[^" ]+\.js)"/)[1]
assert.doesNotMatch(readFileSync('dist' + entry, 'utf8'), /googlesyndication|adsbygoogle|doubleclick/)
assert.equal((readFileSync('dist/sitemap.xml', 'utf8').match(/<loc>/g) || []).length, routes.length)
console.log('PASS: 7 prerendered routes, local links, canonical URLs, manifest, 404, sitemap and ad-free HTML/entry bundle.')
