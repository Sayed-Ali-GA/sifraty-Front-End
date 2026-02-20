import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../../assets/Logo-sifraty.png';

const NavBarUser = ({ user, UserHandleLogout }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleBookingClick = (e) => {
    e.preventDefault(); 
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500); 
  };

  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ zIndex: 1100 }}>


      <div className="container">
        {/* Logo & Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/user/home">
          <img 
            src={logo} 
            alt="Sifraty Logo" 
            width="40" 
            height="40" 
            className="d-inline-block align-top me-2"
          />
          Sfraty
        </Link>

        {/* Toggle button for mobile */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {user ? (
              <>
                <li className="nav-item me-2">
                  <span className="nav-link">Welcome, <strong>{user.username}</strong></span>
                </li>

                {user.photo && (
                   <li className="nav-item me-2">
                     <img 
                       src={user.photo} 
                       alt="User" 
                       className="rounded-circle" 
                       width="40" 
                       height="40" 
                     />
                   </li>
                 )}

                <li className="nav-item">
                  <Link className="nav-link" to="/user/flights">View Flights</Link>
                </li>

                <li className="nav-item">
                  <Link 
                    className="nav-link" 
                    to="/user/booking" 
                    onClick={handleBookingClick}
                  >
                    My Bookings
                  </Link>
                </li>

                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={UserHandleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/sign-in">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/sign-up">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Bootstrap Alert */}
        {showAlert && (
          <div 
            className="alert alert-warning alert-dismissible fade show position-absolute top-0 end-0 m-3" 
            role="alert"
            style={{ zIndex: 1050 }}
          >
            Coming Soon! 😊
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBarUser;
