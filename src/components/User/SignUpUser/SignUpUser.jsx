import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaUserPlus, FaUpload } from "react-icons/fa";

import "../../Companyies/SignUp/signUp.css";

const FIELDS = [
  { name: "username", label: "Username",     type: "text",  placeholder: "e.g. Name",        required: true,  autoComplete: "username" },
  { name: "email",    label: "Email Address", type: "email", placeholder: "example@email.com",    required: true,  autoComplete: "email"    },
];

const UserSignUp = ({ UserHandleSignUp, user }) => {
  const navigate = useNavigate();

  const [formData, setFormData]         = useState({ username: "", email: "", password: "", passwordConf: "", photo: null });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState(null);

  useEffect(() => {
    if (user) navigate("/user/home");
  }, [user, navigate]);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhotoChange = (e) => {
    if (e.target.files?.[0])
      setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.passwordConf) {
      setError("Passwords do not match"); return;
    }
    try {
      const result = await UserHandleSignUp(formData);
      result.success ? navigate("/user/home") : setError(result.message || "Sign Up failed");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card signup-card">

        {/* ── Banner ── */}
        <div className="auth-card-banner">
          <div className="auth-banner-icon"><FaUser /></div>
          <h1>Create Account</h1>
          <p>Join Sifraty and start exploring flights</p>
        </div>

        {/* ── Form ── */}
        <div className="auth-form-body">
          <form onSubmit={handleSubmit} noValidate>

            {/* Account fields */}
            <div className="signup-section-label">Account Information</div>

            {FIELDS.map(({ name, label, type, placeholder, required, autoComplete }) => (
              <div className="auth-field" key={name}>
                <label htmlFor={name} className="auth-label">{label}</label>
                <input
                  id={name} name={name} type={type}
                  className="auth-input"
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required={required}
                  autoComplete={autoComplete}
                />
              </div>
            ))}

            {/* Photo upload */}
            <div className="auth-field">
              <label className="auth-label">
                Profile Photo <span className="signup-optional">(optional)</span>
              </label>
              <label className="signup-upload-zone" htmlFor="photo">
                <FaUpload className="signup-upload-icon" />
                <span className="signup-upload-text">
                  {formData.photo ? formData.photo.name : "Click to upload photo"}
                </span>
                <span className="signup-upload-hint">PNG, JPG up to 5MB</span>
                <input
                  type="file" id="photo" name="photo"
                  accept="image/*" onChange={handlePhotoChange}
                  className="signup-upload-input"
                />
              </label>
            </div>

            {/* Security */}
            <div className="signup-section-label" style={{ marginTop: 20 }}>Security</div>

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
              <div className="auth-alert auth-alert-error" role="alert">{error}</div>
            )}

            {/* Submit */}
            <button type="submit" className="auth-btn-submit" style={{ marginTop: 8 }}>
              <FaUserPlus /> Create Account
            </button>

          </form>

          <p className="auth-footer-text">
            Already have an account? <Link to="/user/sign-in">Sign In</Link>
          </p>
        </div>

      </div>
    </main>
  );
};

export default UserSignUp;