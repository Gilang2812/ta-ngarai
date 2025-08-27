"use client";
import { ContentWrapper } from "@/components/common/ContentWrapper";
import useHomestay from "@/hooks/objects/useHomestay";
import React from "react";
import MapObjectSection from "./MapObjectSection";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import GalleryObjectSection from "./GalleryObjectSection";
import DetailHomestayReservationLoader from "@/components/loading/DetailHomestayReservationloader";
import { Table } from "@/components/common/Table";

type Props = {
  id: string;
};

const HomestayPage = ({ id }: Props) => {
  const { data, isLoading } = useHomestay(id);
  if (!data || isLoading) return <DetailHomestayReservationLoader />;
  return (
    <ContentWrapper>
      <section className="col-span-7 space-y-6">
        <SingleContentWrapper>
          <header className="p-4 ">
            <h1 className="text-lg text-center font-bold">Homestay</h1>
          </header>
          <Table>
            <tr>
              <td>Name</td>
              <td>{data?.name}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{data?.address}</td>
            </tr>
            <tr>
              <td>Contact Person</td>
              <td>{data?.contact_person}</td>
            </tr>
            <tr>
              <td>Open</td>
              <td>{data?.open}</td>
            </tr>
            <tr>
              <td>Close</td>
              <td>{data?.close}</td>
            </tr>
            <tr>
              <td colSpan={2}>Description</td>
            </tr>
            <tr>
              <td colSpan={2}>{data?.description}</td>
            </tr>
          </Table>
        </SingleContentWrapper>
        <GalleryObjectSection galleries={data?.galleries} />
      </section>
      <MapObjectSection properties={data} />
    </ContentWrapper>
  );
};

export default HomestayPage;
