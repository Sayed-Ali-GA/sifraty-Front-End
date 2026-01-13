import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo-sifraty.png';

const NavBarUser = ({ user, UserHandleLogout }) => {
  return (
    <nav style={{
      padding: '10px 20px',
      backgroundColor: '#222',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* ===== Logo ===== */}
      <Link to="/user/home">
        <img src={logo} alt="Sifraty Logo" style={{ height: '40px' }} />
      </Link>

      {/* ===== Navigation Links ===== */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user ? (
          <>
            <span>Welcome, {user.username}</span>

            <Link to="/user/flights" style={{ color: '#fff', textDecoration: 'none' }}>View Flights</Link>
            <Link to="/user/booking" style={{ color: '#fff', textDecoration: 'none' }}>My Bookings</Link>

            <button
              onClick={UserHandleLogout}
              style={{
                padding: '5px 10px',
                backgroundColor: '#f00',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#c00'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f00'}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/user/sign-in" style={{ color: '#fff', textDecoration: 'underline' }}>Sign In</Link>
            <Link to="/user/sign-up" style={{ color: '#fff', textDecoration: 'underline' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBarUser;
