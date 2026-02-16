const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api`;

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem("token")}`
});


export const myBookings = async () => {
  const res = await fetch(`${BASE_URL}/bookings/my-bookings`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) throw new Error("Failed to fetch user bookings");
  return res.json();
};


export const getCompanyBookings = async () => {
  const res = await fetch(`${BASE_URL}/company/bookings`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) throw new Error("Failed to fetch company bookings");
  return res.json();
};


export const getByFlightId = async (flightId) => {
  const res = await fetch(`${BASE_URL}/company/flights/${flightId}/bookings`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) throw new Error("Failed to fetch flight bookings");
  return res.json();
};
