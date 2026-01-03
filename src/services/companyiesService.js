const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/companyies`

const index = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}


const show = async (companyiesId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${companyiesId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}


const create = async (formData) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}


export {
  index,
  show,
  create,
  
//   createComment,
//   deleteComment,
}