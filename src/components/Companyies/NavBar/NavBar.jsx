import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Sifraty</h2>

      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/flights/new">Flights Form</Link>
        <Link to="/flights">FlightsList</Link>

        {user ? (
          <>
            <span>Hello, {user.employee_username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    background: '#222',
    color: '#fff',
  },
  logo: {
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
}

export default NavBar
