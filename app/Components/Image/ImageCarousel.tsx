"use client";

import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

export default function PreviewLightbox({ breedImages }: any) {
  const [open, setOpen] = React.useState(false);

  const slides = breedImages.slice(0, 10).map((url: string) => ({
    src: url,
  }));

  return (
    <>
      <div className="grid">
        <Image
          key={1}
          src={slides[0].src}
          alt="image"
          style={{ objectFit: "cover" }}
          width={200}
          height={150}
          className="cursor-pointer rounded"
          onClick={() => setOpen(true)}
        />
      </div>
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} />
    </>
  );
}
