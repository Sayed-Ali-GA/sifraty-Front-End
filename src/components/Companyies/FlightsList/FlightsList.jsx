import { Link } from "react-router-dom";
import { getCompany } from "../../../services/CompanyiesAuthService";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaMoneyBillWave,
  FaHashtag,
  FaSuitcase,
  FaWifi,
  FaCity,
  FaChair,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function FlightsListCompanyies({ flights, handleDelete, alert }) {
  const company = getCompany();

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      
      {/* Sticky Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
        <div className="container d-flex align-items-center">
          {company?.logo && (
            <img
              src={company.logo}
              alt="Company Logo"
              style={{ width: 45, height: 45, objectFit: "cover", borderRadius: "8px", marginRight: "12px" }}
            />
          )}
          <Link className="navbar-brand mb-0 h1" to="/">
            {company?.name || "Sifraty"}
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              {company && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/flights">Flights</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/flights/new">Add Flight</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div style={{ height: "70px" }}></div>

      {/* Alert */}
      {alert && (
        <div className={`alert ${alert.type === "error" ? "alert-danger" : "alert-success"} text-center shadow`} role="alert">
          {alert.message}
        </div>
      )}

      {/* Header with Company Logo */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="text-primary d-flex align-items-center gap-2">
          {company?.logo && (
            <img src={company.logo} alt="Company Logo" style={{ width: 55, height: 55, objectFit: "cover", borderRadius: "8px" }} />
          )}
          Flights - {company?.name || "AL_devuserr"}
        </h2>
        <Link to="/">
          <button className="btn btn-outline-secondary">← Back</button>
        </Link>
      </div>

      {/* Flights Grid */}
      {flights?.length > 0 ? (
        <div className="row g-4">
          {flights.map((flight) => (
            <div key={flight.id} className="col-md-6 col-lg-4">
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  borderRadius: "15px",
                  background: "linear-gradient(145deg, #ffffff, #e9ecef)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card-body d-flex flex-column">
                  {/* Flight Route */}
                  <h5 className="card-title text-primary mb-3 d-flex align-items-center gap-2">
                    <FaCity className="text-info" /> {flight.from_city} → {flight.to_city}
                  </h5>

                  {/* Flight Info */}
                  <ul className="list-unstyled mb-3">
                    <li><FaPlaneDeparture className="me-2 text-warning" /> {new Date(flight.departure_time).toLocaleString()}</li>
                    <li><FaPlaneArrival className="me-2 text-warning" /> {new Date(flight.arrival_time).toLocaleString()}</li>
                    <li><FaMoneyBillWave className="me-2 text-success" /> {flight.price} BHD</li>
                    <li><FaHashtag className="me-2 text-secondary" /> {flight.flight_number}</li>
                    <li><FaSuitcase className="me-2 text-purple" /> {flight.baggage || 0} kg</li>
                    <li><FaWifi className="me-2 text-info" /> {flight.wifi ? "Yes" : "No"}</li>
                    <li><FaChair className="me-2 text-danger" /> {flight.seats_available} seats</li>
                  </ul>

                  <p className="text-muted fst-italic mb-3">Posted By: <strong>{company?.employee_username || "Unknown"}</strong></p>

                  {/* Buttons with Icons */}
                  <div className="mt-auto d-flex gap-2">
                    <Link to={`/flights/${flight.id}`} className="flex-fill">
                      <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
                        <FaEye /> View
                      </button>
                    </Link>
                    <Link to={`/flights/edit/${flight.id}`} className="flex-fill">
                      <button className="btn btn-warning w-100 d-flex align-items-center justify-content-center gap-2">
                        <FaEdit /> Edit
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger flex-fill w-100 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => handleDelete(flight.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted mt-5 fs-5">No flights available. Add a new flight to get started.</p>
      )}
    </div>
  );
}
