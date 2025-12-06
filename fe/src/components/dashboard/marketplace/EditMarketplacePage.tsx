"use client";
import React, { useMemo } from "react";
import { FormStoreSection } from "./FormSection";
import useGetSouvenirPlace from "@/features/dashboard/marketplace/useGetSouvenirPlace";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import { FormMarketplace } from "@/types/schema/MarketplaceSchema";
import { formatImageUrls } from "@/lib/imgUrlFormatter";

type Props = {
  id: string;
};

const EditMarketplacePage = ({ id }: Props) => {
  const { data, isLoading, refetch } = useGetSouvenirPlace(id);
  const images = useMemo(() => {
    return formatImageUrls(
      data?.galleries?.map((gallery) => gallery.url) || []
    );
  }, [data?.galleries]);
  if (isLoading || !data) return <ManagementSkeletonLoader />;

  const existingSouvenir: FormMarketplace = {
    country: data?.location.country,
    name: data?.name,
    village: data?.location.village,
    district: data?.location.district,
    regency: data?.location.regency,
    province: data?.location.province,
    postal_code: data?.location.postal_code,
    street: data?.street,
    open: data?.open,
    close: data?.close,
    contact_person: data?.contact_person,
    description: data?.description,
    geom: data?.geom ? JSON.stringify(data.geom) : "",
    id: data.id,
    destination_id: data.destination_id,
    images,
  };
  return <FormStoreSection existingMarketplace={existingSouvenir} callback={refetch} />;
};

export default EditMarketplacePage;
