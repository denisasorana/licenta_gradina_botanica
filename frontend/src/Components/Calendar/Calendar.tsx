import { useState, useEffect } from "react";
import axios from "axios";
import "./Calendar.css";

interface Eveniment {
  idEveniment: number;
  numeEveniment: string;
  dataEveniment: string;
  oraEveniment: string;
  descriereEveniment?: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
  const [startDay, setStartDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [evenimente, setEvenimente] = useState<Eveniment[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8090/servicii/calendar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setEvenimente(res.data))
      .catch((err) =>
        console.error("Eroare la încărcarea evenimentelor:", err)
      );
  }, []);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days: Date[] = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    setDaysInMonth(days);
    setStartDay(new Date(year, month, 1).getDay());
  }, [currentDate]);

  const dayNames = [
    "LUNI",
    "MARȚI",
    "MIERCURI",
    "JOI",
    "VINERI",
    "SÂMBĂTĂ",
    "DUMINICĂ",
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const getEventForDay = (day: number) => {
    const zi = String(day).padStart(2, "0");
    const luna = String(currentDate.getMonth() + 1).padStart(2, "0");
    const an = currentDate.getFullYear();
    const dataCautata = `${zi}-${luna}-${an}`;

    return evenimente.find((ev) => ev.dataEveniment === dataCautata);
  };

  return (
    <div className="hero">
      <div className="Calendar">
        <div className="headerCalendar">
          <button onClick={prevMonth}>&lt;</button>
          {currentDate.toLocaleDateString("ro-RO", { month: "long" })}{" "}
          {currentDate.getFullYear()}
          <button onClick={nextMonth}>&gt;</button>
        </div>

        <div className="day-names">
          {dayNames.map((dayName, index) => (
            <div key={index} className="day-name">
              {dayName}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="day-cell empty"></div>
          ))}

          {daysInMonth.map((day, index) => {
            const event = getEventForDay(day.getDate());
            return (
              <div
                key={index}
                className={`day-cell ${event ? "event" : ""} ${
                  selectedDate === day.getDate() ? "selected" : ""
                }`}
                onClick={() => setSelectedDate(day.getDate())}
              >
                {day.getDate()}
                {event && <div className="event-emoji">📍</div>}
              </div>
            );
          })}
        </div>

        {selectedDate && (
          <div className="event-details">
            {getEventForDay(selectedDate) ? (
              <div>
                <h3>{getEventForDay(selectedDate)?.numeEveniment}</h3>
                <p>{getEventForDay(selectedDate)?.descriereEveniment}</p>
                <p>Ora: {getEventForDay(selectedDate)?.oraEveniment}</p>
              </div>
            ) : (
              <p>Nu există evenimente pentru această zi.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
