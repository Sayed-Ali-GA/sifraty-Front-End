import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const UserSignIn = ({ UserHandleSignIn, user }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) navigate("/user/home");
  }, [user, navigate]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await UserHandleSignIn(formData);
      if (result.success) {
        navigate("/user/home");
      } else {
        setError(result.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>User Sign In</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          background: "#f9f9f9",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username"
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          style={{
            padding: "0.6rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#222",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>

        {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
      </form>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Don’t have an account? <Link to="/user/sign-up">Sign Up</Link>
      </p>
    </main>
  );
};

export default UserSignIn;
