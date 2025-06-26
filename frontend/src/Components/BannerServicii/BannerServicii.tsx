import "./BannerServicii.css";
import { Link } from "react-router-dom";
import Bilete from "/assets/Bilete.jpg";
import calendar from "/assets/calendar.jpg";
import galerie from "/assets/galerie.jpg";

type BannerItem = {
  image: string;
  title: string;
  link: string;
};

const items: BannerItem[] = [
  {
    image: Bilete,
    title: "Cumpără bilete",
    link: "/cumpara-bilete",
  },
  {
    image: calendar,
    title: "Calendar Evenimente",
    link: "/servicii/calendar",
  },
  {
    image: galerie,
    title: "Galerie foto",
    link: "/servicii/Galerie",
  },
];

function BannerServicii() {
  return (
    <div className="banner-servicii-section">
      <h2 className="banner-servicii-title">Servicii</h2>
      <div className="banner-servicii-container">
        {items.map((item, index) => (
          <Link to={item.link} key={index} className="banner-card">
            <div className="circle-image-wrapper">
              <img src={item.image} alt={item.title} className="circle-image" />
            </div>
            <h3 className="banner-title">{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BannerServicii;
