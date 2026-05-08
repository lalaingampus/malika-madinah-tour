import { useEffect, useRef, useState } from "react";
import { getPosters } from "../../lib/posters";
import { umrahPackages } from "../home/data";

export default function PackagesPage() {
  const [posters, setPosters] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    setPosters(getPosters());
  }, []);

  const scrollToIndex = (index) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const clamped = Math.max(0, Math.min(index, posters.length - 1));
    const el = slider.children[clamped];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActiveIndex(clamped);
  };

  const prevSlide = () => scrollToIndex(activeIndex - 1);
  const nextSlide = () => scrollToIndex(activeIndex + 1);

  return (
    <div className="w-full px-6 py-14 xl:px-12">
      <section>
        <h2 className="font-heading text-3xl text-navy">Paket Umrah Pilihan</h2>
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

      {posters.length > 0 && (
        <section className="mt-12">
          <h3 className="font-heading text-2xl text-navy">Poster Promo Paket</h3>
          <p className="mt-2 text-sm text-slate-500 sm:hidden">Geser kiri/kanan untuk lihat poster lainnya.</p>
          <div
            ref={sliderRef}
            className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3"
          >
            {posters.map((poster) => (
              <article
                key={poster.id}
                className="mx-auto w-[86%] flex-none snap-center overflow-hidden rounded-2xl bg-white shadow-soft sm:w-auto"
              >
                <img src={poster.src} alt={poster.name || "Poster promo"} className="h-auto w-full object-contain" />
              </article>
            ))}
          </div>
          {posters.length > 1 && (
            <div className="mt-4 flex justify-center gap-2 sm:hidden">
              {posters.map((poster, index) => (
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
      )}
    </div>
  );
}

