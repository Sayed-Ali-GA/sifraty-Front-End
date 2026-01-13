const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/users`;

/**
 * Get all users
 * @returns {Array} list of users
 */
const index = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Not logged in");

    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.err || "Failed to fetch users");
    return data.users || data; 
  } catch (err) {
    console.error('index Error:', err);
    throw err;
  }
};

/**
 * Get a single user by ID
 * @param {number|string} userId
 * @returns {Object} user object
 */
const show = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Not logged in");

    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.err || "Failed to fetch user");
    return data.user || data;
  } catch (err) {
    console.error('show Error:', err);
    throw err;
  }
};

/**
 * Create a new user
 * @param {Object} formData
 * @returns {Object} created user
 */
const create = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Not logged in");

    const res = await fetch(`${BASE_URL}/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.err || "Failed to create user");
    return data.user || data;
  } catch (err) {
    console.error('create Error:', err);
    throw err;
  }
};

export {
  index,
  show,
  create,
  // createComment,
  // deleteComment,
};
