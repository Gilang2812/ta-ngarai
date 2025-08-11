"use client";
import CraftCart from "@/components/cart/CraftCart";
import PackageCart from "@/components/cart/PackageCart";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";

import { ViewToggleButtons } from "@/components/craft/ViewToggleButtons";
import { useSearchParams } from "next/navigation";

import { useState } from "react";

type ViewsProps = "package" | "craft";
const Cart = () => {
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") as ViewsProps) || "package";
  const [view, setView] = useState<ViewsProps>(tab);

  return (
    <SingleContentWrapper>
      <ViewToggleButtons
        current={view}
        onChange={setView}
        views={["package", "craft"]}
      />

      {view === "package" ? <PackageCart /> : <CraftCart />}
    </SingleContentWrapper>
  );
};

export default Cart;
