import React, { useEffect, useRef, useState } from "react";
import "../Styles/AdminSenzori.css";

const AdminSenzori: React.FC = () => {
  const esp32Ip = "http://192.168.10.1";

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const tempRes = await fetch(`${esp32Ip}/temperature`);
        const humRes = await fetch(`${esp32Ip}/humidity`);

        if (tempRes.ok) {
          const t = await tempRes.text();
          setTemperatura(parseFloat(t));
        }

        if (humRes.ok) {
          const h = await humRes.text();
          setUmiditate(parseFloat(h));
        }
      } catch (err) {
        console.error("Eroare fetch senzori:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const debounceRef = useRef<number | null>(null);

  const updateBrightness = (value: number) => {
    setBrightness(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetch(`${esp32Ip}/brightness?val=${value}`)
        .then((res) => res.ok && console.log("Brightness trimis:", value))
        .catch((err) => console.error("Eroare brightness:", err));
    }, 50);
  };

  const [uvOn, setUvOn] = useState(false);
  const [temperatura, setTemperatura] = useState(0);
  const [umiditate, setUmiditate] = useState(0);
  const [brightness, setBrightness] = useState(128);
  const [pompaOn, setPompaOn] = useState(false);

  const handleUVToggle = async () => {
    const endpoint = uvOn ? "/off" : "/on";
    try {
      console.log("Trimit GET", esp32Ip + endpoint);
      const res = await fetch(`${esp32Ip}${endpoint}`, { mode: "cors" });
      console.log("Status:", res.status, res.statusText);
      const text = await res.text();
      console.log("Body:", text);
      setUvOn(!uvOn);
    } catch (err) {
      console.error("Eroare comanda UV:", err);
    }
  };

  const [irigareInProgress, setIrigareInProgress] = useState(false);

  const handleIrigare = async () => {
    try {
      setIrigareInProgress(true);
      const res = await fetch(`${esp32Ip}/irigare`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      console.log("Pompa activată pentru 2 secunde");
    } catch (err) {
      console.error("Eroare la activare pompa:", err);
    } finally {
      setTimeout(() => setIrigareInProgress(false), 2000);
    }
  };

  const handlePompaToggle = async () => {
    try {
      const endpoint = pompaOn ? "/pompa/off" : "/pompa/on";
      const res = await fetch(`${esp32Ip}${endpoint}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setPompaOn(!pompaOn);
    } catch (err) {
      console.error("Eroare control manual pompa:", err);
    }
  };

  return (
    <div className="admin-senzori-container">
      <h3 className="admin-senzori-header">Panou de administrare senzori</h3>
      <div className="sensor-grid">
        <div className="sensor-box">
          <h4>Temperatură</h4>
          <p className="sensor-value">{temperatura}°C</p>
        </div>
        <div className="sensor-box">
          <h4>Umiditate</h4>
          <p className="sensor-value">{umiditate}%</p>
        </div>
        <div className="control-buttons">
          <button className="sensor-button" onClick={handleUVToggle}>
            {uvOn ? "Oprește lumina UV" : "Pornește lumina UV"}
          </button>
          <div className="container my-3">
            <label
              htmlFor="brightnessSlider"
              className="form-label fw-bold text-dark d-block text-center"
            >
              Intensitate lumină: {brightness}
            </label>
            <input
              type="range"
              className="form-range uv-slider"
              min={0}
              max={255}
              id="brightnessSlider"
              value={brightness}
              onChange={(e) => updateBrightness(Number(e.target.value))}
            />
          </div>
          <button
            className="sensor-button"
            onClick={handleIrigare}
            disabled={irigareInProgress}
          >
            {irigareInProgress ? "Se udă..." : "Activează irigare temporară"}
          </button>
          <button className="sensor-button" onClick={handlePompaToggle}>
            {pompaOn
              ? "Oprește sistem irigare manual"
              : "Pornește sistem irigare manual"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSenzori;
