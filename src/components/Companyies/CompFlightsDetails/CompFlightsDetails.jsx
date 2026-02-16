import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaPlane,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaClock,
  FaHashtag,
  FaMoneyBillWave,
  FaChair,
  FaBuilding,
  FaUser,
  FaPassport,
  FaEnvelope,
  FaPhone,
  FaStickyNote,
  FaArrowLeft
} from "react-icons/fa";

import * as TicketService from "../../../services/TicketService";
import * as BookingedService from "../../../services/BookingedService";

const FlightDetailsPage = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();

  const [flightInformation, setFlightInformation] = useState(null);
  const [flightBookings, setFlightBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  const calculateFlightDuration = (departureTime, arrivalTime) => {
    if (!departureTime || !arrivalTime) return "-";
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(arrivalTime);
    const diff = arrivalDate - departureDate;
    if (diff <= 0) return "-";
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        setIsLoading(true);
        setLoadingError(null);

        const flightData = await TicketService.show(flightId);
        setFlightInformation(flightData);

        const bookingsData = await BookingedService.getByFlightId(flightId);
        setFlightBookings(Array.isArray(bookingsData) ? bookingsData : []);
      } catch (error) {
        console.error("Error fetching flight details:", error);
        setLoadingError("Unable to load flight information. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (flightId) fetchFlightData();
  }, [flightId]);

  const formatDateTime = (dateTime) => (dateTime ? new Date(dateTime).toLocaleString() : "-");
  const formatCurrency = (amount) => (amount ? ` ${Number(amount).toFixed(2)} BHD` : "-");

  if (isLoading) return <p>Loading flight details...</p>;
  if (loadingError) return <p style={{ color: "red" }}>{loadingError}</p>;
  if (!flightInformation) return <p>No flight information found.</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* ===== Back Button ===== */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 12px",
          fontSize: "14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px"
        }}
      >
        <FaArrowLeft /> Back to Flights
      </button>

      {/* ===== Flight Header ===== */}
      <h1 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <FaPlane /> Flight Information
      </h1>

      {/* ===== Flight Information Table ===== */}
      <table
        border="1"
        cellPadding="8"
        style={{ marginBottom: "30px", width: "100%", borderCollapse: "collapse" }}
      >
        <tbody>
          <tr>
            <th><FaPlaneDeparture /> Departure City</th>
            <td>{flightInformation.from_city}, {flightInformation.from_country}</td>
            <th><FaPlaneArrival /> Arrival City</th>
            <td>{flightInformation.to_city}, {flightInformation.to_country}</td>
          </tr>
          <tr>
            <th><FaClock /> Departure Time</th>
            <td>{formatDateTime(flightInformation.departure_time)}</td>
            <th><FaClock /> Arrival Time</th>
            <td>{formatDateTime(flightInformation.arrival_time)}</td>
          </tr>
          <tr>
            <th><FaClock /> Flight Duration</th>
            <td>{calculateFlightDuration(flightInformation.departure_time, flightInformation.arrival_time)}</td>
            <th><FaHashtag /> Flight Number</th>
            <td>{flightInformation.flight_number || "-"}</td>
          </tr>
          <tr>
            <th><FaMoneyBillWave /> Ticket Price</th>
            <td>{formatCurrency(flightInformation.price)}</td>
            <th><FaChair /> Available Seats</th>
            <td>{flightInformation.seats_available ?? "-"}</td>
          </tr>
          <tr>
            <th><FaBuilding /> Airline Name</th>
            <td colSpan="3">{flightInformation.airline_name || "-"}</td>
          </tr>
        </tbody>
      </table>

      {/* ===== Divider ===== */}
      <div style={{
        display: "flex",
        alignItems: "center",
        margin: "40px 0"
      }}>
        <div style={{ flex: 1, height: "1px", background: "#ddd" }} />
        <span style={{
          padding: "0 15px",
          fontWeight: "600",
          color: "#555",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <FaUser /> Passenger Bookings
        </span>
        <div style={{ flex: 1, height: "1px", background: "#ddd" }} />
      </div>

      {/* ===== Bookings Table ===== */}
      {flightBookings.length === 0 ? (
        <div style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          fontWeight: "500",
          color: "#555"
        }}>
          No passengers have booked this flight yet.
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="8"
            style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}
          >
            <thead>
              <tr>
                <th><FaUser />   # Number</th>
                <th>First Name</th>
                <th> Last Name</th>
                <th><FaPassport /> Passport Number</th>
                <th>Nationality</th>
                <th>Age</th>
                <th><FaEnvelope /> Email Address</th>
                <th><FaPhone /> Phone Number</th>
                <th><FaStickyNote /> Notes</th>
                <th><FaMoneyBillWave /> Total Payment</th>
              </tr>
            </thead>

            <tbody>
              {flightBookings.map((passenger, numList) => (
                <tr key={passenger.booking_id}>
                  <td>{numList + 1}</td>
                
                  <td>{passenger.first_name || "-"}</td>
                  <td>{passenger.last_name || "-"}</td>
                  <td>{passenger.passport_number || "-"}</td>
                  <td>{passenger.nationality || "-"}</td>
                  <td>{passenger.age ?? "-"}</td>
                  <td> {passenger.email || "-"}</td>
                  <td>{passenger.phone || "-"}</td>
                  <td>{passenger.notes || "-"}</td>
                  <td>{formatCurrency(passenger.total_price || passenger.flight_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FlightDetailsPage;
