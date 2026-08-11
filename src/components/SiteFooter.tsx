import { MapPin, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { HOURS, SALON } from "@/lib/salon";
import { Reveal } from "./Reveal";

export function SiteFooter() {
  return (
    <footer id="kontakt" className="border-t border-border bg-secondary/30 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h2 className="font-display text-3xl leading-tight">
                Studio Urody <span className="italic text-gold-gradient">Dalia</span>
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Butikowy salon fryzjerski w sercu Wrocławia. Koloryzacja, strzyżenie
                i botaniczne rytuały pielęgnacyjne.
              </p>
            </div>

            <div>
              <h3 className="eyebrow">Kontakt</h3>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="min-w-0 text-foreground/85">
                    {SALON.street}
                    <br />
                    {SALON.city}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  <a
                    href={SALON.phoneHref}
                    className="text-foreground/85 transition-colors hover:text-gold"
                  >
                    {SALON.phone}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="eyebrow">Godziny otwarcia</h3>
              <ul className="mt-6 space-y-2.5 text-sm">
                {HOURS.map((h) => (
                  <li
                    key={h.day}
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-border/50 pb-2.5"
                  >
                    <span className="truncate text-foreground/75">{h.day}</span>
                    <span
                      className={
                        h.time === "Nieczynne" ? "text-muted-foreground" : "text-gold"
                      }
                    >
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="hairline mt-16" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Studio Urody Dalia</span>
          <Link to="/admin" className="transition-colors hover:text-gold">
            Panel salonu
          </Link>
        </div>
      </div>
    </footer>
  );
}
