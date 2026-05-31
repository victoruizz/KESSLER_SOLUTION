import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Catalog } from "./pages/Catalog";
import { DebrisDetail } from "./pages/DebrisDetail";
import { MyImpact } from "./pages/MyImpact";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/detrito/:id" element={<DebrisDetail />} />
          <Route path="/meu-impacto" element={<MyImpact />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
