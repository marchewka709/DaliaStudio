import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { CalendarDays, Clock, Users, ArrowLeft, LogOut } from "lucide-react";
import { getSession, logout } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/_types/supabase";
import { useState, useMemo, useEffect } from "react";

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
  loader: async () => {
    const session = await getSession();
    if (!session) throw redirect({ to: "/login" });
    return session;
  },
  component: Admin,
});

function Admin() {
  const session = Route.useLoaderData();
  const user = session?.user ?? "";
  const navigate = useNavigate();

  // Fetch today's bookings from Supabase
  const [bookings, setBookings] = useState<Array<{
    id: string;
    client_name: string;
    service: string;
    time: string;
    status: string;
  }>>([]);

  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .eq("date", todayStr)
          .order("time", { ascending: true });

        if (error) throw error;
        setBookings(data || []);
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, [todayStr]);

  // Calculate booked hours
  const bookedHours = useMemo(() => {
    const hours = new Set(bookings.map((b) => b.time));
    return hours;
  }, [bookings]);

  // Calculate free hours (8:00 - 16:00, Monday-Friday)
  const allHours = useMemo(() => {
    const hours: string[] = [];
    for (let h = 8; h < 16; h++) {
      hours.push(h.toString().padStart(2, "0"));
    }
    return hours;
  }, []);

  const freeHours = useMemo(() => {
    return allHours.filter((h) => !bookedHours.has(h));
  }, [allHours, bookedHours]);

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
            <p className="mt-1 text-sm text-muted-foreground">
              Zalogowano jako: <span className="font-medium text-gold">{user}</span>
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3 sm:mt-0">
            <span className="shrink-0 rounded-sm border border-gold/40 bg-gold/10 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-gold">
              Wersja demo
            </span>
            <button
              onClick={async () => {
                await logout();
                navigate({ to: "/login", replace: true });
              }}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card/50 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <LogOut className="h-3.5 w-3.5" />
              Wyloguj
            </button>
          </div>
        </header>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <section className="rounded-sm border border-border bg-card/40 p-5 sm:p-7">
            <h2 className="font-display text-2xl sm:text-3xl">Lista dzisiejszych wizyt</h2>
            <ul className="mt-6 divide-y divide-border">
              {bookings.map((a) => (
                <li
                  key={a.id}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4"
                >
                  <span className="shrink-0 font-display text-xl text-gold">{a.time}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-foreground/90">{a.client_name}</span>
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
              {allHours.map((t) => {
                const taken = bookedHours.has(t);
                return (
                  <div
                    key={t}
                    className={`rounded-sm border px-2 py-3 text-center ${
                      taken
                        ? "border-destructive/40 bg-destructive/10 text-destructive"
                        : "border-gold/40 bg-gold/5 text-gold"
                    }`}
                  >
                    <span className="block text-sm">{t}:00</span>
                    <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.16em] opacity-80">
                      {taken ? "Zajęte" : "Wolne"}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Stats cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[...bookings.map((_, i) => i), ...Array(3 - bookings.length).keys()].map((_, i) => (
            <div key={i} className="rounded-sm border border-border bg-card/50 p-6">
              <CalendarDays className="h-5 w-5 text-gold" />
              <p className="mt-4 font-display text-4xl">{bookings.length}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                Wizyty dzisiaj
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}