"use client";

import { HomestaySchema } from "@/type/schema/HomestaySchema";
import { BodyRawSkeleton } from "../loading/BodyRawSkeleton";

export const DetailHomestayInfo = ({ data }: { data: HomestaySchema }) => {
  return (
    <table className="capitalize   [&_td]:py-2">
      <tbody>
        <tr>
          <td>Name</td>
          <td>{data?.name ?? <BodyRawSkeleton />}</td>
        </tr>
        <tr>
          <td>Addree</td>
          <td>{data?.address ?? <BodyRawSkeleton />}</td>
        </tr>
        <tr>
          <td>Contact person</td>
          <td>{data?.contact_person ?? <BodyRawSkeleton />}</td>
        </tr>
        <tr>
          <td>open</td>
          <td>{data?.open ?? <BodyRawSkeleton />}</td>
        </tr>
        <tr>
          <td>close</td>
          <td>{data?.close ?? <BodyRawSkeleton />}</td>
        </tr>
      </tbody>
    </table>
  );
};
