import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../Companyies/SignIn/SignIn.css";

const UserSignIn = ({ UserHandleSignIn, user }) => {
  const navigate = useNavigate();

  const [formData, setFormData]         = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState(null);

  useEffect(() => {
    if (user) navigate("/user/home");
  }, [user, navigate]);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await UserHandleSignIn(formData);
      result.success
        ? navigate("/user/home")
        : setError(result.message || "Invalid username or password");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">

        {/* ── Banner ── */}
        <div className="auth-card-banner">
          <div className="auth-banner-icon"><FaUser /></div>
          <h1>Welcome Back</h1>
          <p>Sign in to your Sifraty account</p>
        </div>

        {/* ── Form ── */}
        <div className="auth-form-body">
          <form onSubmit={handleSubmit} noValidate>

            <div className="auth-field">
              <label htmlFor="username" className="auth-label">Username</label>
              <input
                id="username" name="username" type="text"
                className="auth-input"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                autoComplete="username"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password" className="auth-label">Password</label>
              <div className="auth-input-group">
                <input
                  id="password" name="password"
                  type={showPassword ? "text" : "password"}
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
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <div className="auth-alert auth-alert-error" role="alert">{error}</div>
            )}

            <button type="submit" className="auth-btn-submit">
              <FaSignInAlt /> Sign In
            </button>

          </form>

          <p className="auth-footer-text">
            Don't have an account? <Link to="/user/sign-up">Sign Up</Link>
          </p>
        </div>

      </div>
    </main>
  );
};

export default UserSignIn;