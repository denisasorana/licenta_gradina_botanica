import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero div-container position-relative">
      {/* <div className="hero-text">
        <p>Descoperă frumusețea naturii, pas cu pas.</p>
      </div> */}

      <div className="container-fluid position-absolute discover">
        <div className="row">
          <div className="col-7">
            <p className="hero-text ps-5">
              Descoperă
              <br />
              frumusețea
              <br />
              naturii, pas cu pas.
            </p>
            <hr className="hero-line"></hr>
            <p className="h2 ps-5">Edenia Garden</p>
          </div>
          <div className="col-5 position-relative">
            <div
              className="position-absolute bottom-0 start-50 translate-middle-x"
              id="buton-gradina"
            >
              <button
                type="button"
                className="btn btn-light fs-2"
                onClick={() => navigate("/plante")}
              >
                Descoperă grădina
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
