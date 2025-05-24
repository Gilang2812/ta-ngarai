"use client";
import { useState } from "react";
import { Header } from "@/components/craft/Header";
import { ProductGrid } from "@/components/craft/ProductGrid";
import { ViewToggleButtons } from "@/components/craft/ViewToggleButtons";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import MapWeb from "@/components/web/MapWeb";
import { useProductCraft } from "@/hooks/useProductCraft";
import CraftSkeleton from "@/components/loading/CraftSkeleton";

export type ViewMode = "grid" | "map";

const CraftPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const { crafts, isLoading } = useProductCraft();

  if (isLoading || !crafts) return <CraftSkeleton />;
  return (
    <SingleContentWrapper>
      <ViewToggleButtons
        views={["grid", "map"]}
        current={viewMode}
        onChange={setViewMode}
      />

      <div className="container min-w-[400px]  mx-auto px-4 py-8">
        <div>
          {viewMode === "grid" ? (
            <>
              <Header crafts={crafts} />
              <ProductGrid crafts={crafts} />
            </>
          ) : (
            <MapWeb />
          )}
        </div>
      </div>
    </SingleContentWrapper>
  );
};

export default CraftPage;
