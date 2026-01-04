"use client";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { SimplifiedObject } from "@/types/schema/PackageSchema";
import React, { useRef } from "react";
import MapLayout from "../MapLayout";
import ObjectGeom from "./ObjectGeom";
import { getCentroid } from "@/utils/common/getCentroid";

type MarkerProps = {
  properties: SimplifiedObject;
};
const MapObjectSection = ({ properties }: MarkerProps) => {
  const mapRef=useRef<google.maps.Map|null>(null)
  return (
    <SingleContentWrapper className="md:col-span-5 col-span-12">
      <h2>Google Maps</h2>
      <MapLayout mapRef={mapRef} containerStyle={{ height: "500px", width: "100%" }} zoom={18} center={getCentroid(properties.geom)}>
        <ObjectGeom properties={properties} />
      </MapLayout>
    </SingleContentWrapper>
  );
};

export default MapObjectSection;
