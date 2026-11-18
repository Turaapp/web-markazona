import { cn } from "@/lib/utils";

/** Browser window chrome around product mockups. Decorative: content inside is aria-hidden by callers. */
export function BrowserFrame({ url, className, children }: { url: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-[18px] border border-line bg-white shadow-mock", className)}>
      <div className="flex h-10 items-center gap-2 border-b border-line-soft bg-surface-2 px-4">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span dir="ltr" className="ms-3 flex h-6 min-w-0 flex-1 items-center justify-center truncate rounded-md border border-line-soft bg-white px-3 font-sans text-[11px] text-faint sm:max-w-[320px] sm:flex-none sm:mx-auto">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="me-1.5 shrink-0" aria-hidden="true">
            <path d="M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {url}
        </span>
        <span className="hidden w-[52px] sm:block" />
      </div>
      {children}
    </div>
  );
}

/** Phone mockup (teacher roll call, parent portal). */
export function PhoneFrame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative w-[260px] rounded-[42px] bg-navy p-[9px] shadow-float ring-1 ring-black/10", className)}>
      <div className="absolute start-1/2 top-[18px] z-10 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-navy rtl:translate-x-1/2" />
      <div className="relative h-[520px] overflow-hidden rounded-[34px] bg-white">{children}</div>
    </div>
  );
}
