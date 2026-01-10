import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo-sifraty.png';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

export default function CompanyFooter({ company }) {
  const year = new Date().getFullYear();

  return (
    <footer className="company-footer">
      <hr className="footer-hr" />

      <div className="footer-logo">
        <Link to="/">
          <img src={logo} alt="Sifraty Logo" />
        </Link>
      </div>

      <ul className="footer-links">
        <li><Link to="/">Home</Link></li>

        {company && (
          <>
            <li><Link to="/flights">Flight List</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </>
        )}
      </ul>

      <div className="footer-socials">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer"><SiX /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://wa.me" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
      </div>

      <hr className="footer-hr" />

      <p className="footer-copy">© {year} <strong>Sifraty</strong>. All rights reserved.</p>
    </footer>
  );
}
