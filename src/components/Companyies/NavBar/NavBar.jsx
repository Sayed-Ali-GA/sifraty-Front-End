import { Link } from "react-router-dom";
import logo from "../../../assets/Logo-sifraty.png";

const NavBarCompanyies = ({ company, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Logo"
            width="35"
            height="35"
            className="me-2"
          />
          Sfraty
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCompany"
          aria-controls="navbarCompany"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarCompany">
          <ul className="navbar-nav ms-auto">

            {company ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/flights">
                    Flights
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/flights/new">
                    Add Flight
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-in">
                    Sign In
                  </Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-primary btn-sm" to="/sign-up">
                    Sign Up
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarCompanyies;