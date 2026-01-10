import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import * as CompanyiesAuthService from "./services/CompanyiesAuthService";
import * as TicketService from "./services/TicketService";

import NavBarCompanyies from "./components/Companyies/NavBar/NavBar";
import CompanyFooter from "./components/Companyies/Footer/Footer";
import HomeCompanyies from "./components/Companyies/Home/Home";

import SignUp from "./components/Companyies/SignUp/signUp";
import SignIn from "./components/Companyies/SignIn/SignIn";

import FlightsList from "./components/Companyies/FlightsList/FlightsList";
import FlightForm from "./components/Companyies/CompanyiesForm/CompanyiesForm";
import ProfileCompany from "./components/Companyies/Profile/Profile";

function App() {
  const navigate = useNavigate();

  // ====== States ======
  const [company, setCompany] = useState(CompanyiesAuthService.getCompany());
  const [flights, setFlights] = useState([]);

  // ====== Effects ======
  useEffect(() => {
    loadFlights();
  }, [company]);

  // ====== Functions ======

  // Load flights
  const loadFlights = async () => {
    if (!company) return;
    const data = await TicketService.myFlights();
    setFlights(data || []);
  };

  // Auth handlers
  const handleSignUp = async (formData) => {
    try {
      const companyData = await CompanyiesAuthService.signUp(formData);
      setCompany(companyData);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const handleSignIn = async (formData) => {
    const companyData = await CompanyiesAuthService.signIn(formData);
    setCompany(companyData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCompany(null);
    navigate("/");
  };

  // Flights handlers
  const handleCreateFlight = async (formData) => {
    await TicketService.create(formData);
    loadFlights();
    navigate("/flights");
  };

  const handleUpdateFlight = async (id, formData) => {
    await TicketService.update(id, formData);
    loadFlights();
    navigate("/flights");
  };

  const handleDeleteFlight = async (id) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      await TicketService.deleteFlight(id);
      loadFlights();
    }
  };

  // ============================= Handle Profile Update=============
  const handleProfileUpdate = async (formData) => {
    try {
      const updatedCompany = await CompanyiesAuthService.updateProfile(formData);
      setCompany(updatedCompany);

      localStorage.setItem("token", updatedCompany.token || localStorage.getItem("token"));
      localStorage.setItem("company", JSON.stringify(updatedCompany));

      return updatedCompany;
    } catch (err) {
      console.error("Update failed:", err);
      throw err;
    }
  };
  // ========================================================

  // ====== Return JSX ======
  return (
    <>
      <NavBarCompanyies company={company} handleLogout={handleLogout} />

      <Routes>
        {/* Home */}
        <Route path="/" element={<HomeCompanyies company={company} />} />

        {/* Auth */}
        <Route path="/sign-up" element={<SignUp handleSignUp={handleSignUp} company={company} />} />
        <Route path="/sign-in" element={<SignIn handleSignIn={handleSignIn} company={company} />} />

        {/* Profile */}
        <Route 
          path="/profile" 
          element={<ProfileCompany company={company} handleProfileUpdate={handleProfileUpdate} />} 
        />

        {/* Flights */}
        <Route 
          path="/flights" 
          element={
            <FlightsList 
              flights={flights} 
              handleDelete={handleDeleteFlight} 
              handleUpdateFlight={handleUpdateFlight} 
            />
          } 
        />
        <Route 
          path="/flights/new" 
          element={<FlightForm flights={flights} handleAddFlight={handleCreateFlight} />} 
        />
        <Route 
          path="/flights/edit/:id" 
          element={
            flights.length > 0 ? (
              <FlightForm flights={flights} handleUpdateFlight={handleUpdateFlight} />
            ) : (
              <p>Loading flights...</p>
            )
          } 
        />
      </Routes>

      <CompanyFooter company={company} />
    </>
  );
}

export default App;
