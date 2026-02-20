import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = ({ handleSignIn, company }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ employee_username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (company) navigate('/');
  }, [company, navigate]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await handleSignIn(formData);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || "Invalid username or password");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <main className="container" style={{ maxWidth: "400px", marginTop: "3rem" }}>
      <h1 className="text-center mb-4">Company Sign In</h1>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        {/* Employee Username */}
        <div className="mb-3">
          <label htmlFor="employee_username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="employee_username"
            name="employee_username"
            value={formData.employee_username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password with Toggle */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Submit button */}
        <button type="submit" className="btn btn-dark w-100">Sign In</button>
      </form>

      <p className="text-center mt-3">
        No account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </main>
  );
};

export default SignIn;
