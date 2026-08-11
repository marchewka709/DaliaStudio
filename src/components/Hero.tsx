import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { SALON } from "@/lib/salon";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <img
          src={heroImg}
          alt="Modelka z połyskliwą koloryzacją wykonaną w Studio Urody Dalia we Wrocławiu"
          width={1600}
          height={1200}
          className="h-full w-full object-cover object-[65%_center]"
        />
      </motion.div>
      <div className="veil absolute inset-0" />
      <div className="absolute inset-0 bg-background/35" />

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 sm:px-8 sm:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">Salon fryzjerski · Wrocław</span>
            <span className="hidden h-px w-16 bg-gold/50 sm:block" />
          </div>

          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Studio Urody Dalia:
            <span className="block italic text-gold-gradient">
              Mistrzowska Koloryzacja
            </span>
            we Wrocławiu.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            Pod okiem naszych stylistek, specjalistek od metamorfoz i refleksów,
            Twoje włosy odzyskają blask.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#rezerwacja"
              className="rounded-sm bg-gold px-9 py-4 text-center text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground transition-all hover:brightness-110"
            >
              Zarezerwuj termin
            </a>
            <a
              href="#uslugi"
              className="rounded-sm border border-gold/45 px-9 py-4 text-center text-[0.72rem] uppercase tracking-[0.24em] text-foreground transition-colors hover:bg-gold/10"
            >
              Zobacz usługi
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-xs tracking-wide text-foreground/70">
              {SALON.rating} / 5 — {SALON.reviews} opinii klientek
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
