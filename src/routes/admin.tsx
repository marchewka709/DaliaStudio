import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, Users, ArrowLeft } from "lucide-react";
import { HOURS, TIME_SLOTS } from "@/lib/salon";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel salonu — Studio Urody Dalia" },
      {
        name: "description",
        content:
          "Panel administracyjny Studio Urody Dalia: lista dzisiejszych wizyt i zarządzanie terminami.",
      },
      { property: "og:title", content: "Panel salonu — Studio Urody Dalia" },
      {
        property: "og:description",
        content: "Lista dzisiejszych wizyt i zarządzanie terminami.",
      },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admin,
});

const TODAY = [
  { time: "9:00", client: "Karolina Sidor", service: "Koloryzacja i Refleksy", status: "Potwierdzona" },
  { time: "11:00", client: "Kasia S.", service: "Strzyżenie Stylistyczne", status: "Potwierdzona" },
  { time: "13:00", client: "Zuzanna Łuc", service: "Rytuały Pielęgnacyjne", status: "Oczekuje" },
  { time: "15:00", client: "Marta W.", service: "Koloryzacja i Refleksy", status: "Oczekuje" },
];

const BOOKED = new Set(TODAY.map((a) => a.time));

function Admin() {
  return (
    <div className="min-h-screen bg-background px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Powrót na stronę
        </Link>

        <header className="mt-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <span className="eyebrow">Panel salonu</span>
            <h1 className="mt-3 truncate font-display text-4xl sm:text-5xl">
              Studio Urody <span className="italic text-gold-gradient">Dalia</span>
            </h1>
          </div>
          <span className="shrink-0 rounded-sm border border-gold/40 bg-gold/10 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-gold">
            Wersja demo
          </span>
        </header>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: CalendarDays, label: "Wizyty dzisiaj", value: TODAY.length },
            { icon: Clock, label: "Wolne godziny", value: TIME_SLOTS.length - TODAY.length },
            { icon: Users, label: "Nowe klientki", value: 2 },
          ].map((s) => (
            <div key={s.label} className="rounded-sm border border-border bg-card/50 p-6">
              <s.icon className="h-5 w-5 text-gold" />
              <p className="mt-4 font-display text-4xl">{s.value}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-sm border border-border bg-card/40 p-5 sm:p-7">
            <h2 className="font-display text-2xl sm:text-3xl">Lista dzisiejszych wizyt</h2>
            <ul className="mt-6 divide-y divide-border">
              {TODAY.map((a) => (
                <li
                  key={a.time}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4"
                >
                  <span className="shrink-0 font-display text-xl text-gold">{a.time}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-foreground/90">
                      {a.client}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {a.service}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-sm border px-3 py-1 text-[0.58rem] uppercase tracking-[0.16em] ${
                      a.status === "Potwierdzona"
                        ? "border-gold/40 text-gold"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {a.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-sm border border-border bg-card/40 p-5 sm:p-7">
            <h2 className="font-display text-2xl sm:text-3xl">Zarządzanie terminami</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Dzisiaj, poniedziałek – piątek 8:00 – 16:00. Każdy kafelek to godzina wizyty.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-destructive" /> Zajęte
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gold" /> Wolne
              </span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((t) => {
                const taken = BOOKED.has(t);
                return (
                  <div
                    key={t}
                    className={`rounded-sm border px-2 py-3 text-center ${
                      taken
                        ? "border-destructive/40 bg-destructive/10 text-destructive"
                        : "border-gold/40 bg-gold/5 text-gold"
                    }`}
                  >
                    <span className="block text-sm">{t}</span>
                    <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.16em] opacity-80">
                      {taken ? "Zajęte" : "Wolne"}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 space-y-2">
              {HOURS.slice(0, 5).map((h) => (
                <div
                  key={h.day}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-border/50 pb-2 text-xs"
                >
                  <span className="truncate text-foreground/75">{h.day}</span>
                  <span className="text-gold">{h.time}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
