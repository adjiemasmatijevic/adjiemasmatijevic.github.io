import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MasterWilayah from "./pages/MasterWilayah";
import MasterDokumen from "./pages/MasterDokumen";
import PetaInteraktif from "./pages/PetaInteraktif";
import Integrasi from "./pages/Integrasi";
import Monitoring from "./pages/Monitoring";
import Analisis from "./pages/Analisis";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/master-wilayah" element={<Layout><MasterWilayah /></Layout>} />
          <Route path="/master-dokumen" element={<Layout><MasterDokumen /></Layout>} />
          <Route path="/peta-interaktif" element={<Layout><PetaInteraktif /></Layout>} />
          <Route path="/integrasi" element={<Layout><Integrasi /></Layout>} />
          <Route path="/monitoring" element={<Layout><Monitoring /></Layout>} />
          <Route path="/analisis" element={<Layout><Analisis /></Layout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
