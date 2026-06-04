import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../lib/adminAuth";
import { deleteAdditionalInfo, getAdditionalInfos, uploadAdditionalInfo } from "../../lib/additionalInfo";
import { createCustomArticle, getCustomArticles, removeCustomArticle, saveCustomArticles } from "../../lib/articles";
import { deletePoster, getPosters, uploadPoster } from "../../lib/posters";

export default function AdminPage() {
  const [posters, setPosters] = useState([]);
  const [articles, setArticles] = useState(() => getCustomArticles());
  const [infos, setInfos] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoForm, setInfoForm] = useState({ title: "", description: "" });
  const [articleForm, setArticleForm] = useState({ title: "", category: "Siroh", excerpt: "", body: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [posterData, infoData] = await Promise.all([getPosters(), getAdditionalInfos()]);
        setPosters(posterData);
        setInfos(infoData);
      } catch (err) {
        setMessage(err.message || "Gagal mengambil data.");
      }
    };
    load();
  }, []);

  const hasPoster = useMemo(() => posters.length > 0, [posters]);
  const hasInfos = useMemo(() => infos.length > 0, [infos]);

  const onUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("File harus berupa gambar.");
      return;
    }

    try {
      setLoading(true);
      const item = await uploadPoster(file);
      setPosters((prev) => [item, ...prev]);
      setMessage("Poster berhasil diupload.");
    } catch (err) {
      setMessage(err.message || "Gagal upload poster.");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  const removePoster = async (id) => {
    try {
      await deletePoster(id);
      setPosters((prev) => prev.filter((item) => item.id !== id));
      setMessage("Poster berhasil dihapus.");
    } catch (err) {
      setMessage(err.message || "Gagal hapus poster.");
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin-login", { replace: true });
  };

  const handleArticleChange = (event) => {
    const { name, value } = event.target;
    setArticleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddArticle = (event) => {
    event.preventDefault();
    if (!articleForm.title.trim() || !articleForm.excerpt.trim() || !articleForm.body.trim()) {
      setMessage("Judul, ringkasan, dan isi artikel wajib diisi.");
      return;
    }

    const newArticle = createCustomArticle(articleForm);
    const next = [newArticle, ...articles];
    setArticles(next);
    saveCustomArticles(next);
    setArticleForm({ title: "", category: "Siroh", excerpt: "", body: "" });
    setMessage("Artikel berhasil ditambahkan.");
  };

  const handleDeleteArticle = (id) => {
    const next = removeCustomArticle(id);
    setArticles(next);
    setMessage("Artikel berhasil dihapus.");
  };

  const handleInfoTextChange = (event) => {
    const { name, value } = event.target;
    setInfoForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInfoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("File informasi harus berupa gambar.");
      return;
    }
    if (!infoForm.title.trim() || !infoForm.description.trim()) {
      setMessage("Judul dan deskripsi informasi wajib diisi sebelum upload gambar.");
      event.target.value = "";
      return;
    }

    try {
      setLoading(true);
      const item = await uploadAdditionalInfo({
        title: infoForm.title.trim(),
        description: infoForm.description.trim(),
        file,
      });
      setInfos((prev) => [item, ...prev]);
      setInfoForm({ title: "", description: "" });
      setMessage("Informasi tambahan berhasil ditambahkan.");
    } catch (err) {
      setMessage(err.message || "Gagal upload informasi.");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  const handleDeleteInfo = async (id) => {
    try {
      await deleteAdditionalInfo(id);
      setInfos((prev) => prev.filter((item) => item.id !== id));
      setMessage("Informasi tambahan berhasil dihapus.");
    } catch (err) {
      setMessage(err.message || "Gagal hapus informasi.");
    }
  };

  return (
    <section className="w-full px-6 py-12 xl:px-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl text-navy">Admin Konten</h1>
          <p className="mt-2 text-sm text-slate-600">Kelola poster promosi dan artikel umroh/tour/siroh tanpa coding.</p>
        </div>
        <button onClick={handleLogout} className="rounded-full border border-navy/20 px-4 py-2 text-sm font-semibold text-navy">
          Logout
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-navy/10 bg-white p-5 shadow-soft">
        <p className="mb-3 text-sm font-semibold text-navy">Upload Poster</p>
        <label className="inline-flex cursor-pointer rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white">
          Pilih Gambar Poster
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
        </label>
        {message && <p className="mt-3 text-sm text-navy">{message}</p>}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hasPoster ? (
          posters.map((poster) => (
            <article key={poster.id} className="overflow-hidden rounded-2xl bg-white shadow-soft">
              <img src={poster.src} alt={poster.name} className="h-48 w-full object-cover" />
              <div className="flex items-center justify-between p-3">
                <p className="line-clamp-1 text-xs text-slate-600">{poster.name}</p>
                <button onClick={() => removePoster(poster.id)} className="rounded-md border border-red-200 px-2 py-1 text-xs font-semibold text-red-600">
                  Hapus
                </button>
              </div>
            </article>
          ))
        ) : (
          <p className="text-sm text-slate-500">Belum ada poster.</p>
        )}
      </div>

      <div className="mt-12 rounded-2xl border border-navy/10 bg-white p-5 shadow-soft">
        <p className="mb-3 text-sm font-semibold text-navy">Tambah Informasi Tambahan</p>
        <div className="grid gap-3">
          <input name="title" value={infoForm.title} onChange={handleInfoTextChange} placeholder="Judul informasi" className="rounded-lg border border-navy/20 px-3 py-2" />
          <textarea name="description" value={infoForm.description} onChange={handleInfoTextChange} rows={3} placeholder="Deskripsi singkat informasi" className="rounded-lg border border-navy/20 px-3 py-2" />
          <label className="inline-flex w-fit cursor-pointer rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white">
            Upload Gambar Informasi
            <input type="file" accept="image/*" onChange={handleInfoUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hasInfos ? (
          infos.map((info) => (
            <article key={info.id} className="overflow-hidden rounded-2xl bg-white shadow-soft">
              <img src={info.src} alt={info.title} className="h-48 w-full object-cover" />
              <div className="p-3">
                <h3 className="font-heading text-xl text-navy">{info.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{info.description}</p>
                <button onClick={() => handleDeleteInfo(info.id)} className="mt-3 rounded-md border border-red-200 px-2 py-1 text-xs font-semibold text-red-600">
                  Hapus
                </button>
              </div>
            </article>
          ))
        ) : (
          <p className="text-sm text-slate-500">Belum ada informasi tambahan.</p>
        )}
      </div>

      <div className="mt-12 rounded-2xl border border-navy/10 bg-white p-5 shadow-soft">
        <p className="mb-3 text-sm font-semibold text-navy">Tambah Artikel (Nuansa Siroh)</p>
        <form onSubmit={handleAddArticle} className="grid gap-3">
          <input name="title" value={articleForm.title} onChange={handleArticleChange} placeholder="Judul artikel" className="rounded-lg border border-navy/20 px-3 py-2" />
          <input name="category" value={articleForm.category} onChange={handleArticleChange} placeholder="Kategori (contoh: Siroh & Umroh)" className="rounded-lg border border-navy/20 px-3 py-2" />
          <input name="excerpt" value={articleForm.excerpt} onChange={handleArticleChange} placeholder="Ringkasan singkat" className="rounded-lg border border-navy/20 px-3 py-2" />
          <textarea name="body" value={articleForm.body} onChange={handleArticleChange} rows={6} placeholder="Isi artikel. Pisahkan paragraf dengan baris kosong." className="rounded-lg border border-navy/20 px-3 py-2" />
          <button type="submit" disabled={loading} className="w-fit rounded-full bg-gold px-5 py-2 text-sm font-bold text-white disabled:opacity-60">Simpan Artikel</button>
        </form>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {articles.length > 0 ? (
          articles.map((article) => (
            <article key={article.id} className="rounded-2xl bg-white p-4 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-wide text-gold">{article.category}</p>
              <h3 className="mt-1 font-heading text-xl text-navy">{article.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{article.excerpt}</p>
              <button onClick={() => handleDeleteArticle(article.id)} className="mt-3 rounded-md border border-red-200 px-3 py-1 text-xs font-semibold text-red-600">Hapus Artikel</button>
            </article>
          ))
        ) : (
          <p className="text-sm text-slate-500">Belum ada artikel custom dari admin.</p>
        )}
      </div>
    </section>
  );
}
