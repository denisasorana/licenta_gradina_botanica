import "./Galerie.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface GalerieItem {
  id: number;
  imagine: string;
  mimeType: string;
}

const Galerie: React.FC = () => {
  const [imagini, setImagini] = useState<GalerieItem[]>([]);

  useEffect(() => {
    const fetchGalerie = async () => {
      try {
        const res = await axios.get("http://localhost:8090/galerie");
        setImagini(res.data);
      } catch (error) {
        console.error("Eroare la încărcarea galeriei:", error);
      }
    };

    fetchGalerie();
  }, []);

  return (
    <div className="hero">
      <h2 className="titlu">Galerie Foto</h2>

      <div className="galerie">
        {imagini.map((item) => (
          <div className="imag" key={item.id}>
            <img
              src={`data:${item.mimeType};base64,${item.imagine}`}
              alt={`Imagine ${item.id}`}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galerie;
