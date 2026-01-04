import { getCompany } from "../../../services/CompanyiesAuthService";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const company = getCompany();
  const navigate = useNavigate();

  
  if (!company) {
    navigate("/sign-in");
    return null;
  }

  return (
    <div>
      <h1>Company Profile</h1>

      <h2>{company.logo}</h2>

      <div>
        <p><strong>Company:</strong> {company.name}</p>
        <p><strong>Employee Username:</strong> {company.employee_username} </p>
        <p><strong>Email:</strong> {company.email}</p>
        <p><strong>Phone Number:</strong> {company.phone}</p>

      </div>
    </div>
  );
}