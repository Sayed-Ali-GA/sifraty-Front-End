import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  FaGlobe, 
  FaCity, 
  FaPlaneDeparture, 
  FaPlaneArrival, 
  FaMoneyBillWave, 
  FaHashtag, 
  FaSuitcase, 
  FaWifi, 
  FaBuilding 
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
    return <p>Loading flight details...</p>;
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

    <div style={{ maxWidth: 500, margin: "20px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>

      <Link to="/user/flights" style={{ display: "block", marginBottom: 20 }}>← Back</Link>

      <h1 style={{ marginBottom: 20 }}>Flight Details</h1>

      <p><FaGlobe /> <strong>From:</strong> {flight.from_city}, {flight.from_country}</p>

      <p><FaGlobe /> <strong>To:</strong> {flight.to_city}, {flight.to_country}</p>

      <p><FaPlaneDeparture /> <strong>Departure:</strong> {new Date(flight.departure_time).toLocaleString()}</p>

      <p><FaPlaneArrival /> <strong>Arrival:</strong> {new Date(flight.arrival_time).toLocaleString()}</p>
     
      <p><FaPlaneDeparture /> <strong>Flight Duration:</strong> {calculateDuration(flight.departure_time, flight.arrival_time)}</p>
     
      <p><FaHashtag /> <strong>Flight Number:</strong> {flight.flight_number}</p>
     
      <p><FaMoneyBillWave /> <strong>Price:</strong> {flight.price} BHD</p>
     
      <p><FaSuitcase /> <strong>Baggage:</strong> {flight.baggage ? `${flight.baggage} kg` : "Not included"}</p>
     
      <p><FaWifi /> <strong>WiFi:</strong> {flight.wifi ? "Available" : "Not available"}</p>
     
      <p><FaBuilding /> <strong>Airline:</strong> {flight.airline_name}</p>
    </div>
  );
};

export default FlightDetails;
