import { useState } from "react";
import "../Styles/Autentificare.css";
import om from "/assets/om.png";
import mail from "/assets/mail.webp";
import parola from "/assets/parola.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  nume: string;
  prenume: string;
  email: string;
  password: string;
}

interface LoginForm {
  email: string;
  password: string;
}

function Autentificare() {
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    nume: "",
    prenume: "",
    email: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [eroare, setEroare] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (isRegister) {
      setRegisterForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setLoginForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEroare(null);

    try {
      const response = await axios.post<{
        token: string;
        nume: string;
        prenume: string;
        email: string;
      }>(
        "http://localhost:8090/Autentificare/autentificare",
        {
          email: loginForm.email,
          password: loginForm.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error: any) {
      if (error.response?.status === 401) {
        setEroare("Date incorecte");
      } else {
        setEroare("Eroare server");
      }
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEroare(null);

    try {
      await axios.post(
        "http://localhost:8090/Autentificare/inregistrare",
        {
          nume: registerForm.nume,
          prenume: registerForm.prenume,
          email: registerForm.email,
          password: registerForm.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setIsRegister(false);
    } catch (error: any) {
      if (error.response?.status === 400) {
        setEroare("Există deja un cont cu acest email.");
      } else {
        setEroare("A apărut o eroare la înregistrare.");
      }
    }
  };

  return (
    <div className="hero">
      <div className="box-autentificare">
        <div className="header-login">
          <div
            className={`tab ${isRegister ? "active-tab" : ""}`}
            onClick={() => {
              setIsRegister(true);
              setEroare(null);
            }}
          >
            Înregistrare
          </div>
          <div
            className={`tab ${!isRegister ? "active-tab" : ""}`}
            onClick={() => {
              setIsRegister(false);
              setEroare(null);
            }}
          >
            Autentificare
          </div>
        </div>
        <div className="underline"></div>

        <div className="inputs">
          {eroare && <p className="eroare">{eroare}</p>}

          {isRegister ? (
            <form onSubmit={handleRegisterSubmit}>
              <div className="input">
                <img src={om} alt="Icon user" />
                <input
                  type="text"
                  name="nume"
                  placeholder="Nume"
                  value={registerForm.nume}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <img src={om} alt="Icon user" />
                <input
                  type="text"
                  name="prenume"
                  placeholder="Prenume"
                  value={registerForm.prenume}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <img src={mail} alt="Icon mail" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={registerForm.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <img src={parola} alt="Icon parola" />
                <input
                  type="password"
                  name="password"
                  placeholder="Parolă"
                  value={registerForm.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="submit-box">
                <button type="submit" className="submit">
                  Înregistrează-te
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="input">
                <img src={mail} alt="Icon mail" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <img src={parola} alt="Icon parola" />
                <input
                  type="password"
                  name="password"
                  placeholder="Parolă"
                  value={loginForm.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="submit-box">
                <button type="submit" className="submit">
                  Autentificare
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Autentificare;
