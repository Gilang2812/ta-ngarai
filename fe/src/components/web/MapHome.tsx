"use client";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useGeoJSON } from "@/features/web/useGeoJSON";
import Swal from "sweetalert2";
import MapControls from "../global/MapControls";

const Map = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { data: geojson, isLoading, error } = useGeoJSON();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  const [isManualLocationActive, setIsManualLocationActive] = useState(false);
  const manualMarkerRef = useRef<google.maps.Marker | null>(null);
  const clickListenerRef = useRef<google.maps.MapsEventListener | null>(null);

  useEffect(() => {
    if (!geojson || isLoading || error) return;

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });

    loader.load().then((google) => {
      const mapInstance = new google.maps.Map(mapRef.current!, {
        center: { lat: -0.316691, lng: 100.343548 },
        zoom: 10,
      });

      setMap(mapInstance);

      // Load GeoJSON data
      mapInstance.data.addGeoJson(geojson);

      // Set the style for GeoJSON features
      mapInstance.data.setStyle((feature) => {
        const featureType = feature.getProperty("type") as string;
        let color = "yellow";

        if (featureType === "negara") {
          color = "#880c9c";
        } else if (featureType === "provinsi") {
          color = "#0f910a";
        } else if (featureType === "kab_kota") {
          color = "#a6123a";
        } else if (featureType === "kecamatan") {
          color = "#a67712";
        } else if (featureType === "village") {
          color = "#eff538";
        }

        return {
          fillColor: color,
          strokeColor: "#fff",
          strokeWeight: 1,
          fillOpacity: 0.3,
        };
      });

      const marker = new google.maps.Marker({
        position: { lat: -0.316691, lng: 100.343548 },
        map: mapInstance,
        icon: {
          url: "/icons/village.png",
          scaledSize: new google.maps.Size(60, 60),
        },
        title: "Center Point",
      });

      const infoWindow = new google.maps.InfoWindow();

      mapInstance.data.addListener("click", (event: any) => {
        if (!isManualLocationActive) {
          const featureName = event.feature.getProperty("name");
          const position = event.latLng;
          const content = `<div><strong>Wilayah:</strong> ${featureName}</div>`;

          infoWindow.setContent(content);
          infoWindow.setPosition(position);
          infoWindow.open(mapInstance);
        }
      });

      marker.addListener("click", () => {
        infoWindow.setContent("<div><strong>Center Point</strong></div>");
        infoWindow.setPosition(marker.getPosition()!);
        infoWindow.open(mapInstance, marker);
      });

      return () => {
        if (manualMarkerRef.current) {
          manualMarkerRef.current.setMap(null);
        }
        if (clickListenerRef.current) {
          google.maps.event.removeListener(clickListenerRef.current);
        }
        marker.setMap(null);
      };
    });
  }, [geojson, isLoading, error, isManualLocationActive]);

  const handleManualLocation = () => {
    if (!map) {
      Swal.fire("Map is not ready yet. Please try again later.");
      return;
    }

    if (manualMarkerRef.current) {
      setIsManualLocationActive(true);
      return;
    }

    Swal.fire("Click on Map to set location.");
    setIsManualLocationActive(true);

    clickListenerRef.current = map.addListener("click", (mapsMouseEvent) => {
      const position = mapsMouseEvent.latLng;

      if (manualMarkerRef.current) {
        manualMarkerRef.current.setPosition(position);
      } else {
        manualMarkerRef.current = new google.maps.Marker({
          position: position,
          map: map,
          animation: google.maps.Animation.DROP,
          title: "Manual Location",
        });
      }

      const infoWindow = new google.maps.InfoWindow({
        content: `<p class='text-center'><span class='fw-bold'>Manual Location</span><br>lat: ${position.lat().toFixed(8)}<br>lng: ${position.lng().toFixed(8)}</p>`,
      });

      infoWindow.open(map, manualMarkerRef.current);

      manualMarkerRef.current.addListener("click", () => {
        infoWindow.open(map, manualMarkerRef.current);
      });

      setIsManualLocationActive(false);
    });
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          map.setCenter(userLocation);
          new google.maps.Marker({
            position: userLocation,
            map: map,
            title: 'Your Current Location',
          });
        },
        () => {
          alert('Unable to retrieve your location.');
        }
      );
    }
  };

  const handleGoToMarker = () => {
    if (map) {
      const targetLocation = new google.maps.LatLng(-0.316691, 100.343548);
      map.setCenter(targetLocation);
      map.setZoom(14);
    }
  };

  const toggleLegend = () => setShowLegend((prev) => !prev);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading map data</div>;

  return (
    <div className=" grow">
      <div className="flex gap-2 mb-4">
        <MapControls current={handleCurrentLocation} manual={handleManualLocation} goTO={handleGoToMarker} legend={toggleLegend}/>
      </div>

      <div ref={mapRef} className="w-full aspect-[4/3] h-max" />

      {showLegend && (
        <div className="p-2 mt-2 bg-white shadow-lg legend">
          <h4>Legend</h4>
          <ul>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-[#880c9c] mr-2 inline-block"></span> Negara
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-[#0f910a] mr-2 inline-block"></span> Provinsi
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-[#a6123a] mr-2 inline-block"></span> Kabupaten/Kota
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-[#a67712] mr-2 inline-block"></span> Kecamatan
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-[#eff538] mr-2 inline-block"></span> Village
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Map;
