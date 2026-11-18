"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Monthly / annual switch. Both price sets are server-rendered; this only
 * flips a data attribute on the pricing grid, which CSS uses to show one set.
 */
export function BillingToggle({ label, monthly, yearly, badge, targetId }: { label: string; monthly: string; yearly: string; badge: string; targetId: string }) {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");

  const choose = (p: "monthly" | "yearly") => {
    setPeriod(p);
    document.getElementById(targetId)?.setAttribute("data-period", p);
  };

  return (
    <div role="radiogroup" aria-label={label} className="inline-flex items-center gap-1 rounded-full border border-line bg-white p-1 shadow-card">
      {(["monthly", "yearly"] as const).map((p) => (
        <button
          key={p}
          type="button"
          role="radio"
          aria-checked={period === p}
          onClick={() => choose(p)}
          className={cn(
            "flex h-10 items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors duration-300",
            period === p ? "bg-navy text-white" : "text-ink-2 hover:text-ink",
          )}
        >
          {p === "monthly" ? monthly : yearly}
          {p === "yearly" && (
            <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-extrabold", period === p ? "bg-teal-300 text-navy" : "bg-teal-50 text-teal-700")}>{badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}
