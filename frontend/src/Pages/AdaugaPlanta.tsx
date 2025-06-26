import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/AdaugaPlanta.css";
import Dropdown from "react-bootstrap/Dropdown";

const categorii = [
  "desertica",
  "japoneza",
  "tropicala",
  "cataratoare",
  "perene",
  "mediteraneene",
];

const AdaugaPlanta: React.FC = () => {
  const navigate = useNavigate();

  const [planta, setPlanta] = useState({
    numePlanta: "",
    descrierePlanta: "",
    categoriePlanta: "",
    imaginePlanta: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPlanta((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPlanta((prev) => ({
        ...prev,
        imaginePlanta: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCategorieSelect = (categorie: string) => {
    setPlanta((prev) => ({ ...prev, categoriePlanta: categorie }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8090/plante", planta, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Planta a fost adăugată cu succes!");
      navigate("/admin");
    } catch (error) {
      console.error("Eroare la adăugare:", error);
      alert("A apărut o eroare la adăugarea plantei.");
    }
  };

  return (
    <div className="hero">
      <div className="adauga-planta-form">
        <h2>Adaugă o nouă plantă</h2>

        <input
          type="text"
          name="numePlanta"
          placeholder="Nume plantă"
          value={planta.numePlanta}
          onChange={handleChange}
        />

        <textarea
          name="descrierePlanta"
          placeholder="Descriere plantă"
          value={planta.descrierePlanta}
          onChange={handleChange}
        />
        <Dropdown
          onSelect={(e) => handleCategorieSelect(e || "")}
          className="border rounded border-black-subtle"
        >
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            className="w-100"
          >
            {planta.categoriePlanta || "Selectează categoria"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {categorii.map((cat, idx) => (
              <Dropdown.Item key={idx} eventKey={cat}>
                {cat}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {planta.imaginePlanta && (
          <img
            src={planta.imaginePlanta}
            alt="Previzualizare"
            style={{ width: "150px", marginTop: "10px" }}
          />
        )}
        <button className="button" onClick={handleSubmit}>
          Adaugă Plantă
        </button>
      </div>
    </div>
  );
};

export default AdaugaPlanta;
