# Malika Royal Madinah Web

Website landing page travel & umrah dengan React + Vite + Tailwind CSS.

## Menjalankan (pnpm)

```bash
pnpm install
pnpm dev
```

## Struktur (mirip portal-eproc-bag)

- `src/assets`: aset statis
- `src/components/layout`: layout utama + navbar/footer
- `src/config`: konfigurasi brand/site
- `src/features/home`: halaman home
- `src/features/packages`: halaman paket
- `src/features/contact`: halaman kontak + form validasi zod
- `src/lib`: utilitas dan validasi

## Routing

- `/` -> Home
- `/paket` -> Paket
- `/kontak` -> Kontak

## Admin Guard

- URL login: `/admin-login`
- URL admin: `/admin` (protected)
- Password default: `mrm-admin-2026`
- Opsional: set `.env` -> `VITE_ADMIN_PASSWORD=your_password`
