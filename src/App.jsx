import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'

import * as ticketService from './services/TicketService'
import * as authService from './services/CompanyiesAuthService'

import SignUp from './components/Companyies/SignUp/signUp'
import SignIn from './components/Companyies/SignIn/SignIn'

import NavBar from './components/Companyies/NavBar/NavBar'
import Home from './components/Companyies/Home/Home'
import CompanyFooter from './components/Companyies/Footer/Footer'
import Profile  from './components/Companyies/Profile/Profile'

import CompanyiesForm from './components/Companyies/CompanyiesForm/CompanyiesForm'
import FlightsList from './components/Companyies/FlightsList/FlightsList'

const App = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(() => authService.getCompany())
  const [flights, setFlights] = useState([])

 
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await ticketService.myFlights()
        setFlights(data || [])
      } catch (err) {
        console.error("Failed to fetch flights", err)
      }
    }
    fetchFlights()
  }, [user])


  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      navigate('/')
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const handleSignIn = async (formData) => {
    try {
      const res = await authService.signIn(formData)
      setUser(res)
      navigate('/')
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }


const handleSelectFlight = (flight) => {
  navigate(`/flights/${flight.id}/edit`);
}



  const handleAddFlight = async (formData) => {
    const newFlight = await ticketService.create(formData)
    setFlights(prev => [newFlight, ...prev])
    navigate('/flights')
  }

  const handleUpdateFlight = async (id, formData) => {
    const updatedFlight = await ticketService.update(id, formData)
    setFlights(flights.map(f =>
      f.id !== updatedFlight.id ? f : updatedFlight
    ))
    navigate('/flights')
  }

  const handleDeleteFlight = async (id) => {
    await ticketService.deleteFlight(id)
    setFlights(flights.filter(f => f.id !== id))
  }

  const handleProfileUpdate = async (formData) => {
  try {
    const updatedCompany = await authService.updateProfile(formData);
    setUser(prev => ({ ...prev, ...updatedCompany })); 
  } catch (err) {
    console.error("Update failed:", err);
  }
};



  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={<Home user={user} />}
        />

        <Route
          path="/sign-up"
          element={<SignUp handleSignUp={handleSignUp} user={user} />}
        />

        <Route
          path="/sign-in"
          element={<SignIn handleSignIn={handleSignIn} user={user} />}
        />

        <Route
          path="/flights/new"
          element={
            <CompanyiesForm
              flights={flights}
              handleAddFlight={handleAddFlight}
              handleUpdateFlight={handleUpdateFlight}
              user={user}
            />
          }
        />

        <Route
          path="/flights/:id/edit"
          element={
            <CompanyiesForm
              flights={flights}
              handleAddFlight={handleAddFlight}
              handleUpdateFlight={handleUpdateFlight}
              user={user}
            />
          }
        />

        <Route
          path="/flights"
          element={
            <FlightsList
              flights={flights}
              handleDelete={handleDeleteFlight}
              handleSelect={handleSelectFlight} 
            />
          }
        />

        <Route path="/profile" element={<Profile 
        user={user}
        handleProfileUpdate={handleProfileUpdate}
        
        />} />


        <Route path="*" element={<h1>404 Page Not Found, Plase Try agein</h1>} />

      </Routes>

           <CompanyFooter />

    </>
  )
}

export default App
