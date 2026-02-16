import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const UserSignUp = ({ UserHandleSignUp, user }) => {
  const navigate = useNavigate();

  // ===================== Form State =====================
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
    email: '',
    photo: null
  });

  const [error, setError] = useState(null);

  // ===================== Redirect if logged in =====================
  useEffect(() => {
    if (user) navigate('/user/home');
  }, [user, navigate]);

  // ===================== Handle Input Change =====================
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ===================== Handle Form Submission =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Password confirmation check
    if (formData.password !== formData.passwordConf) {
      setError("Passwords must match");
      return;
    }

    try {
      const result = await UserHandleSignUp(formData);
      if (result.success) {
        navigate('/user/home');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // ===================== Render Form =====================
  return (
    <main style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h1>User Sign Up</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {["username", "password", "passwordConf", "email", "photo"].map(field => (
          <input
            key={field}
            type={
              field === "photo" ? "file" :
              field.toLowerCase().includes("password") ? "password" : "text"
            }
            name={field}
            placeholder={field
              .replace(/_/g, " ")
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, str => str.toUpperCase())
            }
            value={field === "photo" ? undefined : formData[field]} 
            onChange={(e) => {
              if (field === "photo") {
                setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
              } else {
                handleChange(e);
              }
            }}
            required={field !== "photo"} // logo is optional
            autoComplete={
              field === "password" ? "new-password" :
              field === "passwordConf" ? "new-password" :
              field === "email" ? "email" :
              field === "username" ? "username" : undefined
            }
          />
        ))}

        <button type="submit" style={{ padding: "0.5rem", cursor: "pointer" }}>
          Sign Up
        </button>

        {error && <p style={{ color: 'red', marginTop: "0.5rem" }}>{error}</p>}
      </form>

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link to="/user/sign-in">Sign In</Link>
      </p>
    </main>
  );
};

export default UserSignUp;
