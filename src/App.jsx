import { Navigate, Route, Routes } from "react-router-dom";
import AdminGuard from "./components/auth/AdminGuard";
import MainLayout from "./components/layout/MainLayout";
import AdminLoginPage from "./features/admin/AdminLoginPage";
import AdminPage from "./features/admin/AdminPage";
import ArticleDetailPage from "./features/articles/ArticleDetailPage";
import ArticlesPage from "./features/articles/ArticlesPage";
import ContactPage from "./features/contact/ContactPage";
import HomePage from "./features/home/HomePage";
import InfoPage from "./features/info/InfoPage";
import SmartPlannerPage from "./features/planner/SmartPlannerPage";
import PackageDetailPage from "./features/packages/PackageDetailPage";
import PackagesPage from "./features/packages/PackagesPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/paket" element={<PackagesPage />} />
        <Route path="/paket/:id" element={<PackageDetailPage />} />
        <Route path="/smart-planner" element={<SmartPlannerPage />} />
        <Route path="/kontak" element={<ContactPage />} />
        <Route path="/artikel" element={<ArticlesPage />} />
        <Route path="/artikel/:slug" element={<ArticleDetailPage />} />
        <Route path="/informasi" element={<InfoPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminPage />
            </AdminGuard>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
