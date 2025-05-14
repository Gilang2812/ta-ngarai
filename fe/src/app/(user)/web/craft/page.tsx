"use client";
import { useState } from "react"; 
import { crafts   } from "@/data/craft"; 
import { Header } from "@/components/craft/Header";
import { ProductGrid } from "@/components/craft/ProductGrid";
import { ViewToggleButtons } from "@/components/craft/ViewToggleButtons"; 
import { SinggleContentWrapper } from "@/components/common/SingleContentWrapper";
import MapWeb from "@/components/web/MapWeb";

export type ViewMode = "grid" | "map";

const CraftPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <SinggleContentWrapper>
      <ViewToggleButtons views={["grid", "map"]} current={viewMode} onChange={setViewMode} />

      <div className="container min-w-[400px]  mx-auto px-4 py-8">
        < div >
          {viewMode === "grid" ? (
            <>
              <Header />
              <ProductGrid products={crafts} />
            </>
          ) : (
            <MapWeb />
          )}
        </ div>
      </div>
    </SinggleContentWrapper>
  );
};

export default CraftPage;
