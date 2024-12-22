"use client";
import { OverviewSection } from "@/components/web/package/moreInfoPackage/OverviewSection";
import { PackageInformation } from "@/components/web/package/moreInfoPackage/PackageInformation";
import { Itinerary } from "@/components/web/package/moreInfoPackage/Itinerary"; 
import { Review } from "@/components/web/package/moreInfoPackage/Review";
 
import { Gallery } from "@/components/web/package/moreInfoPackage/Gallery"; 
import { FaCirclePlay } from "react-icons/fa6"; 
import { useGetPackage } from "@/features/web/package/useGetPackage";
 
export const InfoSection =  ({id}:{id:string}) => {
 

  const { data,isLoading } = useGetPackage(id);
  
 console.log(data);
   
  return (<>
    <section className="col-span-7 space-y-8">
     {data&& <OverviewSection  data={data} isLoading={isLoading} />}
      {  data&& <PackageInformation data={data}  />}
      <Gallery gallery={data?.packageGalleries} isLoading={isLoading}/>
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

      <Itinerary data={data} />
      
    </section>
  </>

  );
};
