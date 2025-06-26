import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/AdminGalerie.css";

interface Galerie {
  id: number;
  imagine: string;
  mimeType: string;
}

const AdminGalerie: React.FC = () => {
  const [galerie, setGalerie] = useState<Galerie[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewType, setPreviewType] = useState<string>("image/jpeg");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchGalerie();
  }, []);

  const fetchGalerie = async () => {
    try {
      const res = await axios.get("http://localhost:8090/galerie");
      setGalerie(res.data);
    } catch (error) {
      console.error("Eroare la încărcarea imaginilor:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setPreviewType(e.target.files[0].type);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const result = reader.result?.toString();
      if (!result) return;

      const base64 = result.split(",")[1];

      try {
        await axios.post(
          "http://localhost:8090/galerie",
          {
            imagine: base64,
            mimeType: selectedFile.type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchGalerie();
        setSelectedFile(null);
      } catch (error) {
        console.error("Eroare la upload:", error);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleDelete = async (id: number) => {
    const confirmare = window.confirm("Ștergi această imagine?");
    if (!confirmare) return;

    try {
      await axios.delete(`http://localhost:8090/galerie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchGalerie();
    } catch (error) {
      console.error("Eroare la ștergere:", error);
    }
  };

  return (
    <div className="admin-galerie">
      <h3>Administrare Galerie</h3>

      <div className="upload-section">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Încarcă imagine</button>
      </div>

      <div className="galerie-grid">
        {galerie.map((item) => (
          <div key={item.id} className="galerie-item">
            <img
              src={`data:${item.mimeType};base64,${item.imagine}`}
              alt="Galerie"
            />
            <button onClick={() => handleDelete(item.id)}>Șterge</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGalerie;
