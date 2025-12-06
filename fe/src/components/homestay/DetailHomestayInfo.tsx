"use client";

import { HomestaySchema } from "@/types/schema/HomestaySchema";
import { BodyRawSkeleton } from "../loading/BodyRawSkeleton";
import { formatAddress } from "@/lib/addressFormatter";
import { SimplifiedObject } from "@/types/schema/PackageSchema";

export const DetailHomestayInfo = ({ data }: { data: HomestaySchema }) => {
  return (
    <table className="capitalize   [&_td]:p-2">
      <tbody>
        <tr>
          <td>Name</td>
          <td>{data?.name ?? <BodyRawSkeleton />}</td>
        </tr>
        <tr>
          <td>Addrees</td>
          <td>{formatAddress(data as unknown as SimplifiedObject) ?? <BodyRawSkeleton />}</td>
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
        <tr>
          <td colSpan={2}>description</td>
        </tr>
        <tr>
          <td colSpan={2}>{data?.description ?? <BodyRawSkeleton />}</td>
        </tr>
      </tbody>
    </table>
  );
};
