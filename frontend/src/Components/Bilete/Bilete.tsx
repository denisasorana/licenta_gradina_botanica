import "./Bilete.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ro } from "date-fns/locale";

const Bilete: React.FC = () => {
  const navigate = useNavigate();

  const [visitDate, setVisitDate] = useState<Date | null>(new Date());
  const [subsDate, setSubsDate] = useState<Date | null>(new Date());

  const [tickets, setTickets] = useState({
    adulti: 0,
    studenti: 0,
    pensionari: 0,
    copii: 0,
  });

  const [subs, setSubs] = useState<"" | "lunar" | "anual">("");

  const TicketsPrice = {
    adulti: 20,
    studenti: 15,
    pensionari: 12,
    copii: 0,
  };

  const subsPrice = {
    lunar: 50,
    anual: 150,
  };

  const totalTicketsCount =
    tickets.adulti + tickets.studenti + tickets.pensionari + tickets.copii;

  const totalTicketsCost =
    totalTicketsCount > 10
      ? totalTicketsCount * 10
      : tickets.adulti * TicketsPrice.adulti +
        tickets.studenti * TicketsPrice.studenti +
        tickets.pensionari * TicketsPrice.pensionari +
        tickets.copii * TicketsPrice.copii;

  const totalSubs = subs ? subsPrice[subs] : 0;

  const ticketsDisabled = subs !== "";

  const handleRezervaBilet = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Trebuie să fii autentificat pentru a rezerva bilete.");
      return;
    }

    if (
      tickets.adulti === 0 &&
      tickets.studenti === 0 &&
      tickets.pensionari === 0 &&
      tickets.copii === 0
    ) {
      alert("Selectează cel puțin un bilet pentru a continua.");
      return;
    }

    navigate("/plata", {
      state: {
        nrBileteAdulti: tickets.adulti,
        nrBileteStudenti: tickets.studenti,
        nrBiletePensionari: tickets.pensionari,
        nrBileteCopii: tickets.copii,
        pretTotal: totalTicketsCost,
        dataRezervare: visitDate?.toISOString() || null,
      },
    });
  };

  const handleCumparaAbonament = () => {
    const token = localStorage.getItem("token");

    if (!subs) {
      alert("Nu ai selectat niciun abonament.");
      return;
    }

    if (!token) {
      alert("Trebuie să fii autentificat pentru a cumpăra un abonament.");
      return;
    }

    navigate("/plata", {
      state: {
        tipAbonament: subs,
        pretAbonament: totalSubs,
        dataActivare: subsDate?.toISOString() || null,
      },
    });
  };

  return (
    <div className="hero">
      <div className="boxes-container">
        <div className="bilete-box">
          <h3>Bilete individuale</h3>

          <label className="label-date">Data vizitei:</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={visitDate}
            onChange={(date) => setVisitDate(date)}
            locale={ro}
            className="date-picker"
          />

          <div className="ticket-row">
            <label>Adulți (20 lei)</label>
            <input
              type="number"
              min="0"
              value={tickets.adulti}
              onChange={(e) =>
                setTickets({
                  ...tickets,
                  adulti: parseInt(e.target.value) || 0,
                })
              }
              disabled={ticketsDisabled}
            />
          </div>

          <div className="ticket-row">
            <label>Studenți (15 lei)</label>
            <input
              type="number"
              min="0"
              value={tickets.studenti}
              onChange={(e) =>
                setTickets({
                  ...tickets,
                  studenti: parseInt(e.target.value) || 0,
                })
              }
              disabled={ticketsDisabled}
            />
          </div>

          <div className="ticket-row">
            <label>Pensionari (12 lei)</label>
            <input
              type="number"
              min="0"
              value={tickets.pensionari}
              onChange={(e) =>
                setTickets({
                  ...tickets,
                  pensionari: parseInt(e.target.value) || 0,
                })
              }
              disabled={ticketsDisabled}
            />
          </div>

          <div className="ticket-row">
            <label>Copii sub 7 ani (gratuit)</label>
            <input
              type="number"
              min="0"
              value={tickets.copii}
              onChange={(e) =>
                setTickets({
                  ...tickets,
                  copii: parseInt(e.target.value) || 0,
                })
              }
              disabled={ticketsDisabled}
            />
          </div>

          {totalTicketsCount > 10 && (
            <p className="discount-note">
              Reducere aplicată: 10 lei/bilet pentru cele {totalTicketsCount}{" "}
              bilete
            </p>
          )}

          <div className="box-total">
            <span>Total bilete:</span>
            <span className="amount">{totalTicketsCost} lei</span>
          </div>

          <button
            className="action-button bilet-button"
            onClick={handleRezervaBilet}
            disabled={totalTicketsCount === 0}
          >
            Cumpără bilet
          </button>
        </div>

        <div className="subs-box">
          <h3>Abonamente</h3>

          <label className="label-date">Data început abonament:</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={subsDate}
            onChange={(date) => setSubsDate(date)}
            locale={ro}
            className="date-picker"
          />

          <div className="radio-row">
            <label>
              <input
                type="radio"
                name="subs"
                value="lunar"
                checked={subs === "lunar"}
                onChange={() => setSubs("lunar")}
              />
              Lunar (50 lei)
            </label>
          </div>

          <div className="radio-row">
            <label>
              <input
                type="radio"
                name="subs"
                value="anual"
                checked={subs === "anual"}
                onChange={() => setSubs("anual")}
              />
              Anual (150 lei)
            </label>
          </div>

          <div className="radio-row">
            <label>
              <input
                type="radio"
                name="subs"
                value=""
                checked={subs === ""}
                onChange={() => setSubs("")}
              />
              Fără abonament
            </label>
          </div>

          {subs !== "" && (
            <p className="subs-note">
              Ai selectat abonamentul <strong>{subs}</strong>.
            </p>
          )}

          <div className="box-total">
            <span>Total abonament:</span>
            <span className="amount">{totalSubs} lei</span>
          </div>

          <button
            className="action-button subs-button"
            onClick={handleCumparaAbonament}
            disabled={subs === ""}
          >
            Cumpără abonament
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bilete;
