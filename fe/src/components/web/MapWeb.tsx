"use client";

import MapLayout from "./MapLayout";
import { DirectionsRenderer, Marker } from "@react-google-maps/api";
import {
  FaLocationArrow,
  FaLocationDot,
  FaPersonWalkingLuggage,
} from "react-icons/fa6";
import { PiCrosshairLight } from "react-icons/pi";
import { GeoJsonLayer } from "../map/GeoJSONLayer";
import { useUserNavigation } from "@/hooks/useUserNavigation";
import { useState } from "react";
import { useGoToVillage } from "@/hooks/useGoToVillage";
import ButtonMapNavigation from "../common/ButtonMapNavigation";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CheckBoxInput } from "../common/CheckBoxInput";
import { useSetManualLocation } from "@/hooks/useManualLocation";
import { MarkerManualLocation } from "../map/MarkerManualLocation";
import { cornerAlert } from "@/utils/AlertUtils";
import { MapLegend } from "../map/MapLegend";
import { useShowLegend } from "@/hooks/useShowLegend";
import { AirplaneToLandmark } from "../map/AirPlaneAnimation";

export default function MapWeb() {
  const {
    directions,
    handleLocateUser,
    locationError,
    tracking,
    userLocation,
  } = useUserNavigation();

  const {
    clickedPosition,
    handleManualLocation,
    isClickMapActivce,
    toggleManualLocation,
  } = useSetManualLocation();

  const { mapRef, handleGoToVillage } = useGoToVillage();

  const { isShowLegend, toggleLegend } = useShowLegend();
  const [geoData] = useState<GeoJSON.FeatureCollection>({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Kawasan Ngarai Sianok",
          area: "2.5 km²",
        },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [100.34, -0.31],
                [100.345, -0.315],
                [100.35, -0.312],
                [100.348, -0.308],
                [100.34, -0.31],
              ],
            ],
            [
              [
                [100.335, -0.32],
                [100.338, -0.322],
                [100.342, -0.318],
                [100.34, -0.315],
                [100.335, -0.32],
              ],
            ],
          ],
        },
      },
    ],
  });

  const [airplanes, setAirplanes] = useState<
    Array<{
      id: number;
      origin: google.maps.LatLngLiteral;
      isActive: boolean;
    }>
  >([]);

  const cities = [
    { name: "JAKARTA", coords: { lat: -6.1754, lng: 106.8272 } },
    { name: "SINGAPURA", coords: { lat: 1.3521, lng: 103.8198 } },
    { name: "KUALA_LUMPUR", coords: { lat: 3.139, lng: 101.6869 } },
  ];

  const launchAllAirplanes = () => {
    mapRef.current?.setZoom(5)
    setAirplanes(
      cities.map((city, index) => ({
        id: index,
        origin: city.coords,
        isActive: true,
      }))
    );
  };

  const handleArrival = (id: number) => {
    setAirplanes((prev) =>
      prev.map((plane) =>
        plane.id === id ? { ...plane, isActive: false } : plane
      )
    );
  };
  return (
    <>
      <div className="flex gap-2 text-sm py-2">
        <section>
          <CheckBoxInput className="border-2 border-slate-300" id="mapLabels" />
          <label htmlFor="mapLabels"> Labels</label>
        </section>
        <section>
          <CheckBoxInput className="border-2 border-slate-300" id="terrain" />
          <label htmlFor="terrain"> Terrain</label>
        </section>
      </div>
      <div className="flex gap-2 items-center py-2">
        <ButtonMapNavigation
          label={`${tracking ? "cancel navigate" : "navigate from current"}`}
          onClick={handleLocateUser}
          Icon={PiCrosshairLight}
          className={`${
            tracking && "bg-green-400 ring-green-300 ring-4 hover:bg-green-600"
          }`}
        />

        <ButtonMapNavigation
          onClick={() => {
            if (!isClickMapActivce) cornerAlert("click on the map");
            toggleManualLocation();
          }}
          Icon={FaLocationDot}
          label="Set Manual Location"
          className={`${
            isClickMapActivce &&
            "bg-green-400 ring-green-300 ring-4 hover:bg-green-600"
          }`}
        />
        <ButtonMapNavigation
          onClick={toggleLegend}
          Icon={MdOutlineRemoveRedEye}
          label="show legend"
          className={`${
            isShowLegend &&
            "bg-green-400 ring-green-300 ring-4 hover:bg-green-600"
          }`}
        />
        <ButtonMapNavigation
          onClick={launchAllAirplanes}
          Icon={FaPersonWalkingLuggage}
          label="how to react Koto Gadang"
        />
        <ButtonMapNavigation
          onClick={handleGoToVillage}
          Icon={FaLocationArrow}
          label="Zoom to Koto Gadang"
        />
      </div>
      <div className="relative">
        <MapLegend isOpen={isShowLegend} />
        <MapLayout
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onClick={handleManualLocation}
        >
          {geoData && <GeoJsonLayer data={geoData} />}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new google.maps.Size(40, 40),
              }}
              animation={google.maps.Animation.DROP}
            />
          )}
          {airplanes.map(
            (plane) =>
              plane.isActive && (
                <AirplaneToLandmark
                  key={plane.id}
                  origin={plane.origin}
                  duration={5000} 
                  onArrival={() => handleArrival(plane.id)}
                  delay={1000}
                />
              )
          )}
          <MarkerManualLocation position={clickedPosition} />
          {directions && <DirectionsRenderer directions={directions} />}
        </MapLayout>
      </div>

      {locationError && <p className="text-red-500 text-sm">{locationError}</p>}
    </>
  );
}
