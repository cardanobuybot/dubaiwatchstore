#!/usr/bin/env node
/**
 * IndexNow submission for dubaiwatchstore.ae.
 *
 * Usage:
 *   node scripts/indexnow.mjs                          # submit ALL urls from sitemap.xml
 *   node scripts/indexnow.mjs /en                      # submit one path (host is prepended)
 *   node scripts/indexnow.mjs https://dubaiwatchstore.ae/en/blog
 *
 * The IndexNow key is intentionally public (hosted at /<key>.txt).
 * IndexNow is used by Bing and Yandex; Google does not accept it, but
 * Bing traffic + Copilot / BingChat is worth the ping.
 */

const HOST = "dubaiwatchstore.ae";
const KEY = "5bfc179b963d477f1efcc14d40d1cc6a";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function normalize(input) {
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  return `https://${HOST}${input.startsWith("/") ? input : "/" + input}`;
}

async function loadSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function submit(urlList) {
  if (urlList.length === 0) {
    console.log("nothing to submit");
    return;
  }
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text().catch(() => "");
  console.log(
    `IndexNow POST ${urlList.length} url(s) → HTTP ${res.status}${text ? ` · body: ${text}` : ""}`,
  );
  if (res.status !== 200 && res.status !== 202) {
    process.exitCode = 1;
    if (urlList.length <= 10) console.log("urls submitted:", urlList);
  }
}

async function verifyKeyFile() {
  const res = await fetch(KEY_LOCATION);
  if (!res.ok) throw new Error(`key file not reachable: HTTP ${res.status}`);
  const body = (await res.text()).trim();
  if (body !== KEY) throw new Error(`key file content mismatch: got "${body.slice(0, 32)}…"`);
  console.log(`key file OK · ${KEY_LOCATION}`);
}

async function main() {
  const arg = process.argv[2];
  await verifyKeyFile();
  if (arg) {
    await submit([normalize(arg)]);
  } else {
    const urls = await loadSitemap();
    console.log(`sitemap: ${urls.length} url(s) found`);
    await submit(urls);
  }
}

main().catch((e) => {
  console.error("indexnow: FATAL", e.message);
  process.exit(1);
});
