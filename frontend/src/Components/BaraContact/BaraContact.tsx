import { Link } from "react-router-dom";
import "./BaraContact.css";

function BaraContact() {
  return (
    <div className="boxContact position-relative">
      <div className="box-links">
        <Link to="/">Acasă</Link>
        <Link to="/plante">Plante</Link>
        <Link to="/despre">Despre</Link>
        <Link to="/autentificare">Autentificare</Link>
      </div>

      <div className="contact-info">
        <p>Adresa: Șoseaua Cotroceni 32, București</p>
        <p>Telefon: 0751489587</p>
        <p>Mail: EdeniaGarden@gmail.com</p>
      </div>
    </div>
  );
}

export default BaraContact;
