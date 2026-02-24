import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allFlights } from "../../../services/TicketService";
import {
  FaPlaneDeparture, FaPlaneArrival,
  FaMoneyBillWave, FaHashtag, FaBuilding, FaArrowRight,
} from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import "./Flights.css";

function UserFlights({ user }) {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    allFlights().then(data => setFlights(data || []));
  }, []);

  /* ── Guest State ── */
  if (!user) {
    return (
      <div className="uf-page">
        <div className="uf-state-wrap">
          <div className="uf-state-card">
            <div className="uf-state-banner">
              <div className="banner-icon"><MdFlightTakeoff /></div>
              <h3>Sign in to Browse Flights</h3>
            </div>
            <div className="uf-state-body">
              <p>Create an account or sign in to explore available flights and book your next trip.</p>
              <div className="uf-state-actions">
                <Link to="/user/sign-in" className="uf-btn-view">Sign In</Link>
                <Link to="/user/sign-up" className="uf-btn-outline">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Empty State ── */
  if (flights.length === 0) {
    return (
      <div className="uf-page">
        <div className="uf-empty">
          <MdFlightTakeoff />
          <p>No flights available at the moment.</p>
        </div>
      </div>
    );
  }

  /* ── Main ── */
  return (
    <div className="uf-page">
      <div className="container-fluid px-0">

        {/* Page Header */}
        <div className="uf-page-header">
          <h2>Available Flights</h2>
          <p>Browse and book from our latest listings</p>
          <span className="uf-flight-count">
            <MdFlightTakeoff /> {flights.length} flights found
          </span>
        </div>

        {/* Grid */}
        <div className="uf-grid">
          {flights.map((flight) => (
            <Link
              key={flight.id}
              to={`/user/flights/${flight.id}`}
              className="uf-card-link"
            >
              <div className="uf-card">

                {/* ── Top: airline + flight number ── */}
               <div className="uf-card-top">
                 <span className="uf-flight-badge">
                  <FaHashtag />
                    {flight.flight_number}
                  </span>

                        {flight.airline_logo ? (
                 <div className="uf-airline-wrap">
                      <span className="uf-airline-name">
                              {flight.airline_name}
                      </span>
                 <img
                   src={flight.airline_logo}
                   alt={flight.airline_name}
                   className="uf-airline-logo"
                  />

                </div>
          ) : (
            <span className="uf-airline-name">
             <FaBuilding style={{ marginRight: 4 }} />
              {flight.airline_name || "Airline"}
            </span>
          )}
      </div>


                {/* ── Route ── */}
                <div className="uf-route">
                  <div className="uf-route-city">
                    <span className="city">{flight.from_city}</span>
                    <span className="country">{flight.from_country}</span>
                  </div>

                  <div className="uf-route-arrow">
                    <div className="arrow-line">
                      <MdFlightTakeoff />
                    </div>
                  </div>

                  <div className="uf-route-city" style={{ textAlign: "right" }}>
                    <span className="city">{flight.to_city}</span>
                    <span className="country">{flight.to_country}</span>
                  </div>
                </div>

                {/* ── Times ── */}
                <div className="uf-times">
                  <div className="uf-time-cell">
                    <span className="t-label">
                      <FaPlaneDeparture /> Departure
                    </span>
                    <span className="t-value">
                      {new Date(flight.departure_time).toLocaleString()}
                    </span>
                  </div>
                  <div className="uf-time-cell">
                    <span className="t-label">
                      <FaPlaneArrival /> Arrival
                    </span>
                    <span className="t-value">
                      {new Date(flight.arrival_time).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* ── Footer: price + CTA ── */}
                <div className="uf-card-footer">
                  <div className="uf-price">
                    <span className="price-label">
                      <FaMoneyBillWave style={{ marginRight: 3 }} />
                      Price
                    </span>
                    <span className="price-value">{flight.price} BHD</span>
                  </div>
                  <span className="uf-btn-view">
                    View <FaArrowRight />
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

export default UserFlights;