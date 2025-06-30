"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  image: StaticImageData;
  alt: string;
  title: string;
  feature: string;
  id: string;
};

const Card = ({ image, alt, title, feature, id }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dogs/${id}`)}
      className="relative w-full h-full cursor-pointer rounded-lg overflow-hidden"
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority={true}
        placeholder="blur"
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-lg"
      />

      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-4 text-white rounded-lg">
        <span className="text-xs bg-red-900 px-2 py-1 rounded">{feature}</span>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
