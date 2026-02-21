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
  FaArrowLeft,
  FaPrint,
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
    const diff = new Date(arrivalTime) - new Date(departureTime);
    if (diff <= 0) return "-";
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const formatDateTime = (dateTime) =>
    dateTime ? new Date(dateTime).toLocaleString() : "-";

  const formatCurrency = (amount) =>
    amount ? `${Number(amount).toFixed(2)} BHD` : "-";


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
        setLoadingError(
          "Unable to load flight information. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (flightId) fetchFlightData();
  }, [flightId]);

  const handlePrint = () => window.print();

  // Loader
  if (isLoading)
    return (
      <div className="container my-5 text-center pt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading flight details...</p>
      </div>
    );

  // Error
  if (loadingError)
    return (
      <div className="container my-5 pt-5">
        <div className="alert alert-danger">{loadingError}</div>
      </div>
    );

  if (!flightInformation)
    return (
      <div className="container my-5 pt-5">
        <div className="alert alert-warning">No flight information found.</div>
      </div>
    );

  return (
    <div className="container my-4 pt-5"> 
      {/* ===== Back Button Top Right ===== */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Back
        </button>
      </div>

      {/* ===== Flight Header ===== */}
      <h2 className="mb-4 d-flex align-items-center gap-2">
        <FaPlane /> Flight Information
      </h2>

      {/* ===== Flight Information Table ===== */}
      <div className="table-responsive mb-4">
        <table className="table table-bordered table-striped">
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
      </div>

      {/* ===== Divider ===== */}
      <div className="d-flex align-items-center my-4">
        <div className="flex-grow-1 border-bottom"></div>
        <span className="px-3 fw-semibold d-flex align-items-center gap-2">
          <FaUser /> Passenger Bookings
        </span>
        <div className="flex-grow-1 border-bottom"></div>
      </div>

      {/* ===== Bookings Table ===== */}
      {flightBookings.length === 0 ? (
        <div className="alert alert-info text-center">
          No passengers have booked this flight yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th><FaPassport /> Passport Number</th>
                <th>Nationality</th>
                <th>Age</th>
                <th><FaEnvelope /> Email</th>
                <th><FaPhone /> Phone</th>
                <th><FaStickyNote /> Notes</th>
                <th><FaMoneyBillWave /> Total Payment</th>
              </tr>
            </thead>
            <tbody>
              {flightBookings.map((p, index) => (
                <tr key={p.booking_id}>
                  <td>{index + 1}</td>
                  <td>{p.first_name || "-"}</td>
                  <td>{p.last_name || "-"}</td>
                  <td>{p.passport_number || "-"}</td>
                  <td>{p.nationality || "-"}</td>
                  <td>{p.age ?? "-"}</td>
                  <td>{p.email || "-"}</td>
                  <td>{p.phone || "-"}</td>
                  <td>{p.notes || "-"}</td>
                  <td>{formatCurrency(p.total_price || p.flight_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Print Button */}
          <div className="text-end mt-3">
            <button className="btn btn-primary" onClick={handlePrint}>
              <FaPrint className="me-2" />
              Print Passengers
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightDetailsPage;
