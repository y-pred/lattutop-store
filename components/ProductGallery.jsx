"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ product }) {
  const [img, setImg] = useState(product.image);

  return (
    <div className="lt-modal-media">
      <div className="lt-modal-media-frame">
        <Image src={img} alt={product.name} fill sizes="240px" unoptimized style={{ objectFit: "contain" }} />
      </div>
      {product.image2 && (
        <div className="lt-thumb-row">
          <button className={img === product.image ? "lt-active" : ""} onClick={() => setImg(product.image)}>
            <div className="lt-thumb-frame">
              <Image src={product.image} alt="" fill sizes="50px" unoptimized style={{ objectFit: "contain" }} />
            </div>
          </button>
          <button className={img === product.image2 ? "lt-active" : ""} onClick={() => setImg(product.image2)}>
            <div className="lt-thumb-frame">
              <Image src={product.image2} alt="" fill sizes="50px" unoptimized style={{ objectFit: "contain" }} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
