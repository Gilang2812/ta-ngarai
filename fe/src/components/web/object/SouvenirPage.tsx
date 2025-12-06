"use client";
import { ContentWrapper } from "@/components/common/ContentWrapper";
import useSouvenir from "@/hooks/objects/useSouvenir";
import React from "react";
import MapObjectSection from "./MapObjectSection";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import GalleryObjectSection from "./GalleryObjectSection";
import DetailHomestayReservationLoader from "@/components/loading/DetailHomestayReservationloader";
import { Table } from "@/components/common/Table";
import { SimplifiedObject } from "@/types/schema/PackageSchema";
import { formatAddress } from "@/lib/addressFormatter";

type Props = {
  id: string;
};

const SouvenirPage = ({ id }: Props) => {
  const { data, isLoading } = useSouvenir(id);
  if (!data || isLoading) return <DetailHomestayReservationLoader />;
  return (
    <ContentWrapper>
      <section className="col-span-7 text-lg space-y-6">
        <SingleContentWrapper>
          <header className="p-4 ">
            <h1 className="text-xl text-center font-bold">
              Souvenir Place Information
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
            </tbody>
          </Table>
        </SingleContentWrapper>
        <GalleryObjectSection galleries={data?.galleries} />
      </section>
      <MapObjectSection properties={data} />
    </ContentWrapper>
  );
};

export default SouvenirPage;
