import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dummyPosterImage from "../../assets/WhatsApp Image 2026-05-09 at 09.29.33.jpeg";
import bankInfoImage from "../../assets/image_rekening_2.png";
import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.jpeg";
import img4 from "../../assets/img4.jpeg";
import { siteConfig } from "../../config/site";
import { getAdditionalInfos } from "../../lib/additionalInfo";
import { getPosters } from "../../lib/posters";
import { features, umrahPackages } from "./data";

export default function HomePage() {
  const [posters, setPosters] = useState([]);
  const [infos, setInfos] = useState([]);
  const displayPosters =
    posters.length > 0
      ? posters
      : [{ id: "dummy-poster-home-1", name: "Dummy Poster Paket", src: dummyPosterImage }];

  useEffect(() => {
    const load = async () => {
      try {
        const [posterData, infoData] = await Promise.all([getPosters(), getAdditionalInfos()]);
        setPosters(posterData);
        setInfos(infoData);
      } catch {
        setPosters([]);
        setInfos([]);
      }
    };
    load();
  }, []);

  const steps = [
    { title: "Konsultasi & Paket", desc: "Pilih paket sesuai kebutuhan dan budget keluarga." },
    { title: "Persiapan Dokumen", desc: "Tim kami bantu proses dokumen dan jadwal manasik." },
    { title: "Keberangkatan", desc: "Pendampingan penuh dari bandara hingga kembali ke Indonesia." },
  ];

  const services = [
    { icon: "PSW", title: "Tiket Pesawat", desc: "Tiket PP terjadwal untuk keberangkatan jamaah ke Tanah Suci." },
    { icon: "TRN", title: "Transportasi", desc: "Transportasi nyaman untuk mobilitas jamaah selama perjalanan ibadah." },
    { icon: "VSA", title: "Visa Umroh", desc: "Pengurusan visa umroh dibantu penuh hingga dokumen siap berangkat." },
    { icon: "TL", title: "TL / Muthawif", desc: "Didampingi tour leader dan muthawif berpengalaman serta tersertifikasi." },
    { icon: "HTL", title: "Hotel Penginapan", desc: "Akomodasi hotel pilihan dengan lokasi strategis dan nyaman." },
    { icon: "KNS", title: "Konsumsi", desc: "Konsumsi jamaah terjamin dengan menu yang terjadwal dan higienis." },
    { icon: "PRO", title: "Tim Profesional Saudi", desc: "Tim handling profesional untuk memastikan aktivitas jamaah lancar." },
  ];

  const reasons = [
    { icon: "OK", title: "Resmi Terpercaya", desc: "Terdaftar resmi dan berkomitmen memberikan layanan amanah untuk seluruh jamaah." },
    { icon: "SV", title: "Layanan Terbaik", desc: "Bantuan end-to-end: dokumen, visa, manasik, hingga pendampingan selama perjalanan." },
    { icon: "EZ", title: "Pemesanan Mudah", desc: "Proses pendaftaran ringkas, respons cepat, dan pilihan pembayaran yang fleksibel." },
  ];

  const galleryPlaceholders = [
    { title: "Rombongan Madinah", image: img2 },
    { title: "Ziarah Kebun Kurma", image: img3 },
    { title: "Masjid Nabawi", image: img4 },
    { title: "Makkah Al-Mukarramah", image: img1 },
    { title: "Kebersamaan Jamaah", image: img2 },
  ];

  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-cream to-[#eadfca] px-6 pb-14 pt-12 sm:pt-16 xl:px-12">
        <div className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-navy/10 blur-3xl" />
        <div className="relative w-full">
          <p className="mb-4 inline-block rounded-full bg-navy/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-navy">{siteConfig.tagline}</p>
          <h1 className="font-heading text-4xl leading-tight text-navy sm:text-5xl lg:text-6xl">Travel Halal & Umrah Premium yang Nyaman</h1>
          <p className="mt-5 max-w-xl text-sm text-slate-700 sm:text-lg">Pengalaman umrah yang tertata, tenang, dan amanah dengan pendampingan sejak persiapan hingga kembali ke tanah air.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/kontak" className="rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:opacity-90">Konsultasi Sekarang</Link>
            <Link to="/paket" className="rounded-full border border-navy/30 bg-white px-6 py-3 text-sm font-bold text-navy transition hover:bg-navy/5">Lihat Semua Paket</Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-white/70 px-6 py-14 xl:px-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Highlight</p>
            <h2 className="mt-1 font-heading text-3xl text-navy">Poster Promo Terbaru</h2>
          </div>
          <Link to="/admin" className="text-sm font-semibold text-gold hover:underline">Kelola Poster</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosters.slice(0, 6).map((poster) => (
            <article key={poster.id}><img src={poster.src} alt={poster.name || "Poster promo"} className="h-auto w-full object-contain" /></article>
          ))}
        </div>
      </section>

      <section className="w-full px-6 py-14 xl:px-12">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Keunggulan</p>
            <h2 className="mt-1 font-heading text-3xl text-navy">Kenapa Memilih Kami</h2>
          </div>
          <Link to="/kontak" className="text-sm font-semibold text-gold hover:underline">Hubungi Call Center</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">{features.map((item) => <article key={item} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-soft transition hover:-translate-y-1"><p className="text-sm leading-relaxed text-slate-700 sm:text-base">{item}</p></article>)}</div>
      </section>

      <section className="w-full bg-white/70 px-6 py-14 xl:px-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Layanan</p>
        <h2 className="mt-1 font-heading text-3xl text-navy">Fasilitas Jamaah</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">Kami menyiapkan layanan lengkap untuk kenyamanan, keamanan, dan ketenangan jamaah selama ibadah.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((service) => <article key={service.title} className="rounded-2xl border border-navy/10 bg-white p-5 text-center shadow-soft"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1774cc] text-xs font-bold tracking-wide text-white">{service.icon}</div><h3 className="mt-3 font-heading text-2xl text-navy">{service.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{service.desc}</p></article>)}</div>
      </section>

      <section className="w-full px-6 py-14 xl:px-12">
        <div className="rounded-3xl border border-navy/10 bg-gradient-to-br from-white to-[#f7f2e6] p-6 shadow-soft sm:p-8">
          <h2 className="text-center font-heading text-3xl text-navy">Mengapa Harus {siteConfig.companyName}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-slate-600 sm:text-base">Jalankan umrah yang aman, khusyuk, dan menyenangkan bersama tim profesional kami.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">{reasons.map((item) => <article key={item.title} className="rounded-2xl bg-[#f8f6f1] p-5"><div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">{item.icon}</div><h3 className="font-heading text-2xl text-navy">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p></article>)}</div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy px-6 py-14 text-white xl:px-12">
        <div className="absolute -left-28 top-0 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-gold/20 blur-2xl" />
        <div className="w-full">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Proses</p>
          <h2 className="font-heading text-3xl">Alur Umrah Bersama Kami</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">{steps.map((step, index) => <div key={step.title} className="rounded-2xl border border-white/20 bg-white/10 p-5"><p className="mb-2 text-xs font-bold tracking-wide text-gold">STEP 0{index + 1}</p><h3 className="font-heading text-xl">{step.title}</h3><p className="mt-2 text-sm text-white/85">{step.desc}</p></div>)}</div>
        </div>
      </section>

      <section className="w-full bg-white/70 px-6 py-14 xl:px-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Pilihan Terbaik</p>
        <h2 className="mt-1 font-heading text-3xl text-navy">Paket Favorit Jamaah</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">{umrahPackages.map((item) => <article key={item.name} className="rounded-2xl bg-white p-5 shadow-soft"><h3 className="font-heading text-xl text-navy">{item.name}</h3><p className="mt-2 text-sm font-bold text-gold">{item.price}</p><p className="mt-2 text-sm text-slate-600">{item.detail}</p></article>)}</div>
      </section>

      {infos.length > 0 && (
        <section className="w-full px-6 py-14 xl:px-12">
          <div className="mb-6 flex items-end justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Update</p><h2 className="mt-1 font-heading text-3xl text-navy">Informasi Tambahan</h2></div>
            <Link to="/informasi" className="text-sm font-semibold text-gold hover:underline">Lihat Semua</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infos.slice(0, 6).map((item) => (
              <article key={item.id}><img src={item.src} alt={item.title} className="h-auto w-full object-contain" /><div className="p-3"><h3 className="font-heading text-xl text-navy">{item.title}</h3><p className="mt-1 text-sm text-slate-600">{item.description}</p></div></article>
            ))}
          </div>
        </section>
      )}

      <section className="w-full px-6 py-14 xl:px-12">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Galeri Jamaah</p>
          <h2 className="mt-1 font-heading text-3xl text-navy">Dokumentasi Setiap Perjalanan</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">Foto kegiatan jamaah selama menjalankan ibadah di Tanah Suci. Foto asli menyusul.</p>
        </div>
        <div className="columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3">
          {galleryPlaceholders.map((item) => <article key={item.title} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-navy/10 bg-white p-2 shadow-soft"><img src={item.image} alt={item.title} className="h-auto w-full rounded-xl object-contain" /></article>)}
        </div>
      </section>

      <section className="w-full bg-white/70 px-6 py-14 xl:px-12">
        <img src={bankInfoImage} alt="Informasi rekening PT Malika Royal Madinah" className="block h-auto w-full object-contain" />
        <p className="mt-4 rounded-xl bg-navy px-4 py-3 text-center text-sm font-semibold text-white sm:text-base">
          Pembayaran resmi hanya melalui rekening atas nama PT Malika Royal Madinah.
        </p>
      </section>

      <section className="px-6 pb-14 xl:px-12">
        <div className="flex w-full flex-col items-start justify-between gap-5 rounded-3xl bg-gradient-to-r from-navy to-[#1f3e80] p-7 text-white sm:flex-row sm:items-center">
          <div><p className="text-sm text-white/80">Call Center</p><p className="mt-1 font-heading text-3xl">{siteConfig.phone}</p></div>
          <Link to="/kontak" className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-white">Booking & Konsultasi</Link>
        </div>
      </section>
    </div>
  );
}
