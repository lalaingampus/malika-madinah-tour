const ADMIN_SESSION_KEY = "mrm_admin_auth";
const ADMIN_USER_KEY = "mrm_admin_user";
const DEFAULT_ADMIN_PASSWORD = "mrm-admin-2026";

export function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
}

export function getAdminUserName() {
  return sessionStorage.getItem(ADMIN_USER_KEY) || "";
}

export function loginAdmin({ password, username }) {
  const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
  const isValid = password === validPassword;
  if (isValid) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
    sessionStorage.setItem(ADMIN_USER_KEY, username?.trim() || "Admin");
  }
  return isValid;
}

export function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  sessionStorage.removeItem(ADMIN_USER_KEY);
}
