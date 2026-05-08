const STORAGE_KEY = "mrm_posters";

export function getPosters() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePosters(posters) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posters));
}
