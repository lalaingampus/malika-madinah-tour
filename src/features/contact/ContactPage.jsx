import { useState } from "react";
import { siteConfig } from "../../config/site";
import { consultationSchema } from "../../lib/validation";
import { umrahPackages } from "../home/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", packageName: "" });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = consultationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        fullName: fieldErrors.fullName?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        packageName: fieldErrors.packageName?.[0],
      });
      setSubmitState("");
      return;
    }
    setErrors({});
    setSubmitState("Form valid. Tim kami akan segera menghubungi Anda.");
    setFormData({ fullName: "", email: "", phone: "", packageName: "" });
  };

  return (
    <section className="grid w-full gap-8 px-6 py-14 md:grid-cols-2 xl:px-12">
      <div>
        <h2 className="font-heading text-3xl text-navy">Kontak Konsultasi</h2>
        <p className="mt-3 text-sm text-slate-600">{siteConfig.address}</p>
        <p className="text-sm text-slate-600">WhatsApp: {siteConfig.phone}</p>
        <p className="text-sm text-slate-600">Email: {siteConfig.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-navy p-5 text-sm text-white shadow-soft">
        <p className="mb-3 font-semibold">Form Konsultasi Umrah</p>
        <div className="space-y-3">
          <div><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Nama Lengkap" className="w-full rounded-lg border border-white/30 bg-white/5 px-3 py-2 placeholder:text-white/70 focus:outline-none" />{errors.fullName && <p className="mt-1 text-xs text-[#ffd9a1]">{errors.fullName}</p>}</div>
          <div><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full rounded-lg border border-white/30 bg-white/5 px-3 py-2 placeholder:text-white/70 focus:outline-none" />{errors.email && <p className="mt-1 text-xs text-[#ffd9a1]">{errors.email}</p>}</div>
          <div><input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="No. WhatsApp" className="w-full rounded-lg border border-white/30 bg-white/5 px-3 py-2 placeholder:text-white/70 focus:outline-none" />{errors.phone && <p className="mt-1 text-xs text-[#ffd9a1]">{errors.phone}</p>}</div>
          <div><select name="packageName" value={formData.packageName} onChange={handleChange} className="w-full rounded-lg border border-white/30 bg-[#23427d] px-3 py-2 focus:outline-none"><option value="">Pilih Paket</option>{umrahPackages.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}</select>{errors.packageName && <p className="mt-1 text-xs text-[#ffd9a1]">{errors.packageName}</p>}</div>
        </div>
        <button type="submit" className="mt-4 w-full rounded-lg bg-gold px-4 py-2 font-semibold text-white">Kirim Konsultasi</button>
        {submitState && <p className="mt-2 text-xs text-[#ffd9a1]">{submitState}</p>}
      </form>
    </section>
  );
}

