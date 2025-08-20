import React from "react";

import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import ProductDetail from "@/components/craft/ProdukDetail";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id_craft: string; id_souvenir_place: string }>;
}) {
  const { id_craft, id_souvenir_place } = await params;
  return (
    <SingleContentWrapper>
      <ProductDetail
        id_craft={id_craft}
        id_souvenir_place={id_souvenir_place}
      />
    </SingleContentWrapper>
  );
}
