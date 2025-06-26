import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/AdminPlante.css";

interface Planta {
  id: number;
  numePlanta: string;
  descrierePlanta: string;
  imaginePlanta: string;
  categoriePlanta: string;
}

const AdminPlante: React.FC = () => {
  const [plante, setPlante] = useState<Planta[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlante = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8090/plante/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlante(response.data);
      } catch (error) {
        console.error("Eroare la preluarea plantelor:", error);
      }
    };

    fetchPlante();
  }, []);

  const handleSterge = async (id: number) => {
    const confirmare = window.confirm(
      "Sigur dorești să ștergi această plantă?"
    );
    if (!confirmare) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8090/plante/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlante(plante.filter((planta) => planta.id !== id));
    } catch (error) {
      console.error("Eroare la ștergerea plantei:", error);
    }
  };

  return (
    <>
      <div className="admin-plante-header">
        <h2>Administrare Plante</h2>
        <button
          className="adauga-btn"
          onClick={() => navigate("/admin/adauga-planta")}
        >
          + Adaugă Plantă
        </button>
      </div>

      <div className="plante-grid">
        {plante.map((planta) => (
          <div className="planta-card" key={planta.id}>
            <div className="planta-image-container">
              <img
                src={planta.imaginePlanta}
                alt={planta.numePlanta}
                className="planta-image"
              />
            </div>

            <div className="planta-header">
              <h3 className="planta-nume">{planta.numePlanta}</h3>
              <span className="planta-categorie">{planta.categoriePlanta}</span>
            </div>

            <div className="planta-info">
              <p>{planta.descrierePlanta}</p>
              <div className="btn-group">
                <button
                  onClick={() =>
                    navigate(`/admin/plante/editeaza/${planta.id}`)
                  }
                >
                  Editare
                </button>

                <button
                  onClick={() => handleSterge(planta.id)}
                  className="sterge-btn"
                >
                  Șterge
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminPlante;
