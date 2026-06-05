import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import logoPng from "../../assets/logo.png";
import { siteConfig } from "../../config/site";
import { getAdminUserName, isAdminAuthenticated } from "../../lib/adminAuth";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/paket", label: "Paket" },
  { to: "/kontak", label: "Kontak" },
  { to: "/artikel", label: "Artikel" },
  { to: "/informasi", label: "Informasi" },
];

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const [waMenuOpen, setWaMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isAdminAuthenticated()) {
      setAdminName(getAdminUserName());
    } else {
      setAdminName("");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.state?.loginSuccess) {
      setShowLoginToast(true);
      const timer = setTimeout(() => setShowLoginToast(false), 2200);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => setRouteLoading(false), 320);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("main section, main article"));
    if (!nodes.length) return undefined;

    nodes.forEach((node) => node.classList.add("reveal-init"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [location.pathname]);

  const waNumber = siteConfig.phone.replace(/\D/g, "");
  const waContacts = siteConfig.whatsappContacts || [
    {
      label: "CS 1",
      phone: siteConfig.phone,
      message: "Assalamualaikum, saya ingin konsultasi paket umrah.",
    },
  ];

  const buildWaLink = (phone, message) => {
    const number = String(phone).replace(/\D/g, "");
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream text-slate-800">
      <header className="sticky top-0 z-20 border-b border-navy/10 bg-white/95 backdrop-blur">
        <div className="flex w-full items-center justify-between px-6 py-4 xl:px-12">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logoPng} alt="Logo PT Malika Royal Madinah" className="h-10 w-auto sm:h-12" />
            <span className="hidden font-heading text-lg font-bold text-navy sm:inline">{siteConfig.companyName}</span>
          </NavLink>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-navy/20 text-navy sm:hidden"
            aria-label="Buka menu"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="absolute block h-0.5 w-5 translate-y-1.5 bg-current" />
            <span className="absolute block h-0.5 w-5 -translate-y-1.5 bg-current" />
          </button>
          <div className="hidden items-center gap-3 sm:flex">
            <nav className="flex items-center gap-2 sm:gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-semibold ${isActive ? "bg-navy text-white" : "text-navy"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <NavLink
              to={adminName ? "/admin" : "/admin-login"}
              className="rounded-full border border-navy/20 bg-gold px-5 py-2.5 text-sm font-bold text-white shadow-sm"
            >
              {adminName || "Login"}
            </NavLink>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 bg-black/35 transition-opacity sm:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 bg-white p-5 shadow-xl transition-transform sm:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-6 flex items-center justify-between">
          <img src={logoPng} alt="Logo PT Malika Royal Madinah" className="h-10 w-auto" />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-navy/20 text-3xl leading-none text-navy"
            aria-label="Tutup menu"
          >
            x
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold ${isActive ? "bg-navy text-white" : "text-navy hover:bg-navy/10"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to={adminName ? "/admin" : "/admin-login"}
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-lg bg-gold px-3 py-2 text-sm font-bold text-white"
          >
            {adminName || "Login Admin"}
          </NavLink>
        </nav>
      </aside>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 transition-opacity duration-300 ${
          showLoginToast ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl transition-all duration-300 ${
            showLoginToast ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <p className="font-heading text-2xl text-navy">Login Berhasil</p>
          <p className="mt-2 text-sm text-slate-600">Anda berhasil masuk ke dashboard admin.</p>
        </div>
      </div>

      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white/55 backdrop-blur-sm transition-opacity duration-300 ${routeLoading ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className={`logo-loader-wrap ${routeLoading ? "logo-loader-wrap-show" : ""}`}>
          <img src={logoPng} alt="Loading PT Malika Royal Madinah" className="logo-loader-img" />
          <div className="logo-loader-ring" />
        </div>
      </div>

      <main key={location.pathname} className="page-enter flex-1">
        <Outlet />
      </main>

      <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6">
        <div
          className={`w-56 overflow-hidden rounded-2xl border border-white/20 bg-white p-3 shadow-2xl transition-all duration-200 ${
            waMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-navy">Kontak WhatsApp</p>
          <div className="space-y-2">
            {waContacts.slice(0, 2).map((contact) => (
              <a
                key={contact.label}
                href={buildWaLink(contact.phone, contact.message)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl bg-[#f5f8ff] px-3 py-2 text-sm font-semibold text-navy transition hover:bg-[#eaf1ff]"
                onClick={() => setWaMenuOpen(false)}
              >
                <span>{contact.label}</span>
                <span className="text-xs text-slate-500">{contact.phone}</span>
              </a>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setWaMenuOpen((prev) => !prev)}
          aria-label="Buka kontak WhatsApp"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:brightness-95"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.66 15l-1.2 4.4 4.5-1.18A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.08-1.12l-.3-.18-2.67.7.72-2.6-.2-.3A8 8 0 1 1 12 20zm4.38-5.97c-.24-.12-1.4-.7-1.62-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.94c-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.17-1.38-1.3-1.62-.14-.24-.02-.36.1-.48.1-.1.24-.26.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.26 1.04.42 1.4.54.58.18 1.1.16 1.52.1.46-.06 1.4-.58 1.6-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
          </svg>
        </button>
      </div>

      <footer className="bg-[#0b214f] px-4 py-8 text-white sm:px-6">
        <div className="flex w-full flex-col gap-2 px-2 text-sm sm:flex-row sm:justify-between xl:px-6">
          <p>{siteConfig.companyName}</p>
          <p>{siteConfig.email} | {siteConfig.phone}</p>
        </div>
      </footer>
    </div>
  );
}


