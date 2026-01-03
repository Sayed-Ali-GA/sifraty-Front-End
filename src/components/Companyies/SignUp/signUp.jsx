import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {

  const navigate = useNavigate()

  const initialState = {
    employee_username: '',
    password: '',
    passwordConf: '',
    license: '',
    phone: '',
    email: '',
    name: '',
    logo: '', // Not work yet
  }

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (props.user) {
      navigate('/')
    }
  }, [props.user, navigate])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
   
    const payload = {
  name: formData.name || "",
  logo: formData.logo || "",
  email: formData.email || "",
  phone: formData.phone || "",
  license: formData.license || "",
  employee_username: formData.employee_username || "",
  password: formData.password || ""
  
}
//  console.log("Payload to send:", payload);

    const result = await props.handleSignUp(payload)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  let formIsInvalid = true
  if (
    formData.employee_username &&
    formData.password &&
    formData.password === formData.passwordConf &&
    formData.name &&
    formData.email
  ) {
    formIsInvalid = false
  }


  return (
    <main>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="employee_username"
          value={formData.employee_username}
          onChange={handleChange}
          placeholder="Employee Username"
          required
        />

        <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            autoComplete="new-password"
        />


        <input
          type="password"
          name="passwordConf"
          value={formData.passwordConf}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          autoComplete="new-password"
        />

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Company Name"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Company Email"
          required
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        <input
          type="text"
          name="license"
          value={formData.license}
          onChange={handleChange}
          placeholder="License"
        />

        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          placeholder="Logo URL or name"
        />

        <button type="submit" >Sign Up </button>

        {error && <p style={{color: 'red'}}>{error}</p>}

      </form>
    </main>
  )
}

export default SignUp
