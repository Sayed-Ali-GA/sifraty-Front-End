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
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      {/* ===== Logo and Site Name ===== */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link to="/user/home">
          <img src={logo} alt="Sifraty Logo" style={{ height: '40px' }} />
        </Link>
        <Link to="/user/home" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Sfraty
        </Link>
      </div>

      {/* ===== Navigation Links ===== */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '5px' }}>
        {user ? (
          <>
            <span>Welcome, <strong>{user.username}</strong></span>

            <Link to="/user/flights" style={{ color: '#fff', textDecoration: 'none' }}>View Flights</Link>
            <Link to="/user/booking" style={{ color: '#fff', textDecoration: 'none' }}>My Bookings</Link>

            <button
              onClick={UserHandleLogout}
              style={{
                padding: '5px 12px',
                backgroundColor: '#f00',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: '0.2s'
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
