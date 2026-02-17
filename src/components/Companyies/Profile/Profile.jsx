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
  const [logoFile, setLogoFile] = useState(null);

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

    // Validation
    if (field === 'name' && !form.name.trim()) {
      setMessage("Name is required");
      setLoading(false);
      return;
    }
    if (field === 'email' && (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))) {
      setMessage("Valid email is required");
      setLoading(false);
      return;
    }
    

    try {
      await handleProfileUpdate(form);
      setMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully.`);
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
    setLogoFile(null);
    setEditingField(null);
    setMessage("");
  };

  const fields = ["name", "employee_username", "email", "phone", "license", "logo"];

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Company Profile</h1>

      {form.logo && typeof form.logo === 'string' && (
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
            field === 'logo' ? (
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input
                  type="file"
                  name="logo"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setLogoFile(file);
                    setForm(prev => ({ ...prev, logo: file || prev.logo }));
                  }}
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
            )
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {field === 'logo' ? (
                form.logo && typeof form.logo === 'string' ? (
                  <img src={form.logo} alt="Logo" width="50" />
                ) : logoFile ? (
                  <img src={URL.createObjectURL(logoFile)} alt="New Logo Preview" width="50" />
                ) : (
                  <span>No logo</span>
                )
              ) : (
                <span style={{ flex: 1 }}>{form[field]}</span>
              )}
              <button type="button" onClick={() => setEditingField(field)} title="Edit">
                <FaEdit />
              </button>
            </div>
          )}
        </div>
      ))}

      {message && <p style={{ color: message.includes("successfully") ? "green" : "red", fontWeight: "bold" }}>{message}</p>}
    </div>
  );
}
