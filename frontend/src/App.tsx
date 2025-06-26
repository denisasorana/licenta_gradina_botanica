import { Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import HomePage from "./Pages/HomePage";
import Plante from "./Pages/Plante";
import Contact from "./Pages/Contact";
import Despre from "./Pages/Despre";
import Autentificare from "./Pages/Autentificare";
import BaraNavig from "./Components/BaraNavig/BaraNavig";
import BaraContact from "./Components/BaraContact/BaraContact";
import Calendar from "./Components/Calendar/Calendar";
import Galerie from "./Components/Galerie/Galerie";
import Bilete from "./Components/Bilete/Bilete";
import Cont from "./Pages/Cont";
import Admin from "./Pages/AdminPage";
import AdaugaPlanta from "./Pages/AdaugaPlanta";
import EditarePlanta from "./Pages/EditeazaPlante";
import PrivateRouteAdmin from "./Components/PrivateRoute";
import Plata from "./Pages/Plata";

function App() {
  return (
    <>
      <div className="fundal">
        <BaraNavig />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plante" element={<Plante />} />
          <Route path="/despre" element={<Despre />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/autentificare" element={<Autentificare />} />
          <Route path="/servicii/calendar" element={<Calendar />} />
          <Route path="/servicii/Galerie" element={<Galerie />} />
          <Route path="/cumpara-bilete" element={<Bilete />} />
          <Route path="/plata" element={<Plata />} />

          <Route path="/contul-meu" element={<Cont />} />

          <Route
            path="/admin"
            element={
              <PrivateRouteAdmin>
                <Admin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/adauga-planta"
            element={
              <PrivateRouteAdmin>
                <AdaugaPlanta />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/plante/editeaza/:id"
            element={
              <PrivateRouteAdmin>
                <EditarePlanta />
              </PrivateRouteAdmin>
            }
          />
        </Routes>
        <BaraContact />
      </div>
    </>
  );
}

export default App;
