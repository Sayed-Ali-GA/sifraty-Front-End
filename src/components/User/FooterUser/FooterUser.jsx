import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo-sifraty.png';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

function FooterUser({ user }) {
  const year = new Date().getFullYear();

  return (
    <footer className="user-footer" style={{ textAlign: 'center', padding: '2rem', background: '#222', color: '#fff' }}>
      <hr className="footer-hr" style={{ marginBottom: '1rem', borderColor: '#444' }} />

      {/* ===== Logo ===== */}
      <div className="footer-logo" style={{ marginBottom: '1rem' }}>
        <Link to="/user/home">
          <img src={logo} alt="Sifraty Logo" style={{ height: '40px' }} />
        </Link>
      </div>

      {/* ===== Links ===== */}
      <ul className="footer-links" style={{ listStyle: 'none', padding: 0, marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {!user && <li><Link to='/user/sign-in' style={{ color: '#fff', textDecoration: 'underline' }}>Login</Link></li>}
        {user && (
          <>
            <li><Link to="/user/home" style={{ color: '#fff', textDecoration: 'underline' }}>Dashboard</Link></li>
            <li><Link to="/user/flights" style={{ color: '#fff', textDecoration: 'underline' }}>View Flights</Link></li>
          </>
        )}
      </ul>

      {/* ===== Social Icons ===== */}
      <div className="footer-socials" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '1.2rem', marginBottom: '1rem' }}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><FaInstagram /></a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><SiX /></a>
        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><FaWhatsapp /></a>
      </div>

      <hr className="footer-hr" style={{ borderColor: '#444', marginBottom: '1rem' }} />


      <p className="footer-copy" style={{ fontSize: '0.9rem' }}>© {year} <strong>Sifraty</strong>. All rights reserved.</p>
    </footer>
  );
}

export default FooterUser;
