/**
 * Compile-time parity check: ar.json and en.json must contain every key of
 * fr.json (the reference) with the same shape. A missing key fails `tsc`.
 * Extra keys and array lengths are checked by `npm run i18n:check`.
 * This file is never imported at runtime.
 */
import type fr from "../../messages/fr.json";
import type ar from "../../messages/ar.json";
import type en from "../../messages/en.json";

type DeepShape<T> = T extends string ? string : T extends readonly unknown[] ? readonly string[] : { [K in keyof T]: DeepShape<T[K]> };

type Reference = DeepShape<typeof fr>;

export type ArabicHasAllKeys = DeepShape<typeof ar> extends Reference ? true : never;
export type EnglishHasAllKeys = DeepShape<typeof en> extends Reference ? true : never;

export const parity: [ArabicHasAllKeys, EnglishHasAllKeys] = [true, true];
