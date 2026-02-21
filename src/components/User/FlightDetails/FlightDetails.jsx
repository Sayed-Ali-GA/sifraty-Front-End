import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaHashtag,
  FaSuitcase,
  FaWifi,
  FaBuilding,
  FaClock,
  FaChair,
  FaArrowLeft,
  FaSearch
} from "react-icons/fa";
import * as TicketService from "../../../services/TicketService";

const FlightDetails = () => {
  const { flightId } = useParams();
  const [flight, setFlight] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const data = await TicketService.show(flightId);
        if (!data) return;
        setFlight(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFlight();
  }, [flightId]);

  if (!flight) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  const calculateDuration = (dep, arr) => {
    const start = new Date(dep);
    const end = new Date(arr);
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="container my-5" style={{ paddingTop: "20px", position: "relative" }}>
      
      {/* Header with Back on Right */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">{flight.from_city} → {flight.to_city}</h2>
        <Link to="/user/flights" className="btn btn-outline-secondary">
          <FaArrowLeft className="me-1" /> Back
        </Link>
      </div>

      {/* Airline & Price */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="text-muted">{flight.airline_name}</span>
        <h4 className="text-success fw-bold">{flight.price} BHD</h4>
      </div>

      {/* Flight Info Grid */}
      <div className="row g-3 mb-4">
        {[
          { icon: FaPlaneDeparture, label: "Departure", value: new Date(flight.departure_time).toLocaleString() },
          
          { icon: FaPlaneArrival, label: "Arrival", value: new Date(flight.arrival_time).toLocaleString() },
          
          { icon: FaHashtag, label: "Flight No.", value: flight.flight_number },
          
          { icon: FaChair, label: "Seats", value: flight.seats_available },
          
          { icon: FaSuitcase, label: "Baggage", value: flight.baggage ? `${flight.baggage} kg` : "Not included" },
          
          { icon: FaWifi, label: "WiFi", value: flight.wifi ? "Available" : "Not available" },
          
          { icon: FaBuilding, label: "Airline", value: flight.airline_name },
          
          
          { icon: FaClock, label: "Duration", value: calculateDuration(flight.departure_time, flight.arrival_time) },
        ].map((item, idx) => (
          <div key={idx} className="col-12 col-md-6 col-lg-4">
            <div className="d-flex align-items-start gap-3 p-3 rounded-3 shadow-sm bg-light">
              <item.icon className="fs-4 text-primary mt-1" />
              <div>
                <small className="text-muted">{item.label}</small>
                <p className="mb-0 fw-bold">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="d-flex flex-column flex-md-row gap-3 mb-5">
        <Link 
          to={`/user/flights/${flight.id}/bookings`} 
          className="btn btn-primary btn-lg flex-fill"
        >
          Book Flight
        </Link>
        <button 
          className="btn btn-outline-info btn-lg flex-fill"
          onClick={() => setShowSearchModal(true)}
        >
          <FaSearch className="me-1" /> Explore {flight.to_city}
        </button>
      </div>

      {/* Centered Search Modal */}
      {showSearchModal && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          onClick={() => setShowSearchModal(false)}
        >
          <div 
            className="bg-white rounded-4 overflow-hidden shadow-lg"
            style={{ width: "90%", maxWidth: "1000px", height: "70%", maxHeight: "600px" }}
            onClick={e => e.stopPropagation()}
          >
            <div 
              className="d-flex justify-content-between align-items-center p-3 text-white"
              style={{ background: "linear-gradient(90deg,#4e54c8,#8f94fb)" }}
            >
              <h5 className="mb-0">Explore {flight.to_city}</h5>
              <button className="btn-close btn-close-white" onClick={() => setShowSearchModal(false)}></button>
            </div>
            <div className="h-100">
              <iframe
                title={`Explore ${flight.to_city}`}
                src={`https://www.google.com/search?q=${encodeURIComponent(flight.to_city)}&igu=1`}
                className="w-100 h-100"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FlightDetails;
