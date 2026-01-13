// const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`;

// const UserSignUp = async (formData) => {
//   try {
//     const res = await fetch(`${BASE_URL}/sign-up-user`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.err || 'Sign up failed');
//     localStorage.setItem('token', data.token);
//     return JSON.parse(atob(data.token.split('.')[1]));
//   } catch (err) {
//     throw err;
//   }
// };

// const UserSignIn = async (formData) => {
//   try {
//     const res = await fetch(`${BASE_URL}/sign-in-user`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.err || 'Sign in failed');
//     localStorage.setItem('token', data.token);
//     return JSON.parse(atob(data.token.split('.')[1]));
//   } catch (err) {
//     throw err;
//   }
// };

// const UserUpdateProfile = async (formData) => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) throw new Error("Not logged in");
//     const res = await fetch(`${BASE_URL}/user/profile`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(formData)
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.err || 'Update failed');
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// const getUser = () => {
//   const token = localStorage.getItem('token');
//   return token ? JSON.parse(atob(token.split('.')[1])) : null;
// };

// const getCurrentUser = async () => {
//   const token = localStorage.getItem('token');
//   if (!token) return null;
  
//   const res = await fetch(`${BASE_URL}/currentUser`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.err || "Failed to fetch current user");
//   return data.user;
// };


// export { 
//   UserSignUp, 
//   UserSignIn, 
//   UserUpdateProfile, 
//   getUser,
//   getCurrentUser 
// };





// UsersAuthService.js


const AUTH_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`;
const USERS_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/users`;

/**
 * Sign up a new user
 * @param {Object} formData - { username, password, role? }
 * @returns {Object} JWT payload (id, username, role)
 */
const UserSignUp = async (formData) => {
  try {
    const res = await fetch(`${AUTH_URL}/sign-up-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.err || 'Sign up failed');

    localStorage.setItem('token', data.token);
    return JSON.parse(atob(data.token.split('.')[1]));
  } catch (err) {
    console.error('UserSignUp Error:', err);
    throw err;
  }
};

/**
 * Sign in an existing user
 * @param {Object} formData - { username, password }
 * @returns {Object} JWT payload (id, username, role)
 */
const UserSignIn = async (formData) => {
  try {
    const res = await fetch(`${AUTH_URL}/sign-in-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.err || 'Sign in failed');

    localStorage.setItem('token', data.token);
    return JSON.parse(atob(data.token.split('.')[1]));
  } catch (err) {
    console.error('UserSignIn Error:', err);
    throw err;
  }
};

/**
 * Update current user's profile
 * @param {Object} formData - { username?, email?, photo? }
 * @returns {Object} updated user object
 */
const UserUpdateProfile = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not logged in');

    const res = await fetch(`${USERS_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.err || 'Update failed');
    return data.user;
  } catch (err) {
    console.error('UserUpdateProfile Error:', err);
    throw err;
  }
};

/**
 * Get current user object from JWT in localStorage
 * @returns {Object|null} JWT payload or null if no token
 */
const getUser = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  } catch (err) {
    console.error('getUser Error:', err);
    return null;
  }
};

/**
 * Fetch current user from backend
 * @returns {Object|null} user object from server
 */
const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const res = await fetch(`${USERS_URL}/currentUser`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.err || 'Failed to fetch current user');
    return data.user;
  } catch (err) {
    console.error('getCurrentUser Error:', err);
    throw err;
  }
};

// ================== Export ==================
export {
  UserSignUp,
  UserSignIn,
  UserUpdateProfile,
  getUser,
  getCurrentUser
};
