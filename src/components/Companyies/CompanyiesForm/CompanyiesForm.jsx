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
    wifi: false
  };

  const [formData, setFormData] = useState(initialState);
  const [countries, setCountries] = useState([]);
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);


  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then(res => res.json())
      .then(data => setCountries(data.data))
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
      flight_number, baggage, wifi
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
      wifi: wifi || false
    });

    if (from_country) fetchCities(from_country, "from");
    if (to_country) fetchCities(to_country, "to");
  }, [selectedFlight]);

 
  const fetchCities = async (country, type) => {
    if (!country) return;
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
      wifi: formData.wifi
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
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "20px auto" }}>
      <h2 style={{ marginBottom: "20px" }}>
        {selectedFlight ? "Edit Company Flight" : "Add New Company Flight"}
      </h2>

      <FieldWrapper icon={<FaGlobe />} label="From Country">
        <Select
          placeholder="Select Country"
          isSearchable
          options={countryOptions}
          value={countryOptions.find(c => c.value === formData.fromCountry) || null}
          onChange={(opt) => {
            setFormData(prev => ({ ...prev, fromCountry: opt.value, fromCity: "" }));
            fetchCities(opt.value, "from");
          }}
          styles={selectStyles}
        />
      </FieldWrapper>

      <FieldWrapper icon={<FaCity />} label="From City">
        <Select
          placeholder="Select City"
          isSearchable
          options={cityOptions(fromCities)}
          value={cityOptions(fromCities).find(c => c.value === formData.fromCity) || null}
          onChange={(opt) => setFormData(prev => ({ ...prev, fromCity: opt.value }))}
          styles={selectStyles}
        />
      </FieldWrapper>


      <FieldWrapper icon={<FaGlobe />} label="To Country">
        <Select
          placeholder="Select Country"
          isSearchable
          options={countryOptions}
          value={countryOptions.find(c => c.value === formData.toCountry) || null}
          onChange={(opt) => {
            setFormData(prev => ({ ...prev, toCountry: opt.value, toCity: "" }));
            fetchCities(opt.value, "to");
          }}
          styles={selectStyles}
        />
      </FieldWrapper>

      <FieldWrapper icon={<FaCity />} label="To City">
        <Select
          placeholder="Select City"
          isSearchable
          options={cityOptions(toCities)}
          value={cityOptions(toCities).find(c => c.value === formData.toCity) || null}
          onChange={(opt) => setFormData(prev => ({ ...prev, toCity: opt.value }))}
          styles={selectStyles}
        />
      </FieldWrapper>


      <FieldWrapper icon={<FaPlaneDeparture />} label="Departure">
        <input
          type="datetime-local"
          name="departure"
          value={formData.departure}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #4f46e5" }}
        />
      </FieldWrapper>

      <FieldWrapper icon={<FaPlaneArrival />} label="Arrival">
        <input
          type="datetime-local"
          name="arrival"
          value={formData.arrival}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #4f46e5" }}
        />
      </FieldWrapper>


      <FieldWrapper icon={<FaMoneyBillWave />} label="Price (BHD)">
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price BHD"
          required
          style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #4f46e5" }}
        />
      </FieldWrapper>

      <FieldWrapper icon={<FaHashtag />} label="Flight Number">
        <input
          type="text"
          name="flightNumber"
          value={formData.flightNumber}
          onChange={handleChange}
          placeholder="Flight Number"
          required
          style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #4f46e5" }}
        />
      </FieldWrapper>

      <FieldWrapper icon={<FaSuitcase />} label="Baggage (kg)">
        <input
          type="text"
          name="baggage"
          value={formData.baggage}
          onChange={handleChange}
          placeholder="Baggage kg"
          style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #4f46e5" }}
        />
      </FieldWrapper>

      <FieldWrapper icon={<FaWifi />} label="Wi-Fi Available">
        <input
          type="checkbox"
          name="wifi"
          checked={formData.wifi}
          onChange={handleChange}
        />
      </FieldWrapper>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "#4f46e5",
          color: "#fff",
          borderRadius: 8,
          border: "none",
          marginTop: 10
        }}
      >
        {selectedFlight ? "Update Company Flight" : "Add Company Flight"}
      </button>
    </form>
  );
};

export default CompanyiesForm;
