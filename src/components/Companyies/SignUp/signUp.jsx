import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = ({ handleSignUp, company }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employee_username: '', password: '', passwordConf: '', name: '', email: '', phone: '', license: '', logo: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => { if(company) navigate('/'); }, [company, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.passwordConf){ setError("Passwords must match"); return; }
    const result = await handleSignUp(formData);
    if(result.success) navigate('/'); else setError(result.message);
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {["employee_username","password","passwordConf","name","email","phone","license","logo"].map(f => (
          <input key={f} type={f.includes("password")?"password":"text"} name={f} placeholder={f.replace(/([A-Z])/g," $1")} value={formData[f]} onChange={handleChange} required={f!=="logo"} />
        ))}
        <button type="submit">Sign Up</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
      <p>Already have an account? <Link to="/sign-in">Sign In</Link></p>
    </main>
  )
}

export default SignUp;
