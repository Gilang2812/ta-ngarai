import React, { useEffect, useMemo } from "react";
import { InfoWindow, useGoogleMap } from "@react-google-maps/api";
import { SouvenirPlaceSchema } from "@/type/schema/PackageSchema";
import { getCentroid } from "@/utils/common/getCentroid";
import { MapMarker } from "../map";
import { getIconUrl } from "@/utils/map/getIconUrl";
import { useInfoWindow } from "@/hooks/useInfoWindow";
import { FaAddressBook, FaInfo } from "react-icons/fa6";
import { DirectionToKotoGadangButton } from "../map/DirectionToKotoGadangButton";
import Button from "../common/Button";
import Link from "next/link";
import { FeatureCollection } from "geojson";
import ImgCraft from "../common/ImgCraft";
import { formatPrice } from "@/lib/priceFormatter";
import { DetailCraftManagementResponse } from "@/type/schema/DetailCraftSchema";
import { ROUTES } from "@/data/routes";
import useUserRole from "@/hooks/useUserRole";

type Props = {
  data: (SouvenirPlaceSchema & { crafts: DetailCraftManagementResponse[] })[];
  handleSelectStore: (
    store: SouvenirPlaceSchema & { crafts: DetailCraftManagementResponse[] }
  ) => void;
};

const SouvenirGeoJSON = ({ data, handleSelectStore }: Props) => {
  const { open, toggleInfoWindow } = useInfoWindow();

  const souvenirFeatureCollection: FeatureCollection = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: data.map((sp) => ({
        type: "Feature",
        properties: {
          id: sp.id,
        },
        geometry: sp.geom,
      })),
    };
  }, [data]);

  const map = useGoogleMap();
  useEffect(() => {
    if (!map && !souvenirFeatureCollection) return;

    const dataSouvenir = new google.maps.Data();
    dataSouvenir.addGeoJson(souvenirFeatureCollection);
    dataSouvenir.setStyle({
      fillColor: "blue",
      strokeColor: "blue",
      fillOpacity: 0.5,
      strokeWeight: 1,
    });
    dataSouvenir.setMap(map);
    return () => {
      dataSouvenir.setMap(null);
    };
  }, [map, souvenirFeatureCollection]);
  const { isAdmin } = useUserRole();
  return data.map(
    (sp, index) =>
      sp.geom && (
        <MapMarker
          icon={{
            url: getIconUrl(sp.id),
          }}
          key={sp.id}
          position={getCentroid(sp.geom)}
          onClick={() => {
            toggleInfoWindow(index);
            handleSelectStore(sp);
          }}
        >
          {open === index && (
            <InfoWindow
              options={{ maxWidth: 300 }}
              onCloseClick={() => toggleInfoWindow(index)}
            >
              <article className="space-y-2 p-2   rounded text-center [&_h3]:font-bold">
                <h3>{sp.name}</h3>
                <section className="text-sm flex gap-2 items-center justify-center">
                  <FaAddressBook />
                  <p>{sp.contact_person}</p>
                </section>
                <section className="text-sm max-w-[300px] overflow-y-hidden grid grid-flow-col gap-2 ">
                  {sp.crafts.map((cr, index) => (
                    <article
                      key={index}
                      className="min-w-fit flex flex-col items-center border rounded shadow p-2 capitalize gap-2"
                    >
                      <ImgCraft
                        width={50}
                        height={50}
                        className=" w-10 aspect-square rounded"
                        alt="craft-items"
                        src={cr?.craftGalleries?.[0]?.url}
                      />

                      <h4 className="font-bold text-wrap ">
                        {`${cr?.variant?.craft?.name} ${cr?.variant?.name}`}
                      </h4>
                      <p className="text-sm text-orange-500">
                        {formatPrice(cr.price)}
                      </p>
                      <Button
                        disabled={isAdmin}
                        type="button"
                        asChild={!isAdmin}
                      >
                        {!isAdmin ? (
                          <Link
                            href={ROUTES.DETAIL_CRAFT({
                              id_craft: cr.variant.id_craft,
                              id_souvenir_place: cr.id_souvenir_place,
                              id_craft_variant: cr.craft_variant_id,
                            })}
                          >
                            Order Nows
                          </Link>
                        ) : (
                          "Order Now"
                        )}
                      </Button>
                    </article>
                  ))}
                </section>
                <section className="flex items-center justify-center gap-2">
                  <DirectionToKotoGadangButton
                    destination={getCentroid(sp.geom)}
                  />
                  <Button className="p-2" variant={"primary"} asChild>
                    <Link href={"/web/explore"}>
                      <FaInfo />
                    </Link>
                  </Button>
                </section>
              </article>
            </InfoWindow>
          )}
        </MapMarker>
      )
  );
};

export default SouvenirGeoJSON;
