"use client";
import { ContentWrapper } from "@/components/common/ContentWrapper"; 
import React from "react";
import MapObjectSection from "./MapObjectSection";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import GalleryObjectSection from "./GalleryObjectSection";
import DetailHomestayReservationLoader from "@/components/loading/DetailHomestayReservationloader";
import { formatPrice } from "@/lib/priceFormatter";
import { Table } from "@/components/common/Table";
import useTraditionalHouse from "@/hooks/objects/useTraditionalHouse";

type Props = {
    id: string;
};

const TraditionalHousePage = ({ id }: Props) => {
    const { data, isLoading } = useTraditionalHouse(id);
    if (!data || isLoading) return <DetailHomestayReservationLoader />;
    const InfoTable = () => (
        <Table>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{data.name}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{data.address}</td>
                </tr>
                <tr>
                    <td>Contact Person</td>
                    <td>{data.contact_person}</td>
                </tr>
                <tr>
                    <td>Open</td>
                    <td>{data.open}</td>
                </tr>
                <tr>
                    <td>Close</td>
                    <td>{data.close}</td>
                </tr>
                <tr>
                    <td>Ticket Price</td>
                    <td>{formatPrice(data.price|| 0)}</td>
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
                            Traditional House Information
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

export default TraditionalHousePage;
