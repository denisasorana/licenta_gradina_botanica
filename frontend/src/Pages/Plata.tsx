import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Plata.css";
import { FaCreditCard, FaCcVisa, FaCcMastercard } from "react-icons/fa";

const Plata: React.FC = () => {
  const [nume, setNume] = useState("");
  const [card, setCard] = useState("");
  const [expira, setExpira] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Trebuie să fii autentificat pentru a accesa această pagină.");
      navigate("/autentificare");
    }
  }, [token, navigate]);

  const {
    nrBileteAdulti,
    nrBileteStudenti,
    nrBiletePensionari,
    nrBileteCopii,
    pretTotal,
    dataRezervare,
    tipAbonament,
    pretAbonament,
    dataActivare,
  } = location.state || {};

  const handlePlata = async () => {
    if (!nume || !card || !expira || !cvv) {
      alert("Te rugăm să completezi toate câmpurile cardului.");
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        if (tipAbonament) {
          await axios.post(
            "http://localhost:8090/abonamente/cumpara",
            {
              tipAbonament,
              pretAbonament,
              dataActivare,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          if (
            !nrBileteAdulti &&
            !nrBileteStudenti &&
            !nrBiletePensionari &&
            !nrBileteCopii
          ) {
            alert("Nu ai selectat niciun bilet.");
            setLoading(false);
            return;
          }

          await axios.post(
            "http://localhost:8090/bilete/cumpara-bilete",
            {
              nrBileteAdulti,
              nrBileteStudenti,
              nrBiletePensionari,
              nrBileteCopii,
              pretTotal,
              dataRezervare,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        }

        navigate("/contul-meu", { state: { succes: true } });
      } catch (error) {
        console.error("Eroare la trimiterea plății:", error);
        alert("Eroare la plată. Încearcă din nou.");
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="hero">
      <div className="pagina-plata">
        <h2>Plată cu cardul</h2>

        <div className="card-plata">
          <div className="icon-card">
            <FaCreditCard size={40} />
            <FaCcVisa size={36} style={{ marginLeft: "10px" }} />
            <FaCcMastercard size={36} style={{ marginLeft: "5px" }} />
          </div>

          <div className="formular-plata">
            <input
              type="text"
              placeholder="Nume pe card"
              value={nume}
              onChange={(e) => setNume(e.target.value)}
            />
            <input
              type="text"
              placeholder="Număr card (16 cifre)"
              value={card}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                value = value.slice(0, 16);
                const formatted = value.replace(/(.{4})/g, "$1 ").trim();
                setCard(formatted);
              }}
            />

            <div className="grup-date">
              <input
                type="text"
                placeholder="Expiră (MM/YY)"
                value={expira}
                maxLength={5}
                onChange={(e) => setExpira(e.target.value)}
              />
              <input
                type="password"
                placeholder="CVV"
                value={cvv}
                maxLength={3}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setCvv(val.slice(0, 3));
                }}
              />
            </div>

            <div className="plata-sumar">
              <p>
                Total de plată:{" "}
                <strong>
                  {pretAbonament ? `${pretAbonament}` : `${pretTotal}`} lei
                </strong>
              </p>
            </div>

            <button onClick={handlePlata} disabled={loading}>
              {loading ? "Se procesează..." : "Confirmă plata"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plata;
