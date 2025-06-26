import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface Props {
  children: JSX.Element;
}

interface DecodedToken {
  rol: string;
}

const PrivateRouteAdmin: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/autentificare" />;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    if (decoded.rol !== "ADMIN") {
      return <Navigate to="/" />;
    }
    return children;
  } catch (err) {
    return <Navigate to="/autentificare" />;
  }
};

export default PrivateRouteAdmin;
