import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import { useHistory } from "react-router";
import ReservationList from "../reservations/listReservations"

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const handlePrevious = () => {
    history.push(`dashboard?date=${previous(date)}`);
  }
  const handleToday = () => {
    history.push("dashboard")
  }
  const handleNext = () => {
    history.push(`dashboard?date=${next(date)}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <button
          type="button"
          className="btn btn-dark"
          data-testid="previous-date"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-dark"
          data-testid="today"
          onClick={handleToday}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-dark"
          data-testid="next-date"
          onClick={handleNext}
        >
          Next
        </button>
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationList reservations={reservations} />
    </main>
  );
}

export default Dashboard;
