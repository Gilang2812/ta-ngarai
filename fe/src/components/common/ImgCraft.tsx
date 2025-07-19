"use client";
import { baseUrl } from "@/lib/baseUrl";
/* eslint-disable jsx-a11y/alt-text */

import Image from "next/image";
import React, { useEffect, useState } from "react";

const ImgCraft = ({
  width = 64,
  height = 64,
  src="/images/Image_not_available.png",
  ...props
}: { src: string } & React.ComponentProps<typeof Image>) => {
  const notFound = "/images/Image_not_available.png";
  const foundedSrc = `${baseUrl}/${src}`;
  const [imgSrc, setImgSrc] = useState(foundedSrc);
  useEffect(() => {
    setImgSrc(foundedSrc);
    return () => {
      setImgSrc(notFound);
    };
  }, [foundedSrc]);

  return <Image src={imgSrc} {...(!props.fill ? { width, height } : {})} {...props} onError={() => setImgSrc(notFound)} />;
};

export default ImgCraft;
