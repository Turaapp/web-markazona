#!/usr/bin/env node
/**
 * Verifies that messages/ar.json and messages/en.json have exactly the same
 * keys as messages/fr.json (no missing, no extra), that array lengths match,
 * and that no value is empty. Exits 1 on any problem.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dir = new URL("../messages/", import.meta.url);
const load = (l) => JSON.parse(readFileSync(fileURLToPath(new URL(`${l}.json`, dir)), "utf8"));

const reference = "fr";
const others = ["ar", "en"];

function flatten(obj, prefix = "", out = new Map()) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) out.set(path, { type: "array", length: value.length, empty: value.some((v) => !String(v).trim()) });
    else if (value && typeof value === "object") flatten(value, path, out);
    else out.set(path, { type: "string", empty: !String(value).trim() });
  }
  return out;
}

const ref = flatten(load(reference));
const problems = [];

for (const [path, info] of ref) if (info.empty) problems.push(`${reference}: empty value at ${path}`);

for (const locale of others) {
  const cur = flatten(load(locale));
  for (const [path, info] of ref) {
    const c = cur.get(path);
    if (!c) problems.push(`${locale}: missing ${path}`);
    else if (c.type !== info.type) problems.push(`${locale}: ${path} should be ${info.type}`);
    else if (info.type === "array" && c.length !== info.length) problems.push(`${locale}: ${path} has ${c.length} items, expected ${info.length}`);
    else if (c.empty) problems.push(`${locale}: empty value at ${path}`);
  }
  for (const path of cur.keys()) if (!ref.has(path)) problems.push(`${locale}: extra key ${path} (not in ${reference}.json)`);
}

if (problems.length) {
  console.error(`✗ ${problems.length} translation problem(s):\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`✓ ${ref.size} keys, identical in ${[reference, ...others].join(", ")}`);
