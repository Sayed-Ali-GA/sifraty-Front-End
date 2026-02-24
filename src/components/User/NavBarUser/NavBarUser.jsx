import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaUser, FaClock } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import logo from '../../../assets/Logo-sifraty.png';
import "./NavBarUser.css";

const NavBarUser = ({ user, UserHandleLogout }) => {
  const location   = useLocation();
  const [toast, setToast] = useState(false);

  const isActive = (path) => location.pathname === path ? "active" : "";

  const handleBookingClick = (e) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <>
      <nav className="navbar navbar-user navbar-expand-lg fixed-top" style={{ zIndex: 1100 }}>
        <div className="container">

          {/* ── Brand ── */}
          <Link className="navbar-brand" to="/user/home">
            <img src={logo} alt="Sifraty" className="brand-logo" />
            <span className="brand-name">SIFRATY</span>
          </Link>

          {/* ── Mobile Toggler ── */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarUser"
            aria-controls="navbarUser"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* ── Links ── */}
          <div className="collapse navbar-collapse" id="navbarUser">
            <ul className="navbar-nav ms-auto align-items-center gap-1">

              {user ? (
                <>
                  {/* User badge */}
                  <li className="nav-item">
                    <span className="user-badge">
                      {user.photo ? (
                        <img src={user.photo} alt={user.username} className="user-badge-avatar" />
                      ) : (
                        <span className="user-badge-icon"><FaUser /></span>
                      )}
                      {user.username}
                      <span className="badge-dot" />
                    </span>
                  </li>

                  <li className="nav-divider" />

                  <li className="nav-item">
                    <Link
                      className={`nav-link ${isActive("/user/flights")}`}
                      to="/user/flights"
                    >
                      <MdFlightTakeoff style={{ marginRight: 5, verticalAlign: "middle" }} />
                      Flights
                    </Link>
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

                  <li className="nav-divider" />

                  <li className="nav-item">
                    <button className="btn-logout" onClick={UserHandleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="btn-signin" to="/user/sign-in">Sign In</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn-signup" to="/user/sign-up">Sign Up</Link>
                  </li>
                </>
              )}

            </ul>
          </div>

        </div>
      </nav>

      {/* ── Coming Soon Toast ── */}
      {toast && (
        <div className="navbar-user nb-toast">
          <FaClock />
          My Bookings — Coming Soon!
        </div>
      )}
    </>
  );
};

export default NavBarUser;