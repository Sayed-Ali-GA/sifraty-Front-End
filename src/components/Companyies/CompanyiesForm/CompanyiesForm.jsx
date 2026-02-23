import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  FaGlobe, FaCity, FaPlaneDeparture, FaPlaneArrival,
  FaMoneyBillWave, FaHashtag, FaSuitcase, FaWifi,
} from "react-icons/fa";
import "./CompanyiesForm.css";

const CompanyiesForm = ({ flights = [], handleAddFlight, handleUpdateFlight }) => {
  const navigate = useNavigate();
  const { id }   = useParams();

  const selectedFlight = flights.find((f) => f.id.toString() === id) || null;
  const isEdit = Boolean(selectedFlight);

  const initialState = {
    fromCountry: "", toCountry: "", fromCity: "", toCity: "",
    departure: "",   arrival: "",   price: "",   flightNumber: "",
    baggage: "",     wifi: false,   seatsAvailable: "",
  };

  const [formData, setFormData]   = useState(initialState);
  const [countries, setCountries] = useState([]);
  const [fromCities, setFromCities] = useState([]);
  const [toCities,   setToCities]   = useState([]);

  /* fetch countries */
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((r) => r.json())
      .then((d) =>
        setCountries((d.data || []).filter((c) => c.country !== "Israel"))
      )
      .catch(console.error);
  }, []);

  /* populate form when editing */
  useEffect(() => {
    if (!selectedFlight) { setFormData(initialState); return; }
    const {
      from_country, to_country, from_city, to_city,
      departure_time, arrival_time, price, flight_number,
      baggage, wifi, seats_available,
    } = selectedFlight;

    setFormData({
      fromCountry:    from_country    || "",
      toCountry:      to_country      || "",
      fromCity:       from_city       || "",
      toCity:         to_city         || "",
      departure:      departure_time  || "",
      arrival:        arrival_time    || "",
      price:          price?.toString()         || "",
      flightNumber:   flight_number             || "",
      baggage:        baggage?.toString()       || "",
      wifi:           wifi || false,
      seatsAvailable: seats_available?.toString() || "",
    });

    if (from_country) fetchCities(from_country, "from");
    if (to_country)   fetchCities(to_country,   "to");
  }, [selectedFlight]);

  const fetchCities = async (country, type) => {
    if (!country || country === "Israel") return;
    try {
      const r = await fetch(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country }),
        }
      );
      const d = await r.json();
      type === "from" ? setFromCities(d.data || []) : setToCities(d.data || []);
    } catch (e) { console.error(e); }
  };

  const countryOpts = countries.map((c) => ({ value: c.country, label: c.country }));
  const cityOpts    = (list) => (list || []).map((c) => ({ value: c, label: c }));

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      from_country:    formData.fromCountry,
      to_country:      formData.toCountry,
      from_city:       formData.fromCity,
      to_city:         formData.toCity,
      departure_time:  formData.departure,
      arrival_time:    formData.arrival,
      price:           parseFloat(formData.price),
      flight_number:   formData.flightNumber,
      baggage:         parseInt(formData.baggage),
      wifi:            formData.wifi,
      seats_available: Number(formData.seatsAvailable),
    };
    try {
      isEdit
        ? await handleUpdateFlight(selectedFlight.id, payload)
        : await handleAddFlight(payload);
      navigate("/flights");
    } catch (e) { console.error(e); }
  };

  return (
    <div className="cf-page">
      <div className="cf-wrapper">

        {/* Page heading */}
        <div className="cf-page-header">
          <div className="cf-breadcrumb">
            <span>Flights</span>
            <span>›</span>
            <span>{isEdit ? "Edit Flight" : "New Flight"}</span>
          </div>
          <h2>{isEdit ? "Edit Flight Details" : "Add New Company Flight"}</h2>
          <p>
            {isEdit
              ? "Update the information below and save changes."
              : "Fill in all required fields to publish a new flight."}
          </p>
        </div>

        {/* Card */}
        <div className="cf-card">

          {/* Card header */}
          <div className="cf-card-header">
            <div className="cf-card-header-left">
              <span className="cf-card-badge">
                <FaPlaneDeparture /> Flight Form
              </span>
              <span className="cf-card-title">
                {isEdit
                  ? `Flight #${selectedFlight?.flight_number || id}`
                  : "New Entry"}
              </span>
            </div>
            <span className="cf-step-note">Fields marked * are required</span>
          </div>

          {/* Form */}
          <div className="cf-form-body">
            <form onSubmit={handleSubmit}>

              {/* ── ROUTE ── */}
              <div className="cf-section">
                <div className="cf-section-label">Route</div>
                <div className="cf-grid-2">

                  <div className="cf-field">
                    <label className="cf-label cf-label-req"><FaGlobe /> From Country</label>
                    <Select
                      classNamePrefix="react-select"
                      className="cf-select"
                      options={countryOpts}
                      value={countryOpts.find((c) => c.value === formData.fromCountry) || null}
                      placeholder="Select country"
                      onChange={(o) => {
                        setFormData((p) => ({ ...p, fromCountry: o.value, fromCity: "" }));
                        fetchCities(o.value, "from");
                      }}
                    />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label cf-label-req"><FaGlobe /> To Country</label>
                    <Select
                      classNamePrefix="react-select"
                      className="cf-select"
                      options={countryOpts}
                      value={countryOpts.find((c) => c.value === formData.toCountry) || null}
                      placeholder="Select country"
                      onChange={(o) => {
                        setFormData((p) => ({ ...p, toCountry: o.value, toCity: "" }));
                        fetchCities(o.value, "to");
                      }}
                    />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label"><FaCity /> From City</label>
                    <Select
                      classNamePrefix="react-select"
                      className="cf-select"
                      options={cityOpts(fromCities)}
                      value={cityOpts(fromCities).find((c) => c.value === formData.fromCity) || null}
                      placeholder="Select city"
                      onChange={(o) => setFormData((p) => ({ ...p, fromCity: o.value }))}
                    />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label"><FaCity /> To City</label>
                    <Select
                      classNamePrefix="react-select"
                      className="cf-select"
                      options={cityOpts(toCities)}
                      value={cityOpts(toCities).find((c) => c.value === formData.toCity) || null}
                      placeholder="Select city"
                      onChange={(o) => setFormData((p) => ({ ...p, toCity: o.value }))}
                    />
                  </div>

                </div>
              </div>

              {/* ── SCHEDULE ── */}
              <div className="cf-section">
                <div className="cf-section-label">Schedule</div>
                <div className="cf-grid-2">

                  <div className="cf-field">
                    <label className="cf-label cf-label-req"><FaPlaneDeparture /> Departure</label>
                    <input
                      type="datetime-local" name="departure"
                      value={formData.departure} onChange={handleChange}
                      className="cf-input" required
                    />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label cf-label-req"><FaPlaneArrival /> Arrival</label>
                    <input
                      type="datetime-local" name="arrival"
                      value={formData.arrival} onChange={handleChange}
                      className="cf-input" required
                    />
                  </div>

                </div>
              </div>

              {/* ── DETAILS ── */}
              <div className="cf-section">
                <div className="cf-section-label">Flight Details</div>
                <div className="cf-grid-3">

                  <div className="cf-field">
                    <label className="cf-label cf-label-req"><FaMoneyBillWave /> Price (BHD)</label>
                    <input
                      type="number" name="price"
                      value={formData.price} onChange={handleChange}
                      className="cf-input" placeholder="0.000" required
                    />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label cf-label-req"><FaHashtag /> Flight No.</label>
                    <input
                      type="text" name="flightNumber"
                      value={formData.flightNumber} onChange={handleChange}
                      className="cf-input" placeholder="e.g. GF 142" required
                    />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label cf-label-req">Seats Available</label>
                    <input
                      type="number" name="seatsAvailable"
                      value={formData.seatsAvailable || ""} onChange={handleChange}
                      className="cf-input" min={0} placeholder="e.g. 180" required
                    />
                  </div>

                  <div className="cf-field">
                    <label className="cf-label"><FaSuitcase /> Baggage (kg)</label>
                    <input
                      type="number" name="baggage"
                      value={formData.baggage} onChange={handleChange}
                      className="cf-input" placeholder="e.g. 23"
                    />
                  </div>

                </div>
              </div>

              {/* ── AMENITIES ── */}
              <div className="cf-section">
                <div className="cf-section-label">Amenities</div>
                <label className={`cf-wifi-field${formData.wifi ? " active" : ""}`}>
                  <div className="cf-wifi-info">
                    <FaWifi />
                    <div>
                      <strong>Wi-Fi Onboard</strong>
                      <span>Enable if this flight offers internet access</span>
                    </div>
                  </div>
                  <div className="cf-toggle">
                    <input
                      type="checkbox" name="wifi"
                      checked={formData.wifi} onChange={handleChange}
                    />
                    <span className="cf-toggle-track" />
                  </div>
                </label>
              </div>

              {/* ── ACTIONS ── */}
              <div className="cf-divider" />
              <div className="cf-actions">
                <button
                  type="button"
                  className="cf-btn-cancel"
                  onClick={() => navigate("/flights")}
                >
                  Cancel
                </button>
                <button type="submit" className="cf-btn-submit">
                  <FaPlaneDeparture />
                  {isEdit ? "Save Changes" : "Publish Flight"}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyiesForm;