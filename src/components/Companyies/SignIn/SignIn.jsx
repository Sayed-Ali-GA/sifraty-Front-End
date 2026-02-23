import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import "./SignIn.css";


const SignIn = ({ handleSignIn, company }) => {
  const navigate = useNavigate();
  const [formData, setFormData]       = useState({ employee_username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]             = useState(null);

  useEffect(() => {
    if (company) navigate("/");
  }, [company, navigate]);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await handleSignIn(formData);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message || "Invalid username or password");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">

        {/* ── Banner ── */}
        <div className="auth-card-banner">
          <div className="auth-banner-icon">
            <FaUser />
          </div>
          <h1>Company Sign In</h1>
          <p>Enter your credentials to continue</p>
        </div>

        {/* ── Form ── */}
        <div className="auth-form-body">
          <form onSubmit={handleSubmit} noValidate>

            {/* Username */}
            <div className="auth-field">
              <label htmlFor="employee_username" className="auth-label">
                Username
              </label>
              <input
                type="text"
                id="employee_username"
                name="employee_username"
                className="auth-input"
                value={formData.employee_username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div className="auth-field">
              <label htmlFor="password" className="auth-label">
                Password
              </label>
              <div className="auth-input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="auth-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-toggle-btn"
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="auth-alert auth-alert-error" role="alert">
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="auth-btn-submit">
              <FaSignInAlt />
              Sign In
            </button>

          </form>

          <p className="auth-footer-text">
            No account?{" "}
            <Link to="/sign-up">Create one here</Link>
          </p>
        </div>

      </div>
    </main>
  );
};

export default SignIn;