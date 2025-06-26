import "../Styles/Cont.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

interface UserInfo {
  nume: string;
  prenume: string;
  email: string;
}

interface Bilet {
  id: number;
  nrBileteAdulti: number;
  nrBileteStudenti: number;
  nrBiletePensionari: number;
  nrBileteCopii: number;
  pretTotal: number;
  dataCumpararii: string;
  platit: boolean;
}

interface Abonament {
  id: number;
  tipAbonament: string;
  pretAbonament: number;
  dataCumpararii: string;
  platit?: boolean;
}

const Cont: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [bilete, setBilete] = useState<Bilet[]>([]);
  const [abonamente, setAbonamente] = useState<Abonament[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showSucces, setShowSucces] = useState(location.state?.succes === true);

  useEffect(() => {
    if (location.state?.succes) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/autentificare");
      return;
    }

    axios
      .get<UserInfo>("http://localhost:8090/contul-meu", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => setUser(resp.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/autentificare");
      });

    axios
      .get<Bilet[]>("http://localhost:8090/bilete/biletele-mele", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => setBilete(resp.data))
      .catch((err) => console.error("Eroare la preluarea biletelor:", err));

    axios
      .get<Abonament[]>("http://localhost:8090/abonamente/abonamentele-mele", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => setAbonamente(resp.data))
      .catch((err) => console.error("Eroare la preluarea abonamentelor:", err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const calculeazaExpirare = (data: string, tip: string): string => {
    const cumparare = new Date(data);
    if (tip.toLowerCase().includes("an")) {
      cumparare.setFullYear(cumparare.getFullYear() + 1);
    } else {
      cumparare.setMonth(cumparare.getMonth() + 1);
    }
    return cumparare.toLocaleDateString("ro-RO");
  };

  if (!user) {
    return <div className="cont-loading">Se încarcă datele...</div>;
  }

  return (
    <div className="hero">
      <div className="cont-container">
        <div className="cont-wrapper">
          <div className="cont-profil">
            <h2>Profilul meu</h2>
            <div className="cont-details">
              <p>
                <span>Nume:</span> {user.nume}
              </p>
              <p>
                <span>Prenume:</span> {user.prenume}
              </p>
              <p>
                <span>Email:</span> {user.email}
              </p>
            </div>

            {showSucces && (
              <div className="cont-succes">
                Plata a fost efectuată cu succes!
              </div>
            )}
            <button className="btn-delogare" onClick={handleLogout}>
              Delogare
            </button>
          </div>

          <div className="cont-activitati">
            <div className="cont-tabele">
              <div className="cont-bilete">
                <h3>Biletele mele </h3>
                {bilete.length === 0 ? (
                  <p>Nu ai rezervat niciun bilet.</p>
                ) : (
                  <div className="bilete-lista">
                    {bilete.map((bilet) => (
                      <div key={bilet.id} className="bilet-card">
                        <div className="bilet-detalii">
                          {bilet.nrBileteAdulti > 0 && (
                            <p>{bilet.nrBileteAdulti} x bilet adult</p>
                          )}
                          {bilet.nrBileteStudenti > 0 && (
                            <p>{bilet.nrBileteStudenti} x bilet student</p>
                          )}
                          {bilet.nrBiletePensionari > 0 && (
                            <p>{bilet.nrBiletePensionari} x bilet pensionar</p>
                          )}
                          {bilet.nrBileteCopii > 0 && (
                            <p>{bilet.nrBileteCopii} x bilet copil</p>
                          )}
                        </div>
                        <div className="bilet-detalii">
                          <p>{bilet.pretTotal} lei</p>
                        </div>
                        <div className="bilet-detalii">
                          <p>
                            Valabil la:{" "}
                            {new Date(bilet.dataCumpararii).toLocaleDateString(
                              "ro-RO"
                            )}
                          </p>
                        </div>
                        <div className="bilet-detalii">
                          <p
                            className={
                              bilet.platit ? "status-platit" : "status-neplatit"
                            }
                          >
                            Status: {bilet.platit ? "Plătit" : "Neplătit"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="cont-abonamente">
                <h3>Abonamentele mele</h3>
                {abonamente.length === 0 ? (
                  <p>Nu ai niciun abonament activ.</p>
                ) : (
                  <div className="bilete-lista">
                    {abonamente.map((ab) => (
                      <div key={ab.id} className="bilet-card">
                        <div className="bilet-detalii">
                          <p>{ab.tipAbonament}</p>
                        </div>
                        <div className="bilet-detalii">
                          <p>{ab.pretAbonament} lei</p>
                        </div>
                        <div className="bilet-detalii">
                          <p>
                            Expiră la:{" "}
                            {calculeazaExpirare(
                              ab.dataCumpararii,
                              ab.tipAbonament
                            )}
                          </p>
                        </div>
                        {ab.platit !== undefined && (
                          <div className="bilet-detalii">
                            <p
                              className={
                                ab.platit ? "status-platit" : "status-neplatit"
                              }
                            >
                              Status: {ab.platit ? "Plătit" : "Neplătit"}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cont;
