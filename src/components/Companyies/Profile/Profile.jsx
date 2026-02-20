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
    if (field === "name" && !form.name.trim()) {
      setMessage("Name is required");
      setLoading(false);
      return;
    }
    if (field === "email" && (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))) {
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
    <div className="container my-4" style={{ maxWidth: "600px" }}>
      <h1 className="mb-4 text-center">Company Profile</h1>

      {/* Logo preview */}
      {form.logo && typeof form.logo === "string" && (
        <div className="text-center mb-4">
          <img src={form.logo} alt="Company Logo" className="img-thumbnail" style={{ maxWidth: "150px" }} />
        </div>
      )}

      {fields.map(field => (
        <div key={field} className="mb-3">
          <label className="form-label fw-bold">
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>

          {editingField === field ? (
            field === "logo" ? (
              <div className="input-group">
                <input
                  type="file"
                  name="logo"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setLogoFile(file);
                    setForm(prev => ({ ...prev, logo: file || prev.logo }));
                  }}
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => saveField(field)}
                  disabled={loading}
                  title="Save"
                >
                  <FaSave />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelEdit}
                  title="Cancel"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div className="input-group">
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  className="form-control"
                  value={form[field]}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => saveField(field)}
                  disabled={loading}
                  title="Save"
                >
                  <FaSave />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelEdit}
                  title="Cancel"
                >
                  <FaTimes />
                </button>
              </div>
            )
          ) : (
            <div className="d-flex align-items-center justify-content-between">
              {field === "logo" ? (
                form.logo && typeof form.logo === "string" ? (
                  <img src={form.logo} alt="Logo" className="img-thumbnail" style={{ maxWidth: "50px" }} />
                ) : logoFile ? (
                  <img src={URL.createObjectURL(logoFile)} alt="New Logo Preview" className="img-thumbnail" style={{ maxWidth: "50px" }} />
                ) : (
                  <span>No logo</span>
                )
              ) : (
                <span>{form[field]}</span>
              )}
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setEditingField(field)} title="Edit">
                <FaEdit />
              </button>
            </div>
          )}
        </div>
      ))}

      {message && (
        <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
}
