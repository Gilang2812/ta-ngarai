'use client'
 
import { ButtonPrimary } from "@/components/global/ButtonPrimary"; 
import { useState } from "react";
import { FaCircleXmark, FaCompass } from "react-icons/fa6";
import { Around } from "@/components/web/explore/Around";
import { Package } from "@/components/web/explore/Package";
 
export const PackageSection = () => {
  const [search, setSearch] = useState(false);

  const handleSearchToggle = () => {
    setSearch(!search);
  };

  return (
    <article className="col-span-4 p-5 bg-white rounded-lg">
        {search?<Around />:<Package />} 
      <footer className="pt-6">
        <ButtonPrimary onClick={handleSearchToggle} expanded={search}>
          {search ? (
            <>
              <FaCircleXmark /> Close
            </>
          ) : (
            <>
              <FaCompass /> Explore Around
            </>
          )}
        </ButtonPrimary>
      </footer>
    </article>
  );
};
