import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { format, isBefore, startOfToday } from "date-fns";
import { pl } from "date-fns/locale";
import { Check, ChevronLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Reveal } from "./Reveal";
import { supabase } from "@/lib/supabase";
import { SERVICES, TIME_SLOTS } from "@/lib/salon";
import { cn } from "@/lib/utils";

const STEPS = ["Usługa", "Termin", "Godzina", "Dane"];

export function Booking() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const serviceTitle = useMemo(
    () => SERVICES.find((s) => s.id === service)?.title ?? "",
    [service],
  );

  // Provide a default date if none selected - use today
  const effectiveDate = date ?? startOfToday();

  // Fetch booked slots from Supabase
  const booked = useMemo(() => {
    if (!date) return [];
    
    const formattedDate = format(effectiveDate, "yyyy-MM-dd");
    const { data, error } = supabase
      .from("availability")
      .select("hour")
      .eq("date", formattedDate)
      .eq("is_booked", true);
    
    if (error) {
      console.error("Error fetching booked slots:", error);
      return [];
    }
    
    return data?.map((a: any) => a.hour) || [];
  }, [date, effectiveDate]);

  const disabledDay = (d: Date) => {
    const day = d.getDay();
    return day === 0 || day === 6 || isBefore(d, startOfToday());
  };

  const submit = async () => {
    if (!name.trim() || phone.trim().length < 7) {
      toast.error("Uzupełnij imię oraz numer telefonu.");
      return;
    }
    
    // Check if the selected time slot is available
    if (time && booked.includes(time)) {
      toast.error("Ten termin jest już zajęty. Wybierz inny czas.");
      return;
    }

    try {
      // Create booking in Supabase
      const { error } = await supabase.from("bookings").insert({
        user_id: "", // Will be filled by RLS
        service_id: service || "",
        date: format(effectiveDate, "yyyy-MM-dd"),
        hour: time,
        client_name: name,
        client_phone: phone,
        status: "pending",
      });

      if (error) throw error;

      setDone(true);
      toast.success("Prośba o rezerwację wysłana. Potwierdzimy ją telefonicznie.");
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error("Wystąpił błąd podczas zapisywania rezerwacji: " + err.message);
    }
  };

  return (
    <section id="rezerwacja" className="relative border-y border-border bg-secondary/40 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="text-center">
          <span className="eyebrow">Rezerwacja online</span>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
            Zarezerwuj swój <span className="italic text-gold-gradient">termin</span>
          </h2>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-[0.68rem] uppercase tracking-[0.2em] text-gold">
              Wolne terminy w tym tygodniu
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 rounded-sm border border-border bg-background/60 p-5 backdrop-blur-sm sm:mt-16 sm:p-10">
            {done ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-gold/10">
                  <Check className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mt-6 font-display text-3xl">Dziękujemy, {name}!</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Twoja prośba o wizytę — <span className="text-gold">{serviceTitle}</span>,{" "}
                  {date && format(date, "d MMMM yyyy", { locale: pl })}, godz. {time} —
                  została przyjęta. Skontaktujemy się pod numerem {phone}, aby ją
                  potwierdzić.
                </p>
                <button
                  onClick={() => {
                    setDone(false);
                    setStep(0);
                    setService(null);
                    setDate(undefined);
                    setTime(null);
                    setName("");
                    setPhone("");
                  }}
                  className="mt-8 text-[0.68rem] uppercase tracking-[0.22em] text-gold underline-offset-8 hover:underline"
                >
                  Nowa rezerwacja
                </button>
              </div>
            ) : (
              <>
                <ol className="mb-8 grid grid-cols-4 gap-2">
                  {STEPS.map((label, i) => (
                    <li key={label} className="min-w-0">
                      <div
                        className={cn(
                          "h-px w-full transition-colors duration-500",
                          i <= step ? "bg-gold" : "bg-border",
                        )}
                      />
                      <span
                        className={cn(
                          "mt-3 block truncate text-[0.6rem] uppercase tracking-[0.18em] transition-colors sm:text-[0.68rem]",
                          i <= step ? "text-gold" : "text-muted-foreground",
                        )}
                      >
                        {i + 1}. {label}
                      </span>
                    </li>
                  ))}
                </ol>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step === 0 && (
                      <div className="grid gap-3">
                        {SERVICES.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => {
                              setService(s.id);
                              setStep(1);
                            }}
                            className={cn(
                              "group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-sm border px-5 py-5 text-left transition-all",
                              service === s.id
                                ? "border-gold bg-gold/10"
                                : "border-border hover:border-gold/60 hover:bg-gold/5",
                            )}
                          >
                            <span className="min-w-0">
                              <span className="block font-display text-xl sm:text-2xl">
                                {s.title}
                              </span>
                              <span className="mt-1 block text-xs text-muted-foreground">
                                {s.duration}
                              </span>
                            </span>
                            <span className="shrink-0 text-[0.7rem] uppercase tracking-[0.18em] text-gold">
                              {s.price}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 1 && (
                      <div className="flex flex-col items-center">
                        <Calendar
                          mode="single"
                          selected={effectiveDate}
                          onSelect={(d) => {
                            setDate(d);
                            setTime(null);
                            if (d) setStep(2);
                          }}
                          disabled={disabledDay}
                          locale={pl}
                          className={cn(
                            "pointer-events-auto rounded-sm border border-gold/30 bg-background/70 p-4 shadow-[0_0_40px_-24px_hsl(var(--gold))]",
                            "[--cell-size:2.5rem] sm:[--cell-size:2.9rem]",
                            "[&_.rdp-month_caption]:font-display [&_.rdp-month_caption]:text-xl",
                            "[&_[data-selected-single=true]]:bg-gold [&_[data-selected-single=true]]:text-primary-foreground",
                            "[&_button:hover]:bg-gold/15 [&_button:hover]:text-gold",
                          )}
                        />
                        <p className="mt-4 text-center text-xs text-muted-foreground">
                          Przyjmujemy od poniedziałku do piątku, w godzinach 8:00 – 16:00.
                        </p>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <div className="mb-5 flex flex-wrap items-center justify-center gap-4 text-[0.62rem] uppercase tracking-[0.18em]">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <span className="h-2 w-2 rounded-full bg-gold" /> Wolne
                          </span>
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <span className="h-2 w-2 rounded-full bg-destructive" /> Zajęte
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                          {TIME_SLOTS.map((t) => {
                            const taken = booked.includes(t);
                            return (
                              <button
                                key={t}
                                disabled={taken}
                                onClick={() => {
                                  setTime(t);
                                  setStep(3);
                                }}
                                className={cn(
                                  "rounded-sm border py-4 text-sm tracking-wide transition-all",
                                  taken
                                    ? "cursor-not-allowed border-destructive/40 bg-destructive/10 text-destructive/80 line-through"
                                    : time === t
                                      ? "border-gold bg-gold text-primary-foreground"
                                      : "border-border hover:border-gold/60 hover:bg-gold/5",
                                )}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="grid gap-5">
                        <div className="rounded-sm border border-gold/30 bg-gold/5 p-5">
                          <div className="flex items-center gap-2 text-gold">
                            <Sparkles className="h-4 w-4" />
                            <span className="text-[0.65rem] uppercase tracking-[0.22em]">
                              Podsumowanie
                            </span>
                          </div>
                          <p className="mt-3 font-display text-xl leading-snug sm:text-2xl">
                            {serviceTitle}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {date && format(date, "EEEE, d MMMM yyyy", { locale: pl })} ·{" "}
                            {time}
                          </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Input
                            placeholder="Imię i nazwisko"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-12 rounded-sm border-border bg-transparent"
                          />
                          <Input
                            placeholder="Numer telefonu"
                            inputMode="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-12 rounded-sm border-border bg-transparent"
                          />
                        </div>
                        <button
                          onClick={submit}
                          className="rounded-sm bg-gold px-8 py-4 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground transition-all hover:brightness-110"
                        >
                          Potwierdź rezerwację
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="mt-8 inline-flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" /> Wstecz
                  </button>
                )}
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}