import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = ({ handleSignUp, company }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee_username: "",
    password: "",
    passwordConf: "",
    name: "",
    email: "",
    phone: "",
    license: "",
    logo: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (company) navigate("/");
  }, [company, navigate]);

  // ================= Handlers =================
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, logo: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.passwordConf) {
      setError("Passwords must match");
      return;
    }

    try {
      const result = await handleSignUp(formData);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message || "Sign Up failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  // ================= Render =================
  return (
    <main className="container" style={{ maxWidth: "500px", marginTop: "3rem" }}>
      <h1 className="text-center mb-4">Company Sign Up</h1>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {/* Employee Username */}
        <div className="mb-3">
          <label htmlFor="employee_username" className="form-label">Employee Username</label>
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

        {/* Company Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* License */}
        <div className="mb-3">
          <label htmlFor="license" className="form-label">License</label>
          <input
            type="text"
            className="form-control"
            id="license"
            name="license"
            value={formData.license}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
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

        {/* Confirm Password */}
        <div className="mb-3">
          <label htmlFor="passwordConf" className="form-label">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="passwordConf"
            name="passwordConf"
            value={formData.passwordConf}
            onChange={handleChange}
            required
          />
        </div>

        {/* Logo Upload */}
        <div className="mb-3">
          <label htmlFor="logo" className="form-label">Company Logo (optional)</label>
          <input
            type="file"
            className="form-control"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
          />
          {formData.logo && (
            <small className="form-text text-muted mt-1">
              Selected file: {formData.logo.name}
            </small>
          )}
        </div>

        {/* Error */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Submit */}
        <button type="submit" className="btn btn-dark w-100">Sign Up</button>
      </form>

      <p className="text-center mt-3">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </main>
  );
};

export default SignUp;
