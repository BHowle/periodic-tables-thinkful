import React from "react"
import DisplayReservations from "./displayReservations";

export default function ReservationList({reservations}) {
    
    const tableRows = reservations.map((reservation) => {
        return (
          <DisplayReservations
            key={reservation.reservation_id}
            reservation={reservation}
          />
        );
      });
      if (reservations.length) {
        return (
          <div className="container-fluid">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Guest</th>
    
                  <th scope="col">Date &amp; Time</th>
    
                  <th scope="col">Status</th>
                  <th className="text-center" scope="col">
                    Table Seating
                  </th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        );
      } else {
        return <div>No reservations found.</div>;
      }
}