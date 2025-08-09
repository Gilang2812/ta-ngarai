"use client";

import { useState } from "react";
import { Around } from "@/components/web/explore/Around";
import { Package } from "@/components/web/myPackage/Package";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";

export const PackageSection = () => {
  const [search, setSearch] = useState(false);

  const handleSearchToggle = () => {
    setSearch(!search);
  };

  return (
    <SingleContentWrapper>
      {search ? (
        <Around handleCloseAround={handleSearchToggle} isAroundOpen={search} />
      ) : (
        <Package />
      )}
      <footer className="pt-6"></footer>
    </SingleContentWrapper>
  );
};
