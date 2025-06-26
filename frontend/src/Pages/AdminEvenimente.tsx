import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker, { registerLocale } from "react-datepicker";
import { ro } from "date-fns/locale/ro";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/AdminEvenimente.css";

registerLocale("ro", ro);

interface Eveniment {
  idEveniment: number;
  numeEveniment: string;
  dataEveniment: string;
  oraEveniment: string;
}

const AdminEvenimente: React.FC = () => {
  const token = localStorage.getItem("token");
  const [evenimente, setEvenimente] = useState<Eveniment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState<Omit<Eveniment, "idEveniment">>({
    numeEveniment: "",
    dataEveniment: "",
    oraEveniment: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchEvenimente();
  }, []);

  const fetchEvenimente = async () => {
    const res = await axios.get("http://localhost:8090/servicii/calendar", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setEvenimente(res.data);
  };

  const formatDateToBackend = (date: Date): string => {
    const zi = String(date.getDate()).padStart(2, "0");
    const luna = String(date.getMonth() + 1).padStart(2, "0");
    const an = date.getFullYear();
    return `${zi}-${luna}-${an}`;
  };

  const showTemporaryMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    const dateFormatted = formatDateToBackend(selectedDate);
    const payload = { ...formData, dataEveniment: dateFormatted };

    try {
      if (editId === null) {
        await axios.post("http://localhost:8090/servicii/calendar", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showTemporaryMessage("Eveniment adăugat cu succes!");
      } else {
        await axios.put(
          `http://localhost:8090/servicii/calendar/${editId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditId(null);
        showTemporaryMessage("Eveniment editat cu succes!");
      }

      setFormData({
        numeEveniment: "",
        dataEveniment: "",
        oraEveniment: "",
      });
      setSelectedDate(null);
      fetchEvenimente();
    } catch (err) {
      showTemporaryMessage("Eroare la salvare.");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmare = window.confirm(
      "Ești sigur că vrei să ștergi acest eveniment?"
    );
    if (!confirmare) return;

    try {
      await axios.delete(`http://localhost:8090/servicii/calendar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showTemporaryMessage("Eveniment șters cu succes!");
      fetchEvenimente();
    } catch (err) {
      showTemporaryMessage("Eroare la ștergere.");
    }
  };

  const handleEdit = (eveniment: Eveniment) => {
    setEditId(eveniment.idEveniment);
    const [zi, luna, an] = eveniment.dataEveniment.split("-");
    const parsedDate = new Date(`${an}-${luna}-${zi}`);

    setFormData({
      numeEveniment: eveniment.numeEveniment,
      dataEveniment: eveniment.dataEveniment,
      oraEveniment: eveniment.oraEveniment,
    });
    setSelectedDate(parsedDate);
  };

  const formatData = (data: string): string => {
    const [zi, luna, an] = data.split("-");
    const luni = [
      "ianuarie",
      "februarie",
      "martie",
      "aprilie",
      "mai",
      "iunie",
      "iulie",
      "august",
      "septembrie",
      "octombrie",
      "noiembrie",
      "decembrie",
    ];
    const numeLuna = luni[parseInt(luna, 10) - 1];
    return `${zi} ${numeLuna} ${an}`;
  };

  return (
    <div className="admin-evenimente">
      <h3>Administrare Evenimente</h3>

      {message && <div className="mesaj-succes">{message}</div>}

      <form className="eveniment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nume eveniment"
          value={formData.numeEveniment}
          onChange={(e) =>
            setFormData({ ...formData, numeEveniment: e.target.value })
          }
          required
        />

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          locale="ro"
          dateFormat="dd-MM-yyyy"
          placeholderText="Selectează data"
          className="datepicker"
          required
        />

        <input
          type="text"
          placeholder="Ora (ex: 14:30)"
          value={formData.oraEveniment}
          onChange={(e) =>
            setFormData({ ...formData, oraEveniment: e.target.value })
          }
          required
        />

        <button type="submit" onSubmit={handleSubmit}>
          {editId === null ? "Adaugă eveniment" : "Salvează modificările"}
        </button>
      </form>

      <ul className="evenimente-lista">
        {evenimente.map((ev) => (
          <li key={ev.idEveniment} className="eveniment-item">
            <br /> <strong>{ev.numeEveniment}</strong>
            📅 {formatData(ev.dataEveniment)} ⏰ {ev.oraEveniment}
            <div className="eveniment-actiuni">
              <button onClick={() => handleEdit(ev)}>Editare</button>
              <button onClick={() => handleDelete(ev.idEveniment)}>
                Șterge
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminEvenimente;
