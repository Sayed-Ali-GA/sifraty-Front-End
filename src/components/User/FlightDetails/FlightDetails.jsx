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
  FaChair
} from "react-icons/fa";
import * as TicketService from "../../../services/TicketService";

const FlightDetails = () => {
  const { flightId } = useParams();
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const flightData = await TicketService.show(flightId);
        if (!flightData) return;
        setFlight(flightData);
      } catch (error) {
        console.error("Error fetching flight:", error);
      }
    };
    fetchFlight();
  }, [flightId]);

  if (!flight) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  const calculateDuration = (departure, arrival) => {
    const start = new Date(departure);
    const end = new Date(arrival);
    const diffMs = end - start;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="container py-5">

      {/* Flight Card */}
      <div className="card shadow rounded-4">
        <div className="card-body">

          {/* Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
            <div>
              <h2 className="fw-bold mb-1">{flight.from_city} → {flight.to_city}</h2>
              <small className="text-muted">  {flight.airline_name}</small>
            </div>
            <div className="mt-3 mt-md-0 text-md-end">
              <h4 className="fw-bold">{flight.price} BHD</h4>
              <small className="text-muted">Total Price</small>
            </div>
          </div>

          {/* Flight Details List */}
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item d-flex align-items-center">
              <FaPlaneDeparture className="text-primary me-3 fs-5" />
              <div>
                <small className="text-muted">Departure</small><br />
                <strong>{new Date(flight.departure_time).toLocaleString()}</strong>
              </div>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <FaPlaneArrival className="text-primary me-3 fs-5" />
              <div>
                <small className="text-muted">Arrival</small><br />
                <strong>{new Date(flight.arrival_time).toLocaleString()}</strong>
              </div>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <FaHashtag className="text-primary me-3 fs-5" />
              <div>
                <small className="text-muted">Flight Number</small><br />
                <strong>{flight.flight_number}</strong>
              </div>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <FaChair className="text-primary me-3 fs-5" />
              <div>
                <small className="text-muted">Seats Available</small><br />
                <strong>{flight.seats_available}</strong>
              </div>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <FaSuitcase className="text-primary me-3 fs-5" />
              <div>
                <small className="text-muted">Baggage</small><br />
                <strong>{flight.baggage ? `${flight.baggage} kg` : "Not included"}</strong>
              </div>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <FaWifi className="text-primary me-3 fs-5" />
              <div>
                <small className="text-muted">WiFi</small><br />
                <strong>{flight.wifi ? "Available" : "Not available"}</strong>
              </div>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <FaBuilding className="text-primary me-3 fs-5" />
              <div>
                <small className="text-muted">Airline</small><br />
                <strong>{flight.airline_name}</strong>
              </div>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <FaClock className="text-primary me-3 fs-5" />
              <div>
                <small className="text-muted">Duration</small><br />
                <strong>{calculateDuration(flight.departure_time, flight.arrival_time)}</strong>
              </div>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="d-flex flex-column flex-md-row gap-3">
            <Link to="/user/flights" className="btn btn-outline-secondary btn-lg flex-fill">
              Back
            </Link>
            <Link to={`/user/flights/${flight.id}/bookings`} className="btn btn-primary btn-lg flex-fill">
              Book Flight
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default FlightDetails;
