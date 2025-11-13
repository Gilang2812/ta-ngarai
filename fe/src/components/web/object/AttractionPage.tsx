"use client";
import { ContentWrapper } from "@/components/common/ContentWrapper";
import useAttraction from "@/hooks/objects/useAttraction";
import React from "react";
import MapObjectSection from "./MapObjectSection";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import GalleryObjectSection from "./GalleryObjectSection";
import DetailHomestayReservationLoader from "@/components/loading/DetailHomestayReservationloader";
import { formatPrice } from "@/lib/priceFormatter";
import { Table } from "@/components/common/Table";

type Props = {
  id: string;
};

const AttractionPage = ({ id }: Props) => {
  const { data, isLoading } = useAttraction(id);
  if (!data || isLoading) return <DetailHomestayReservationLoader />;
  const InfoTable = () => (
    <Table>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{data.name}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>{data.type}</td>
        </tr>
        <tr>
          <td>Price</td>
          <td>{formatPrice(data.price || 0)}</td>
        </tr>
        <tr>
          <td colSpan={2}>Description</td>
        </tr>
        <tr>
          <td colSpan={2}>{data.description}</td>
        </tr>
      </tbody>
    </Table>
  );
  return (
    <ContentWrapper>
      <section className="col-span-12 md:col-span-7 text-lg space-y-6">
        <SingleContentWrapper>
          <header className="p-4 ">
            <h1 className="text-xl text-center font-bold">
              Attraction Information
            </h1>
          </header>
          <InfoTable />
        </SingleContentWrapper>
        <GalleryObjectSection galleries={data?.galleries} />
      </section>
      <MapObjectSection properties={data} />
    </ContentWrapper>
  );
};

export default AttractionPage;
