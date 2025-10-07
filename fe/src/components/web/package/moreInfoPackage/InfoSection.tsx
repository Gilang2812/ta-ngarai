"use client";
import { OverviewSection } from "@/components/web/package/moreInfoPackage/OverviewSection";
import { PackageInformation } from "@/components/web/package/moreInfoPackage/PackageInformation";
import { Itinerary } from "@/components/web/package/moreInfoPackage/Itinerary";
import { Review } from "@/components/web/package/moreInfoPackage/Review";

import { Gallery } from "@/components/web/package/moreInfoPackage/Gallery";
import { useGetPackage } from "@/features/web/package/useGetPackage";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import {
  PackageReservationSchema,
  PackageServiceGallery,
} from "@/types/schema/PackageSchema";

export const InfoSection = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetPackage<
    PackageServiceGallery & { reservation: PackageReservationSchema[] }
  >(id, ["package", "service", "gallery", "reservation"]);

  return (
    data && (
      <>
        <section className="lg:col-span-7  col-span-12  space-y-8">
          <OverviewSection data={data} isLoading={isLoading} />
          <PackageInformation data={data} />
          <Gallery gallery={data?.packageGalleries} isLoading={isLoading} />
          <Review reservations={data?.reservation} />
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
