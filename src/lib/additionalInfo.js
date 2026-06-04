import { apiFetch, withAbsoluteFileUrl } from "./api";
import { getAdminToken } from "./adminAuth";

export async function getAdditionalInfos() {
  const items = await apiFetch("/api/infos");
  return items.map((item) => ({ ...item, src: withAbsoluteFileUrl(item.src) }));
}

export async function uploadAdditionalInfo({ title, description, file }) {
  const fd = new FormData();
  fd.append("title", title);
  fd.append("description", description);
  fd.append("file", file);
  const token = getAdminToken();
  const item = await apiFetch("/api/infos", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: fd,
  });
  return { ...item, src: withAbsoluteFileUrl(item.src) };
}

export async function deleteAdditionalInfo(id) {
  const token = getAdminToken();
  return apiFetch(`/api/infos/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}
