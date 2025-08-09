"use client";
import { imageUrl, notFoundImage } from "@/lib/baseUrl";
/* eslint-disable jsx-a11y/alt-text */

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Img = ({
  src,
  ...props
}: { src: string } & React.ComponentProps<typeof Image>) => {
  const foundedSrc = imageUrl + src;
  const [imgSrc, setImgSrc] = useState(foundedSrc);

  useEffect(() => {
    setImgSrc(foundedSrc);
    return () => {
      setImgSrc(notFoundImage);
    };
  }, [foundedSrc]);

  return (
    <Image src={imgSrc} {...props} onError={() => setImgSrc(notFoundImage)} />
  );
};

export default Img;
