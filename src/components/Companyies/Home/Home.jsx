import { Link } from "react-router-dom";

const HomeCompanyies = ({ company }) => {
  return (
    <main style={{ padding: "20px" }}>
      {company ? (
        <>
          <h1>Welcome, {company.name || "Your Company"}</h1>
          <p>Manage your flights and post new trips for travelers.</p>


          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <Link to="/flights/new">
              <button style={{
                padding: "10px 15px",
                borderRadius: "8px",
                backgroundColor: "#4f46e5",
                color: "#fff",
                border: "none",
                cursor: "pointer"
              }}>
                Post new Flight +
              </button>
            </Link>

            <Link to="/flights">
              <button style={{
                padding: "10px 15px",
                borderRadius: "8px",
                backgroundColor: "#6b7280",
                color: "#fff",
                border: "none",
                cursor: "pointer"
              }}>
                Browse Flights
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1>Welcome to Sifraty App</h1>
          <p>Please sign in or create a company account to manage flights.</p>
        </>
      )}
    </main>
  );
};

export default HomeCompanyies;
