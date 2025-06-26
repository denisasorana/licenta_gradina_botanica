import React, { useEffect, useState } from "react";
import "../Styles/AdminPage.css";
import AdminPlante from "./AdminPlante";
import AdminEvenimente from "./AdminEvenimente";
import AdminGalerie from "./AdminGalerie";
import AdminSenzori from "./AdminSenzori";

const AdminPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    "plante" | "evenimente" | "galerie" | "senzori"
  >("plante");

  useEffect(() => {
    const savedSection = localStorage.getItem("admin-section");
    if (
      savedSection === "plante" ||
      savedSection === "evenimente" ||
      savedSection === "galerie" ||
      savedSection === "senzori"
    ) {
      setActiveSection(savedSection);
    }
  }, []);

  const handleSectionChange = (section: typeof activeSection) => {
    setActiveSection(section);
    localStorage.setItem("admin-section", section);
  };

  return (
    <div className="hero">
      <div className="admin-layout">
        <div className="admin-sidebar">
          <button
            className={activeSection === "plante" ? "active" : ""}
            onClick={() => handleSectionChange("plante")}
          >
            Administrează Plante
          </button>
          <button
            className={activeSection === "evenimente" ? "active" : ""}
            onClick={() => handleSectionChange("evenimente")}
          >
            Administrează Evenimente
          </button>
          <button
            className={activeSection === "galerie" ? "active" : ""}
            onClick={() => handleSectionChange("galerie")}
          >
            Administrează Galerie
          </button>
          <button
            className={activeSection === "senzori" ? "active" : ""}
            onClick={() => handleSectionChange("senzori")}
          >
            Administrează Senzori
          </button>
        </div>

        <div className="admin-content">
          {activeSection === "plante" && <AdminPlante />}
          {activeSection === "evenimente" && <AdminEvenimente />}
          {activeSection === "galerie" && <AdminGalerie />}
          {activeSection === "senzori" && <AdminSenzori />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
