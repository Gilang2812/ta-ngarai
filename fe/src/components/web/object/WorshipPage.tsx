"use client";
import { ContentWrapper } from "@/components/common/ContentWrapper";
import useWorship from "@/hooks/objects/useWorship.ts";

import React from "react";
import MapObjectSection from "./MapObjectSection";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import GalleryObjectSection from "./GalleryObjectSection";
import DetailHomestayReservationLoader from "@/components/loading/DetailHomestayReservationloader";
import { Table } from "@/components/common/Table";
import { formatAddress } from "@/lib/addressFormatter";
import { SimplifiedObject } from "@/types/schema/PackageSchema";

type Props = {
  id: string;
};

const WorshipPage = ({ id }: Props) => {
  const { data, isLoading } = useWorship(id);
  if (!data || isLoading) return <DetailHomestayReservationLoader />;
  return (
    <ContentWrapper>
      <section className="col-span-7 text-lg space-y-6">
        <SingleContentWrapper>
          <header className="p-4 ">
            <h1 className="text-xl text-center font-bold">
              Worship Place Information
            </h1>
          </header>
          <Table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{data?.name}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{formatAddress(data as unknown as SimplifiedObject)}</td>
              </tr>
              <tr>
                <td>Capacity</td>
                <td>{data?.capacity}</td>
              </tr>
              <tr>
                <td colSpan={2}>Description</td>
              </tr>
              <tr>
                <td colSpan={2}>{data?.description}</td>
              </tr>
            </tbody>
          </Table>
        </SingleContentWrapper>
        <GalleryObjectSection galleries={data?.galleries} />
      </section>
      <MapObjectSection properties={data} />
    </ContentWrapper>
  );
};

export default WorshipPage;
