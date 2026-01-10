import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function ProfileCompany({ company, handleProfileUpdate }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    employee_username: "",
    email: "",
    phone: "",
    license: "",
    logo: "",
  });

  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Initialize form
  useEffect(() => {
    if (!company) {
      navigate("/sign-in");
      return;
    }

    setForm({
      name: company.name || "",
      employee_username: company.employee_username || "",
      email: company.email || "",
      phone: company.phone || "",
      license: company.license || "",
      logo: company.logo || "",
    });
  }, [company, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const saveField = async (field) => {
    setLoading(true);
    setMessage("");

    try {
      await handleProfileUpdate(form);
      setMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully. Please log out and log back in to see full updates.`);
      setEditingField(null);
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setForm({
      name: company.name || "",
      employee_username: company.employee_username || "",
      email: company.email || "",
      phone: company.phone || "",
      license: company.license || "",
      logo: company.logo || "",
    });
    setEditingField(null);
    setMessage("");
  };

  const fields = ["name", "employee_username", "email", "phone", "license", "logo"];

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Company Profile</h1>

     

      {form.logo && (
        <div style={{ marginBottom: "20px" }}>
          <img src={form.logo} alt="Company Logo" width="150" />
        </div>
      )}

      {fields.map(field => (
        <div key={field} style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>

          {editingField === field ? (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                style={{ flex: 1, padding: "5px" }}
              />
              <button type="button" onClick={() => saveField(field)} disabled={loading} title="Save">
                <FaSave />
              </button>
              <button type="button" onClick={cancelEdit} title="Cancel">
                <FaTimes />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ flex: 1 }}>{form[field]}</span>
              <button type="button" onClick={() => setEditingField(field)} title="Edit">
                <FaEdit />
              </button>
            </div>
          )}
        </div>
      ))}

      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
    </div>
  );
}
