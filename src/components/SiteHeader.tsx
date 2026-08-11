import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#rezerwacja", label: "Rezerwacja" },
  { href: "#opinie", label: "Opinie" },
  { href: "#kontakt", label: "Kontakt" },
];

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "border-b border-border bg-background/95 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-5",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="flex min-w-0 flex-col leading-none">
          <span className="truncate font-display text-xl tracking-wide text-foreground sm:text-2xl">
            Studio Urody <span className="text-gold-gradient">Dalia</span>
          </span>
          <span className="mt-1 hidden text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground sm:block">
            Wrocław · Kościuszki 31
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.7rem] uppercase tracking-[0.22em] text-foreground/75 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <a
            href="#rezerwacja"
            className="hidden rounded-sm bg-gold px-6 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-primary-foreground transition-all hover:brightness-110 sm:inline-block"
          >
            Umów wizytę
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/98 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-2 sm:px-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-4 text-xs uppercase tracking-[0.22em] text-foreground/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#rezerwacja"
              onClick={() => setOpen(false)}
              className="mt-4 mb-2 rounded-sm bg-gold px-6 py-3 text-center text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground"
            >
              Umów wizytę
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
