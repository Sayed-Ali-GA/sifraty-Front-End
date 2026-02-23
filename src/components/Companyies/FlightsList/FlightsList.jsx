// import { Link } from "react-router-dom";
// import { getCompany } from "../../../services/CompanyiesAuthService";
// import {
//   FaPlaneDeparture,
//   FaPlaneArrival,
//   FaMoneyBillWave,
//   FaHashtag,
//   FaSuitcase,
//   FaWifi,
//   FaChair,
//   FaEye,
//   FaEdit,
//   FaTrash,
//   FaArrowLeft,
// } from "react-icons/fa";
// import "./FlightsList.css";

// function FlightsListCompanyies({ flights, handleDelete, alert }) {
//   const company = getCompany();

//   return (
//     <div className="container-fluid p-4 flight-page">

//       {/* ── Navbar Spacer ── */}
//       <div className="navbar-spacer" />

//       {/* ── Alert ── */}
//       {alert && (
//         <div
//           className={`alert ${
//             alert.type === "error" ? "alert-danger" : "alert-success"
//           } text-center`}
//           role="alert"
//         >
//           {alert.message}
//         </div>
//       )}

//       {/* ── Page Header ── */}
//       <div className="flights-header">
//         <h2 className="flights-title">
//           {company?.logo && (
//             <img
//               src={company.logo}
//               alt={`${company.name} logo`}
//               className="flight-company-logo"
//             />
//           )}
//           <span>{company?.name || "Company"}</span>
//           &nbsp;— Flights
//         </h2>

//         <Link to="/" className="btn-back">
//           <FaArrowLeft />
//           Back
//         </Link>
//       </div>

//       {/* ── Print Area ── */}
//       <div className="print-area">
//         {flights?.length > 0 ? (
//           <div className="flights-grid">
//             {flights.map((flight) => (
//               <div key={flight.id} className="flight-card">
//                 <div className="card-body">

//                   {/* Route */}
//                   <div className="flight-route">
//                     <span className="city">{flight.from_city}</span>
//                     <div className="route-arrow">
//                       <div className="route-line" />
//                     </div>
//                     <span className="city">{flight.to_city}</span>
//                   </div>

//                   {/* Info Grid */}
//                   <ul className="flight-info-list">

//                     <li className="full-width">
//                       <FaPlaneDeparture className="info-icon icon-teal" />
//                       <div>
//                         <span className="info-label">Departure</span>
//                         <span className="info-value">
//                           {new Date(flight.departure_time).toLocaleString()}
//                         </span>
//                       </div>
//                     </li>

//                     <li className="full-width">
//                       <FaPlaneArrival className="info-icon icon-teal" />
//                       <div>
//                         <span className="info-label">Arrival</span>
//                         <span className="info-value">
//                           {new Date(flight.arrival_time).toLocaleString()}
//                         </span>
//                       </div>
//                     </li>

//                     <li>
//                       <FaMoneyBillWave className="info-icon icon-amber" />
//                       <div>
//                         <span className="info-label">Price</span>
//                         <span className="info-value price-tag">
//                           {flight.price} BHD
//                         </span>
//                       </div>
//                     </li>

//                     <li>
//                       <FaHashtag className="info-icon icon-blue" />
//                       <div>
//                         <span className="info-label">Flight No.</span>
//                         <span className="info-value flight-number">
//                           {flight.flight_number}
//                         </span>
//                       </div>
//                     </li>

//                     <li>
//                       <FaSuitcase className="info-icon icon-slate" />
//                       <div>
//                         <span className="info-label">Baggage</span>
//                         <span className="info-value">{flight.baggage || 0} kg</span>
//                       </div>
//                     </li>

//                     <li>
//                       <FaChair className="info-icon icon-red" />
//                       <div>
//                         <span className="info-label">Seats</span>
//                         <span className="info-value">{flight.seats_available}</span>
//                       </div>
//                     </li>

//                     <li className="full-width">
//                       <FaWifi className="info-icon icon-blue" />
//                       <div>
//                         <span className="info-label">Wi-Fi</span>
//                         <span className={`wifi-badge ${flight.wifi ? "wifi-on" : "wifi-off"}`}>
//                           {flight.wifi ? "Available" : "Not Available"}
//                         </span>
//                       </div>
//                     </li>

//                   </ul>

//                   {/* Posted By */}
//                   <p className="posted-by">
//                     Posted by:{" "}
//                     <strong>{company?.employee_username || "Unknown"}</strong>
//                   </p>

//                   {/* Actions */}
//                   <div className="card-actions print-hide">
//                     <Link to={`/flights/${flight.id}`}>
//                       <button className="btn-action btn-view w-100">
//                         <FaEye /> View
//                       </button>
//                     </Link>

//                     <Link to={`/flights/edit/${flight.id}`}>
//                       <button className="btn-action btn-edit w-100">
//                         <FaEdit /> Edit
//                       </button>
//                     </Link>

//                     <button
//                       className="btn-action btn-delete"
//                       onClick={() => handleDelete(flight.id)}
//                     >
//                       <FaTrash /> Delete
//                     </button>
//                   </div>

//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="empty-state">
//             <span className="empty-icon">✈️</span>
//             <p>No flights available yet.</p>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

// export default FlightsListCompanyies; 








import { Link } from "react-router-dom";
import { useState } from "react";
import { getCompany } from "../../../services/CompanyiesAuthService";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaMoneyBillWave,
  FaHashtag,
  FaSuitcase,
  FaWifi,
  FaChair,
  FaEye,
  FaEdit,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";
import "./FlightsList.css";

function FlightsListCompanyies({ flights, handleDelete, alert }) {
  const company = getCompany();
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="container-fluid p-4 flight-page">

      {/* ── Navbar Spacer ── */}
      <div className="navbar-spacer" />

      {/* ── Alert ── */}
      {alert && (
        <div
          className={`alert ${
            alert.type === "error" ? "alert-danger" : "alert-success"
          } text-center`}
          role="alert"
        >
          {alert.message}
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="flights-header">
        <h2 className="flights-title">
          {company?.logo && (
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="flight-company-logo"
            />
          )}
          <span>{company?.name || "Company"}</span>
          &nbsp;— Flights
        </h2>

        <Link to="/" className="btn-back">
          <FaArrowLeft />
          Back
        </Link>
      </div>

      {/* ── Flights Grid ── */}
      <div className="print-area">
        {flights?.length > 0 ? (
          <div className="flights-grid">
            {flights.map((flight) => (
              <div key={flight.id} className="flight-card">
                <div className="card-body">

                  {/* Route */}
                  <div className="flight-route">
                    <span className="city">{flight.from_city}</span>
                    <div className="route-arrow">
                      <div className="route-line" />
                    </div>
                    <span className="city">{flight.to_city}</span>
                  </div>

                  {/* Info Grid */}
                  <ul className="flight-info-list">
                    <li className="full-width">
                      <FaPlaneDeparture className="info-icon icon-teal" />
                      <div>
                        <span className="info-label">Departure</span>
                        <span className="info-value">
                          {new Date(flight.departure_time).toLocaleString()}
                        </span>
                      </div>
                    </li>

                    <li className="full-width">
                      <FaPlaneArrival className="info-icon icon-teal" />
                      <div>
                        <span className="info-label">Arrival</span>
                        <span className="info-value">
                          {new Date(flight.arrival_time).toLocaleString()}
                        </span>
                      </div>
                    </li>

                    <li>
                      <FaMoneyBillWave className="info-icon icon-amber" />
                      <div>
                        <span className="info-label">Price</span>
                        <span className="info-value price-tag">
                          {flight.price} BHD
                        </span>
                      </div>
                    </li>

                    <li>
                      <FaHashtag className="info-icon icon-blue" />
                      <div>
                        <span className="info-label">Flight No.</span>
                        <span className="info-value flight-number">
                          {flight.flight_number}
                        </span>
                      </div>
                    </li>

                    <li>
                      <FaSuitcase className="info-icon icon-slate" />
                      <div>
                        <span className="info-label">Baggage</span>
                        <span className="info-value">
                          {flight.baggage || 0} kg
                        </span>
                      </div>
                    </li>

                    <li>
                      <FaChair className="info-icon icon-red" />
                      <div>
                        <span className="info-label">Seats</span>
                        <span className="info-value">
                          {flight.seats_available}
                        </span>
                      </div>
                    </li>

                    <li className="full-width">
                      <FaWifi className="info-icon icon-blue" />
                      <div>
                        <span className="info-label">Wi-Fi</span>
                        <span
                          className={`wifi-badge ${
                            flight.wifi ? "wifi-on" : "wifi-off"
                          }`}
                        >
                          {flight.wifi ? "Available" : "Not Available"}
                        </span>
                      </div>
                    </li>
                  </ul>

                  {/* Posted By */}
                  <p className="posted-by">
                    Posted by:{" "}
                    <strong>
                      {company?.employee_username || "Unknown"}
                    </strong>
                  </p>

                  {/* Actions */}
                  <div className="card-actions print-hide">
                    <Link to={`/flights/${flight.id}`}>
                      <button className="btn-action btn-view w-100">
                        <FaEye /> View
                      </button>
                    </Link>

                    <Link to={`/flights/edit/${flight.id}`}>
                      <button className="btn-action btn-edit w-100">
                        <FaEdit /> Edit
                      </button>
                    </Link>

                    <button
                      className="btn-action btn-delete"
                      onClick={() => setDeleteId(flight.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">✈️</span>
            <p>No flights available yet.</p>
          </div>
        )}
      </div>

      {/* ── Delete Modal ── */}
      {deleteId && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h5>Delete Flight</h5>
            <p>Are you sure you want to delete this flight?</p>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                className="btn-confirm-delete"
                onClick={() => {
                  handleDelete(deleteId);
                  setDeleteId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightsListCompanyies;
