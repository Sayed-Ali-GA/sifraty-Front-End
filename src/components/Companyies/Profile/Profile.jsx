import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSave, FaTimes, FaBuilding } from "react-icons/fa";
import "./Profile.css";

const FIELD_LABELS = {
  name:              "Company Name",
  employee_username: "Employee Username",
  email:             "Email Address",
  phone:             "Phone Number",
  license:           "License Number",
  logo:              "Company Logo",
};

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
  const [loading, setLoading]           = useState(false);
  const [message, setMessage]           = useState("");
  const [logoFile, setLogoFile]         = useState(null);

  useEffect(() => {
    if (!company) { navigate("/sign-in"); return; }
    setForm({
      name:              company.name              || "",
      employee_username: company.employee_username || "",
      email:             company.email             || "",
      phone:             company.phone             || "",
      license:           company.license           || "",
      logo:              company.logo              || "",
    });
  }, [company, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const saveField = async (field) => {
    setLoading(true);
    setMessage("");

    if (field === "name" && !form.name.trim()) {
      setMessage("Name is required"); setLoading(false); return;
    }
    if (field === "email" && (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))) {
      setMessage("Valid email is required"); setLoading(false); return;
    }

    try {
      await handleProfileUpdate(form);
      setMessage(`${FIELD_LABELS[field]} updated successfully.`);
      setEditingField(null);
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setForm({
      name:              company.name              || "",
      employee_username: company.employee_username || "",
      email:             company.email             || "",
      phone:             company.phone             || "",
      license:           company.license           || "",
      logo:              company.logo              || "",
    });
    setLogoFile(null);
    setEditingField(null);
    setMessage("");
  };

  const fields = ["name", "employee_username", "email", "phone", "license", "logo"];

  const logoSrc =
    form.logo && typeof form.logo === "string"
      ? form.logo
      : logoFile
      ? URL.createObjectURL(logoFile)
      : null;

  return (
    <div className="profile-page">
      <div className="container" style={{ maxWidth: 580 }}>
        <div className="profile-card">

          {/* ── Header ── */}
          <div className="profile-card-header">
            <div className="profile-logo-wrap">
              {logoSrc
                ? <img src={logoSrc} alt="Company Logo" />
                : <FaBuilding className="profile-logo-placeholder" />
              }
            </div>
            <h1 className="profile-company-name">
              {form.name || "Company Profile"}
            </h1>
            <div className="profile-status-badge">
              <span className="dot" />
              Active Account
            </div>
          </div>

          {/* ── Body ── */}
          <div className="profile-card-body">

            <div className="profile-section-divider" />

            {fields.map(field => {
              const isEditing = editingField === field;
              const label     = FIELD_LABELS[field];

              return (
                <div
                  key={field}
                  className={`profile-field ${isEditing ? "is-editing" : ""}`}
                >
                  {/* Label row */}
                  <div className="profile-field-label">
                    <span>{label}</span>
                  </div>

                  {isEditing ? (
                    /* ── Edit mode ── */
                    <div className="profile-field-input">
                      {field === "logo" ? (
                        <input
                          type="file"
                          name="logo"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setLogoFile(file);
                            setForm(prev => ({ ...prev, logo: file || prev.logo }));
                          }}
                        />
                      ) : (
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          className="form-control"
                          value={form[field]}
                          onChange={handleChange}
                          autoFocus
                        />
                      )}
                      <div className="profile-field-actions">
                        <button
                          className="btn-field-save"
                          onClick={() => saveField(field)}
                          disabled={loading}
                        >
                          {loading
                            ? <span className="spinner" />
                            : <FaSave />
                          }
                          {loading ? "Saving…" : "Save"}
                        </button>
                        <button
                          className="btn-field-cancel"
                          onClick={cancelEdit}
                        >
                          <FaTimes />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── View mode ── */
                    <div className="profile-field-value">
                      {field === "logo" ? (
                        logoSrc
                          ? <img src={logoSrc} alt="Logo" className="profile-logo-thumb" />
                          : <span className="value-empty">No logo uploaded</span>
                      ) : (
                        <span className={form[field] ? "value-text" : "value-empty"}>
                          {form[field] || `No ${label.toLowerCase()} set`}
                        </span>
                      )}
                      <button
                        className="btn-field-edit"
                        onClick={() => setEditingField(field)}
                        title={`Edit ${label}`}
                      >
                        <FaEdit />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* ── Alert ── */}
            {message && (
              <div
                className={`profile-alert ${
                  message.includes("successfully") ? "success" : "error"
                }`}
                role="alert"
              >
                {message}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}