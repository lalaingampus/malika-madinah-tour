const DEFAULT_ARTICLES = [
  {
    id: "default-1",
    slug: "pelajaran-hijrah-untuk-perjalanan-umroh",
    category: "Siroh & Umroh",
    title: "Pelajaran Hijrah untuk Perjalanan Umroh",
    excerpt: "Makna hijrah Nabi bisa jadi bekal mental saat memulai perjalanan ibadah ke Tanah Suci.",
    readingTime: "5 menit",
    body: "Hijrah Nabi Muhammad SAW mengajarkan kesiapan, tawakal, dan strategi. Dalam konteks umroh, jamaah juga perlu menyiapkan niat, fisik, dan dokumen dengan tertib. Jangan panik saat proses bandara atau perubahan jadwal kecil; tetap tenang dan fokus pada tujuan ibadah.\n\nPelajaran penting lainnya adalah kebersamaan. Hijrah tidak dilakukan sendirian, ada dukungan sahabat. Begitu pula saat umroh, saling bantu antarjamaah akan membuat perjalanan lebih ringan. Hormati rombongan, disiplin waktu, dan jaga adab di tempat suci.",
  },
  {
    id: "default-2",
    slug: "adab-ziarah-madinah-berdasarkan-siroh",
    category: "Siroh & Tour",
    title: "Adab Ziarah Madinah Berdasarkan Siroh",
    excerpt: "Panduan sederhana agar ziarah di Madinah tetap khidmat, tertib, dan penuh makna.",
    readingTime: "6 menit",
    body: "Madinah adalah kota perjuangan Rasulullah SAW membangun masyarakat yang berakhlak. Saat berziarah, utamakan adab: suara lembut, pakaian sopan, dan tidak berebut spot foto. Fokus pada doa, shalawat, dan rasa syukur.\n\nSecara praktis, datang lebih awal ke area masjid agar tidak tergesa-gesa. Ikuti arahan petugas dan pembimbing. Ingat bahwa ziarah bukan sekadar wisata sejarah, tetapi momen memperkuat cinta kepada Rasulullah SAW dan meneladani akhlaknya.",
  },
  {
    id: "default-3",
    slug: "manajemen-waktu-ala-rasul-saat-travel",
    category: "Siroh & Produktivitas",
    title: "Manajemen Waktu Ala Rasul Saat Travel",
    excerpt: "Tips ringan mengatur energi selama tour/umroh agar ibadah tetap optimal dan badan tidak drop.",
    readingTime: "4 menit",
    body: "Rasulullah SAW mengajarkan keseimbangan antara ibadah, istirahat, dan aktivitas harian. Dalam perjalanan umroh atau tour, atur prioritas: jadwal wajib dulu (shalat, kumpul rombongan), lalu aktivitas tambahan.\n\nSediakan waktu istirahat cukup, minum air rutin, dan jangan memaksakan belanja atau jalan terlalu lama. Dengan ritme yang seimbang, ibadah bisa lebih khusyuk dan perjalanan tetap menyenangkan untuk semua anggota keluarga.",
  },
];

const STORAGE_KEY = "mrm_custom_articles";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getDefaultArticles() {
  return DEFAULT_ARTICLES;
}

export function getCustomArticles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomArticles(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getAllArticles() {
  return [...getCustomArticles(), ...getDefaultArticles()];
}

export function findArticleBySlug(slug) {
  return getAllArticles().find((item) => item.slug === slug);
}

export function createCustomArticle({ title, category, excerpt, body }) {
  const now = Date.now();
  const slugBase = slugify(title || "artikel-baru");

  return {
    id: `custom-${now}`,
    slug: `${slugBase}-${now}`,
    title: title.trim(),
    category: category.trim() || "Siroh",
    excerpt: excerpt.trim(),
    body: body.trim(),
    readingTime: `${Math.max(3, Math.ceil(body.trim().split(/\s+/).length / 130))} menit`,
  };
}

export function removeCustomArticle(id) {
  const next = getCustomArticles().filter((item) => item.id !== id);
  saveCustomArticles(next);
  return next;
}
