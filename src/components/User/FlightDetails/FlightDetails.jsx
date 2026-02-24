import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaPlaneDeparture, FaPlaneArrival, FaHashtag,
  FaSuitcase, FaWifi, FaBuilding, FaClock,
  FaChair, FaArrowLeft, FaSearch, FaTicketAlt,
} from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import * as TicketService from "../../../services/TicketService";
import "./FlightDetails.css";

/* ─────────────────────────────────────
   Helpers
───────────────────────────────────── */
const calcDuration = (dep, arr) => {
  const diff = new Date(arr) - new Date(dep);
  if (diff <= 0) return "—";
  return `${Math.floor(diff / 3600000)}h ${Math.floor((diff % 3600000) / 60000)}m`;
};

const fmt = (dt) => dt ? new Date(dt).toLocaleString() : "—";

/* ─────────────────────────────────────
   Main Component
───────────────────────────────────── */
const FlightDetails = () => {
  const { flightId } = useParams();
  const [flight, setFlight]           = useState(null);
  const [showModal, setShowModal]     = useState(false);

  useEffect(() => {
    TicketService.show(flightId)
      .then(data => { if (data) setFlight(data); })
      .catch(console.error);
  }, [flightId]);

  /* Loading */
  if (!flight) return (
    <div className="fd-loading">
      <div className="fd-spinner" />
      <p>Loading flight details…</p>
    </div>
  );

  const infoItems = [
    { icon: <FaPlaneDeparture />, label: "Departure Time",  value: fmt(flight.departure_time) },
    { icon: <FaPlaneArrival />,  label: "Arrival Time",    value: fmt(flight.arrival_time) },
    { icon: <FaClock />,         label: "Duration",         value: calcDuration(flight.departure_time, flight.arrival_time) },
    { icon: <FaChair />,         label: "Seats Available",  value: flight.seats_available ?? "—" },
    { icon: <FaSuitcase />,      label: "Baggage",          value: flight.baggage ? `${flight.baggage} kg` : "Not included" },
    { icon: <FaWifi />,          label: "Wi-Fi",            value: flight.wifi ? "Available" : "Not available",
      wifiClass: flight.wifi ? "wifi-on" : "wifi-off" },
    { icon: <FaBuilding />,      label: "Airline",          value: flight.airline_name || "—" },
    { icon: <FaHashtag />,       label: "Flight No.",       value: flight.flight_number || "—", mono: true },
  ];

  return (
    <div className="fd-page">
      <div className="fd-wrapper">

        {/* ══ Page Header ══ */}
        <div className="fd-page-header">
          <div className="fd-breadcrumb">
            <span>Flights</span>
            <span>›</span>
            <span>{flight.from_city} → {flight.to_city}</span>
          </div>
          <Link to="/user/flights" className="fd-btn-back">
            <FaArrowLeft /> Back to Flights
          </Link>
        </div>

        {/* ══ Route Banner ══ */}
        <div className="fd-route-banner">

          {/* From */}
          <div className="fd-route-city">
            <span className="city-code">{flight.from_city}</span>
            <span className="city-label">{flight.from_country}</span>
          </div>

          {/* Arrow + duration */}
          <div className="fd-route-middle">
            <div className="fd-route-line">
              <span className="rl-dash" />
              <MdFlightTakeoff className="rl-plane" />
              <span className="rl-dash" />
            </div>
            <span className="fd-route-duration">
              {calcDuration(flight.departure_time, flight.arrival_time)}
            </span>
          </div>

          {/* To */}
          <div className="fd-route-city" style={{ textAlign: "right" }}>
            <span className="city-code">{flight.to_city}</span>
            <span className="city-label">{flight.to_country}</span>
          </div>

          {/* Right meta: flight no + price */}
          <div className="fd-route-meta">
            <div className="fd-meta-block">
              <span className="fd-meta-label">Flight No.</span>
              <span className="fd-meta-value flight-no">{flight.flight_number}</span>
            </div>
            <div className="fd-meta-divider" />
            <div className="fd-meta-block">
              <span className="fd-meta-label">Price</span>
              <span className="fd-meta-value price">{flight.price} BHD</span>
            </div>
          </div>

        </div>

        {/* ══ Flight Info Card ══ */}
        <div className="fd-card">
          <div className="fd-card-header">
            <div className="hdr-icon"><MdFlightTakeoff /></div>
            <h5>Flight Information</h5>
          </div>
          <div className="fd-details-grid">
            {infoItems.map((item, i) => (
              <div className="fd-detail-cell" key={i}>
                <div className="cell-icon">{item.icon}</div>
                <div className="cell-text">
                  <span className="cell-label">{item.label}</span>
                  <span className={`cell-value${item.mono ? " v-mono" : ""}${item.wifiClass ? ` v-${item.wifiClass}` : ""}`}>
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ Actions ══ */}
        <div className="fd-actions">
          <Link
            to={`/user/flights/${flight.id}/bookings`}
            className="fd-btn-book"
          >
            <FaTicketAlt /> Book This Flight
          </Link>
          <button
            className="fd-btn-explore"
            onClick={() => setShowModal(true)}
          >
            <FaSearch /> Explore {flight.to_city}
          </button>
        </div>

      </div>

      {/* ══ Explore Modal ══ */}
      {showModal && (
        <div
          className="fd-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div className="fd-modal" onClick={e => e.stopPropagation()}>
            <div className="fd-modal-header">
              <h5><FaSearch /> Explore {flight.to_city}</h5>
              <button
                className="fd-modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <iframe
              title={`Explore ${flight.to_city}`}
              src={`https://www.google.com/search?q=${encodeURIComponent(flight.to_city + " tourism")}&igu=1`}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default FlightDetails;