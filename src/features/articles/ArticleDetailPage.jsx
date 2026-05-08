import { Link, useParams } from "react-router-dom";
import { findArticleBySlug } from "../../lib/articles";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const article = findArticleBySlug(slug);

  if (!article) {
    return (
      <section className="w-full px-6 py-12 xl:px-12">
        <h1 className="font-heading text-3xl text-navy">Artikel tidak ditemukan</h1>
        <Link to="/artikel" className="mt-4 inline-block text-sm font-semibold text-gold hover:underline">
          Kembali ke daftar artikel
        </Link>
      </section>
    );
  }

  const paragraphs = article.body.split("\n\n").filter(Boolean);

  return (
    <article className="w-full px-6 py-12 xl:px-12">
      <p className="text-xs font-bold uppercase tracking-wide text-gold">{article.category} - {article.readingTime}</p>
      <h1 className="mt-2 font-heading text-4xl leading-tight text-navy">{article.title}</h1>
      <p className="mt-4 text-base leading-relaxed text-slate-600">{article.excerpt}</p>

      <section className="mt-8 rounded-2xl bg-white p-5 shadow-soft sm:p-7">
        <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          {paragraphs.map((paragraph, index) => (
            <p key={`${article.slug}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </section>

      <Link to="/artikel" className="mt-8 inline-block rounded-full border border-navy/20 px-5 py-2 text-sm font-semibold text-navy">
        Kembali ke Artikel
      </Link>
    </article>
  );
}


