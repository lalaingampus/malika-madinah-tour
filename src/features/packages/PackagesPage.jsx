import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../config/site";
import { packageCards } from "./data";

const defaultFilters = {
  departure: "",
  category: "",
  airport: "",
  promo: "",
};

export default function PackagesPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const resultsRef = useRef(null);


  const filterOptions = useMemo(
    () => ({
      departures: [...new Set(packageCards.map((item) => item.departure))],
      categories: [...new Set(packageCards.map((item) => item.category))],
      airports: [...new Set(packageCards.map((item) => item.airport))],
    }),
    []
  );

  const filteredPackages = useMemo(
    () =>
      packageCards.filter((item) => {
        if (filters.departure && item.departure !== filters.departure) return false;
        if (filters.category && item.category !== filters.category) return false;
        if (filters.airport && item.airport !== filters.airport) return false;
        if (filters.promo === "promo" && !item.promo) return false;
        if (filters.promo === "regular" && item.promo) return false;
        return true;
      }),
    [filters]
  );

  const waNumber = siteConfig.phone.replace(/\D/g, "");

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };


  return (
    <div className="w-full px-6 py-14 xl:px-12">
      <section className="rounded-[2rem] border border-navy/10 bg-white px-5 py-6 shadow-soft sm:px-7 sm:py-8">
        <div className="mb-6">
          <h1 className="font-heading text-3xl text-navy sm:text-4xl">Transaksi Paket Umrah</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
            Pilih jadwal keberangkatan dan jenis paket yang paling sesuai. Versi ini masih frontend-only, jadi filter bekerja dari data paket yang sudah tersedia di halaman.
          </p>
        </div>

        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] p-4 md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:items-end">
          <label className="text-sm font-semibold text-slate-600">
            <span className="mb-2 block">Keberangkatan</span>
            <select
              value={filters.departure}
              onChange={(event) => handleFilterChange("departure", event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-navy/40"
            >
              <option value="">Semua Data</option>
              {filterOptions.departures.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-slate-600">
            <span className="mb-2 block">Jenis Paket</span>
            <select
              value={filters.category}
              onChange={(event) => handleFilterChange("category", event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-navy/40"
            >
              <option value="">Semua Data</option>
              {filterOptions.categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-slate-600">
            <span className="mb-2 block">Bandara</span>
            <select
              value={filters.airport}
              onChange={(event) => handleFilterChange("airport", event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-navy/40"
            >
              <option value="">Semua Data</option>
              {filterOptions.airports.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-slate-600">
            <span className="mb-2 block">Promo</span>
            <select
              value={filters.promo}
              onChange={(event) => handleFilterChange("promo", event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-navy/40"
            >
              <option value="">Semua Data</option>
              <option value="promo">Promo</option>
              <option value="regular">Non Promo</option>
            </select>
          </label>

          <div className="flex gap-2 md:justify-end">
            <button
              type="button"
              onClick={handleSearch}
              className="inline-flex h-[46px] items-center justify-center rounded-lg bg-[#0e74d8] px-4 text-sm font-bold text-white transition hover:brightness-95"
            >
              Cari
            </button>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-[46px] items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <section ref={resultsRef} className="mt-8">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-3xl text-navy">Pilihan Paket</h2>
            <p className="mt-2 text-sm text-slate-600">
              Menampilkan <span className="font-bold text-navy">{filteredPackages.length}</span> paket dari data frontend saat ini.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {filteredPackages.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
              <div className="border-b border-slate-100 bg-[#fbfcff] p-3">
                <div className="relative overflow-hidden rounded-xl">
                  <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
                  {item.sold && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="text-4xl font-black uppercase tracking-[0.12em] text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)] sm:text-5xl">
                        SOLD
                      </span>
                    </div>
                  )}
                  {item.badge && (
                    <span className="absolute right-3 top-3 z-10 rounded-full bg-[#ef4444] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-heading text-2xl text-navy">{item.title}</h3>
                <div className="mt-3 space-y-1.5 text-sm text-slate-600">
                  <p>{item.date}</p>
                  <p>{item.hotelMakkah} (Makkah)</p>
                  <p>{item.hotelMadinah} (Madinah)</p>
                  <p>{item.airline}</p>
                  <p>{item.airport}</p>
                </div>

                <div className="mt-4 border-t border-slate-200 pt-3">
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">Sisa Seat</p>
                      <p className="font-semibold text-navy">{item.sold ? "0 seat" : `${item.seats} seat`}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">Promo</p>
                      <p className="font-semibold text-navy">{item.promo ? "Ya" : "Tidak"}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-200 pt-3">
                  <p className="text-xs text-slate-500">Harga mulai</p>
                  <p className="mt-1 font-heading text-3xl text-[#d84d1c]">{item.price}</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link
                    to={`/paket/${item.id}`}
                    className="rounded-md bg-[#1380e2] px-3 py-2 text-center text-sm font-bold text-white transition hover:brightness-95"
                  >
                    Detail Paket
                  </Link>
                  <a
                    href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Assalamualaikum, saya ingin booking ${item.title}. Mohon info detailnya.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md bg-[#fff2c9] px-3 py-2 text-center text-sm font-bold text-navy transition hover:bg-[#ffe9a3]"
                  >
                    Booking
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500 shadow-soft">
            Tidak ada paket yang cocok dengan filter saat ini.
          </div>
        )}
      </section>

    </div>
  );
}

