import { Link } from "react-router-dom";

function HomeUser({ user }) {
  // ======== User not logged in ========
  if (!user) {
    return (
      <main style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Please sign in to access this page</h1>
        <div style={{ marginTop: "1rem" }}>
          <Link 
            to="/user/sign-in" 
            style={{ color: "blue", textDecoration: "underline", marginRight: "1rem" }}
          >
            Go to Sign In
          </Link>
          <Link 
            to="/user/sign-up" 
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Go to Sign Up
          </Link>
        </div>
      </main>
    );
  }

  // ======== User logged in ========
  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome, {user.username}!</h1>
      <h2>Sfraty: Find your perfect travel type</h2>
      <div style={{ marginTop: "1.5rem" }}>
        <Link 
          to="/user/flights" 
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none",
            transition: "background-color 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0056b3"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#007bff"}
        >
          View Flights
        </Link>
      </div>
    </main>
  );
}

export default HomeUser;
