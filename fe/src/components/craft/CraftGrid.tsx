import React from "react";
import { Header } from "./Header";
import { ProductGrid } from "./ProductGrid";
import CraftSkeleton from "../loading/CraftSkeleton";
import { useProductCraft } from "@/hooks/useProductCraft";

export default function CraftGrid() {
  const { crafts, isLoading } = useProductCraft();

  if (isLoading || !crafts) return <CraftSkeleton />;
  return (
    <>
      <Header crafts={crafts} />
      <ProductGrid crafts={crafts} />
    </>
  );
}
