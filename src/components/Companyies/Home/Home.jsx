import { Link } from "react-router-dom";
import { FaBuilding, FaPlaneDeparture, FaList, FaPlus, FaGlobe } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import "./Home.css";

const HomeCompanyies = ({ company, flights = [] }) => {
  return (
    <main className="home-page">

      {company ? (

        /* ══════════════════ LOGGED IN ══════════════════ */
        <div className="home-card">

          {/* Header */}
          <div className="home-card-header">
            {company.logo ? (
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="home-company-logo"
              />
            ) : (
              <div className="home-company-icon">
                <FaBuilding />
              </div>
            )}
            <h1 className="home-welcome-title">
              Welcome, {company.name || "Your Company"}
            </h1>
            <p className="home-welcome-sub">
              Manage and publish flights for travelers
            </p>
          </div>

          {/* Body */}
          <div className="home-card-body">

            {/* Quick Stats */}
            <div className="home-stats">
              <div className="home-stat">
                <div className="home-stat-icon"><MdFlightTakeoff /></div>
                <div className="home-stat-value">{flights.length}</div>
                <div className="home-stat-label">Flights</div>
              </div>
              <div className="home-stat">
                <div className="home-stat-icon"><FaGlobe /></div>
                <div className="home-stat-value">
                  {new Set(flights.map(f => f.to_country).filter(Boolean)).size}
                </div>
                <div className="home-stat-label">Destinations</div>
              </div>
            </div>

            <div className="home-divider" />

            {/* Actions */}
            <div className="home-actions">
              <Link to="/flights/new" className="home-btn-primary">
                <FaPlus /> Post New Flight
              </Link>
              <Link to="/flights" className="home-btn-secondary">
                <FaList /> Browse Flights
              </Link>
            </div>

          </div>
        </div>

      ) : (

        /* ══════════════════ GUEST ══════════════════ */
        <div className="home-guest-card">

          <div className="home-guest-header">
            <div className="home-guest-plane"><MdFlightTakeoff /></div>
            <h1 className="home-guest-title">Welcome to Sifraty</h1>
            <p className="home-guest-sub">The airline company management portal</p>
          </div>

          <div className="home-guest-body">
            <p className="home-guest-desc">
              Sign in or create a company account to manage your flights
              and publish trips for travelers worldwide.
            </p>

            <div className="home-guest-actions">
              <Link to="/sign-in" className="home-btn-primary">
                <FaPlaneDeparture /> Sign In
              </Link>
              <Link to="/sign-up" className="home-btn-secondary">
                Sign Up
              </Link>
            </div>
          </div>

        </div>

      )}
    </main>
  );
};

export default HomeCompanyies;