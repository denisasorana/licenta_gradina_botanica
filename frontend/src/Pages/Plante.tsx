import { useEffect, useState } from "react";
import "../Styles/Plante.css";
import plant from "/assets/plant_tropical1.png";
import { Planta } from "../Interfaces/PlantaInterface";
import axios from "axios";

const Plante = () => {
  const [plante, setPlante] = useState<Planta[]>([]);

  const [categorie, setCategorie] = useState<
    | "tropicala"
    | "desertica"
    | "japoneza"
    | "cataratoare"
    | "perene"
    | "mediteraneene"
  >("tropicala");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get<Planta[]>(
          `http://localhost:8090/plante/${categorie}`
        );
        setPlante(response.data);
      } catch (error) {}
    };
    fetch();
  }, [categorie]);

  const handleCategorie = (
    nouaCategorie:
      | "tropicala"
      | "desertica"
      | "japoneza"
      | "cataratoare"
      | "perene"
      | "mediteraneene"
  ) => {
    setCategorie(nouaCategorie);
  };

  return (
    <div
      className="container-fluid position-relative mt-5 mb-5"
      style={{ height: "auto", paddingTop: "2em" }}
    >
      <div className="row mt-5">
        <div className="col-7">
          <div className="d-flex flex-column align-items-center">
            <h1 className="text-success fw-bold text-center mt-5">
              Descoperă plantele din grădina botanică!
            </h1>
            <p className="text-white fs-5 mt-4 text-center px-5">
              Grădina noastră botanică este un loc unde natura se întâlnește cu
              educația și frumusețea diversității plantelor. Aici vei găsi o
              colecție impresionantă de specii din întreaga lume, de la plante
              exotice până la specii autohtone, fiecare având o poveste
              fascinantă.
            </p>
            <div className="d-flex w-100 justify-content-start gap-5 mt-5 w-100 flex-wrap">
              <div className="plants-grid row-gap-3">
                <div className="plant-wrap d-flex justify-content-center">
                  <div className="mt-3 plant-card text-center">
                    <p
                      className="fs-3 m-0"
                      onClick={() => handleCategorie("tropicala")}
                    >
                      Plante <br />
                      tropicale
                    </p>
                  </div>
                </div>
                <div className="plant-wrap d-flex justify-content-center">
                  <div className="mt-3 plant-card text-center">
                    <p
                      className="fs-3 m-0"
                      onClick={() => handleCategorie("desertica")}
                    >
                      Plante <br /> deșertice
                    </p>
                  </div>
                </div>
                <div className="plant-wrap d-flex justify-content-center">
                  <div className="mt-3  plant-card text-center">
                    <p
                      className="fs-3 m-0"
                      onClick={() => handleCategorie("japoneza")}
                    >
                      Plante <br />
                      japoneze
                    </p>
                  </div>
                </div>
                <div className="plant-wrap d-flex justify-content-center">
                  <div className="mt-3  plant-card text-center">
                    <p
                      className="fs-3 m-0"
                      onClick={() => handleCategorie("cataratoare")}
                    >
                      Plante <br />
                      cataratoare
                    </p>
                  </div>
                </div>
                <div className="plant-wrap d-flex justify-content-center">
                  <div className="mt-3  plant-card text-center">
                    <p
                      className="fs-3 m-0"
                      onClick={() => handleCategorie("perene")}
                    >
                      {" "}
                      Plante <br />
                      perene
                    </p>
                  </div>
                </div>
                <div className="plant-wrap d-flex justify-content-center">
                  <div className="mt-3  plant-card text-center">
                    <p
                      className="fs-3 m-0"
                      onClick={() => handleCategorie("mediteraneene")}
                    >
                      {" "}
                      Plante <br />
                      mediteraneene
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5 d-block">
          <div className="d-flex justify-content-center">
            <img id="img-discover" src={plant}></img>
          </div>
        </div>
      </div>
      <div className="mt-5 d-flex justify-content-center flex-column plant-detail ms-auto me-auto">
        {plante.map((planta) => (
          <div
            key={planta.id}
            className="plant-data d-flex w-100 text-white align-items-center"
          >
            <div className="img-container d-flex justify-content-center align-items-center text-white">
              <img
                src={planta.imaginePlanta}
                alt={planta.numePlanta}
                className="plant-img"
              />
            </div>
            <div className="text-center py-3 h-100 pe-3">
              <p className="fs-1 mt-0 d-block text-start plant-title">
                {planta.numePlanta}
              </p>
              <p className="h4 text-start fst-italic ">
                {planta.descrierePlanta}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plante;
