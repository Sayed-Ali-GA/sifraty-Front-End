import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FiAirplay,
  FiMapPin,
  FiClock,
  FiHash,
  FiUsers,
  FiUser,
  FiCreditCard,
  FiMail,
  FiPhone,
  FiFileText,
  FiArrowLeft,
  FiPrinter,
} from "react-icons/fi";


import * as TicketService from "../../../services/TicketService";
import * as BookingedService from "../../../services/BookingedService";
import "./CompFlightsDetails.css";



/* ========= Reusable Component ========= */

const InfoItem = ({ icon, label, value, full }) => {
  return (
    <div className={`flight-info-item ${full ? "full" : ""}`}>
      <div className="flight-icon">{icon}</div>
      <div>
        <small className="text-muted d-block">{label}</small>
        <span className="fw-semibold">{value}</span>
      </div>
    </div>
  );
};

/* ========= Main Component ========= */

const CompFlightsDetails = () => {
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

        const flightData = await TicketService.show(flightId);
        setFlightInformation(flightData);

        const bookingsData =
          await BookingedService.getByFlightId(flightId);

        setFlightBookings(
          Array.isArray(bookingsData) ? bookingsData : []
        );
      } catch (error) {
        setLoadingError("Unable to load flight information.");
      } finally {
        setIsLoading(false);
      }
    };

    if (flightId) fetchFlightData();
  }, [flightId]);

  const handlePrint = () => window.print();

  if (isLoading)
    return (
      <div className="container pt-5 mt-5 text-center">
        <div className="spinner-border text-dark" />
        <p className="mt-3">Loading flight details...</p>
      </div>
    );

  if (loadingError)
    return (
      <div className="container pt-5 mt-5">
        <div className="alert alert-danger">{loadingError}</div>
      </div>
    );

  if (!flightInformation)
    return (
      <div className="container pt-5 mt-5">
        <div className="alert alert-warning">
          No flight information found.
        </div>
      </div>
    );

  return (
    <div className="flight-details-page container">

      <div className="official-card shadow-sm">

        {/* ===== Header ===== */}
        <div className="official-header">
          <h4 className="header-title">
            <FiAirplay className="header-icon" />
            Flight Operational Report
          </h4>

          <div className="no-print d-flex gap-2 flex-wrap">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              <FiArrowLeft className="me-1" />
              Back
            </button>

            <button
              className="btn btn-dark btn-sm"
              onClick={handlePrint}
            >
              <FiPrinter className="me-1" />
              Print
            </button>
          </div>
        </div>

        {/* ===== Flight Info Grid ===== */}

        <div className="flight-info-grid">

          <InfoItem
            icon={<FiMapPin />}
            label="Departure"
            value={`${flightInformation.from_city}, ${flightInformation.from_country}`}
          />

          <InfoItem
            icon={<FiMapPin />}
            label="Arrival"
            value={`${flightInformation.to_city}, ${flightInformation.to_country}`}
          />

          <InfoItem
            icon={<FiClock />}
            label="Departure Time"
            value={formatDateTime(flightInformation.departure_time)}
          />

          <InfoItem
            icon={<FiClock />}
            label="Arrival Time"
            value={formatDateTime(flightInformation.arrival_time)}
          />

          <InfoItem
            icon={<FiClock />}
            label="Duration"
            value={calculateFlightDuration(
              flightInformation.departure_time,
              flightInformation.arrival_time
            )}
          />

          <InfoItem
            icon={<FiHash />}
            label="Flight Number"
            value={flightInformation.flight_number || "-"}
          />

          <InfoItem
            label="Ticket Price"
            value={formatCurrency(flightInformation.price)}
          />

          <InfoItem
            icon={<FiUsers />}
            label="Available Seats"
            value={flightInformation.seats_available ?? "-"}
          />

          <InfoItem
            icon={<FiAirplay />}
            label="Airline"
            value={flightInformation.airline_name || "-"}
            full
          />

        </div>

        {/* ===== Bookings ===== */}

        <div className="official-section mt-5">

          <h5 className="section-title">
            <FiUser className="me-2" />
            Passenger Bookings ({flightBookings.length})
          </h5>

          {flightBookings.length === 0 ? (
            <p className="text-muted">No bookings available.</p>
          ) : (
            <div className="table-responsive">

              <table className="official-table bookings">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th><FiCreditCard /> Passport Number</th>
                    <th>Nationality</th>
                    <th>Age</th>
                    <th><FiMail /> Email</th>
                    <th><FiPhone /> Phone</th>
                    <th><FiFileText /> Notes</th>
                    <th> Total (BHD)</th>
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
                      <td>
                        {formatCurrency(
                          p.total_price || p.flight_price
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default CompFlightsDetails;
