
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowDown, ArrowUpRight } from "lucide-react";
import Navbar from "./components/Navbar";
import ShowreelModal from "./components/ShowreelModal";
import FloatingProfile from "./components/FloatingProfile";
import ProjectSection from "./components/ProjectSection";
import Store from "./components/Store";
import { categories } from "./data/projects";

export default function App() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);

  const closeShowreel = useCallback(() => setShowreelOpen(false), []);
  const closeStore = useCallback(() => setStoreOpen(false), []);

  return (
    <div className="app">
      <Navbar
        page="home"
        onNavigate={(id) => {
          if (id === "store") {
            setStoreOpen(true);
          } else {
            setStoreOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      />

      <main>
        <section className="hero page-shell">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <span className="eyebrow">
              3D ARTIST / ANIMATOR / CREATIVE DEVELOPER
            </span>
            <h1>Akhinandh<span>.</span></h1>
            <p>Creating visuals. Building experiences.</p>
          </motion.div>

          
<motion.div
  className="showreel-poster"
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.15 }}
>
  <iframe
    className="hero-showreel-video"
    src="https://www.youtube.com/embed/TU5NfSV2GYk?autoplay=1&mute=1&controls=0&loop=1&playlist=TU5NfSV2GYk&rel=0&playsinline=1"
    title="Akhinandh Babu Showreel"
    allow="autoplay; encrypted-media; picture-in-picture"
    allowFullScreen
  />

  <button
    className="poster-play-overlay"
    onClick={() => setShowreelOpen(true)}
    aria-label="Open showreel with controls"
  >
    <span className="play-button">
      <Play size={21} fill="currentColor" />
    </span>
    <span className="poster-label">WATCH SHOWREEL</span>
  </button>

  <span className="poster-index">
    SELECTED MOTION WORK / 2026
  </span>
</motion.div>


          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={15} />
            <span>01 — 03</span>
          </div>
        </section>

        <section className="selected-work page-shell">
          <div className="intro-row">
            <div>
              <span className="eyebrow">A SELECTION OF MY WORK</span>
              <h2>Selected Works<span>.</span></h2>
            </div>
            <p>
              Experiments, commissioned work and personal explorations
              across different creative disciplines.
            </p>
          </div>

          {categories.map((category) => (
            <ProjectSection key={category.id} category={category} />
          ))}
        </section>

        <section className="store-promo page-shell">
          <div className="store-promo-copy">
            <span className="eyebrow">THE ASSET COLLECTION</span>
            <h2>
              Made to be<br />
              used and explored<span>.</span>
            </h2>
            <p>
              3D models, environments and digital assets created for
              other artists and makers.
            </p>
            <button
              className="text-link"
              onClick={() => setStoreOpen(true)}
            >
              EXPLORE THE STORE <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="store-promo-art">
            <div className="promo-orb" />
            <span>3D ASSETS / DIGITAL OBJECTS</span>
          </div>
        </section>

        <footer className="footer page-shell">
          <span className="eyebrow">HAVE A PROJECT IN MIND?</span>
          <h2>
            Let's make<br />
            something memorable<span>.</span>
          </h2>
          <button
            className="text-link"
            onClick={() => window.dispatchEvent(new Event("open-profile-card"))}
          >
            GET IN TOUCH <ArrowUpRight size={15} />
          </button>
          <div className="footer-bottom">
            <span>© 2026 AKHINANDH</span>
            <span>DESIGNED & BUILT WITH INTENTION</span>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </footer>
      </main>

      {storeOpen && <Store onClose={closeStore} />}

      <FloatingProfile />
      <ShowreelModal open={showreelOpen} onClose={closeShowreel} />
    </div>
  );
}
