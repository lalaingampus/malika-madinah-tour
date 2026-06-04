import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpeg";
import img4 from "../../assets/img4.jpeg";

export const packageCards = [
  {
    id: "reguler",
    title: "Paket Umrah Reguler",
    date: "15 Mei 2026",
    duration: "9 Hari",
    airline: "Garuda Indonesia",
    hotelMakkah: "Dar Al Eiman Royal (200m dari Masjidil Haram)",
    hotelMadinah: "Dar Al Hijra (100m dari Masjid Nabawi)",
    tags: ["Visa", "Asuransi", "Manasik", "Makan 3x"],
    price: "Rp 28.500.000",
    image: img2,
    description:
      "Paket ideal untuk jamaah yang ingin fokus ibadah dengan fasilitas lengkap, pendampingan manasik, dan akomodasi dekat masjid.",
    includes: [
      "Tiket pesawat PP sesuai jadwal paket",
      "Visa umrah resmi",
      "Hotel Makkah dan Madinah sesuai paket",
      "Makan 3 kali sehari",
      "Transportasi selama program",
      "Pembimbing ibadah berpengalaman",
    ],
  },
  {
    id: "plus-turki",
    title: "Paket Umrah Plus Turki",
    date: "22 Juni 2026",
    duration: "14 Hari",
    airline: "Turkish Airlines",
    hotelMakkah: "Pullman Zamzam (50m dari Masjidil Haram)",
    hotelMadinah: "Anwar Al Madinah Movenpick",
    tags: ["City Tour Istanbul", "Visa", "Asuransi", "Tour Leader"],
    price: "Rp 38.900.000",
    image: img4,
    badge: "Populer",
    description:
      "Menggabungkan ibadah umrah dan pengalaman city tour bernilai sejarah Islam di Turki, dengan jadwal yang nyaman dan terstruktur.",
    includes: [
      "Tiket internasional & domestik sesuai itinerary",
      "Visa umrah + dukungan dokumen perjalanan",
      "Hotel premium dekat area ibadah",
      "Program city tour Istanbul",
      "Pendamping tour leader",
      "Asuransi perjalanan",
    ],
  },
  {
    id: "keluarga",
    title: "Paket Umrah Keluarga",
    date: "5 Agustus 2026",
    duration: "10 Hari",
    airline: "Saudi Airlines",
    hotelMakkah: "Swissotel Al Maqam",
    hotelMadinah: "Crowne Plaza",
    tags: ["Family Room", "Kids Friendly", "Flexible Schedule"],
    price: "Rp 32.000.000",
    image: img1,
    description:
      "Paket fleksibel untuk keluarga dengan fokus kenyamanan, kamar family, dan ritme perjalanan yang ramah anak serta lansia.",
    includes: [
      "Family room sesuai ketersediaan",
      "Handling bandara untuk keluarga",
      "Jadwal ibadah fleksibel",
      "Transportasi yang nyaman",
      "Dukungan kebutuhan jamaah lansia/anak",
      "Konsultasi perjalanan sebelum berangkat",
    ],
  },
];

export function findPackageById(id) {
  return packageCards.find((item) => item.id === id);
}
