import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createReservation } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";
import { today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

function CreateReservations() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "(000)-000-0000",
    reservation_date: today(),
    reservation_time: "10:30",
    people: 0,
  });

  function cancelHandler() {
    history.goBack();
  }

  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation({ data: formData }, abortController.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`)
    } catch (error) {
      setError(error)
    }

    return () => abortController.abort();
  }

  function changeHandler({ target }) {
    let newValue = target.value;
    if (target.name === "people") {
      newValue = Number(target.value);
    }
    setFormData((previousReservation) => ({
      ...previousReservation,
      [target.name]: newValue,
    }));
  }

  return (
    <main>
      <h1>Create Reservation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler}>
        <div className="row mb-3">
          <div className="col-6 form-group">
            <label className="form-label" htmlFor="first_name">
              First Name
            </label>
            <input
              className="form-control"
              id="first_name"
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={changeHandler}
              required={true}
            />
          </div>
          <div className="col-6 form-group">
            <label className="form-label" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="form-control"
              id="last_name"
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={changeHandler}
              required={true}
            />
          </div>
          <div className="col-6 form-group">
            <label className="form-label" htmlFor="mobile_number">
              Mobile Number
            </label>
            <input
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              type="tel"
              value={formData.mobile_number}
              onChange={changeHandler}
              required={true}
            />
          </div>
          <div className="col-6 form-group">
            <label className="form-label" htmlFor="reservation_date">
              Date of Reservation
            </label>
            <input
              className="form-control"
              id="reservation_date"
              name="reservation_date"
              type="date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              value={formData.reservation_date}
              onChange={changeHandler}
              required={true}
            />
          </div>
          <div className="col-6 form-group">
            <label className="form-label" htmlFor="reservation_time">
              Time of Reservation
            </label>
            <input
              className="form-control"
              id="reservation_time"
              name="reservation_time"
              type="time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              value={formData.reservation_time}
              onChange={changeHandler}
              required={true}
            />
          </div>
          <div className="col-6 form-group">
            <label className="form-label" htmlFor="people">
              Party size
            </label>
            <input
              className="form-control"
              id="people"
              name="people"
              type="number"
              min="1"
              value={formData.people}
              onChange={changeHandler}
              required={true}
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateReservations;
