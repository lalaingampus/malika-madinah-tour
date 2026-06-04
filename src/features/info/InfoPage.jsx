import { useEffect, useState } from "react";
import { getAdditionalInfos } from "../../lib/additionalInfo";

export default function InfoPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setItems(await getAdditionalInfos());
      } catch {
        setItems([]);
      }
    };
    load();
  }, []);

  return (
    <section className="w-full px-6 py-12 xl:px-12">
      <h1 className="font-heading text-4xl text-navy">Informasi Tambahan</h1>
      <p className="mt-3 text-sm text-slate-600 sm:text-base">Informasi terbaru seputar program, jadwal, dan update layanan jamaah.</p>

      {items.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="">
              <img src={item.src} alt={item.title} className="h-auto w-full object-contain" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl text-navy">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-500">Belum ada informasi tambahan.</p>
      )}
    </section>
  );
}
