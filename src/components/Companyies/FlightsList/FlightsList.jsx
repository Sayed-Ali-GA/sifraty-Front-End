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
  FaTrash
} from "react-icons/fa";

function FlightsListCompanyies({ flights, handleDelete, alert }) {
  const company = getCompany();

  return (
    <div className="container-fluid p-4 flight-page">


      <div className="navbar-spacer"></div>


      {alert && (
        <div
          className={`alert ${
            alert.type === "error" ? "alert-danger" : "alert-success"
          } text-center shadow-sm`}
        >
          {alert.message}
        </div>
      )}


      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

        <h2 className="text-primary d-flex align-items-center gap-3">
          {company?.logo && (
            <img
              src={company.logo}
              alt="logo"
              className="flight-company-logo"
            />
          )}

          Flights - {company?.name || "Company"}
        </h2>

        <div className="d-flex gap-2 flex-wrap">

          <Link to="/">
            <button className="btn btn-outline-secondary">← Back</button>
          </Link>

        </div>
      </div>


      <div className="print-area">

        {flights?.length > 0 ? (
          <div className="row g-4">

            {flights.map((flight) => (
              <div key={flight.id} className="col-md-6 col-lg-4">

                <div className="card flight-card h-100 border-0 shadow-sm">

                  <div className="card-body d-flex flex-column">

                    <h5 className="card-title text-primary mb-3 d-flex align-items-center gap-2">
                      <FaCity className="text-info" />
                      {flight.from_city} → {flight.to_city}
                    </h5>

                    <ul className="list-unstyled mb-3 flight-info-list">

                      <li>
                        <FaPlaneDeparture className="me-2 text-warning" />
                        {new Date(flight.departure_time).toLocaleString()}
                      </li>

                      <li>
                        <FaPlaneArrival className="me-2 text-warning" />
                        {new Date(flight.arrival_time).toLocaleString()}
                      </li>

                      <li>
                        <FaMoneyBillWave className="me-2 text-success" />
                        {flight.price} BHD
                      </li>

                      <li>
                        <FaHashtag className="me-2 text-secondary" />
                        {flight.flight_number}
                      </li>

                      <li>
                        <FaSuitcase className="me-2 text-dark" />
                        {flight.baggage || 0} kg
                      </li>

                      <li>
                        <FaWifi className="me-2 text-info" />
                        {flight.wifi ? "Yes" : "No"}
                      </li>

                      <li>
                        <FaChair className="me-2 text-danger" />
                        {flight.seats_available} seats
                      </li>

                    </ul>

                    <p className="text-muted fst-italic">
                      Posted By:{" "}
                      <strong>
                        {company?.employee_username || "Unknown"}
                      </strong>
                    </p>

                    <div className="mt-auto d-flex gap-2 flex-wrap print-hide">

                      <Link
                        to={`/flights/${flight.id}`}
                        className="flex-fill"
                      >
                        <button className="btn btn-primary w-100">
                          <FaEye /> View
                        </button>
                      </Link>

                      <Link
                        to={`/flights/edit/${flight.id}`}
                        className="flex-fill"
                      >
                        <button className="btn btn-warning w-100">
                          <FaEdit /> Edit
                        </button>
                      </Link>

                      <button
                        className="btn btn-danger flex-fill w-100"
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
          <p className="text-center text-muted mt-5 fs-5">
            No flights available.
          </p>
        )}

      </div>

    </div>
  );
}

export default FlightsListCompanyies;
