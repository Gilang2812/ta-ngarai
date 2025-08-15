"use client";

import { DetailHomestayInfo } from "./DetailHomestayInfo";
import { RawSkeleton } from "../loading/RawSkeleton";
import { DetailHomestayHeader } from "./DetailHomestayHeader";
import dynamic from "next/dynamic";
import DetailHomestayReservationLoader from "../loading/DetailHomestayReservationloader";
import MapLayout from "../web/MapLayout";
import { SingleContentWrapper } from "../common/SingleContentWrapper";
import ReservationHomestayMap from "./ReservationHomestayMap";
import useManageDetailHomestay from "@/hooks/useManageDetailHomestay";
import Button from "../common/Button";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import UnitHomestayList from "./detail/UnitHomestayList";
import { Modal } from "../modal/Modal";
import ImgCraft from "../common/ImgCraft";
import { ROUTES } from "@/data/routes";

const GalleryHomestay = dynamic(() => import("./GalleryHomestay"), {
  ssr: false,
});

export const DetailHomestaySection = ({ id }: { id: string }) => {
  const {
    data,
    isLoading,
    geom,
    centroid,
    isOpen,
    toggleModal,
    handleSelectedUnit,
    selectedUnit,
  } = useManageDetailHomestay(id);
  if (isLoading) return <DetailHomestayReservationLoader />;
  return (
    <>
      <section className="col-span-7 space-y-6">
        <SingleContentWrapper>
          <DetailHomestayHeader id={id} />
          <section className="px-2">
            {data ? <DetailHomestayInfo data={data} /> : <RawSkeleton />}
          </section>

          <section className="space-y-4 p-4">
            <h4>Facility</h4>
            <ul className="list-disc px-4" role="list">
              {data?.details?.map((h, index) => (
                <li key={index}>{h?.facility?.name}</li>
              ))}
            </ul>
          </section>
        </SingleContentWrapper>
        <SingleContentWrapper className="min-h-fit">
          <header className="grid lg:grid-cols-4 grid-cols-1 items-center gap-4 text-2xl p-6 border-b">
            <div className="col-span-1"></div>
            <div className="col-span-2 capitalize text-center">
              <h3>{data?.name} unit</h3>
            </div>
            <div className="col-span-1 flex justify-end">
              <Button className="text-nowrap text-base p-2 w-fit" asChild>
                <Link href={ROUTES.MANAGE_UNIT_HOMESTAY(id)}>
                  <FaPlus /> Manage
                </Link>
              </Button>
            </div>
          </header>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data?.units?.map((unit, index) => (
              <UnitHomestayList
                handleSelectedUnit={() => handleSelectedUnit(unit)}
                key={index}
                unit={unit}
              />
            ))}
          </section>
        </SingleContentWrapper>
      </section>
      <section className="col-span-5 space-y-6">
        <SingleContentWrapper>
          <h4>Google Maps</h4>
          <MapLayout
            containerStyle={{ width: "100%", height: "500px" }}
            zoom={18}
            center={centroid}
          >
            <ReservationHomestayMap geom={geom} />
          </MapLayout>
        </SingleContentWrapper>

        <SingleContentWrapper className="min-h-fit">
          <h4>Our Gallery</h4>
          <GalleryHomestay data={data?.galleries} />
        </SingleContentWrapper>
      </section>
      <Modal title="Gallery Unit" isOpen={isOpen} onClose={toggleModal}>
        <section className="p-4 flex justify-left items-center gap-4">
          {selectedUnit?.unitGalleries.map((g, index) => (
            <ImgCraft
              alt={`Gallery image ${index + 1}`}
              width={50}
              className="size-24 object-cover"
              height={50}
              key={index}
              src={g.url}
            />
          ))}
        </section>
      </Modal>
    </>
  );
};
