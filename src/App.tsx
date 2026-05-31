import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import type { ReactElement } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Starfield } from "./components/visual/Starfield";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Catalog } from "./pages/Catalog";
import { DebrisDetail } from "./pages/DebrisDetail";
import { MyImpact } from "./pages/MyImpact";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { useSession } from "./auth/session";

function RequireAuth({ children }: { children: ReactElement }) {
  const { session } = useSession();
  const location = useLocation();
  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

export default function App() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      {!isLogin && <Navbar />}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RequireAuth><Landing /></RequireAuth>} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/catalogo" element={<RequireAuth><Catalog /></RequireAuth>} />
            <Route path="/detrito/:id" element={<RequireAuth><DebrisDetail /></RequireAuth>} />
            <Route path="/meu-impacto" element={<RequireAuth><MyImpact /></RequireAuth>} />
            <Route path="/sobre" element={<RequireAuth><About /></RequireAuth>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
      {!isLogin && <Footer />}
    </div>
  );
}
