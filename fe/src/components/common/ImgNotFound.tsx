import Image from "next/image";
import React from "react";

const ImgNotFound = () => {
  return (
    <div>
      <Image
        src={"/images/notFound/imageNotFound.jpg"}
        alt="Not Found"
        width={50}
        height={50}
        className="w-full h-full"
      />
    </div>
  );
};

export default ImgNotFound;
