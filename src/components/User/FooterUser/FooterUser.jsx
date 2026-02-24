import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { MdFlightTakeoff } from "react-icons/md";
import logo from "../../../assets/Logo-sifraty.png";
import "../../Companyies/Footer/Footer.css";

function FooterUser({ user }) {
  const year = new Date().getFullYear();

  return (
    <footer className="cf-footer">
      <div className="cf-footer-inner">

        {/* Brand */}
        <Link to="/user/home" className="cf-footer-brand">
          <img src={logo} alt="Sifraty" />
          <span className="cf-footer-brand-name">Sifraty</span>
        </Link>

        {/* Nav Links */}
        <ul className="cf-footer-nav">
          {user ? (
            <>
              <li><Link to="/user/home">Home</Link></li>
              <li><Link to="/user/flights"><MdFlightTakeoff style={{ marginRight: 4, verticalAlign: "middle" }} />Flights</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/user/sign-in">Sign In</Link></li>
              <li><Link to="/user/sign-up">Sign Up</Link></li>
            </>
          )}
        </ul>

        {/* Socials */}
        <div className="cf-footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="cf-footer-social-link" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer"
            className="cf-footer-social-link" aria-label="X (Twitter)">
            <SiX />
          </a>
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer"
            className="cf-footer-social-link" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
        </div>

        <div className="cf-footer-divider" />

        {/* Copyright */}
        <p className="cf-footer-bottom">
          © {year} <strong>Sifraty</strong>. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default FooterUser;