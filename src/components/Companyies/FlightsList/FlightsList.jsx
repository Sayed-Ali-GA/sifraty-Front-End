import { Link } from "react-router-dom";
import { getCompany } from "../../../services/CompanyiesAuthService";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaMoneyBillWave,
  FaHashtag,
  FaSuitcase,
  FaWifi,
  FaCity,
} from "react-icons/fa";

export default function FlightsListCompanyies({ flights, handleDelete }) {
  const company = getCompany();

  if (!flights) return <p>Loading flights...</p>;
  if (flights.length === 0) return <p>No flights available.</p>;

  return (
    <>
      <Link to="/"><h2>← Back</h2></Link>
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
              <FaCity /> {flight.from_city} → {flight.to_city}
            </h3>

            <p>
              <FaPlaneDeparture />{" "}
              {new Date(flight.departure_time).toLocaleString()}
            </p>

            <p>
              <FaPlaneArrival />{" "}
              {new Date(flight.arrival_time).toLocaleString()}
            </p>

            <p>
              <FaMoneyBillWave /> {flight.price} BHD
            </p>

            <p>
              <FaHashtag /> {flight.flight_number}
            </p>

            <p>
              <FaSuitcase /> {flight.baggage || 0} kg
            </p>

            <p>
              <FaWifi /> {flight.wifi ? "Yes" : "No"}
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              

              <Link
                to={`/flights/edit/${flight.id}`}
                style={{ flex: 1 }}
              >
                <button style={{ width: "100%" }}>
                  Edit
                </button>
              </Link>


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
