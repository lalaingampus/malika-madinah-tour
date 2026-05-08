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
];

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [showLoginToast, setShowLoginToast] = useState(false);
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

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-[#0b214f] px-4 py-8 text-white sm:px-6">
        <div className="flex w-full flex-col gap-2 px-2 text-sm sm:flex-row sm:justify-between xl:px-6">
          <p>{siteConfig.companyName}</p>
          <p>{siteConfig.email} | {siteConfig.phone}</p>
        </div>
      </footer>
    </div>
  );
}

