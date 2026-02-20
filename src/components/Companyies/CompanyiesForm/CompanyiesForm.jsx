import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { 
  FaGlobe, 
  FaCity, 
  FaPlaneDeparture, 
  FaPlaneArrival, 
  FaMoneyBillWave, 
  FaHashtag, 
  FaSuitcase, 
  FaWifi 
} from "react-icons/fa";

const FieldWrapper = ({ icon, label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", marginBottom: "12px" }}>
    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 500 }}>
      {icon} {label}
    </label>
    {children}
  </div>
);

const CompanyiesForm = ({ flights = [], handleAddFlight, handleUpdateFlight }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedFlight = flights.find(f => f.id.toString() === id) || null;

  const initialState = {
    fromCountry: "",
    toCountry: "",
    fromCity: "",
    toCity: "",
    departure: "",
    arrival: "",
    price: "",
    flightNumber: "",
    baggage: "",
    wifi: false,
    seatsAvailable: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [countries, setCountries] = useState([]);
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);


  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then(res => res.json())
      .then(data => {
        const filteredCountries = (data.data || []).filter(c => c.country !== "Israel");
        setCountries(filteredCountries);
      })
      .catch(console.error);
  }, []);


  useEffect(() => {
    if (!selectedFlight) {
      setFormData(initialState);
      return;
    }

    const {
      from_country, to_country, from_city, to_city,
      departure_time, arrival_time, price,
      flight_number, baggage, wifi, seats_available
    } = selectedFlight;

    setFormData({
      fromCountry: from_country || "",
      toCountry: to_country || "",
      fromCity: from_city || "",
      toCity: to_city || "",
      departure: departure_time || "",
      arrival: arrival_time || "",
      price: price?.toString() || "",
      flightNumber: flight_number || "",
      baggage: baggage?.toString() || "",
      wifi: wifi || false,
      seatsAvailable: seats_available?.toString() || ""
    });

    if (from_country) fetchCities(from_country, "from");
    if (to_country) fetchCities(to_country, "to");
  }, [selectedFlight]);


  const fetchCities = async (country, type) => {
    if (!country || country === "Israel") return;
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country })
      });
      const data = await res.json();
      if (type === "from") setFromCities(data.data || []);
      else setToCities(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const countryOptions = countries.map(c => ({ value: c.country, label: c.country }));
  const cityOptions = (cities) => (cities || []).map(c => ({ value: c, label: c }));

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      from_country: formData.fromCountry,
      to_country: formData.toCountry,
      from_city: formData.fromCity,
      to_city: formData.toCity,
      departure_time: formData.departure,
      arrival_time: formData.arrival,
      price: parseFloat(formData.price),
      flight_number: formData.flightNumber,
      baggage: parseInt(formData.baggage),
      wifi: formData.wifi,
      seats_available: Number(formData.seatsAvailable)
    };

    try {
      if (selectedFlight) {
        await handleUpdateFlight(selectedFlight.id, submitData);
      } else {
        await handleAddFlight(submitData);
      }
      navigate("/flights");
    } catch (err) {
      console.error(err);
    }
  };

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      marginBottom: "10px",
      borderRadius: "8px",
      borderColor: "#4f46e5",
      boxShadow: "0 0 0 1px #4f46e5"
    }),
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
    singleValue: (provided) => ({ ...provided, color: "#111827" }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#e0e7ff" : "#fff",
      color: "#111827"
    })
  };

  return (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-7">

        <div
          className="p-4 shadow-lg"
          style={{
            borderRadius: "20px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3 className="text-center mb-4 fw-bold">
            {selectedFlight ? "Edit Company Flight" : "Add New Company Flight"}
          </h3>

          <form onSubmit={handleSubmit}>

            {/* From Country */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <FaGlobe className="me-2" />
                From Country
              </label>
              <Select
                options={countryOptions}
                value={countryOptions.find(c => c.value === formData.fromCountry) || null}
                onChange={(opt) => {
                  setFormData(prev => ({ ...prev, fromCountry: opt.value, fromCity: "" }));
                  fetchCities(opt.value, "from");
                }}
              />
            </div>

            {/* From City */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <FaCity className="me-2" />
                From City
              </label>
              <Select
                options={cityOptions(fromCities)}
                value={cityOptions(fromCities).find(c => c.value === formData.fromCity) || null}
                onChange={(opt) =>
                  setFormData(prev => ({ ...prev, fromCity: opt.value }))
                }
              />
            </div>

            {/* To Country */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <FaGlobe className="me-2" />
                To Country
              </label>
              <Select
                options={countryOptions}
                value={countryOptions.find(c => c.value === formData.toCountry) || null}
                onChange={(opt) => {
                  setFormData(prev => ({ ...prev, toCountry: opt.value, toCity: "" }));
                  fetchCities(opt.value, "to");
                }}
              />
            </div>

            {/* To City */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <FaCity className="me-2" />
                To City
              </label>
              <Select
                options={cityOptions(toCities)}
                value={cityOptions(toCities).find(c => c.value === formData.toCity) || null}
                onChange={(opt) =>
                  setFormData(prev => ({ ...prev, toCity: opt.value }))
                }
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  <FaPlaneDeparture className="me-2" />
                  Departure
                </label>
                <input
                  type="datetime-local"
                  name="departure"
                  value={formData.departure}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  <FaPlaneArrival className="me-2" />
                  Arrival
                </label>
                <input
                  type="datetime-local"
                  name="arrival"
                  value={formData.arrival}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  <FaMoneyBillWave className="me-2" />
                  Price (BHD)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  <FaHashtag className="me-2" />
                  Flight Number
                </label>
                <input
                  type="text"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  <FaSuitcase className="me-2" />
                  Baggage (kg)
                </label>
                <input
                  type="number"
                  name="baggage"
                  value={formData.baggage}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Seats Available
                </label>
                <input
                  type="number"
                  name="seatsAvailable"
                  value={formData.seatsAvailable || ""}
                  onChange={handleChange}
                  className="form-control"
                  min={0}
                  required
                />
              </div>
            </div>

            <div className="form-check mb-4">
              <input
                type="checkbox"
                name="wifi"
                checked={formData.wifi}
                onChange={handleChange}
                className="form-check-input"
                id="wifiCheck"
              />
              <label className="form-check-label fw-semibold" htmlFor="wifiCheck">
                <FaWifi className="me-2" />
                Wi-Fi Available
              </label>
            </div>

            <button type="submit" className="btn btn-dark w-100 py-2 rounded-3">
              {selectedFlight ? "Update Flight" : "Add Flight"}
            </button>
            

          </form>
        </div>

      </div>
    </div>
  </div>
);

};

export default CompanyiesForm;
