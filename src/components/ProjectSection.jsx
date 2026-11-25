
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectVideoModal from "./ProjectVideoModal";

function getYouTubeId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return parsed.pathname.slice(1);
    }

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
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

export default function ProjectSection({ category }) {
  const [activeProject, setActiveProject] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const selectedProject = category.projects.find(
    (project) => project.id === activeProject
  );

  function handleToggle(projectId) {
    setActiveProject((current) =>
      current === projectId ? null : projectId
    );
  }

  function handleOpenVideo(url, title) {
    const videoId = getYouTubeId(url);

    if (!videoId) {
      console.warn("Invalid YouTube URL:", url);
      return;
    }

    setActiveVideo({
      id: videoId,
      title,
    });
  }

  function handleCloseVideo() {
    setActiveVideo(null);
  }

  return (
    <section className="work-section" id={category.id}>
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="eyebrow">
          {category.number} / SELECTED DISCIPLINE
        </span>

        <div className="heading-line">
          <h2>
            {category.title}<span>.</span>
          </h2>

          <p>{category.description}</p>
        </div>
      </motion.div>

      {/* Horizontal scrolling project row */}
      <div className="project-scroll-container">
        <div className="project-horizontal-track">
          {category.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              expanded={activeProject === project.id}
              onToggle={() => handleToggle(project.id)}
              onOpenVideo={handleOpenVideo}
            />
          ))}
        </div>
      </div>

      {/* Project details dropdown/panel */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key={selectedProject.id}
            className="project-details-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="project-details-content">
              <div className="project-details-heading">
                <span className="eyebrow">
                  {selectedProject.type} / {selectedProject.year}
                </span>

                <h3>{selectedProject.title}</h3>
              </div>

              {selectedProject.description && (
                <p className="project-description">
                  {typeof selectedProject.description === "string" && selectedProject.description.toLowerCase().startsWith(selectedProject.title.toLowerCase()) ? (
                    <>
                      <strong>{selectedProject.title}</strong>
                      {selectedProject.description.slice(selectedProject.title.length)}
                    </>
                  ) : (
                    selectedProject.description
                  )}
                </p>
              )}

              {selectedProject.software?.length > 0 && (
                <div className="project-tools">
                  {selectedProject.software.map((tool) => (
                    <span className="tool-pill" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video modal */}
      <ProjectVideoModal
        open={Boolean(activeVideo)}
        onClose={handleCloseVideo}
        videoId={activeVideo?.id}
        title={activeVideo?.title}
      />
    </section>
  );
}
