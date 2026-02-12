import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import * as TicketService from "../../../services/TicketService";
import * as BookingService from "../../../services/BookingService";


    const FormInput = ({ 
      label,
      name,
      value, 
      onChange, 
      type = "text", placeholder }) => (
  <div style={{ marginBottom: "10px" }}>
    <label htmlFor={name} style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
      {label}:
    </label>
    
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
    />
  </div>
);

/* ===============================
   Reusable Select Component
=============================== */
const FormSelect = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: "10px" }}>
    <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
      {label}:
    </label>
    <Select
      value={value ? { value, label: value } : null}
      onChange={(option) => onChange(option.value)}
      options={options}
      placeholder={`Select ${label}`}
      styles={{ container: (base) => ({ ...base, width: "100%" }) }}
    />
  </div>
);

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
        const flightData = await TicketService.show(flightId);
        setFlight(flightData);
      } catch (err) {
        console.error(err);
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
          .filter(c => c.name.toLowerCase() !== "israel")
          .map(c => ({ value: c.name, label: c.name }));

        setNationalitiesOptions(options);
      } catch (err) {
        console.error(err);
        setError("Failed to load nationalities.");
      }
    };
    fetchNationalities();
  }, []);

  /* ===============================
     Handle Input Change
  =============================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  /* ===============================
     Validation
  =============================== */
  const validateForm = () => {
    if (!bookingData.first_name.trim()) return "First name is required.";
    if (!bookingData.last_name.trim()) return "Last name is required.";
    if (!bookingData.passport_number.trim()) return "Passport number is required.";
    if (!bookingData.nationality) return "Nationality is required.";
    if (!bookingData.age) return "Age is required.";
    if (bookingData.email && !bookingData.email.includes("@")) return "Valid email is required.";
    return null;
  };

  /* ===============================
     Submit Booking
  =============================== */
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

      const res = await BookingService.bookFlight(flight.id, bookingData);

      if (res && res.id) {
        setBookingSuccess(true);
        setBookingData(initialFormState);

        setTimeout(() => {
          navigate("/user/flights");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!flight) return <p>Loading flight...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Book Flight: {flight.flight_number}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {bookingSuccess && (
        <p style={{ color: "green" }}>Booking successful! Redirecting...</p>
      )}

      <form onSubmit={handleSubmit}>
        <FormInput
          label="First Name"
          name="first_name"
          value={bookingData.first_name}
          onChange={handleChange}
          placeholder="Enter your First Name"
        />

        <FormInput
          label="Last Name"
          name="last_name"
          value={bookingData.last_name}
          onChange={handleChange}
          placeholder="Enter your Last Name"
        />

        <FormInput
          label="Passport Number"
          name="passport_number"
          value={bookingData.passport_number}
          onChange={handleChange}
          placeholder="Enter Passport Number"
        />

        <FormSelect
          label="Nationality"
          value={bookingData.nationality}
          onChange={(val) => setBookingData(prev => ({ ...prev, nationality: val }))}
          options={nationalitiesOptions}
        />

        <FormInput
          label="Age"
          name="age"
          type="number"
          value={bookingData.age}
          onChange={handleChange}
          placeholder="Enter your Age"
        />

        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={bookingData.phone}
          onChange={handleChange}
          placeholder="12345679"
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={bookingData.email}
          onChange={handleChange}
          placeholder="@gmail.com"
        />

        <FormInput
          label="Notes"
          name="notes"
          value={bookingData.notes}
          onChange={handleChange}
          placeholder="Write your notes here..."
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingsPage;
