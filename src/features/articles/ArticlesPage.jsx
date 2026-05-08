import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "../../lib/articles";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(getAllArticles());
  }, []);

  return (
    <section className="w-full px-6 py-12 xl:px-12">
      <div className="max-w-3xl">
        <h1 className="font-heading text-4xl text-navy">Artikel Umroh, Tour & Siroh</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Artikel ringan untuk orang awam: tips perjalanan, adab, dan inspirasi sirah Nabi dalam kehidupan sehari-hari.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {articles.map((article) => (
          <article key={article.slug} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-wide text-gold">{article.category} - {article.readingTime}</p>
            <h2 className="mt-2 font-heading text-2xl text-navy">{article.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{article.excerpt}</p>
            <Link to={`/artikel/${article.slug}`} className="mt-5 inline-block rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white">
              Baca Artikel
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}


