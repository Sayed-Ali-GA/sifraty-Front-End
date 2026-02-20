import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const UserSignUp = ({ UserHandleSignUp, user }) => {
  const navigate = useNavigate();

  // ===================== Form State =====================
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    photo: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  // ===================== Redirect if logged in =====================
  useEffect(() => {
    if (user) navigate("/user/home");
  }, [user, navigate]);

  // ===================== Handlers =====================
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
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
      const result = await UserHandleSignUp(formData);
      if (result.success) {
        navigate("/user/home");
      } else {
        setError(result.message || "Sign Up failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  // ===================== Render =====================
  return (
    <main className="container" style={{ maxWidth: "450px", marginTop: "3rem" }}>
      <h1 className="text-center mb-4">User Sign Up</h1>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
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
            autoComplete="email"
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
              autoComplete="new-password"
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
            autoComplete="new-password"
          />
        </div>

        {/* Photo Upload */}
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">Profile Photo (optional)</label>
          <input
            type="file"
            className="form-control"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          {formData.photo && (
            <small className="form-text text-muted mt-1">
              Selected file: {formData.photo.name}
            </small>
          )}
        </div>

        {/* Error */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Submit */}
        <button type="submit" className="btn btn-dark w-100">
          Sign Up
        </button>
      </form>

      {/* Link to Sign In */}
      <p className="text-center mt-3">
        Already have an account? <Link to="/user/sign-in">Sign In</Link>
      </p>
    </main>
  );
};

export default UserSignUp;
