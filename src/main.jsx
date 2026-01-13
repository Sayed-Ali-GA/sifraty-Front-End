import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AppCompanies from './AppCompanies'; // App for Companies. Example links: /111/ or /111/form.

import AppUser from './AppUser';           //  App for Users. Example links: /111/user/home or /111/user/flights. 
// import './index.css';


const pathname = window.location.pathname;
const isUserPath = pathname.startsWith('/user');  // Determine if the current path is for the User app (starts with /user).



// Render the User app if the path starts with /user, otherwise render the Companies app.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {isUserPath ? <AppUser /> : <AppCompanies />}
    </BrowserRouter>
  </React.StrictMode>
);
