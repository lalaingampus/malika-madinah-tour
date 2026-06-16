import awalMusimImage from "../../assets/WhatsApp Image 2026-05-09 at 09.29.33.jpeg";
import plusThaifImage from "../../assets/WhatsApp Image 2026-06-06 at 23.43.35.jpeg";
import sekamarBer4Image from "../../assets/WhatsApp Image 2026-06-10 at 17.50.14.jpeg";

export const packageCards = [
  {
    id: "plus-thaif",
    title: "Paket Umroh Plus Thaif",
    date: "21 September 2026",
    duration: "12 Hari",
    departure: "September 2026",
    category: "Plus Thaif",
    airport: "Soekarno-Hatta (CGK)",
    airline: "Qatar Airways / Oman Air / Etihad",
    hotelMakkah: "Jada Ajyad",
    hotelMadinah: "Mukhtar Al Gharbi",
    promo: true,
    seats: 20,
    tags: ["City Tour Thaif", "Visa", "Makan 3x", "Air Zam-Zam 5L"],
    price: "Rp 25.000.000",
    image: plusThaifImage,
    badge: "Promo",
    sold: false,
    description:
      "Program umroh plus Thaif dengan city tour, hotel strategis, dan pilihan maskapai premium untuk perjalanan ibadah yang nyaman.",
    includes: [
      "Tiket ekonomi PP",
      "Visa umroh resmi",
      "Makan 3 kali sehari",
      "City tour Makkah dan Madinah",
      "City tour Thaif",
      "Transportasi terbaik, air zam-zam 5 liter, dan handling JKT & Saudi",
    ],
  },
  {
    id: "awal-musim",
    title: "Paket Umroh Awal Musim",
    date: "28 Juni 2026",
    duration: "9 Hari",
    departure: "Juni 2026",
    category: "Awal Musim",
    airport: "Soekarno-Hatta (CGK)",
    airline: "Etihad / Oman Air",
    hotelMakkah: "Waha Ajyad",
    hotelMadinah: "Mukhtar Al Gharbi",
    promo: true,
    seats: 0,
    tags: ["Visa", "Manasik", "Airport Handling", "Air Zam-Zam 5L"],
    price: "Rp 26.000.000",
    image: awalMusimImage,
    badge: "Promo",
    sold: true,
    description:
      "Paket umroh awal musim dengan suasana lebih nyaman, pembimbing berpengalaman, dan fasilitas lengkap sesuai brosur.",
    includes: [
      "Tiket pesawat PP",
      "Perlengkapan umroh lengkap",
      "Manasik dan bimbingan ibadah",
      "Airport handling",
      "Visa umroh resmi",
      "Konsumsi 3 kali sehari, city tour Mekkah-Madinah, dan air zam-zam 5 liter",
    ],
  },
  {
    id: "sekamar-ber4",
    title: "Paket Umroh Plus Thaif Sekamar Ber 4",
    date: "15 November 2026",
    duration: "9 Hari",
    departure: "November 2026",
    category: "Plus Thaif Sekamar Ber 4",
    airport: "Soekarno-Hatta (CGK)",
    airline: "Saudia",
    hotelMakkah: "Waha Ajyad",
    hotelMadinah: "Mukhtar Al Gharbi",
    promo: false,
    seats: 14,
    tags: ["Plus Thaif", "Visa", "Makan 3x", "Sekamar Ber 4"],
    price: "Rp 28.500.000",
    image: sekamarBer4Image,
    sold: false,
    description:
      "Paket umroh plus Thaif dengan skema sekamar berempat, maskapai Saudia, dan fasilitas lengkap sesuai brosur November 2026.",
    includes: [
      "Tiket ekonomi PP",
      "Visa umroh resmi",
      "Makan 3 kali sehari",
      "City tour Makkah dan Madinah",
      "City tour Thaif",
      "Transportasi terbaik, air zam-zam 5 liter, dan handling JKT & Saudi",
    ],
  },
];

export function findPackageById(id) {
  return packageCards.find((item) => item.id === id);
}
