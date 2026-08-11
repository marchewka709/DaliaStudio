import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Booking } from "@/components/Booking";
import { Testimonials } from "@/components/Testimonials";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Studio Urody Dalia — Fryzjer i Koloryzacja Wrocław";
const DESC =
  "Butikowy salon fryzjerski przy ul. Kościuszki 31 we Wrocławiu. Mistrzowska koloryzacja, refleksy, strzyżenie stylistyczne i rytuały pielęgnacyjne. Rezerwacja online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Booking />
        <Testimonials />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HairSalon",
            name: "Studio Urody Dalia",
            telephone: "+48797493429",
            address: {
              "@type": "PostalAddress",
              streetAddress: "ul. Kościuszki 31",
              addressLocality: "Wrocław",
              postalCode: "50-011",
              addressCountry: "PL",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "54",
            },
            openingHours: "Mo-Fr 08:00-16:00",
          }),
        }}
      />
    </div>
  );
}
