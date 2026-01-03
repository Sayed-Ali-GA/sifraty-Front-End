const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/flights`

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

// =================================================== GET ALL FLIGHTS ======================================================================
const index = async () => {
  try {
    const res = await fetch(BASE_URL, { headers: getAuthHeaders() })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
// =================================================================================================================================================================

// ======================================================= GET MY FLIGHTS (AIRLINE ONLY) ========================================================================
const myFlights = async () => {
  try {
    const res = await fetch(`${BASE_URL}/my-flights`, {
      headers: getAuthHeaders()
    })

    if (!res.ok) throw new Error("Failed to fetch my flights")

    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
// =================================================================================================================================================================

// ================================================ GET ONE FLIGHT =====-================================================================================
    const show = async (flightId) => {
        try {
            const res = await fetch(`${BASE_URL}/${flightId}`, { headers: getAuthHeaders() })
            const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
  }
}

// ============================================== POST NEW FLIGHT =====================================================================
    const create = async (formData) => {
        try {
            const res = await fetch(`${BASE_URL}/new`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            })
                const data = await res.json()
            return data
        } catch (err) {
            console.log(err)
     }
    }
// =================================================================================================================================================================

// ======================================-=================== UPDATE FLIGHT =======================================================================--=======
    const update = async (flightId, formData) => {
        try {
            const res = await fetch(`${BASE_URL}/${flightId}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            })
                const data = await res.json()
              return data
        }  catch (err) {
             console.log(err)
        }
    }
    // =================================================================================================================================================================

// ================================================================= DELETE FLIGHT =====================================================================
    const deleteFlight = async (flightId) => {
        try {
            const res = await fetch(`${BASE_URL}/${flightId}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            })
                const data = await res.json()
              return data
        }  catch (err) {
            console.log(err)
        }
    }
    // =================================================================================================================================================================

export {
  index,
  myFlights,
  show,
  create,
  update,
  deleteFlight
}

