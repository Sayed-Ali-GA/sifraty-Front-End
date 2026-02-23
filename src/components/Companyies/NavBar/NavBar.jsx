import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../../../assets/Logo-sifraty.png";
import "./NavBar.css";

const NavBarCompanyies = ({ company, handleLogout }) => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-companies">
      <div className="container">

        {/* ── Brand ── */}
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Sfraty Logo"
            className="brand-logo"
          />
          <span className="brand-name">Sfraty</span>
        </Link>

        {/* ── Mobile Toggle ── */}
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

        {/* ── Links ── */}
        <div className="collapse navbar-collapse" id="navbarCompany">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">

            {company ? (
              <>
                {/* Company badge */}
                <li className="nav-item d-none d-lg-flex">
                  <div className="company-badge">
                    {company.logo && (
                      <img src={company.logo} alt={company.name} />
                    )}
                    <span className="badge-dot" />
                    {company.name}
                  </div>
                </li>

                <li className="nav-item">
                  <div className="nav-divider d-none d-lg-block" />
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${pathname === "/flights" ? "active" : ""}`}
                    to="/flights"
                  >
                    Flights
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${pathname === "/flights/new" ? "active" : ""}`}
                    to="/flights/new"
                  >
                    Add Flight
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${pathname === "/profile" ? "active" : ""}`}
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <button className="btn-logout" onClick={handleLogout}>
                    <FaSignOutAlt />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn-signin" to="/sign-in">
                    Sign In
                  </Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <Link className="btn-signup" to="/sign-up">
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