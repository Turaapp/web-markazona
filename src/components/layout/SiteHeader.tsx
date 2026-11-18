import { Logo } from "@/components/layout/Logo";
import { SiteNav } from "@/components/layout/SiteNav";

/** Sticky, translucent header. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-soft/80 bg-white/75 backdrop-blur-xl backdrop-saturate-150 supports-[not(backdrop-filter:blur(0))]:bg-white">
      <div className="container-site flex flex-wrap items-center gap-x-3 gap-y-0 py-3.5 lg:gap-x-8">
        <Logo priority height={34} />
        <SiteNav />
      </div>
    </header>
  );
}
