
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function ShowreelModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Showreel video"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) =>
            event.target === event.currentTarget && onClose()
          }
        >
          <motion.div
            className="video-modal"
            initial={{ scale: 0.97, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 8 }}
          >
            <div className="modal-topline">
              <span>SHOWREEL / 2026</span>
              <button
                className="icon-button"
                onClick={onClose}
                aria-label="Close showreel"
              >
                <X size={20} />
              </button>
            </div>

            <iframe
  className="modal-video"
  src="https://www.youtube.com/embed/TU5NfSV2GYk?autoplay=1&rel=0&playsinline=1"
  title="Akhinandh Babu - Showreel 2026"
  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
  allowFullScreen
  referrerPolicy="strict-origin-when-cross-origin"
/>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
