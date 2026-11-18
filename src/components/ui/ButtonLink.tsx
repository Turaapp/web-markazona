import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/Icon";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "outline-inverse" | "dark";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white shadow-btn hover:bg-brand-600 hover:text-white hover:shadow-btn-hover active:bg-brand-700",
  secondary: "bg-white text-ink border-line-strong shadow-xs hover:border-ink-2/40 hover:text-ink",
  ghost: "bg-transparent text-ink hover:bg-surface hover:text-ink",
  dark: "bg-navy text-white hover:bg-ink hover:text-white",
  inverse: "bg-white text-navy hover:bg-brand-50 hover:text-navy",
  "outline-inverse": "bg-white/5 text-white border-white/25 hover:bg-white/10 hover:border-white/40 hover:text-white",
};

type Props = {
  /** Internal paths are locale-free ("/contact") and get the current locale prefix. */
  href: string;
  variant?: Variant;
  size?: "md" | "sm" | "lg";
  /** Show a trailing arrow that slides on hover (mirrored in RTL). */
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** The design's .btn — locale-aware Link for internal routes, <a> for external ones. */
export function ButtonLink({ href, variant = "primary", size = "md", arrow, className, children }: Props) {
  const classes = cn(
    "btn group",
    variants[variant],
    size === "sm" && "h-[42px] rounded-xl px-[18px] text-sm",
    size === "lg" && "h-[58px] rounded-2xl px-7 text-base",
    className,
  );
  const content = (
    <>
      {children}
      {arrow && (
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          <Icon name="arrow" size={18} strokeWidth={2.2} />
        </span>
      )}
    </>
  );
  if (isExternal(href)) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
