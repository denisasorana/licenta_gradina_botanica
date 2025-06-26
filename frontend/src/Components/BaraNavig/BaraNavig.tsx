import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/icon.png";
import "./BaraNavig.css";
import { jwtDecode } from "jwt-decode";

const BaraNavig = () => {
  const navigate = useNavigate();

  const handleContClick = (e: React.MouseEvent) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    if (token) {
      navigate("/contul-meu");
    } else {
      navigate("/autentificare");
    }
  };

  const token = localStorage.getItem("token");
  let isAdmin = false;

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      isAdmin = decoded.rol === "ADMIN";
    } catch (error) {
      console.error("Eroare la decodificarea tokenului:", error);
    }
  }

  return (
    <nav className="div-container navbari">
      <div className="d-flex align-items-center">
        <img src={logo} alt="" className="logo" />
        <ul className="my-0">
          <li className="logo-name">Edenia</li>
        </ul>
      </div>

      <div>
        <ul>
          {isAdmin && (
            <li>
              <Link className="link-style" to="/admin">
                Admin
              </Link>
            </li>
          )}

          <li>
            <Link className="link-style" to="/">
              Acasă
            </Link>
          </li>

          <li>
            <Link className="link-style" to="/Plante">
              Plante
            </Link>
          </li>

          <li>
            <Link className="link-style" to="/Despre">
              Despre
            </Link>
          </li>

          <li>
            <Link className="link-style" to="/Contact">
              Contact
            </Link>
          </li>

          <li>
            <a
              href="/contul-meu"
              className="link-style"
              onClick={handleContClick}
            >
              Contul Meu
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BaraNavig;
