import { Link, Navigate, useParams } from "react-router-dom";
import { siteConfig } from "../../config/site";
import { findPackageById } from "./data";

export default function PackageDetailPage() {
  const { id } = useParams();
  const selected = findPackageById(id);

  if (!selected) {
    return <Navigate to="/paket" replace />;
  }

  const waNumber = siteConfig.phone.replace(/\D/g, "");
  const waBookingLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Assalamualaikum, saya tertarik ${selected.title}. Mohon kirim detail jadwal dan proses booking.`
  )}`;

  return (
    <div className="w-full px-6 py-14 xl:px-12">
      <div className="mb-6">
        <Link to="/paket" className="text-sm font-semibold text-gold hover:underline">
          Kembali ke daftar paket
        </Link>
      </div>

      <article className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-soft">
        <img src={selected.image} alt={selected.title} className="h-64 w-full object-cover sm:h-80" />
        <div className="p-6 sm:p-8">
          <h1 className="font-heading text-4xl text-navy">{selected.title}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {selected.date} | {selected.duration} | {selected.airline}
          </p>

          <p className="mt-5 text-slate-700">{selected.description}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-cream p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Hotel Makkah</p>
              <p className="mt-1 text-navy">{selected.hotelMakkah}</p>
            </div>
            <div className="rounded-2xl bg-cream p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Hotel Madinah</p>
              <p className="mt-1 text-navy">{selected.hotelMadinah}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Fasilitas Termasuk</p>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {selected.includes.map((item) => (
                <li key={item} className="rounded-lg border border-navy/10 px-3 py-2 text-sm text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-navy/10 pt-5">
            <div>
              <p className="text-xs text-slate-500">Mulai dari</p>
              <p className="font-heading text-4xl text-navy">{selected.price}</p>
              <p className="text-xs text-slate-500">per orang</p>
            </div>
            <a
              href={waBookingLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-gold px-6 py-3 text-sm font-bold text-white"
            >
              Booking via WhatsApp
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}

