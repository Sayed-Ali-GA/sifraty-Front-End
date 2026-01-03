import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const SignIn = (props) => {
  const navigate = useNavigate()

  

  const initialState = {
    employee_username: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)

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
  try {
    await props.handleSignIn(formData)
    navigate('/')
  } catch (err) {
    console.log(err)
    alert(err.message)
  }
}


  return (
    <main>
      <h1>Sign In</h1>
                                                            
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label><br />
          <input
            type="text"
            name="employee_username"
            id="username"
            value={formData.employee_username}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="password">Password</label><br />
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">Sign In</button>
      </form>

      <p>
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </main>
  )
}

export default SignIn
