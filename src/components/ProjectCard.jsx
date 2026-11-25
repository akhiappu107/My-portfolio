
import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";

function getYouTubeId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") return parsed.pathname.slice(1);

    if (
      ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)
    ) {
      if (parsed.pathname === "/watch") {
        return parsed.searchParams.get("v");
      }

      if (
        parsed.pathname.startsWith("/embed/") ||
        parsed.pathname.startsWith("/shorts/") ||
        parsed.pathname.startsWith("/live/")
      ) {
        return parsed.pathname.split("/")[2];
      }
    }
  } catch {
    return null;
  }

  return null;
}

function Visual({ visual, label }) {
  return (
    <div className={`project-visual ${visual || ""}`}>
      <div className="visual-orbit" />
      <span className="visual-label">{label}</span>
      <span className="visual-placeholder">PROJECT PREVIEW</span>
    </div>
  );
}

export default function ProjectCard({
  project,
  index,
  expanded,
  onToggle,
  onOpenVideo,
}) {
  const youtubeId = getYouTubeId(project.video);

  return (
    <motion.article
      className={`project-card ${expanded ? "project-card-active" : ""}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.55,
        delay: (index % 2) * 0.08,
      }}
    >
      <div className="project-card-preview">
        {youtubeId ? (
          <img
            className="project-card-thumbnail"
            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={`${project.title} thumbnail`}
          />
        ) : (
          <Visual visual={project.visual} label={project.type} />
        )}

        {/* Watch video */}
        <button
          type="button"
          className="project-card-select"
          onClick={() => onOpenVideo(project.video, project.title)}
          aria-label={`Watch ${project.title}`}
        >
          <span className="project-card-select-label">
            WATCH PROJECT
          </span>

          <Play size={16} />
        </button>
      </div>

      {/* Project information and details toggle */}
      <div className="project-meta">
        <div>
          <strong>{project.title}</strong>
          <small>
            {project.type} · {project.year}
          </small>
        </div>

        <button
          type="button"
          className="project-details-toggle"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={expanded ? "Hide project details" : "View project details"}
        >
          <span>{expanded ? "CLOSE DETAILS" : "VIEW DETAILS"}</span>

          <ChevronDown
            size={16}
            className={`project-card-chevron ${expanded ? "rotated" : ""}`}
          />
        </button>
      </div>
    </motion.article>
  );
}
