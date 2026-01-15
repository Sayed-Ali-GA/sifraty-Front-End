import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// ==================== Services ====================
import * as UserAuthService from "./services/UserAuthService";
import * as TicketService  from './services/TicketService'

// ==================== User Components ====================
import NavBarUser from "./components/User/NavBarUser/NavBarUser";
import FooterUser from "./components/User/FooterUser/FooterUser";


import HomeUser from "./components/User/HomeUser/HomeUser";
import UserSignUp from "./components/User/SignUpUser/SignUpUser";
import UserSignIn from "./components/User/SignInUser/SignInUser";
import UserFlights from './components/User/Flights/Flights'
import FlightDetails from "./components/User/FlightDetails/FlightDetails";



function AppUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => UserAuthService.getUser());
   const [flights, setFlights] = useState([]);

  useEffect(() => {
    const loadAllFlights = async () => {
      const data = await TicketService.allFlights();
      setFlights(data || []);
    };
    loadAllFlights();
  }, []);

  // ==================== User Functions ====================
  const UserHandleSignUp = async (formData) => {
    try {
      const UserData = await UserAuthService.UserSignUp(formData);
      setUser(UserData);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const UserHandleSignIn = async (formData) => {
    try {
      const UserData = await UserAuthService.UserSignIn(formData);
      setUser(UserData);
      navigate("/user/home");
    } catch (err) {
      console.error(err);
    }
  };

  const UserHandleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/user/sign-in");
  };


  // ==================== JSX ====================
  return (
    <>
      <NavBarUser user={user} UserHandleLogout={UserHandleLogout} />


      <Routes>
    
        <Route 
        path="/user/home" 
        element={<HomeUser 
           user={user} 
          flights={flights} />} />


        <Route
          path="/user/sign-up"
          element={<UserSignUp 
            UserHandleSignUp={UserHandleSignUp} 
            user={user} />}
        />


        <Route
          path="/user/sign-in"
          element={<UserSignIn 
            UserHandleSignIn={UserHandleSignIn} 
            user={user} />}
        />



        <Route
         path="/user/flights" 
         element={<UserFlights 
          user={user}/>} 
          
          />


          <Route
          path="/user/flights/:flightId"
          element={<FlightDetails user={user} flights={flights}      />}
          
          
          />

       

      

     <Route path="*" element={<h1>404 Page not Found</h1>  } />
      </Routes>


            <FooterUser  user={user} />

    </>
  );
}

export default AppUser;
