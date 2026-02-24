import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Select from "react-select";
import {
  FaArrowLeft, FaTicketAlt, FaUser, FaPassport,
  FaGlobe, FaPhone, FaEnvelope, FaStickyNote,
} from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";

import * as TicketService  from "../../../services/TicketService";
import * as BookingService from "../../../services/BookingService";
import "./BookingsPage.css";

/* ─────────────────────────────────────
   Constants
───────────────────────────────────── */
const INITIAL_FORM = {
  first_name: "", last_name: "", passport_number: "",
  nationality: "", age: "", phone: "", email: "", notes: "",
};

/* ─────────────────────────────────────
   Reusable Field
───────────────────────────────────── */
const Field = ({ label, required, children }) => (
  <div className="bp-field">
    <label className={`bp-label${required ? " bp-label-req" : ""}`}>{label}</label>
    {children}
  </div>
);

/* ─────────────────────────────────────
   Component
───────────────────────────────────── */
const BookingsPage = () => {
  const { flightId } = useParams();
  const navigate     = useNavigate();

  const [flight,       setFlight]       = useState(null);
  const [form,         setForm]         = useState(INITIAL_FORM);
  const [nationalities, setNationalities] = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [success,      setSuccess]      = useState(false);
  const [error,        setError]        = useState("");

  /* Fetch flight */
  useEffect(() => {
    TicketService.show(flightId)
      .then(setFlight)
      .catch(() => setError("Failed to load flight."));
  }, [flightId]);

  /* Fetch nationalities */
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/codes")
      .then(r => r.json())
      .then(d => {
        const opts = d.data
          .filter(c => c.name.toLowerCase() !== "israel")
          .map(c => ({ value: c.name, label: c.name }));
        setNationalities(opts);
      })
      .catch(() => setError("Failed to load nationalities."));
  }, []);

  const handleChange = ({ target: { name, value } }) =>
    setForm(p => ({ ...p, [name]: value }));

  const validate = () => {
    const { first_name, last_name, passport_number, nationality, age, email } = form;
    if (!first_name.trim())      return "First name is required.";
    if (!last_name.trim())       return "Last name is required.";
    if (!passport_number.trim()) return "Passport number is required.";
    if (!nationality)            return "Nationality is required.";
    if (!age)                    return "Age is required.";
    if (email && !email.includes("@")) return "Valid email is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    try {
      setLoading(true); setError("");
      const res = await BookingService.bookFlight(flight.id, form);
      if (res?.id) {
        setSuccess(true);
        setForm(INITIAL_FORM);
        setTimeout(() => navigate("/user/flights"), 2000);
      }
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* Loading */
  if (!flight) return (
    <div className="bp-loading">
      <div className="bp-spinner" />
      <p>Loading flight details…</p>
    </div>
  );

  const calcDuration = (dep, arr) => {
    const diff = new Date(arr) - new Date(dep);
    if (diff <= 0) return "";
    return `${Math.floor(diff / 3600000)}h ${Math.floor((diff % 3600000) / 60000)}m`;
  };

  return (
    <div className="bp-page">
      <div className="bp-wrapper">

        {/* ══ Page Header ══ */}
        <div className="bp-page-header">
          <div className="bp-breadcrumb">
            <span>Flights</span>
            <span>›</span>
            <span>{flight.from_city} → {flight.to_city}</span>
            <span>›</span>
            <span>Book</span>
          </div>
          <Link to="/user/flights" className="bp-btn-back">
            <FaArrowLeft /> Back to Flights
          </Link>
        </div>

        {/* ══ Flight Summary Banner ══ */}
        <div className="bp-flight-banner">

          {/* Route */}
          <div className="bp-banner-route">
            <div className="bp-banner-city">
              <span className="city">{flight.from_city}</span>
              <span className="country">{flight.from_country}</span>
            </div>
            <div className="bp-banner-arrow">
              <div className="arr-line">
                <span className="dash" />
                <MdFlightTakeoff />
                <span className="dash" />
              </div>
              <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>
                {calcDuration(flight.departure_time, flight.arrival_time)}
              </span>
            </div>
            <div className="bp-banner-city">
              <span className="city">{flight.to_city}</span>
              <span className="country">{flight.to_country}</span>
            </div>
          </div>

          {/* Meta: flight no + price */}
          <div className="bp-banner-meta">
            <div className="bp-banner-pill">
              <span className="pill-label">Flight No.</span>
              <span className="pill-value fn">{flight.flight_number}</span>
            </div>
            <div className="bp-banner-divider" />
            <div className="bp-banner-pill">
              <span className="pill-label">Price per seat</span>
              <span className="pill-value price">{flight.price} BHD</span>
            </div>
          </div>

        </div>

        {/* ══ Booking Form Card ══ */}
        <div className="bp-card">

          <div className="bp-card-header">
            <div className="hdr-icon"><FaTicketAlt /></div>
            <div>
              <h4>Passenger Details</h4>
              <p>Fill in the required information to complete your booking</p>
            </div>
          </div>

          <div className="bp-card-body">

            {/* Alerts */}
            {error   && <div className="bp-alert bp-alert-error">{error}</div>}
            {success && <div className="bp-alert bp-alert-success">Booking successful! Redirecting…</div>}

            <form onSubmit={handleSubmit} noValidate>

              {/* ── Personal Info ── */}
              <div className="bp-section-label"><FaUser /> Personal Information</div>

              <div className="bp-grid-2">
                <Field label="First Name" required>
                  <input className="bp-input" name="first_name" value={form.first_name}
                    onChange={handleChange} placeholder="e.g. Ahmed" />
                </Field>
                <Field label="Last Name" required>
                  <input className="bp-input" name="last_name" value={form.last_name}
                    onChange={handleChange} placeholder="e.g. Al-Mansoori" />
                </Field>
              </div>

              <div className="bp-grid-2">
                <Field label="Passport Number" required>
                  <input className="bp-input" name="passport_number" value={form.passport_number}
                    onChange={handleChange} placeholder="e.g. A12345678"
                    style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }} />
                </Field>
                <Field label="Age" required>
                  <input className="bp-input" name="age" type="number" value={form.age}
                    onChange={handleChange} placeholder="e.g. 28" min={1} max={120} />
                </Field>
              </div>

              <Field label="Nationality" required>
                <Select
                  classNamePrefix="react-select"
                  className="bp-select"
                  options={nationalities}
                  value={form.nationality ? { value: form.nationality, label: form.nationality } : null}
                  onChange={opt => setForm(p => ({ ...p, nationality: opt.value }))}
                  placeholder="Select your nationality"
                />
              </Field>

              <div className="bp-divider" />

              {/* ── Contact Info ── */}
              <div className="bp-section-label"><FaEnvelope /> Contact Information</div>

              <div className="bp-grid-2">
                <Field label="Phone">
                  <input className="bp-input" name="phone" type="tel" value={form.phone}
                    onChange={handleChange} placeholder="+973 3XXX XXXX" />
                </Field>
                <Field label="Email">
                  <input className="bp-input" name="email" type="email" value={form.email}
                    onChange={handleChange} placeholder="example@email.com" />
                </Field>
              </div>

              <div className="bp-divider" />

              {/* ── Notes ── */}
              <div className="bp-section-label"><FaStickyNote /> Additional Notes</div>

              <Field label="Notes">
                <textarea className="bp-textarea" name="notes" value={form.notes}
                  onChange={handleChange}
                  placeholder="Special requests, dietary needs, accessibility requirements…" />
              </Field>

              {/* ── Submit ── */}
              <button type="submit" className="bp-btn-submit" disabled={loading}>
                {loading
                  ? <><span className="btn-spinner" /> Processing…</>
                  : <><FaTicketAlt /> Confirm Booking</>
                }
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingsPage;