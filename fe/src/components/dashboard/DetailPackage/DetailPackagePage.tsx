"use client";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import ManagementSkeletonLoader from "@/components/loading/ManagementSkeletonLoader";
import { Gallery } from "@/components/web/package/moreInfoPackage/Gallery";
import { Itinerary } from "@/components/web/package/moreInfoPackage/Itinerary";
import { PackageInformation } from "@/components/web/package/moreInfoPackage/PackageInformation";
import { useDetailPackage } from "@/hooks/useDetailPackage";
import React from "react";

type Props = {
  id: string;
};

const DetailPackagePage = ({ id }: Props) => {
  const { data, isLoading } = useDetailPackage(id);

  if (isLoading || !data) return <ManagementSkeletonLoader />;
  return (
    data && (
      <>
        <section className="lg:col-span-7  col-span-12  space-y-8">
          <PackageInformation data={data} />
          <Gallery gallery={data?.packageGalleries} isLoading={isLoading} />
        </section>
        <section className="col-span-12   lg:col-span-5 min-w-fit  ">
          <SingleContentWrapper>
            <header className="space-y-2">
              <h3 className="text-lg font-semibold">Google Map</h3>
            </header>
            <Itinerary data={data} />
          </SingleContentWrapper>
        </section>
      </>
    )
  );
};

export default DetailPackagePage;
