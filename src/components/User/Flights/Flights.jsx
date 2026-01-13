import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allFlights } from '../../../services/TicketService';
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaMoneyBillWave,
  FaHashtag,
  FaCity,
  FaBuilding,
} from "react-icons/fa";

 function UserFlights ({ user }) {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const loadAllFlights = async () => {
      const data = await allFlights();
      setFlights(data || []);
    };
    loadAllFlights();
  }, []);

  if (!flights) return <p>Loading flights...</p>;
  if (flights.length === 0) return <p>No flights available.</p>;

    if (!user) {
    return (
      <main style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Please Sign in to access page</h1>

        <Link to="/user/sign-in" style={{ color: "blue", textDecoration: "underline" }}>
           <h2> Go to Sign In  </h2> 
        </Link>

      <Link to="/user/sign-up" style={{ color: "blue", textDecoration: "underline" }}>
              <h2> Go to Sign Up </h2> 
        </Link>

      </main>
    );
  }


  return (
    <div>
      <h1>All Flights</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {flights.map((flight) => (
          <Link
            key={flight.id}
            to={`/user/flights/${flight.id}`}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              width: "300px",
              textDecoration: "none",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            {/* ====== Flight Header ====== */}
            <h5>
              <FaHashtag /> Flight: {flight.flight_number}
            </h5>
            <p>
              <FaBuilding /> Airline: {flight.airline_name}
            </p>

            {/* ====== Flight Route ====== */}
            <p>
              <FaCity /> From: {flight.from_city}
            </p>
            <p>
              <FaCity /> To: {flight.to_city}
            </p>

            {/* ====== Flight Times ====== */}
            <p>
              <FaPlaneDeparture /> Departure:{" "}
              {new Date(flight.departure_time).toLocaleString()}
            </p>
            <p>
              <FaPlaneArrival /> Arrival:{" "}
              {new Date(flight.arrival_time).toLocaleString()}
            </p>

            {/* ====== Flight Details ====== */}
            <p>
              <FaMoneyBillWave /> Price: {flight.price} BHD
            </p>


          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserFlights;