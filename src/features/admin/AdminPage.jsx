import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../lib/adminAuth";
import { createCustomArticle, getCustomArticles, removeCustomArticle, saveCustomArticles } from "../../lib/articles";
import { getPosters, savePosters } from "../../lib/posters";

export default function AdminPage() {
  const [posters, setPosters] = useState(() => getPosters());
  const [articles, setArticles] = useState(() => getCustomArticles());
  const [message, setMessage] = useState("");
  const [articleForm, setArticleForm] = useState({
    title: "",
    category: "Siroh",
    excerpt: "",
    body: "",
  });
  const navigate = useNavigate();

  const hasPoster = useMemo(() => posters.length > 0, [posters]);

  const onUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("File harus berupa gambar.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const next = [{ id: Date.now(), src: reader.result, name: file.name }, ...posters].slice(0, 8);
      setPosters(next);
      savePosters(next);
      setMessage("Poster berhasil diupload.");
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removePoster = (id) => {
    const next = posters.filter((item) => item.id !== id);
    setPosters(next);
    savePosters(next);
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
        <p className="mb-3 text-sm font-semibold text-navy">Tambah Artikel (Nuansa Siroh)</p>
        <form onSubmit={handleAddArticle} className="grid gap-3">
          <input name="title" value={articleForm.title} onChange={handleArticleChange} placeholder="Judul artikel" className="rounded-lg border border-navy/20 px-3 py-2" />
          <input name="category" value={articleForm.category} onChange={handleArticleChange} placeholder="Kategori (contoh: Siroh & Umroh)" className="rounded-lg border border-navy/20 px-3 py-2" />
          <input name="excerpt" value={articleForm.excerpt} onChange={handleArticleChange} placeholder="Ringkasan singkat" className="rounded-lg border border-navy/20 px-3 py-2" />
          <textarea name="body" value={articleForm.body} onChange={handleArticleChange} rows={6} placeholder="Isi artikel. Pisahkan paragraf dengan baris kosong." className="rounded-lg border border-navy/20 px-3 py-2" />
          <button type="submit" className="w-fit rounded-full bg-gold px-5 py-2 text-sm font-bold text-white">Simpan Artikel</button>
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

