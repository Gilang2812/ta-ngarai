"use client";
import { imageUrl } from "@/lib/baseUrl";
/* eslint-disable jsx-a11y/alt-text */

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Img = ({
  src,
  ...props
}: { src: string } & React.ComponentProps<typeof Image>) => {
  const notFound = "/images/Image_not_available.png";
  const foundedSrc = imageUrl + src;
  const [imgSrc, setImgSrc] = useState(foundedSrc);

  useEffect(() => {
    setImgSrc(foundedSrc);
    return () => {
      setImgSrc(notFound);
    };
  }, [foundedSrc]);

  return (
    <Image
      src={imgSrc}
      {...props}
      onError={() => setImgSrc("/images/Image_not_available.png")}
    />
  );
};

export default Img;
