import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo-sifraty.png';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

export default function CompanyFooter({ company }) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#222', color: '#fff', padding: '2rem 1rem', textAlign: 'center' }}>
      <hr style={{ borderColor: '#444', marginBottom: '1rem' }} />

      {/* Logo */}
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/">
          <img src={logo} alt="Sifraty Logo" style={{ height: '40px' }} />
        </Link>
      </div>

      {/* Links */}
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <li><Link to="/" style={{ color: '#fff', textDecoration: 'underline' }}>Home</Link></li>
        {company && (
          <>
            <li><Link to="/flights" style={{ color: '#fff', textDecoration: 'underline' }}>Flight List</Link></li>
            <li><Link to="/profile" style={{ color: '#fff', textDecoration: 'underline' }}>Profile</Link></li>
          </>
        )}
      </ul>

      {/* Social Icons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '1.2rem', marginBottom: '1rem' }}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><FaInstagram /></a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><SiX /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><FaLinkedin /></a>
        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><FaWhatsapp /></a>
      </div>

      <hr style={{ borderColor: '#444', marginBottom: '1rem' }} />

      <p style={{ fontSize: '0.9rem' }}>© {year} <strong>Sifraty</strong>. All rights reserved.</p>
    </footer>
  );
}
