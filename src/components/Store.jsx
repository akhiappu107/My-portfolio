
import { useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { products } from "../data/products";

export default function Store({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="store-overlay" onMouseDown={onClose}>
      <section
        className="store-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Digital product store"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="store-close" onClick={onClose} aria-label="Close store">
          <X size={24} />
        </button>

        <div className="store-modal-content">
          <span className="eyebrow">DIGITAL PRODUCTS / 01</span>
          <h1>Objects for<br />your next project<span>.</span></h1>

          <p className="store-intro">
            A growing collection of 3D assets and digital creations.
            Product previews, specifications and purchase links can be
            added as your collection develops.
          </p>

          <div className="store-grid">
            {products.map((product) => (
              <article className="store-card" key={product.id}>
                <div className={`project-visual store-visual ${product.visual}`}>
                  <span className="visual-placeholder">ADD PRODUCT PREVIEW</span>
                </div>

                <div className="store-product-meta">
                  <div>
                    <h2>{product.title}</h2>
                    <p>{product.category} · {product.formats}</p>
                  </div>
                  <span>{product.price}</span>
                </div>

                <a
                  className="text-link"
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  VIEW PRODUCT <ArrowUpRight size={15} />
                </a>
              </article>
            ))}
          </div>

          <p className="store-footnote">
            Purchases are handled through external marketplace links.
          </p>
        </div>
      </section>
    </div>
  );
}
