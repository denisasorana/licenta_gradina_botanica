import "./Recenzii.css";
import om1 from "/assets/om1.jpeg";
import om2 from "/assets/om2.jpeg";
import om3 from "/assets/om3.jpeg";
import axios from "axios";
import { useState } from "react";

function Recenzii() {
  const [nume, setNume] = useState("");
  const [mesaj, setMesaj] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8090/Recenzii/adauga", {
        nume: nume,
        mesaj: mesaj,
      });
      alert("Recenzia a fost trimisă cu succes!");
      setNume("");
      setMesaj("");
    } catch (error) {
      console.error("Eroare la trimiterea recenziei:", error);
      alert("A apărut o eroare la trimiterea recenziei.");
    }
  };

  return (
    <div className="recenzii-section">
      <h1 className="recenzii-title">Recenzii</h1>

      <div className="recenzii-container">
        <div className="box-recenzii">
          <p>
            Edenia Garden este o oază verde ascunsă în inima Bucureștiului,
            perfectă pentru cei care caută un loc relaxant și boem. Atmosfera
            este plăcută.
          </p>
          <div className="user">
            <img src={om1} alt="User 1" />
            <div className="user-info">
              <h3>Popescu Dan</h3>
            </div>
          </div>
        </div>

        <div className="box-recenzii">
          <p>
            Edenia Garden e perfectă pentru o plimbare liniștită în mijlocul
            naturii. M-a impresionat cât de bine sunt îngrijite plantele și câtă
            varietate există.
          </p>
          <div className="user">
            <img src={om2} alt="User 2" />
            <div className="user-info">
              <h3>Anghel Maria</h3>
            </div>
          </div>
        </div>

        <div className="box-recenzii">
          <p>
            Mi-a plăcut mult cum e organizat spațiul: fiecare zonă are un farmec
            aparte. E educativ, dar și foarte relaxant. Un loc în care îți vine
            să revii.
          </p>
          <div className="user">
            <img src={om3} alt="User 3" />
            <div className="user-info">
              <h3>Ion Manuela</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="review-section">
        <h4>Lasă o recenzie</h4>
        <form className="review-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Numele tău"
            className="review-input"
            value={nume}
            onChange={(e) => setNume(e.target.value)}
            required
          />
          <textarea
            placeholder="Scrie recenzia ta aici..."
            className="review-textarea"
            value={mesaj}
            onChange={(e) => setMesaj(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="review-button">
            Trimite
          </button>
        </form>
      </div>
    </div>
  );
}

export default Recenzii;
