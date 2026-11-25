
import { motion } from "framer-motion";

export default function Navbar({ page, onNavigate }) {
  const links = [
    { id: "home", label: "WORK" },
    { id: "store", label: "STORE" }
  ];

  return (
    <motion.header
      className="navbar"
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <button
        className="wordmark"
        onClick={() => onNavigate("home")}
        aria-label="Go to homepage"
      >
        AKHINANDH<span>.</span>
      </button>

      <nav aria-label="Main navigation">
        {links.map((link) => (
          <button
            key={link.id}
            className={`nav-link ${page === link.id ? "active" : ""}`}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}

        <button
          className="nav-link"
          onClick={() => window.dispatchEvent(new Event("open-profile-card"))}
        >
          CONTACT ↗
        </button>
      </nav>
    </motion.header>
  );
}
