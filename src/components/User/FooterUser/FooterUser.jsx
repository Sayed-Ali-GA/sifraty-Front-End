import { Link } from "react-router-dom";
import logo from "../../../assets/Logo-sifraty.png";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";

function FooterUser({ user }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">

        {/* Logo */}
        <div className="text-center mb-4">
          <Link to="/user/home">
            <img src={logo} alt="Sifraty Logo" height="45" />
          </Link>
        </div>

        {/* Links */}
        <ul className="nav justify-content-center mb-4">

          {!user && (
            <li className="nav-item">
              <Link to="/user/sign-in" className="nav-link text-light">
                Login
              </Link>
            </li>
          )}

          {user && (
            <>
              <li className="nav-item">
                <Link to="/user/home" className="nav-link text-light">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/user/flights" className="nav-link text-light">
                  View Flights
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Social Icons */}
        <div className="d-flex justify-content-center gap-4 fs-5 mb-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
          >
            <FaInstagram />
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
          >
            <SiX />
          </a>

          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
          >
            <FaWhatsapp />
          </a>
        </div>

        <hr className="border-secondary" />

        {/* Copyright */}
        <div className="text-center small">
          © {year} <strong>Sifraty</strong>. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default FooterUser;
