import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAdmin } from "../../lib/adminAuth";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/admin";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim()) {
      setError("Nama user wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await loginAdmin({ username, password });
      navigate(from, { replace: true, state: { loginSuccess: true } });
    } catch (err) {
      setError(err.message || "Login gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full px-6 py-16 xl:px-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-navy/10 bg-white p-6 shadow-soft">
        <h1 className="font-heading text-3xl text-navy">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">Masuk untuk mengelola poster landing page.</p>

        <label className="mt-6 block text-sm font-semibold text-navy">Nama User</label>
        <input
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            setError("");
          }}
          className="mt-2 w-full rounded-lg border border-navy/20 px-3 py-2 focus:outline-none"
          placeholder="Masukkan nama user"
        />

        <label className="mt-4 block text-sm font-semibold text-navy">Password Admin</label>
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError("");
          }}
          className="mt-2 w-full rounded-lg border border-navy/20 px-3 py-2 focus:outline-none"
          placeholder="Masukkan password"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={loading} className="mt-5 w-full rounded-lg bg-navy px-4 py-2 font-semibold text-white disabled:opacity-60">
          {loading ? "Memproses..." : "Masuk Admin"}
        </button>
      </form>
    </section>
  );
}
