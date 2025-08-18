import React from "react";

import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import ProductDetail from "@/components/craft/ProdukDetail";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) {
  const { id } = await params; 
  return (
    <SingleContentWrapper>
      <ProductDetail id={id} />
    </SingleContentWrapper>
  );
}
