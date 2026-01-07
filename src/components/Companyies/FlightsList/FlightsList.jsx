import { Link } from 'react-router-dom'
import { getCompany } from "../../../services/CompanyiesAuthService";
import { FaPlaneDeparture, FaPlaneArrival, FaMoneyBillWave, FaHashtag, FaSuitcase, FaWifi, FaCity } from "react-icons/fa";

export default function FlightsList({ flights, handleSelect, handleDelete }) {
  const company = getCompany();

  if (!flights) return <p>Loading flights...</p>;
  if (flights.length === 0) return <p>No flights available.</p>;

  return (


    <>

      <Link to='/'><h2>→ Back</h2></Link>

      <h2>Airline: {company?.name}</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {flights.map((flight) => (
          <div
            key={flight.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              width: "250px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>
              <FaCity style={{ marginRight: "5px", color: "black" }} />
              {flight.from_city} → {flight.to_city}
            </h3>

            <p>
              <FaPlaneDeparture style={{ marginRight: "5px", color: "black" }} />
              <strong>Departure:</strong>{" "}
              {new Date(flight.departure_time).toLocaleString()}
            </p>

            <p>
              <FaPlaneArrival style={{ marginRight: "5px", color: "black" }} />
              <strong>Arrival:</strong>{" "}
              {new Date(flight.arrival_time).toLocaleString()}
            </p>

            <p>
              <FaMoneyBillWave style={{ marginRight: "5px", color: "black" }} />
              <strong>Price:</strong> {flight.price} BHD
            </p>

            <p>
              <FaHashtag style={{ marginRight: "5px", color: "black" }} />
              <strong>Flight Number:</strong> {flight.flight_number}
            </p>

            <p>
              <FaSuitcase style={{ marginRight: "5px", color: "black" }} />
              <strong>Baggage:</strong> {flight.baggage || 0} kg
            </p>

            <p>
              <FaWifi style={{ marginRight: "5px", color: "black" }} />
              <strong>Wifi:</strong> {flight.wifi ? "Yes" : "No"}
            </p>

            <p>
              Posted by: <strong>{company?.employee_username}</strong>
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button style={{ flex: 1 }} onClick={() => handleSelect(flight)}>
                Edit
              </button>

              <button
                style={{ flex: 1, background: "crimson", color: "white" }}
                onClick={() => handleDelete(flight.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
