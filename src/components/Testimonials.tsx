import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SALON, TESTIMONIALS } from "@/lib/salon";
import { Reveal } from "./Reveal";

export function Testimonials() {
  return (
    <section id="opinie" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="text-center">
          <span className="eyebrow">Opinie klientek</span>
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-gold text-gold sm:h-7 sm:w-7" />
              ))}
            </div>
            <p className="font-display text-5xl leading-none text-gold-gradient sm:text-6xl">
              {SALON.rating}
            </p>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              na podstawie {SALON.reviews} opinii
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <Carousel opts={{ loop: true }} className="mt-14 sm:mt-16">
            <CarouselContent>
              {TESTIMONIALS.map((t) => (
                <CarouselItem key={t.name}>
                  <figure className="mx-auto max-w-3xl rounded-sm border border-border bg-card/50 px-6 py-10 text-center sm:px-14 sm:py-14">
                    <Quote className="mx-auto h-7 w-7 text-gold/70" />
                    <blockquote className="mt-7 font-display text-xl italic leading-relaxed text-foreground/90 sm:text-2xl">
                      „{t.text}”
                    </blockquote>
                    <div className="hairline mx-auto mt-8 w-24" />
                    <figcaption className="mt-6 text-[0.68rem] uppercase tracking-[0.26em] text-gold">
                      {t.name}
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 border-gold/40 bg-background text-gold hover:bg-gold/10 hover:text-gold sm:-left-12" />
            <CarouselNext className="-right-2 border-gold/40 bg-background text-gold hover:bg-gold/10 hover:text-gold sm:-right-12" />
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
