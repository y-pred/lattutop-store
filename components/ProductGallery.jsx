"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ product }) {
  const [img, setImg] = useState(product.image);

  return (
    <div className="lt-modal-media">
      <Image src={img} alt={product.name} width={480} height={480} unoptimized />
      {product.image2 && (
        <div className="lt-thumb-row">
          <button className={img === product.image ? "lt-active" : ""} onClick={() => setImg(product.image)}>
            <Image src={product.image} alt="" width={50} height={50} unoptimized />
          </button>
          <button className={img === product.image2 ? "lt-active" : ""} onClick={() => setImg(product.image2)}>
            <Image src={product.image2} alt="" width={50} height={50} unoptimized />
          </button>
        </div>
      )}
    </div>
  );
}
