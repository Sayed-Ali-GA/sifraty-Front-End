/* ===============================
   Imports
=============================== */
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Select from "react-select";

import * as TicketService from "../../../services/TicketService";
import * as BookingService from "../../../services/BookingService";

/* ===============================
   Reusable Components
=============================== */

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder
}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label fw-semibold">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-control"
    />
  </div>
);

const FormSelect = ({ label, value, onChange, options }) => (
  <div className="mb-3">
    <label className="form-label fw-semibold">{label}</label>
    <Select
      value={value ? { value, label: value } : null}
      onChange={(option) => onChange(option.value)}
      options={options}
      placeholder={`Select ${label}`}
      classNamePrefix="react-select"
    />
  </div>
);

/* ===============================
   Constants
=============================== */

const initialFormState = {
  first_name: "",
  last_name: "",
  passport_number: "",
  nationality: "",
  age: "",
  phone: "",
  email: "",
  notes: ""
};

/* ===============================
   Component
=============================== */

const BookingsPage = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [bookingData, setBookingData] = useState(initialFormState);
  const [nationalitiesOptions, setNationalitiesOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState("");

  /* ===============================
     Fetch Flight
  =============================== */
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const data = await TicketService.show(flightId);
        setFlight(data);
      } catch {
        setError("Failed to load flight.");
      }
    };

    fetchFlight();
  }, [flightId]);

  /* ===============================
     Fetch Nationalities
  =============================== */
  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/codes"
        );
        const data = await res.json();

        const options = data.data
          .filter((c) => c.name.toLowerCase() !== "israel")
          .map((c) => ({ value: c.name, label: c.name }));

        setNationalitiesOptions(options);
      } catch {
        setError("Failed to load nationalities.");
      }
    };

    fetchNationalities();
  }, []);

  /* ===============================
     Handlers
  =============================== */

  const handleChange = ({ target: { name, value } }) => {
    setBookingData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNationalityChange = (value) => {
    setBookingData((prev) => ({
      ...prev,
      nationality: value
    }));
  };

  const validateForm = () => {
    const {
      first_name,
      last_name,
      passport_number,
      nationality,
      age,
      email
    } = bookingData;

    if (!first_name.trim()) return "First name is required.";
    if (!last_name.trim()) return "Last name is required.";
    if (!passport_number.trim()) return "Passport number is required.";
    if (!nationality) return "Nationality is required.";
    if (!age) return "Age is required.";
    if (email && !email.includes("@")) return "Valid email is required.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await BookingService.bookFlight(
        flight.id,
        bookingData
      );

      if (res?.id) {
        setBookingSuccess(true);
        setBookingData(initialFormState);

        setTimeout(() => navigate("/user/flights"), 2000);
      }
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     Loading State
  =============================== */

  if (!flight) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-dark" />
      </div>
    );
  }

  /* ===============================
     Render
  =============================== */

  return (

    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}
    >
      <div className="row justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-10">

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-5">

              
        <Link to="/user/flights">
          <button className="btn btn-outline-secondary">← Back</button>
        </Link>

              {/* Header */}
              <div className="mb-4 text-center">
                <h2 className="fw-bold mb-1">Booking Details</h2>
                <p className="text-muted mb-0">
                  Flight {flight.flight_number}
                </p>
              </div>

              {/* Flight Info */}
              <div className="bg-light rounded-3 p-3 mb-4 border">
                <div className="row text-center">
                  <div className="col-md-4">
                    <small className="text-muted d-block">From</small>
                    <span className="fw-semibold">{flight.from_city}</span>
                  </div>
                  <div className="col-md-4">
                    <small className="text-muted d-block">To</small>
                    <span className="fw-semibold">{flight.to_city}</span>
                  </div>
                  <div className="col-md-4">
                    <small className="text-muted d-block">Price</small>
                    <span className="fw-semibold">${flight.price}</span>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {error && (
                <div className="alert alert-danger rounded-3">
                  {error}
                </div>
              )}

              {bookingSuccess && (
                <div className="alert alert-success rounded-3">
                  Booking successful. Redirecting...
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-md-6">
                    <FormInput
                      label="First Name"
                      name="first_name"
                      value={bookingData.first_name}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormInput
                      label="Last Name"
                      name="last_name"
                      value={bookingData.last_name}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <FormInput
                  label="Passport Number"
                  name="passport_number"
                  value={bookingData.passport_number}
                  onChange={handleChange}
                  placeholder="Enter passport number"
                />

                <FormSelect
                  label="Nationality"
                  value={bookingData.nationality}
                  onChange={handleNationalityChange}
                  options={nationalitiesOptions}
                />

                <div className="row">
                  <div className="col-md-4">
                    <FormInput
                      label="Age"
                      name="age"
                      type="number"
                      value={bookingData.age}
                      onChange={handleChange}
                      placeholder="e.g. 28"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormInput
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={bookingData.phone}
                      onChange={handleChange}
                      placeholder="+973 3XXX XXXX"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormInput
                      label="Email"
                      name="email"
                      type="email"
                      value={bookingData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <FormInput
                  label="Notes"
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleChange}
                  placeholder="Additional requests (optional)"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-dark w-100 mt-4 py-2 rounded-3 fw-semibold"
                >
                  {loading ? "Processing..." : "Confirm Booking"}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
