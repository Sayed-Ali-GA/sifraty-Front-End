import { Link } from "react-router-dom";

function HomeUser({ user }) {

  // ======== User not logged in ========
  if (!user) {
    return (
      <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="text-center p-4 bg-white shadow-sm rounded" style={{ maxWidth: "500px", width: "100%" }}>
          <h2 className="mb-3">Access Required</h2>
          <p className="text-muted mb-4">
            Please sign in to continue and explore available flights.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/user/sign-in" className="btn btn-primary px-4">
              Sign In
            </Link>
            <Link to="/user/sign-up" className="btn btn-outline-secondary px-4">
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ======== User logged in ========
  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center p-5 bg-white shadow-sm rounded" style={{ maxWidth: "600px", width: "100%" }}>
        <h1 className="mb-3">Welcome, {user.username}</h1>

        <p className="lead text-muted mb-4">
          Discover flights tailored to your travel preferences.
        </p>

        <Link to="/user/flights" className="btn btn-primary btn-lg px-5">
          View Flights
        </Link>
      </div>
    </main>
  );
}

export default HomeUser;
