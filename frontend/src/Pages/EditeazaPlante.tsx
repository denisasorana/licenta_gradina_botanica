import { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/EditeazaPlante.css";
import { Dropdown } from "react-bootstrap";

const EditarePlanta = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [planta, setPlanta] = useState({
    numePlanta: "",
    descrierePlanta: "",
    categoriePlanta: "",
    imaginePlanta: "",
  });

  const categorii = [
    "desertica",
    "japoneza",
    "tropicala",
    "cataratoare",
    "perene",
    "mediteraneene",
  ];

  useEffect(() => {
    axios.get(`http://localhost:8090/plante/all`).then((res) => {
      const plantaGasita = res.data.find(
        (p: any) => p.id === parseInt(id || "")
      );
      if (plantaGasita) setPlanta(plantaGasita);
    });
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPlanta((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorieSelect = (categorie: string) => {
    setPlanta((prev) => ({ ...prev, categoriePlanta: categorie }));
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

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:8090/plante/${id}`, planta, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Planta a fost actualizată!");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Eroare la actualizare.");
    }
  };

  return (
    <div className="hero">
      <div className="adauga-planta-form">
        <h2>Editare Plantă</h2>
        <input
          type="text"
          name="numePlanta"
          value={planta.numePlanta}
          onChange={handleChange}
        />
        <textarea
          name="descrierePlanta"
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
            alt="Preview"
            style={{ width: "150px", marginTop: "10px" }}
            onClick={() => console.log(planta.imaginePlanta)}
          />
        )}

        <button onClick={handleSubmit}>Salvează modificările</button>
      </div>
    </div>
  );
};

export default EditarePlanta;
