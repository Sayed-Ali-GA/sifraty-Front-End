import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo-sifraty.png';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import './Footer.css';

export default function CompanyFooter({ company }) {
  const year = new Date().getFullYear();

  return (
    <footer className="cf-footer">
      <div className="cf-footer-inner">

        {/* ── Brand ── */}
        <Link to="/" className="cf-footer-brand">
          <img src={logo} alt="Sifraty Logo" />
          <span className="cf-footer-brand-name">Sfraty</span>
        </Link>

        {/* ── Nav Links ── */}
        <ul className="cf-footer-nav">
          <li><Link to="/">Home</Link></li>
          {company && (
            <>
              <li><Link to="/flights">Flight List</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </>
          )}
        </ul>

        <div className="cf-footer-divider" />

        {/* ── Social Icons ── */}
        <div className="cf-footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="cf-footer-social-link" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="cf-footer-social-link" aria-label="X (Twitter)">
            <SiX />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="cf-footer-social-link" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          {/* <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="cf-footer-social-link" aria-label="WhatsApp">
            <FaWhatsapp />
          </a> */}
        </div>

        {/* ── Copyright ── */}
        <p className="cf-footer-bottom">
          © {year} <strong>Sfraty</strong>. All rights reserved.
        </p>

      </div>
    </footer>
  );
}