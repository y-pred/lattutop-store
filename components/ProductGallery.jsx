"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ product }) {
  // `images` is the full ordered gallery (from Supabase's images[] column).
  // Fall back to the older image/image2 fields for any product that hasn't
  // been backfilled yet, so nothing breaks mid-migration.
  const gallery = product.images?.length ? product.images : [product.image, product.image2].filter(Boolean);

  const [active, setActive] = useState(gallery[0]);
  const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src || "");

  return (
    <div className="lt-modal-media">
      <div className="lt-modal-media-frame">
        {isVideo(active) ? (
          <video src={active} controls autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <Image src={active} alt={product.name} fill sizes="240px" unoptimized style={{ objectFit: "contain" }} />
        )}
      </div>
      {gallery.length > 1 && (
        <div className="lt-thumb-row">
          {gallery.map((src, i) => (
            <button key={src + i} className={active === src ? "lt-active" : ""} onClick={() => setActive(src)}>
              <div className="lt-thumb-frame">
                {isVideo(src) ? (
                  <video src={src} muted style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                ) : (
                  <Image src={src} alt="" fill sizes="50px" unoptimized style={{ objectFit: "contain" }} />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
