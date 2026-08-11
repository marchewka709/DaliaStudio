import { SERVICES } from "@/lib/salon";
import { Reveal } from "./Reveal";
import color from "@/assets/service-color.jpg";
import cut from "@/assets/service-cut.jpg";
import ritual from "@/assets/service-ritual.jpg";

const IMAGES: Record<string, string> = {
  koloryzacja: color,
  strzyzenie: cut,
  rytualy: ritual,
};

export function Services() {
  return (
    <section id="uslugi" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Nasze specjalizacje</span>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
            Trzy filary naszej <span className="italic text-gold-gradient">pracowni</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Każda wizyta zaczyna się od konsultacji — analizy struktury włosa, kondycji
            skóry głowy i Twojego stylu życia.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:mt-20 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.12}>
              <article className="group relative h-[26rem] overflow-hidden rounded-sm border border-border sm:h-[32rem]">
                <img
                  src={IMAGES[s.id]}
                  alt={s.title}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="veil absolute inset-0 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-background/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span className="text-[0.62rem] uppercase tracking-[0.28em] text-gold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">
                    {s.title}
                  </h3>

                  <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="pt-4 text-sm leading-relaxed text-foreground/80">
                        {s.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-gold/25 pt-4 text-[0.68rem] uppercase tracking-[0.2em]">
                    <span className="text-muted-foreground">{s.duration}</span>
                    <span className="text-gold">{s.price}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
