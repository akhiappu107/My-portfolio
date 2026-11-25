
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function ProjectVideoModal({
  open,
  onClose,
  videoId,
  title,
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && videoId && (
        <motion.div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} video`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="video-modal"
            initial={{ scale: 0.97, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal-topline">
              <span>{title}</span>

              <button
                type="button"
                className="icon-button"
                onClick={onClose}
                aria-label="Close video"
              >
                <X size={20} />
              </button>
            </div>

            <iframe
              key={videoId}
              className="modal-video"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1`}
              title={title}
              allow="encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
