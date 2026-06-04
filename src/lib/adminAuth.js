import { apiFetch } from "./api";

const ADMIN_SESSION_KEY = "mrm_admin_auth";
const ADMIN_USER_KEY = "mrm_admin_user";
const ADMIN_TOKEN_KEY = "mrm_admin_token";

export function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
}

export function getAdminUserName() {
  return sessionStorage.getItem(ADMIN_USER_KEY) || "";
}

export function getAdminToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY) || "";
}

export async function loginAdmin({ username, password }) {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
  sessionStorage.setItem(ADMIN_USER_KEY, data?.user?.username || username?.trim() || "Admin");
  sessionStorage.setItem(ADMIN_TOKEN_KEY, data?.token || "");
  return data;
}

export function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  sessionStorage.removeItem(ADMIN_USER_KEY);
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}
