import { Link } from "react-router-dom";
import "../Styles/Despre.css";

function Despre() {
  return (
    <>
      <div className="hero">
        <div className="AboutUs">
          <h2>Despre noi</h2>

          <p>
            Edenia Garden este un loc perfect pentru iubitorii de natură, unde
            plantele sunt la ele acasă. Aici, ne concentrăm pe cultivarea,
            conservarea și studierea plantelor, oferind atât un spațiu educativ,
            cât și unul relaxant. Grădinile sunt organizate în sectoare, fiecare
            cu tipuri de plante diferite, iar vizitatorii au ocazia să învețe
            despre biodiversitate și cum plantele joacă un rol important în
            natură. În plus, grădinile sunt locuri ideale pentru relaxare, fiind
            și o atracție turistică care susține conservarea speciilor rare.
          </p>

          <div className="Orar">
            <h3>Orar de vizită</h3>
            <p>
              <strong>Luni-Vineri:</strong> 10-19
              <br />
              <strong>Sâmbătă și Duminică:</strong> 9-20
            </p>
          </div>

          <div className="Preturi">
            <h3>Prețuri de intrare</h3>
            <p>
              <strong>Adulți:</strong> 20 lei
              <br />
              <strong>Studenți:</strong> 15 lei
              <br />
              <strong>Pensionari:</strong> 12 lei
              <br />
              <strong>Copii sub 7 ani:</strong> Gratuit
            </p>
          </div>

          <div className="Abonamente">
            <h3>Abonamente</h3>
            <p>
              <strong>Abonament lunar:</strong> 50 lei
              <br />
              <strong>Abonament anual:</strong> 150 lei
            </p>
          </div>

          <div className="Grupuri">
            <h3>Abonamente pentru grupuri</h3>
            <p>
              <strong>Grupuri peste 10 persoane:</strong> 10 lei/persoană
              <br />
            </p>
          </div>
          <Link to="/cumpara-bilete">
            <button className="btn-cumpara-bilete">Cumpără bilete</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Despre;
