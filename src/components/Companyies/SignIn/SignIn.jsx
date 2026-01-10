import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = ({ handleSignIn, company }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ employee_username:'', password:'' });

  useEffect(() => { if(company) navigate('/'); }, [company, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await handleSignIn(formData); navigate('/'); } 
    catch(err){ alert(err.message) }
  }

  return (
    <main>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input name="employee_username" value={formData.employee_username} onChange={handleChange} placeholder="Username" required />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      <p>No account? <Link to="/sign-up">Sign Up</Link></p>
    </main>
  )
}

export default SignIn;
