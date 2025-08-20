"use client";
import React, { useMemo } from "react";
import { FormStoreSection } from "./FormSection";
import useGetSouvenirPlace from "@/features/dashboard/marketplace/useGetSouvenirPlace";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import { FormMarketplace } from "@/type/schema/MarketplaceSchema";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/data/routes";

type Props = {
  id: string;
};

const EditMarketplacePage = ({ id }: Props) => {
  const router = useRouter();
  const { data, isLoading, refetch } = useGetSouvenirPlace(id);
  const images = useMemo(() => {
    return formatImageUrls(
      data?.galleries?.map((gallery) => gallery.url) || []
    );
  }, [data?.galleries]);
  if (isLoading || !data) return <ManagementSkeletonLoader />;

  const existingSouvenir: FormMarketplace = {
    name: data?.name,
    address: data?.address,
    open: data?.open,
    close: data?.close,
    contact_person: data?.contact_person,
    description: data?.description,
    geom: data?.geom ? JSON.stringify(data.geom) : "",
    id: data.id,
    images,
  };
  return (
    <FormStoreSection
      existingMarketplace={existingSouvenir}
      updateSuccess={() => {
        router.push(ROUTES.MARKETPLACE);
        refetch();
      }}
    />
  );
};

export default EditMarketplacePage;
