const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/companyies`

const signUp = async (formData) => {
  try {
   const payload = {
  name: formData.name,
  logo: formData.logo,
  email: formData.email,
  phone: formData.phone,
  license: formData.license,
  employee_username: formData.employee_username,
  password: formData.password
}


    const res = await fetch(`${BASE_URL}/sign-up-airlines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.err || 'Sign up failed')

    localStorage.setItem('token', data.token)
    return JSON.parse(atob(data.token.split('.')[1]))
  } catch (err) {
    throw err
  }
}

const signIn = async (formData) => {
  try {
    const payload = {
      employee_username: formData.employee_username,
      password: formData.password,
    }

    const res = await fetch(`${BASE_URL}/sign-in-airlines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.err || 'Sign in failed')

    localStorage.setItem('token', data.token)
    return JSON.parse(atob(data.token.split('.')[1]))
  } catch (err) {
    throw err
  }
}


const updateProfile = async (formData) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) throw new Error("Not logged in");

    const res = await fetch(`${BASE_URL}/airlines/profile`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.err || 'Update failed');

    const currentToken = token.split('.');
    const payload = { ...getCompany(), ...data }; 

    return data;
  } catch (err) {
    throw err;
  }
};


const getCompany = () => {
  const token = localStorage.getItem('token')
  return token ? JSON.parse(atob(token.split('.')[1])) : null
}

export { 
  signUp,
  signIn,
  getCompany,
  updateProfile

}
