import React from "react"


export default function DisplayReservations({reservation}){

    return (
        <tr key={reservation.reservation_id}>
            <td>
                Name: {reservation.first_name} {reservation.last_name}
                <br />
                Number: {reservation.mobile_number}
                <br />
                Party size of: {reservation.people}
            </td>
            <td>
                {reservation.reservation_date} at {reservation.reservation_time}
            </td>
        </tr>
    )
}

