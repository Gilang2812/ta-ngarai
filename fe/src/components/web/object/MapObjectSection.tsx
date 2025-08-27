"use client";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { SimplifiedObject } from "@/type/schema/PackageSchema";
import React from "react";
import MapLayout from "../MapLayout";
import ObjectGeom from "./ObjectGeom";
import { getCentroid } from "@/utils/common/getCentroid";

type MarkerProps = {
  properties: SimplifiedObject;
};
const MapObjectSection = ({ properties }: MarkerProps) => {
  return (
    <SingleContentWrapper className="md:col-span-5 col-span-12">
      <h2>Google Maps</h2>
      <MapLayout containerStyle={{ height: "500px", width: "100%" }} zoom={18} center={getCentroid(properties.geom)}>
        <ObjectGeom properties={properties} />
      </MapLayout>
    </SingleContentWrapper>
  );
};

export default MapObjectSection;
