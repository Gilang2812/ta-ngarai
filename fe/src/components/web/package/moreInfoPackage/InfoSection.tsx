"use client";
import { OverviewSection } from "@/components/web/package/moreInfoPackage/OverviewSection";
import { PackageInformation } from "@/components/web/package/moreInfoPackage/PackageInformation";
import { Itinerary } from "@/components/web/package/moreInfoPackage/Itinerary"; 
import { Review } from "@/components/web/package/moreInfoPackage/Review";
import { useFetchGalleries } from "@/features/web/useFetchGalleries";
import { GalleryPackageSchema } from "@/type/schema/gallerySchema";
import { useFetchDetailService } from "@/features/web/package/useFetchDetailService"; 
import { Gallery } from "@/components/web/package/moreInfoPackage/Gallery";
import { DetailServiceSchema } from "@/type/schema/serviceSchema";
import { FaCirclePlay } from "react-icons/fa6";
import { useFetchDetailPackage } from "@/features/web/explore/useFetchDetailPackage";
 
export const InfoSection =  () => {
 
  const  id='P0075'
  const { data:gallery, isLoading } =  useFetchGalleries<GalleryPackageSchema>('package',id );

  const packageItem = [
    ...new Map(gallery?.map((item) => [item.package_id, item])).values(),
  ][0];

  const { data: services } = useFetchDetailService<DetailServiceSchema>(id); 

  const {data:detailPackages} = useFetchDetailPackage(id) 
  return (<>
    <section className="col-span-7 space-y-8">
      <OverviewSection isLoading={isLoading} packageItem={packageItem} />
      <PackageInformation packageItem={packageItem} service={services}/>
      <Gallery gallery={gallery} isLoading={isLoading}/>
      <Review />
      <footer className="mt-16">
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 bg-white border rounded border-primary text-primary hover:bg-primary hover:text-white"
      >
        <FaCirclePlay /> Play Video
      </button>
    </footer>
    </section>
      <section className="col-span-5 p-5 space-y-8 bg-white rounded-lg">
      <header className="space-y-2">
        <h3 className="text-lg font-semibold">Location Map</h3>
      </header>

      {/* <GoogleMap 
        center={{ lat: -3.745, lng: -38.523 }}
        zoom={10}mapId='cosadsad'
        onMapLoad={handleMapLoad}
        onMapError={handleMapError}
      /> */}

      <Itinerary day={detailPackages} />
      
    </section>
  </>

  );
};
