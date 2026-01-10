import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo-sifraty.png';

const NavBarCompanyies = ({ company, handleLogout }) => {
  return (
    <nav style={{ padding: '10px 20px', background: '#222', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/"><img src={logo} alt="Sifraty Logo" /></Link>
      <div>
        {company ? (
          <>
            <Link to="/flights" style={{ marginRight: '10px' }}>Flights</Link>
            <Link to="/flights/new" style={{ marginRight: '10px' }}>Add Flight</Link>
            <Link to="/profile" style={{ marginRight: '10px' }}>Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/sign-in" style={{ marginRight: '10px' }}>Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBarCompanyies;
