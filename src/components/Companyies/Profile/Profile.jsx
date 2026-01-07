// import { getCompany } from "../../../services/CompanyiesAuthService";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const company = getCompany();
//   const navigate = useNavigate();

  
//   if (!company) {
//     navigate("/sign-in");
//     return null;
//   }

//   return (
//     <div>
//       <h1>Company Profile</h1>

//       <h2>{company.logo}</h2>

//       <div>
//         <p><strong>Company:</strong> {company.name}</p>
//         <p><strong>Employee Username:</strong> {company.employee_username} </p>
//         <p><strong>Email:</strong> {company.email}</p>
//         <p><strong>Phone Number:</strong> {company.phone}</p>

//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { getCompany, updateProfile } from "../../../services/CompanyiesAuthService";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const companyData = getCompany();

  const [form, setForm] = useState({
    name: companyData?.name || "",
    email: companyData?.email || "",
    phone: companyData?.phone || "",
    license: companyData?.license || "",
    logo: companyData?.logo || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!companyData) {
      navigate("/sign-in");
    }
  }, [companyData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const updated = await updateProfile(form);
      setForm(updated);

      const oldToken = localStorage.getItem("token");
      if (oldToken) {
        const payload = { ...JSON.parse(atob(oldToken.split(".")[1])), ...updated };
        const newToken = [oldToken.split(".")[0], btoa(JSON.stringify(payload)), oldToken.split(".")[2]].join(".");
        localStorage.setItem("token", newToken);
      }

      setMessage("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Company Profile</h1>

      {form.logo && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src={form.logo} alt="Company Logo" style={{ width: "150px", borderRadius: "8px" }} />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {["name", "email", "phone", "license", "logo"].map((field) => (
          <div
            key={field}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <label style={{ fontWeight: "bold", marginRight: "10px", minWidth: "100px" }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>

            {editMode ? (
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                style={{ flex: 1, padding: "5px" }}
              />
            ) : (
              <span style={{ flex: 1 }}>{form[field]}</span>
            )}

            {!editMode && (
              <FaEdit
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={() => setEditMode(true)}
              />
            )}
          </div>
        ))}

        {editMode && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        )}
      </form>

      {message && <p style={{ textAlign: "center", marginTop: "15px", color: "green" }}>{message}</p>}
    </div>
  );
}
