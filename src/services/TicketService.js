const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/flights`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No auth token found in localStorage");
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
};

const index = async () => {
  try {
    const res = await fetch(BASE_URL, { headers: getAuthHeaders() });
    return await res.json();
  } catch (err) { console.error(err); }
};

const myFlights = async () => {
  try {
    const res = await fetch(`${BASE_URL}/my-flights`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Failed to fetch my flights");
    return await res.json();
  } catch (err) { console.error(err); }
};

const show = async (flightId) => {
  try {
        console.log("flightId:", flightId);
    const res = await fetch(`${BASE_URL}/${flightId}`, { headers: getAuthHeaders() });
    return await res.json();
  } catch (err) { console.error(err); }
};

const create = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/new`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(formData)
    });
    return await res.json();
  } catch (err) { console.error(err); }
};

const update = async (flightId, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/${flightId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(formData)
    });
    return await res.json();
  } catch (err) { console.error(err); }
};

const deleteFlight = async (flightId) => {
  try {
    const res = await fetch(`${BASE_URL}/${flightId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (err) { console.error(err); }
};

const allFlights = async () => {
  try {
    const res = await fetch(BASE_URL); // GET /api/flights
    if (!res.ok) throw new Error("Failed to fetch all flights");
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};


export { 
  index, 
  myFlights, 
  show, 
  create, 
  update, 
  deleteFlight,
  allFlights
};
