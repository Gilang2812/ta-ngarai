import { ImgModal } from "@/components/common/ImgModal";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import React from "react";

type Props = {
  galleries: { url: string; id: string }[];
};

const GalleryObjectSection = ({ galleries }: Props) => {
  return (
    <SingleContentWrapper>
      <header className="mb-8 text-lg capitalize">
        <h2>Our Gallery</h2>
      </header>
      <div>
        {galleries.map((gallery) => (
          <ImgModal
            alt="gallery object"
            id={gallery.id}
            key={gallery.id}
            src={gallery.url}
            className="w-24 rounded"
          />
        ))}
      </div>
    </SingleContentWrapper>
  );
};

export default GalleryObjectSection;
