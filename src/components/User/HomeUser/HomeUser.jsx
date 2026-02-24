import { Link } from "react-router-dom";
import { FaUser, FaArrowRight } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import "./HomeUser.css";

function HomeUser({ user }) {

  /* ── Guest ── */
  if (!user) {
    return (
      <main className="hu-page">
        <div className="hu-state-card">
          <div className="hu-state-banner">
            <div className="banner-icon"><MdFlightTakeoff /></div>
            <h2>Welcome to Sifraty</h2>
            <p>Sign in to explore available flights</p>
          </div>
          <div className="hu-state-body">
            <p className="hu-state-desc">
              Discover and book flights tailored to your travel preferences.
            </p>
            <div className="hu-state-actions">
              <Link to="/user/sign-in" className="hu-btn-primary">Sign In</Link>
              <Link to="/user/sign-up" className="hu-btn-outline">Sign Up</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ── Logged in ── */
  return (
    <main className="hu-page">
      <div className="hu-welcome-card">

        {/* Header */}
        <div className="hu-welcome-header">
          <div className="hu-avatar">
            {user.photo
              ? <img src={user.photo} alt={user.username} className="hu-avatar-img" />
              : <FaUser />
            }
          </div>
          <h1 className="hu-welcome-title">Welcome back, <span>{user.username}</span></h1>
          <p className="hu-welcome-sub">Ready for your next adventure?</p>
        </div>

        {/* Body */}
        <div className="hu-welcome-body">
          <p className="hu-welcome-desc">
            Discover flights tailored to your travel preferences and book your next trip with ease.
          </p>

          <Link to="/user/flights" className="hu-btn-primary hu-btn-full">
            <MdFlightTakeoff /> Browse Flights <FaArrowRight className="hu-btn-arrow" />
          </Link>
        </div>

      </div>
    </main>
  );
}

export default HomeUser;