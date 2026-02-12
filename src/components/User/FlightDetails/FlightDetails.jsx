import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaGlobe,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaMoneyBillWave,
  FaHashtag,
  FaSuitcase,
  FaWifi,
  FaBuilding
} from "react-icons/fa";

// Import API service to fetch flight data
import * as TicketService from "../../../services/TicketService";

const FlightDetails = () => {

  // Get flightId from URL (e.g. /flights/5)
  const { flightId } = useParams();

  // State to store flight details
  const [flight, setFlight] = useState(null);

  // Fetch flight details when component loads
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        // Call backend API to get single flight
        const flightData = await TicketService.show(flightId);

        if (!flightData) return;

        // Save flight data in state
        setFlight(flightData);
      } catch (error) {
        console.error("Error fetching flight:", error);
      }
    };

    fetchFlight();
  }, [flightId]); // Runs again if flightId changes

  // Show loading message while data is not ready
  if (!flight) {
    return <p>Loading flight details...</p>;
  }

  // Function to calculate flight duration (arrival - departure)
  const calculateDuration = (departure, arrival) => {
    const start = new Date(departure);
    const end = new Date(arrival);

    const diffMs = end - start; // Difference in milliseconds
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <div>

      {/* Back button to flights page */}
      <Link to="/user/flights">← Back</Link>

      <h1>Flight Details</h1>

      {/* Departure location */}
      <p>
        <FaGlobe /> <strong>From:</strong> {flight.from_city}, {flight.from_country}
      </p>

      {/* Arrival location */}
      <p>
        <FaGlobe /> <strong>To:</strong> {flight.to_city}, {flight.to_country}
      </p>

      {/* Departure time */}
      <p>
        <FaPlaneDeparture /> <strong>Departure:</strong>{" "}
        {new Date(flight.departure_time).toLocaleString()}
      </p>

      {/* Arrival time */}
      <p>
        <FaPlaneArrival /> <strong>Arrival:</strong>{" "}
        {new Date(flight.arrival_time).toLocaleString()}
      </p>

      {/* Calculated flight duration */}
      <p>
        <FaPlaneDeparture /> <strong>Flight Duration:</strong>{" "}
        {calculateDuration(flight.departure_time, flight.arrival_time)}
      </p>

      {/* Flight number */}
      <p>
        <FaHashtag /> <strong>Flight Number:</strong> {flight.flight_number}
      </p>

      {/* Ticket price */}
      <p>
        <FaMoneyBillWave /> <strong>Price:</strong> {flight.price} BHD
      </p>

      {/* Baggage allowance */}
      <p>
        <FaSuitcase /> <strong>Baggage:</strong>{" "}
        {flight.baggage ? `${flight.baggage} kg` : "Not included"}
      </p>

      {/* WiFi availability */}
      <p>
        <FaWifi /> <strong>WiFi:</strong>{" "}
        {flight.wifi ? "Available" : "Not available"}
      </p>

      {/* Airline name */}
      <p><FaBuilding /> <strong>Airline:</strong> {flight.airline_name}</p>

      {/* Available seats */}
      <p><strong>Available Seats:</strong> {flight.seats_available}</p>

       <Link to={`/user/flights/${flight.id}/bookings`}><button> Book Now </button></Link>


    </div>
  );
};

export default FlightDetails;
