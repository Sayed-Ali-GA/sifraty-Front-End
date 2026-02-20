import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allFlights } from "../../../services/TicketService";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaMoneyBillWave,
  FaHashtag,
  FaCity,
  FaBuilding,
} from "react-icons/fa";

function UserFlights({ user }) {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const loadAllFlights = async () => {
      const data = await allFlights();
      setFlights(data || []);
    };
    loadAllFlights();
  }, []);

  if (!user) {
    return (
      <div className="container py-5">
        <div className="card shadow-sm rounded-4 text-center p-5">
          <h3 className="mb-4">Please sign in to access this page</h3>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/user/sign-in" className="btn btn-primary">
              Sign In
            </Link>

            <Link to="/user/sign-up" className="btn btn-outline-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h5 className="text-muted">No flights available.</h5>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Available Flights</h2>
      </div>

      <div className="row g-4">
        {flights.map((flight) => (
          <div key={flight.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm rounded-4 border-0">
              <div className="card-body d-flex flex-column">

                {/* Airline Logo */}
                {flight.airline_logo && (
                  <div className="text-center mb-3">
                    <img
                      src={flight.airline_logo}
                      alt={`${flight.airline_name} Logo`}
                      className="img-fluid"
                      style={{ maxHeight: "50px" }}
                    />
                  </div>
                )}

                {/* Flight Header */}
                <h6 className="fw-bold mb-2">
                  <FaHashtag className="me-2 text-primary" />
                  {flight.flight_number}
                </h6>

                <p className="mb-1 text-muted">
                  <FaBuilding className="me-2" />
                  {flight.airline_name}
                </p>

                {/* Route */}
                <p className="mb-1">
                  <FaCity className="me-2 text-primary" />
                  {flight.from_city} → {flight.to_city}
                </p>

                {/* Times */}
                <p className="mb-1 small text-muted">
                  <FaPlaneDeparture className="me-2" />
                  {new Date(flight.departure_time).toLocaleString()}
                </p>

                <p className="mb-3 small text-muted">
                  <FaPlaneArrival className="me-2" />
                  {new Date(flight.arrival_time).toLocaleString()}
                </p>

                {/* Price + Button */}
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-success">
                    <FaMoneyBillWave className="me-1" />
                    {flight.price} BHD
                  </span>

                  <Link
                    to={`/user/flights/${flight.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default UserFlights;
