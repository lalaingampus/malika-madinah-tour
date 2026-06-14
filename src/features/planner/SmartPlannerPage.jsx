import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { siteConfig } from "../../config/site";
import { packageCards } from "../packages/data";

const plannerSchema = z.object({
  destination: z.string().min(1, "Tujuan wajib dipilih."),
  departureDate: z.string().min(1, "Tanggal keberangkatan wajib diisi."),
  participants: z.coerce.number().int().min(1, "Jumlah peserta minimal 1 orang."),
  budget: z.coerce.number().min(1000000, "Budget minimal Rp 1.000.000."),
  holidayType: z.string().min(1, "Jenis liburan wajib dipilih."),
});

const initialForm = {
  destination: "",
  departureDate: "",
  participants: "",
  budget: "",
  holidayType: "",
};

const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

function parsePrice(price) {
  const digits = String(price).replace(/\D/g, "");
  return Number(digits || 0);
}

function departureMatches(dateValue, packageDeparture) {
  if (!dateValue) return false;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return false;
  const monthLabel = monthNames[date.getMonth()];
  const yearLabel = String(date.getFullYear());
  return packageDeparture.includes(monthLabel) && packageDeparture.includes(yearLabel);
}

function buildRecommendationLabel(item, criteria, index) {
  const price = parsePrice(item.price);
  if (index === 0) return "Paling Cocok";
  if (criteria.holidayType === "hemat" || price <= 26000000) return "Paling Hemat";
  if (criteria.holidayType === "rombongan" || item.seats >= criteria.participants + 4) return "Cocok Rombongan";
  if (criteria.destination === "thaif") return "Tour Religi";
  return "Pilihan Tepat";
}

function buildRecommendations(criteria) {
  return packageCards
    .map((item) => {
      let score = 0;
      const packagePrice = parsePrice(item.price);
      const isThaif = item.category.toLowerCase().includes("thaif");
      const isAwalMusim = item.category.toLowerCase().includes("awal musim");
      const isPromo = item.promo;
      const isBudgetFriendly = packagePrice > 0 && packagePrice <= 26000000;

      if (criteria.destination === "thaif") score += isThaif ? 30 : 0;
      if (criteria.destination === "awal-musim") score += isAwalMusim ? 30 : 0;
      if (criteria.destination === "promo") score += isPromo ? 24 : 0;
      if (criteria.destination === "umroh-umum") score += 12;

      if (criteria.holidayType === "hemat") score += isBudgetFriendly ? 24 : 8;
      if (criteria.holidayType === "tour-religi") score += isThaif ? 22 : 6;
      if (criteria.holidayType === "ibadah-fokus") score += isAwalMusim ? 22 : 10;
      if (criteria.holidayType === "rombongan") score += item.seats >= criteria.participants ? 20 : -15;

      if (packagePrice > 0) {
        if (packagePrice <= criteria.budget) {
          score += 28;
        } else {
          const gap = packagePrice - criteria.budget;
          score -= Math.min(24, Math.round(gap / 1000000));
        }
      }

      if (departureMatches(criteria.departureDate, item.departure)) {
        score += 18;
      }

      if (item.seats >= criteria.participants) {
        score += 16;
      } else {
        score -= 20;
      }

      if (criteria.participants <= 4 && item.category.toLowerCase().includes("sekamar ber 4")) {
        score += 10;
      }

      return {
        ...item,
        score,
        reasons: [
          packagePrice <= criteria.budget ? "Masuk budget" : "Di atas budget yang dipilih",
          departureMatches(criteria.departureDate, item.departure) ? `Cocok dengan periode ${item.departure}` : `Jadwal tersedia ${item.departure}`,
          item.seats >= criteria.participants ? `Seat cukup untuk ${criteria.participants} peserta` : `Seat terbatas untuk ${criteria.participants} peserta`,
        ],
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item, index) => ({
      ...item,
      recommendationLabel: buildRecommendationLabel(item, criteria, index),
    }));
}

export default function SmartPlannerPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [criteria, setCriteria] = useState(null);

  const recommendations = useMemo(() => (criteria ? buildRecommendations(criteria) : []), [criteria]);
  const waNumber = siteConfig.phone.replace(/\D/g, "");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const parsed = plannerSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setCriteria(parsed.data);
  };

  return (
    <div className="w-full px-6 py-14 xl:px-12">
      <section className="rounded-[2rem] border border-navy/10 bg-gradient-to-br from-white to-[#f7f2e6] p-6 shadow-soft sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Smart Trip Planner</p>
        <h1 className="mt-2 font-heading text-4xl text-navy">Rencanakan Paket Umroh dengan Cepat</h1>
        <p className="mt-4 max-w-3xl text-sm text-slate-600 sm:text-base">
          Isi tujuan, tanggal, jumlah peserta, budget, dan jenis perjalanan. Sistem frontend ini akan mencocokkan data paket yang ada lalu menampilkan rekomendasi yang paling relevan.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <label className="text-sm font-semibold text-slate-700">
            <span className="mb-2 block">Tujuan</span>
            <select value={form.destination} onChange={(event) => handleChange("destination", event.target.value)} className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 font-medium text-slate-700 outline-none transition focus:border-navy/40">
              <option value="">Pilih tujuan</option>
              <option value="umroh-umum">Umroh Umum</option>
              <option value="thaif">Umroh + Thaif</option>
              <option value="awal-musim">Awal Musim</option>
              <option value="promo">Promo Hemat</option>
            </select>
            {errors.destination && <span className="mt-2 block text-xs text-red-600">{errors.destination}</span>}
          </label>

          <label className="text-sm font-semibold text-slate-700">
            <span className="mb-2 block">Tanggal</span>
            <input type="date" value={form.departureDate} onChange={(event) => handleChange("departureDate", event.target.value)} className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 font-medium text-slate-700 outline-none transition focus:border-navy/40" />
            {errors.departureDate && <span className="mt-2 block text-xs text-red-600">{errors.departureDate}</span>}
          </label>

          <label className="text-sm font-semibold text-slate-700">
            <span className="mb-2 block">Jumlah Peserta</span>
            <input type="number" min="1" value={form.participants} onChange={(event) => handleChange("participants", event.target.value)} placeholder="Contoh: 4" className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 font-medium text-slate-700 outline-none transition focus:border-navy/40" />
            {errors.participants && <span className="mt-2 block text-xs text-red-600">{errors.participants}</span>}
          </label>

          <label className="text-sm font-semibold text-slate-700">
            <span className="mb-2 block">Budget</span>
            <input type="number" min="1000000" step="500000" value={form.budget} onChange={(event) => handleChange("budget", event.target.value)} placeholder="Contoh: 26000000" className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 font-medium text-slate-700 outline-none transition focus:border-navy/40" />
            {errors.budget && <span className="mt-2 block text-xs text-red-600">{errors.budget}</span>}
          </label>

          <label className="text-sm font-semibold text-slate-700">
            <span className="mb-2 block">Jenis Liburan</span>
            <select value={form.holidayType} onChange={(event) => handleChange("holidayType", event.target.value)} className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 font-medium text-slate-700 outline-none transition focus:border-navy/40">
              <option value="">Pilih jenis</option>
              <option value="hemat">Hemat</option>
              <option value="tour-religi">Tour Religi</option>
              <option value="ibadah-fokus">Ibadah Fokus</option>
              <option value="rombongan">Rombongan</option>
            </select>
            {errors.holidayType && <span className="mt-2 block text-xs text-red-600">{errors.holidayType}</span>}
          </label>

          <div className="flex flex-wrap gap-3 pt-2 md:col-span-2 xl:col-span-5">
            <button type="submit" className="rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:opacity-90">
              Cari Rekomendasi
            </button>
            <button type="button" onClick={() => { setForm(initialForm); setErrors({}); setCriteria(null); }} className="rounded-full border border-navy/20 bg-white px-6 py-3 text-sm font-bold text-navy transition hover:bg-navy/5">
              Reset
            </button>
          </div>
        </form>
      </section>

      {criteria && (
        <section className="mt-10">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Rekomendasi</p>
              <h2 className="mt-1 font-heading text-3xl text-navy">Paket yang Paling Sesuai</h2>
            </div>
            <p className="text-sm text-slate-500">Menampilkan {recommendations.length} paket terbaik dari data frontend.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {recommendations.map((item, index) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft">
                <div className="relative">
                  <img src={item.image} alt={item.title} className="h-52 w-full object-cover" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-navy shadow">
                      Rekomendasi #{index + 1}
                    </span>
                    <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-white shadow">
                      {item.recommendationLabel}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-heading text-2xl text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.departure} | {item.duration}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.airline}</p>

                  <div className="mt-4 rounded-2xl bg-cream p-4 text-sm text-slate-700">
                    <p className="font-semibold text-navy">Alasan cocok</p>
                    <ul className="mt-2 space-y-2">
                      {item.reasons.map((reason) => (
                        <li key={reason}>• {reason}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-slate-700">
                    <div className="rounded-xl bg-navy/5 p-3">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">Hotel Makkah</p>
                      <p className="mt-1 font-semibold text-navy">{item.hotelMakkah}</p>
                    </div>
                    <div className="rounded-xl bg-navy/5 p-3">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">Hotel Madinah</p>
                      <p className="mt-1 font-semibold text-navy">{item.hotelMadinah}</p>
                    </div>
                    <div className="rounded-xl bg-navy/5 p-3">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">Seat</p>
                      <p className="mt-1 font-semibold text-navy">{item.seats} orang</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-navy/5 px-2.5 py-1 text-[11px] font-semibold text-navy">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-xs text-slate-500">Mulai dari</p>
                  <p className="font-heading text-3xl text-navy">{item.price}</p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Link to={`/paket/${item.id}`} className="rounded-lg bg-[#35d6c7] px-3 py-2 text-center text-sm font-bold text-navy">
                      Lihat Detail
                    </Link>
                    <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Assalamualaikum, saya tertarik dengan rekomendasi ${item.title}. Mohon info detail paketnya.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-[#fff6d7] px-3 py-2 text-center text-sm font-bold text-navy">
                      Booking
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
