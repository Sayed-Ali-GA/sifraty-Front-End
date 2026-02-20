import { Link } from "react-router-dom";

const HomeCompanyies = ({ company }) => {
  return (
    <main
      className="container py-5"
      style={{ paddingTop: "1000px", minHeight: "950vh" }} 
    >

      {company ? (
        <div className="row justify-content-center">
          <div className="col-lg-8">

            <div className="p-5 shadow rounded-4 bg-light text-center">
              <h1 className="fw-bold mb-3 d-flex align-items-center justify-content-center">
                {company.logo && (
                  <img
                    src={company.logo}
                    alt="Company Logo"
                    width="50%"
                    height="50%"
                    className="me-2"
                  />
                )}
              </h1>
              <h1>  
                Welcome, {company.name || "Your Company"}
              </h1>

              <p className="lead mb-4 text-muted">
                Manage your flights and post new trips for travelers.
              </p>

              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/flights/new" className="btn btn-dark btn-lg px-4">
                  Post New Flight +
                </Link>

                <Link to="/flights" className="btn btn-outline-dark btn-lg px-4">
                  Browse Flights
                </Link>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="row justify-content-center text-center">
          <div className="col-lg-6">
            <div className="p-5 shadow rounded-4 bg-light">
              <h1 className="fw-bold mb-3">Welcome to Sifraty</h1>

              <p className="lead text-muted">
                Please sign in or create a company account to manage flights.
              </p>

              <Link to="/sign-in" className="btn btn-dark mt-3 px-4">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomeCompanyies;
