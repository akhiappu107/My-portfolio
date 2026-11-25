import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X, Instagram, Linkedin, Mail } from "lucide-react";

export default function FloatingProfile() {
const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!expanded) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setExpanded(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [expanded]);
  useEffect(() => {
  const handleOpenProfile = () => setExpanded(true);

  window.addEventListener("open-profile-card", handleOpenProfile);

  return () => {
    window.removeEventListener("open-profile-card", handleOpenProfile);
  };
}, []);

  return (
    <>
      <motion.aside className="floating-profile">
        <button
          className="profile-trigger"
          onClick={() => setExpanded(true)}
          aria-expanded={expanded}
        >
          <span className="profile-avatar">A.</span>
          <span className="profile-identity">
            <strong>Akhinandh</strong>
            <small>3D Artist & Animator</small>
          </span>
          <span className="profile-toggle"><Plus size={17} /></span>
        </button>
      </motion.aside>

      {createPortal(
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="about-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onMouseDown={() => setExpanded(false)}
            >
              <motion.section
                className="about-modal"
                role="dialog"
                aria-modal="true"
                aria-label="About me"
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.25 }}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <button
                  className="about-close"
                  onClick={() => setExpanded(false)}
                  aria-label="Close About Me"
                >
                  <X size={22} />
                </button>

                <span className="eyebrow">GET TO KNOW ME</span>

                <div className="about-heading">
                  <span className="profile-avatar about-avatar">A.</span>
                  <div>
                    <h2>Akhinandh<span>.</span></h2>
                    <p>3D Artist & Animator</p>
                  </div>
                </div>

                <p className="about-description">
                  I create 3D animations, cinematic visuals, and digital experiences. 
                  My work spans 3D production in Blender, video editing, and creative development, 
                  with a focus on visual composition, animation, and bringing concepts to life through motion. 
                </p>

                <div className="about-skills">
                  <span className="eyebrow">MY SKILLS</span>
                  <div className="skill-tags">
                    <span>Blender</span>
                    <span>3D Animation</span>
                    <span>| Video Editing</span>
                    <span>| Development</span>
                  </div>
                </div>

                <div className="about-socials">
                  <span className="eyebrow">LET'S CONNECT</span>
                  <div className="profile-socials">
                    <a href="https://www.instagram.com/stories_by_akhinandh/" target="_blank" rel="noreferrer" aria-label="Instagram">
                      <Instagram size={19} />
                    </a>
                    <a href="https://www.linkedin.com/in/akhinandh-babu-9a3294303" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <Linkedin size={19} />
                    </a>
                    <a href="mailto:writetoakhinandh@gmail.com" aria-label="Email">
                      <Mail size={19} />
                    </a>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
