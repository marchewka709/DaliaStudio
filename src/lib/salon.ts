export const SALON = {
  name: "Studio Urody Dalia",
  street: "ul. Kościuszki 31",
  city: "50-011 Wrocław",
  phone: "797 493 429",
  phoneHref: "tel:+48797493429",
  rating: 4.9,
  reviews: 54,
};

export type Service = {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    id: "koloryzacja",
    title: "Koloryzacja i Refleksy",
    duration: "180 min",
    price: "od 320 zł",
    description:
      "Autorskie techniki balayage, sombré i refleksów. Kolor budowany warstwami, dopasowany do karnacji i struktury włosa.",
  },
  {
    id: "strzyzenie",
    title: "Strzyżenie Stylistyczne",
    duration: "90 min",
    price: "od 150 zł",
    description:
      "Precyzyjne cięcie oparte na geometrii twarzy. Fryzura, która układa się sama każdego poranka.",
  },
  {
    id: "rytualy",
    title: "Rytuały Pielęgnacyjne",
    duration: "60 min",
    price: "od 120 zł",
    description:
      "Botaniczne kuracje regenerujące, rytuał skóry głowy i nabłyszczanie przywracające lustrzany połysk.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Karolina Sidor",
    text: "Stylistka ze Studia Dalia to prawdziwa artystka. Wyszłam z koloryzacją, o jakiej marzyłam od lat — refleksy wyglądają naturalnie i pięknie mienią się w słońcu.",
  },
  {
    name: "Kasia S.",
    text: "Profesjonalizm i niesamowita atmosfera. Zawsze wychodzę zadowolona, a moje włosy są w o wiele lepszej kondycji niż wcześniej.",
  },
  {
    name: "Zuzanna Łuc",
    text: "Najlepsze miejsce we Wrocławiu na metamorfozę. Świetna rozmowa, doradztwo i efekt dokładnie taki, jak ustalałyśmy.",
  },
];

export const HOURS = [
  { day: "Poniedziałek", time: "8:00 – 16:00" },
  { day: "Wtorek", time: "8:00 – 16:00" },
  { day: "Środa", time: "8:00 – 16:00" },
  { day: "Czwartek", time: "8:00 – 16:00" },
  { day: "Piątek", time: "8:00 – 16:00" },
  { day: "Sobota", time: "Nieczynne" },
  { day: "Niedziela", time: "Nieczynne" },
];

export const TIME_SLOTS = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

/** Deterministyczna symulacja zajętych godzin dla danego dnia (demo). */
export function bookedSlots(date: Date): string[] {
  const key =
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  return TIME_SLOTS.filter((_, i) => ((key * 7 + i * 13) % 5) < 2);
}
