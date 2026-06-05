import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import dummyPosterImage from "../../assets/WhatsApp Image 2026-05-09 at 09.29.33.jpeg";
import bankInfoImage from "../../assets/image_rekening_2.png";
import { siteConfig } from "../../config/site";
import { getAdditionalInfos } from "../../lib/additionalInfo";
import { getPosters } from "../../lib/posters";
import { features, gallerySlides, testimonials, umrahPackages } from "./data";

export default function HomePage() {
  const [posters, setPosters] = useState([]);
  const [infos, setInfos] = useState([]);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const galleryRef = useRef(null);
  const testimonialRef = useRef(null);

  const displayPosters =
    posters.length > 0
      ? posters
      : [{ id: "dummy-poster-home-1", name: "Dummy Poster Paket", src: dummyPosterImage }];
  const promoPoster = displayPosters[0];

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

  useEffect(() => {
    const timer = window.setTimeout(() => setShowPromoModal(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storageKey = "mrm_visitor_counter";
    const current = Number(window.localStorage.getItem(storageKey) || "0");
    const next = current + 1;
    window.localStorage.setItem(storageKey, String(next));
    setVisitorCount(next);
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

  const scrollTrack = (ref, direction) => {
    const node = ref.current;
    if (!node) return;
    const amount = Math.max(node.clientWidth * 0.84, 320);
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const scrollToGallerySlide = (index) => {
    const node = galleryRef.current;
    if (!node) return;
    const slides = Array.from(node.querySelectorAll("[data-gallery-slide]"));
    const target = slides[index];
    if (!target) return;
    const left = target.offsetLeft - (node.clientWidth - target.offsetWidth) / 2;
    node.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    setActiveGalleryIndex(index);
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={index < rating ? "text-gold" : "text-slate-300"}>
        {"★"}
      </span>
    ));

  const averageRating =
    testimonials.reduce((sum, item) => sum + item.rating, 0) / Math.max(testimonials.length, 1);
  const ratingValue = averageRating.toFixed(1);

  useEffect(() => {
    const node = galleryRef.current;
    if (!node) return undefined;

    const handleScroll = () => {
      const slides = Array.from(node.querySelectorAll("[data-gallery-slide]"));
      if (!slides.length) return;

      const center = node.scrollLeft + node.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(center - slideCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveGalleryIndex(closestIndex);
    };

    node.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => node.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (gallerySlides.length <= 1) return undefined;

    const timer = setInterval(() => {
      setActiveGalleryIndex((current) => {
        const next = (current + 1) % gallerySlides.length;
        scrollToGallerySlide(next);
        return next;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const promoModal =
    typeof document !== "undefined"
      ? createPortal(
          <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-8 transition-opacity duration-300 ${
              showPromoModal ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={() => setShowPromoModal(false)}
            aria-hidden={!showPromoModal}
          >
            <div
              className={`relative inline-flex max-w-[92vw] items-start justify-start transition-all duration-300 ${
                showPromoModal ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0"
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowPromoModal(false)}
                className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-lg font-bold text-navy shadow-md transition hover:bg-white"
                aria-label="Tutup popup promo"
              >
                x
              </button>
              <img
                src={promoPoster?.src}
                alt={promoPoster?.name || "Poster promo"}
                className="block max-h-[70vh] w-auto max-w-[92vw] rounded-2xl object-contain shadow-none sm:max-h-[580px] md:max-h-[620px] lg:max-h-[660px]"
              />
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="bg-cream">
      {promoModal}

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-cream to-[#eadfca] px-6 pb-14 pt-12 sm:pt-16 xl:px-12">
        <div className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-navy/10 blur-3xl" />
        <div className="relative w-full">
          <p className="mb-4 inline-block rounded-full bg-navy/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-navy">
            {siteConfig.tagline}
          </p>
          <h1 className="font-heading text-4xl leading-tight text-navy sm:text-5xl lg:text-6xl">
            Travel Halal & Umrah Premium yang Nyaman
          </h1>
          <p className="mt-5 max-w-xl text-sm text-slate-700 sm:text-lg">
            Pengalaman umrah yang tertata, tenang, dan amanah dengan pendampingan sejak persiapan hingga kembali ke tanah air.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/kontak" className="rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:opacity-90">
              Konsultasi Sekarang
            </Link>
            <Link
              to="/paket"
              className="rounded-full border border-navy/30 bg-white px-6 py-3 text-sm font-bold text-navy transition hover:bg-navy/5"
            >
              Lihat Semua Paket
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-14 xl:px-12">
        <div className="rounded-[2rem] bg-gradient-to-r from-navy via-[#16336f] to-[#0f2b5d] p-6 text-white shadow-soft sm:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold/90">Statistik</p>
              <h2 className="mt-1 font-heading text-3xl">Perjalanan & Kepercayaan Jamaah</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
                Ringkasan performa layanan kami yang terus bertumbuh dan bisa kamu tampilkan langsung di landing page.
              </p>
            </div>
            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
              Diperbarui real-time
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold text-white/70">Pengunjung website</p>
              <p className="mt-2 font-heading text-4xl text-gold">{visitorCount.toLocaleString("id-ID")}</p>
              <p className="mt-1 text-sm text-white/75">Kunjungan browser yang tercatat di perangkat ini.</p>
            </article>
            <article className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold text-white/70">Jamaah terlayani</p>
              <p className="mt-2 font-heading text-4xl text-gold">{siteConfig.servicedJamaahCount.toLocaleString("id-ID")}+</p>
              <p className="mt-1 text-sm text-white/75">Jumlah jamaah yang sudah kami dampingi sampai keberangkatan.</p>
            </article>
            <article className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold text-white/70">Rata-rata kepuasan</p>
              <p className="mt-2 font-heading text-4xl text-gold">{ratingValue}/5</p>
              <div className="mt-2 flex items-center gap-1 text-lg">{renderStars(Math.round(averageRating))}</div>
              <p className="mt-1 text-sm text-white/75">Diambil dari testimoni jamaah yang ditampilkan.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-14 xl:px-12">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Galeri Jamaah</p>
          <h2 className="mt-1 font-heading text-3xl text-navy">Dokumentasi Setiap Perjalanan</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Foto kegiatan jamaah selama menjalankan ibadah di Tanah Suci. Foto asli menyusul.
          </p>
        </div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-600">Geser kiri/kanan atau biarkan berganti otomatis.</p>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollTrack(galleryRef, -1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition hover:bg-navy/5"
              aria-label="Lihat dokumentasi sebelumnya"
            >
              {"<"}
            </button>
            <button
              type="button"
              onClick={() => scrollTrack(galleryRef, 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition hover:bg-navy/5"
              aria-label="Lihat dokumentasi berikutnya"
            >
              {">"}
            </button>
          </div>
        </div>
        <div ref={galleryRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scroll-smooth">
          {gallerySlides.map((item) => (
            <article
              key={item.title}
              data-gallery-slide
              className="w-[92vw] shrink-0 snap-center overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-soft sm:w-[620px] lg:w-[760px]"
            >
              <div className="overflow-hidden bg-[#f7f3eb]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="block h-[220px] w-full object-cover sm:h-[340px] lg:h-[400px]"
                />
              </div>
            </article>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-center gap-2">
          {gallerySlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToGallerySlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeGalleryIndex ? "w-8 bg-navy" : "w-2.5 bg-navy/25 hover:bg-navy/40"
              }`}
              aria-label={`Pilih slide dokumentasi ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="w-full bg-white/70 px-6 py-14 xl:px-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Highlight</p>
            <h2 className="mt-1 font-heading text-3xl text-navy">Poster Promo Terbaru</h2>
          </div>
          <Link to="/admin" className="text-sm font-semibold text-gold hover:underline">
            Kelola Poster
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosters.slice(0, 6).map((poster) => (
            <article key={poster.id}>
              <img src={poster.src} alt={poster.name || "Poster promo"} className="h-auto w-full object-contain" />
            </article>
          ))}
        </div>
      </section>

      <section className="w-full px-6 py-14 xl:px-12">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Keunggulan</p>
            <h2 className="mt-1 font-heading text-3xl text-navy">Kenapa Memilih Kami</h2>
          </div>
          <Link to="/kontak" className="text-sm font-semibold text-gold hover:underline">
            Hubungi Call Center
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((item) => (
            <article key={item} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-soft transition hover:-translate-y-1">
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full bg-white/70 px-6 py-14 xl:px-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Layanan</p>
        <h2 className="mt-1 font-heading text-3xl text-navy">Fasilitas Jamaah</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
          Kami menyiapkan layanan lengkap untuk kenyamanan, keamanan, dan ketenangan jamaah selama ibadah.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl border border-navy/10 bg-white p-5 text-center shadow-soft">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1774cc] text-xs font-bold tracking-wide text-white">
                {service.icon}
              </div>
              <h3 className="mt-3 font-heading text-2xl text-navy">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full px-6 py-14 xl:px-12">
        <div className="rounded-3xl border border-navy/10 bg-gradient-to-br from-white to-[#f7f2e6] p-6 shadow-soft sm:p-8">
          <h2 className="text-center font-heading text-3xl text-navy">Mengapa Harus {siteConfig.companyName}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-slate-600 sm:text-base">
            Jalankan umrah yang aman, khusyuk, dan menyenangkan bersama tim profesional kami.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {reasons.map((item) => (
              <article key={item.title} className="rounded-2xl bg-[#f8f6f1] p-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                  {item.icon}
                </div>
                <h3 className="font-heading text-2xl text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy px-6 py-14 text-white xl:px-12">
        <div className="absolute -left-28 top-0 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-gold/20 blur-2xl" />
        <div className="w-full">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Proses</p>
          <h2 className="font-heading text-3xl">Alur Umrah Bersama Kami</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-white/20 bg-white/10 p-5">
                <p className="mb-2 text-xs font-bold tracking-wide text-gold">STEP 0{index + 1}</p>
                <h3 className="font-heading text-xl">{step.title}</h3>
                <p className="mt-2 text-sm text-white/85">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white/70 px-6 py-14 xl:px-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Pilihan Terbaik</p>
        <h2 className="mt-1 font-heading text-3xl text-navy">Paket Favorit Jamaah</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {umrahPackages.map((item) => (
            <article key={item.name} className="rounded-2xl bg-white p-5 shadow-soft">
              <h3 className="font-heading text-xl text-navy">{item.name}</h3>
              <p className="mt-2 text-sm font-bold text-gold">{item.price}</p>
              <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {infos.length > 0 && (
        <section className="w-full px-6 py-14 xl:px-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Update</p>
              <h2 className="mt-1 font-heading text-3xl text-navy">Informasi Tambahan</h2>
            </div>
            <Link to="/informasi" className="text-sm font-semibold text-gold hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infos.slice(0, 6).map((item) => (
              <article key={item.id}>
                <img src={item.src} alt={item.title} className="h-auto w-full object-contain" />
                <div className="p-3">
                  <h3 className="font-heading text-xl text-navy">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="w-full bg-white/70 px-6 py-14 xl:px-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Testimoni</p>
            <h2 className="mt-1 font-heading text-3xl text-navy">Penilaian Jamaah</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              Kesan jamaah yang kami tampilkan dibuat ringkas agar mudah dibaca oleh calon jamaah.
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollTrack(testimonialRef, -1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition hover:bg-navy/5"
              aria-label="Lihat testimoni sebelumnya"
            >
              {"<"}
            </button>
            <button
              type="button"
              onClick={() => scrollTrack(testimonialRef, 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition hover:bg-navy/5"
              aria-label="Lihat testimoni berikutnya"
            >
              {">"}
            </button>
          </div>
        </div>
        <div ref={testimonialRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scroll-smooth">
          {testimonials.map((item) => (
            <article
              key={`${item.name}-${item.location}`}
              className="w-[88vw] shrink-0 snap-start rounded-3xl border border-navy/10 bg-white p-5 shadow-soft sm:w-[360px] lg:w-[380px]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-xl text-navy">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.location}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-sm font-bold text-navy">
                  {item.rating}.0
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-lg leading-none">{renderStars(item.rating)}</div>
              <p className="mt-3 text-sm font-semibold text-gold">{item.packageName}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">"{item.quote}"</p>
            </article>
          ))}
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
          <div>
            <p className="text-sm text-white/80">Call Center</p>
            <p className="mt-1 font-heading text-3xl">{siteConfig.phone}</p>
          </div>
          <Link to="/kontak" className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-white">
            Booking & Konsultasi
          </Link>
        </div>
      </section>
    </div>
  );
}

