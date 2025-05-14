"use client";
import CraftCart from "@/components/cart/CraftCart";
import PackageCart from "@/components/cart/PackageCart";
import { SinggleContentWrapper } from "@/components/common/SingleContentWrapper";

import { ViewToggleButtons } from "@/components/craft/ViewToggleButtons";

import { useState } from "react";

type ViewsProps = "package" | "craft";
const Cart = ({}) => {
  const [view, setView] = useState<ViewsProps>("package");

  return (
    <SinggleContentWrapper>
      <ViewToggleButtons
        current={view}
        onChange={setView}
        views={["package", "craft"]}
      />

      {view === "package" ? <PackageCart /> : <CraftCart />}
    </SinggleContentWrapper>
  );
};

export default Cart;
