const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/bookings`;

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

// دالة لجلب حجوزات الرحلة للشركة
export const getByFlightId = async (flightId) => {
  const res = await fetch(`${BASE_URL}/company/bookings?flightId=${flightId}`, {
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to fetch bookings for this flight');
  }

  return res.json();
};

// الدوال الأخرى
export const bookFlight = async (flightId, bookingData) => {
  const res = await fetch(`${BASE_URL}/${flightId}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(bookingData)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Booking failed');
  }

  return res.json();
};

export const myBookings = async () => {
  const res = await fetch(`${BASE_URL}/my-bookings`, {
    headers: getAuthHeaders()
  });
  return res.json();
};

export const cancelBooking = async (bookingId) => {
  const res = await fetch(`${BASE_URL}/${bookingId}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  return res.json();
};
