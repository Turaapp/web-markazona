#!/usr/bin/env node
/** Generates public/videos/markazona-explainer.{ary,fr,en}.vtt from src/content/video.ts. */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const src = readFileSync(new URL("../src/content/video.ts", import.meta.url), "utf8");
const json = src.slice(src.indexOf("= [") + 2, src.lastIndexOf("]") + 1)
  .replace(/^(\s*)(\w+):/gm, '$1"$2":').replace(/,(\s*[}\]])/g, "$1");
const cues = JSON.parse(json);
const ts = (s) => { const m = Math.floor(s / 60); const sec = (s % 60).toFixed(3).padStart(6, "0"); return `${String(m).padStart(2, "0")}:${sec}`; };
mkdirSync(new URL("../public/videos/", import.meta.url), { recursive: true });
for (const lang of ["ary", "fr", "en"]) {
  const body = cues.map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${c[lang]}`).join("\n\n");
  writeFileSync(new URL(`../public/videos/markazona-explainer.${lang}.vtt`, import.meta.url), `WEBVTT\n\n${body}\n`);
}
console.log(`✓ ${cues.length} cues × 3 languages`);
