import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaBuilding, FaUserPlus, FaUpload } from "react-icons/fa";

import "./signUp.css";

const FIELDS = [
  { name: "employee_username", label: "Employee Username", type: "text",  placeholder: "e.g. john_doe",          required: true  },
  { name: "name",              label: "Company Name",      type: "text",  placeholder: "e.g. Gulf Airways",       required: true  },
  { name: "email",             label: "Email Address",     type: "email", placeholder: "company@example.com",     required: true  },
  { name: "phone",             label: "Phone Number",      type: "text",  placeholder: "+973 3300 0000",           required: true  },
  { name: "license",           label: "License Number",    type: "text",  placeholder: "e.g. BH-2024-AIR-001",    required: true  },
];

const SignUp = ({ handleSignUp, company }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee_username: "", password: "", passwordConf: "",
    name: "", email: "", phone: "", license: "", logo: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState(null);

  useEffect(() => {
    if (company) navigate("/");
  }, [company, navigate]);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    if (e.target.files?.[0])
      setFormData(prev => ({ ...prev, logo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.passwordConf) {
      setError("Passwords do not match"); return;
    }
    try {
      const result = await handleSignUp(formData);
      result.success ? navigate("/") : setError(result.message || "Sign Up failed");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card signup-card">

        {/* ── Banner ── */}
        <div className="auth-card-banner">
          <div className="auth-banner-icon">
            <FaBuilding />
          </div>
          <h1>Create Company Account</h1>
          <p>Fill in your details to get started</p>
        </div>

        {/* ── Form ── */}
        <div className="auth-form-body">
          <form onSubmit={handleSubmit} noValidate>

            {/* ── Company Info Section ── */}
            <div className="signup-section-label">Company Information</div>

            {FIELDS.map(({ name, label, type, placeholder, required }) => (
              <div className="auth-field" key={name}>
                <label htmlFor={name} className="auth-label">{label}</label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  className="auth-input"
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required={required}
                  autoComplete={name === "email" ? "email" : "off"}
                />
              </div>
            ))}

            {/* ── Logo Upload ── */}
            <div className="auth-field">
              <label className="auth-label">Company Logo <span className="signup-optional">(optional)</span></label>
              <label className="signup-upload-zone" htmlFor="logo">
                <FaUpload className="signup-upload-icon" />
                <span className="signup-upload-text">
                  {formData.logo ? formData.logo.name : "Click to upload logo"}
                </span>
                <span className="signup-upload-hint">PNG, JPG up to 5MB</span>
                <input
                  type="file" id="logo" name="logo"
                  accept="image/*" onChange={handleFileChange}
                  className="signup-upload-input"
                />
              </label>
            </div>

            {/* ── Security Section ── */}
            <div className="signup-section-label" style={{ marginTop: 20 }}>Security</div>

            {/* Password */}
            <div className="auth-field">
              <label htmlFor="password" className="auth-label">Password</label>
              <div className="auth-input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password" name="password"
                  className="auth-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-toggle-btn"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
              <label htmlFor="passwordConf" className="auth-label">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="passwordConf" name="passwordConf"
                className="auth-input"
                value={formData.passwordConf}
                onChange={handleChange}
                placeholder="Repeat your password"
                required
                autoComplete="new-password"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="auth-alert auth-alert-error" role="alert">
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="auth-btn-submit" style={{ marginTop: 8 }}>
              <FaUserPlus />
              Create Account
            </button>

          </form>

          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/sign-in">Sign In</Link>
          </p>
        </div>

      </div>
    </main>
  );
};

export default SignUp;