import awalMusimImage from "../../assets/WhatsApp Image 2026-05-09 at 09.29.33.jpeg";
import plusThaifImage from "../../assets/WhatsApp Image 2026-06-07 at 14.19.41.jpeg";
import bintangLimaImage from "../../assets/WhatsApp Image 2026-05-09 at 19.38.51.jpeg";

export const packageCards = [
  {
    id: "awal-musim",
    title: "Paket Umroh Awal Musim",
    date: "28 Juni 2026",
    duration: "9 Hari",
    airline: "Maskapai sesuai jadwal keberangkatan",
    hotelMakkah: "Waha Ajyad",
    hotelMadinah: "Mukhtar Al Gharbi",
    tags: ["Visa", "Manasik", "Airport Handling", "Hotel Nyaman"],
    price: "Rp 26.000.000",
    image: awalMusimImage,
    description:
      "Paket awal musim untuk jamaah yang ingin beribadah lebih nyaman dengan pendamping berpengalaman dan akomodasi yang sudah disiapkan rapi.",
    includes: [
      "Tiket pesawat PP sesuai jadwal paket",
      "Visa umroh resmi",
      "Hotel Makkah Waha Ajyad",
      "Hotel Madinah Mukhtar Al Gharbi",
      "Makan 3 kali sehari",
      "Pendamping ibadah berpengalaman dan amanah",
    ],
  },
  {
    id: "plus-thaif",
    title: "Paket Umroh Plus Thaif",
    date: "Sesuai jadwal keberangkatan",
    duration: "Program umroh + city tour",
    airline: "Maskapai sesuai ketersediaan paket",
    hotelMakkah: "Sesuai brosur paket",
    hotelMadinah: "Sesuai brosur paket",
    tags: ["City Tour Thaif", "Visa", "Manasik", "Pendampingan"],
    price: "Hubungi Admin",
    image: plusThaifImage,
    badge: "Pilihan",
    description:
      "Paket untuk jamaah yang ingin menggabungkan ibadah umroh dengan perjalanan ke Thaif dalam jadwal yang tetap nyaman dan tertata.",
    includes: [
      "Program umroh sesuai itinerary",
      "Perjalanan tambahan ke Thaif",
      "Visa umroh resmi",
      "Transportasi selama program",
      "Pendamping perjalanan",
      "Konsultasi keberangkatan sebelum berangkat",
    ],
  },
  {
    id: "bintang-5",
    title: "Paket Umroh Bintang 5",
    date: "Sesuai jadwal keberangkatan",
    duration: "Program premium",
    airline: "Maskapai sesuai ketersediaan paket",
    hotelMakkah: "Safwa Tower 3",
    hotelMadinah: "Movenpick",
    tags: ["Hotel Bintang 5", "Visa", "Premium", "Pendampingan"],
    price: "Rp 38.000.000",
    image: bintangLimaImage,
    description:
      "Paket premium bagi jamaah yang mengutamakan hotel terbaik, akses nyaman, dan pengalaman ibadah yang lebih eksklusif.",
    includes: [
      "Tiket pesawat PP sesuai jadwal paket",
      "Visa umroh resmi",
      "Hotel Makkah Safwa Tower 3",
      "Hotel Madinah Movenpick",
      "Konsumsi terjadwal",
      "Pendamping ibadah dan handling jamaah",
    ],
  },
];

export function findPackageById(id) {
  return packageCards.find((item) => item.id === id);
}

