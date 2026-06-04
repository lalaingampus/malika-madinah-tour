export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, options);
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }
  return data;
}

export function withAbsoluteFileUrl(src) {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${API_BASE_URL}${src}`;
}
