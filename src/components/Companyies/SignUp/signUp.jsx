import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = ({ handleSignUp, company }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee_username: '',
    password: '',
    passwordConf: '',
    name: '',
    email: '',
    phone: '',
    license: '',
    logo: null
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (company) navigate('/');
  }, [company, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      logo: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConf) {
      setError("Passwords must match");
      return;
    }

    const result = await handleSignUp(formData);

    if (result.success) navigate('/');
    else setError(result.message);
  };

  return (
    <>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>

        <input name="employee_username" 
               placeholder="Employee Username" 
               onChange={handleChange} 
               required
         />
        
        <input type="password" 
               name="password" 
               placeholder="Password" 
               onChange={handleChange} 
               required
         />
        
        <input type="password" 
               name="passwordConf" 
               placeholder="Confirm Password" 
               onChange={handleChange} 
               required 
        />
        
        <input name="name" 
               placeholder="Company Name" 
               onChange={handleChange} 
               required 
        />
        
        <input name="email" 
               placeholder="Email" 
               onChange={handleChange} 
               required
        />
        
        <input name="phone" 
               placeholder="Phone" 
               onChange={handleChange} 
               required
        />
        
        <input name="license" 
               placeholder="License" 
               onChange={handleChange} 
               required
        />

        {/* Logo Upload */}
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit">Sign Up</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

            <p>Already have an account? <Link to="/sign-in">Sign In</Link></p>
    </>
  );
};

export default SignUp;
