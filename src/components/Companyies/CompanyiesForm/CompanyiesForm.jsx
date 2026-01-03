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

const CompanyiesForm = ({ flights, handleAddFlight, handleUpdateFlight }) => {
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
    baggage: 0,
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
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedFlight) {
      setFormData({
        fromCountry: selectedFlight.from_country || "",
        toCountry: selectedFlight.to_country || "",
        fromCity: selectedFlight.from_city || "",
        toCity: selectedFlight.to_city || "",
        departure: selectedFlight.departure_time || "",
        arrival: selectedFlight.arrival_time || "",
        price: selectedFlight.price || "",
        flightNumber: selectedFlight.flight_number || "",
        baggage: selectedFlight.baggage || 0,
        wifi: selectedFlight.wifi || false
      });

      if (selectedFlight.from_country) fetchCities(selectedFlight.from_country, "from");
      if (selectedFlight.to_country) fetchCities(selectedFlight.to_country, "to");
    } else {
      setFormData(initialState);
    }
  }, [selectedFlight]);

  const fetchCities = async (country, type) => {
    if (!country) return;
    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country })
        }
      );
      const data = await res.json();
      if (type === "from") setFromCities(data.data);
      else setToCities(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const countryOptions = countries.map(c => ({ value: c.country, label: c.country }));
  const cityOptions = (cities) => cities.map(c => ({ value: c, label: c }));

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
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


  const FieldWrapper = ({ icon, label, children }) => (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "500" }}>
        {icon} {label}
      </label>
      {children}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>{selectedFlight ? "Edit Flight" : "Add New Flight"}</h2>

      <FieldWrapper icon={<FaGlobe style={{ color: "black" }} />} label="From Country">
        <Select
          placeholder="Select Country"
          isSearchable
          options={countryOptions}
          value={countryOptions.find(c => c.value === formData.fromCountry) || null}
          onChange={(opt) => {
            setFormData({ ...formData, fromCountry: opt.value, fromCity: "" });
            fetchCities(opt.value, "from");
          }}
          styles={selectStyles}
        />
      </FieldWrapper>

      <FieldWrapper icon={<FaCity style={{ color: "black" }} />} label="From City">
        <Select
          placeholder="Select City"
          isSearchable
          options={cityOptions(fromCities)}
          value={cityOptions(fromCities).find(c => c.value === formData.fromCity) || null}
          onChange={(opt) => setFormData({ ...formData, fromCity: opt.value })}
          styles={selectStyles}
        />
      </FieldWrapper>

      <FieldWrapper icon={<FaGlobe style={{ color: "black" }} />} label="To Country">
        <Select
          placeholder="Select Country"
          isSearchable
          options={countryOptions}
          value={countryOptions.find(c => c.value === formData.toCountry) || null}
          onChange={(opt) => {
            setFormData({ ...formData, toCountry: opt.value, toCity: "" });
            fetchCities(opt.value, "to");
          }}
          styles={selectStyles}
        />
      </FieldWrapper>

      <FieldWrapper icon={<FaCity style={{ color: "black" }} />} label="To City">
        <Select
          placeholder="Select City"
          isSearchable
          options={cityOptions(toCities)}
          value={cityOptions(toCities).find(c => c.value === formData.toCity) || null}
          onChange={(opt) => setFormData({ ...formData, toCity: opt.value })}
          styles={selectStyles}
        />
      </FieldWrapper>

      <FieldWrapper icon={<FaPlaneDeparture style={{ color: "black" }} />} label="Departure">
        <input type="datetime-local" name="departure" value={formData.departure} onChange={handleChange} required
          style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #4f46e5" }} />
      </FieldWrapper>

      <FieldWrapper icon={<FaPlaneArrival style={{ color: "black" }} />} label="Arrival">
        <input type="datetime-local" name="arrival" value={formData.arrival} onChange={handleChange} required
          style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #4f46e5" }} />
      </FieldWrapper>

      <FieldWrapper icon={<FaMoneyBillWave style={{ color: "black" }} />} label="Price (BHD)">
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price BHD" required
          style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #4f46e5" }} />
      </FieldWrapper>

      <FieldWrapper icon={<FaHashtag style={{ color: "black" }} />} label="Flight Number">
        <input type="text" name="flightNumber" value={formData.flightNumber} onChange={handleChange} placeholder="Flight Number" required
          style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #4f46e5" }} />
      </FieldWrapper>

      <FieldWrapper icon={<FaSuitcase style={{ color: "black" }} />} label="Baggage (kg)">
        <input type="number" name="baggage" value={formData.baggage} onChange={handleChange} min={0}
          style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #4f46e5" }} />
      </FieldWrapper>

      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}
        onClick={() => setFormData({ ...formData, wifi: !formData.wifi })}>
        <FaWifi style={{ marginRight: "8px", color: formData.wifi ? "#4f46e5" : "#ccc" }} />
        <span style={{ fontWeight: "500" }}>Wi-Fi Available</span>
      </div>

      <button type="submit"
        style={{ width: "100%", padding: "10px", backgroundColor: "#4f46e5", color: "#fff", borderRadius: "8px", border: "none" }}>
        {selectedFlight ? "Update Flight" : "Add Flight"}
      </button>
    </form>
  );
};

export default CompanyiesForm;
