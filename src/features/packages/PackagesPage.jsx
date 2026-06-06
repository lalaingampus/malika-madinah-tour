import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import dummyPosterImage from "../../assets/WhatsApp Image 2026-05-09 at 09.29.33.jpeg";
import extraPosterImage from "../../assets/WhatsApp Image 2026-06-06 at 23.43.35.jpeg";
import { siteConfig } from "../../config/site";
import { getPosters } from "../../lib/posters";
import { packageCards } from "./data";

export default function PackagesPage() {
  const [posters, setPosters] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        setPosters(await getPosters());
      } catch {
        setPosters([]);
      }
    };
    load();
  }, []);

  const displayPosters =
    posters.length > 0
      ? posters
      : [
          { id: "dummy-poster-1", name: "Dummy Poster Paket", src: dummyPosterImage },
          { id: "dummy-poster-2", name: "Dummy Poster Paket 2", src: extraPosterImage },
        ];

  const waNumber = siteConfig.phone.replace(/\D/g, "");

  const scrollToIndex = (index) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const clamped = Math.max(0, Math.min(index, displayPosters.length - 1));
    const el = slider.children[clamped];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActiveIndex(clamped);
  };

  return (
    <div className="w-full px-6 py-14 xl:px-12">
      <section>
        <div className="mb-7 text-center">
          <h2 className="font-heading text-4xl text-navy">Paket Umrah Pilihan</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
            Pilih paket yang sesuai kebutuhan dan budget Anda. Semua paket sudah termasuk pembimbingan lengkap dari tim berpengalaman.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {packageCards.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft">
              <div className="relative">
                <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
                {item.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-[#35d6c7] px-3 py-1 text-xs font-bold text-navy">{item.badge}</span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-heading text-2xl text-navy">{item.title}</h3>
                <p className="mt-2 text-xs text-slate-600">{item.date} • {item.duration}</p>
                <p className="mt-1 text-xs text-slate-600">{item.airline}</p>

                <div className="mt-3 border-t border-navy/10 pt-3 text-sm text-slate-700">
                  <p className="text-[11px] text-slate-500">Hotel Makkah</p>
                  <p>{item.hotelMakkah}</p>
                  <p className="mt-2 text-[11px] text-slate-500">Hotel Madinah</p>
                  <p>{item.hotelMadinah}</p>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 border-t border-navy/10 pt-3">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-cream px-2.5 py-1 text-[11px] font-semibold text-navy">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-xs text-slate-500">Mulai dari</p>
                <p className="font-heading text-3xl text-navy">{item.price}</p>
                <p className="text-xs text-slate-500">per orang</p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link to={`/paket/${item.id}`} className="rounded-lg bg-[#35d6c7] px-3 py-2 text-center text-sm font-bold text-navy">
                    Lihat Detail
                  </Link>
                  <a
                    href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Assalamualaikum, saya ingin booking ${item.title}. Mohon info detailnya.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-[#fff6d7] px-3 py-2 text-center text-sm font-bold text-navy"
                  >
                    Booking
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h3 className="font-heading text-2xl text-navy">Poster Promo Paket</h3>
        <p className="mt-2 text-sm text-slate-500 sm:hidden">Geser kiri/kanan untuk lihat poster lainnya.</p>
        <div ref={sliderRef} className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {displayPosters.map((poster) => (
            <article key={poster.id} className="mx-auto w-[86%] flex-none snap-center overflow-hidden rounded-2xl bg-white shadow-soft sm:w-auto">
              <img src={poster.src} alt={poster.name || "Poster promo"} className="h-auto w-full object-contain" />
            </article>
          ))}
        </div>
        {displayPosters.length > 1 && (
          <div className="mt-4 flex justify-center gap-2 sm:hidden">
            {displayPosters.map((poster, index) => (
              <button
                key={poster.id}
                type="button"
                onClick={() => scrollToIndex(index)}
                className={`h-2.5 w-2.5 rounded-full ${index === activeIndex ? "bg-navy" : "bg-navy/30"}`}
                aria-label={`Poster ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
