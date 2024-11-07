"use client";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useGeoJSON } from "@/features/web/useGeoJSON";
import Swal from "sweetalert2";

const Map = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { data: geojson, isLoading, error } = useGeoJSON();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showLegend, setShowLegend] = useState(true);
  const [isManualLocationActive, setIsManualLocationActive] = useState(false);
  const manualMarkerRef = useRef<google.maps.Marker | null>(null); // Use a ref for manualMarker
  const [clickListener, setClickListener] =
    useState<google.maps.MapsEventListener | null>(null);

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
        const featureType = feature.getProperty("type") as string; // Explicitly assert type
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

      // Add a marker for center point
      const marker = new google.maps.Marker({
        position: { lat: -0.316691, lng: 100.343548 },
        map: mapInstance,
        icon: {
          url: "/landingPage/trophy.png",
          scaledSize: new google.maps.Size(40, 60),
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

      const manualLocationListener = google.maps.event.addListener(mapInstance,"click",(event: any) => {
          // Create a new marker for manual location
          if (manualMarkerRef.current) {
            manualMarkerRef.current.setMap(null); 
          }

          const newMarker = new google.maps.Marker({
            position: event.latLng,
            map: mapInstance,
            title: "Manual Location",
          });

          manualMarkerRef.current = newMarker;  

          const manualInfoWindow = new google.maps.InfoWindow({
            content: `<p class='text-center'><span class='fw-bold'>Manual Location</span> <br> lat: ${event.latLng.lat().toFixed(8)} <br> lng: ${event.latLng.lng().toFixed(8)}</p>`,
          });

          // Open the info window for manual location
          manualInfoWindow.open(mapInstance, newMarker);

          // Always create info window for GeoJSON areas
          const isInsideGeoJSON = mapInstance.data.forEach(event.latLng);
          if (isInsideGeoJSON) {
            const featureName = isInsideGeoJSON.getProperty("name");
            const geoJsonInfoWindow = new google.maps.InfoWindow({
              content: `<div><strong>Wilayah:</strong> ${featureName}</div>`,
            });
            geoJsonInfoWindow.setPosition(event.latLng);
            geoJsonInfoWindow.open(mapInstance);
          }

          newMarker.addListener("click", () => {
            manualInfoWindow.open(mapInstance, newMarker);
          });
      });

      return () => {
        if (manualLocationListener) {
          google.maps.event.removeListener(manualLocationListener);
        }
        marker.setMap(null);  
        if (manualMarkerRef.current) {
          manualMarkerRef.current.setMap(null);  
        }
      };
    });
  }, [geojson, isLoading, error, isManualLocationActive]); 

  const handleManualLocation = () => {
    if (!map) {
      Swal.fire("Map is not ready yet. Please try again later.");
      return; // Exit if map is not yet initialized
    }

    Swal.fire("Click on Map to set location.");

    setIsManualLocationActive(true);

    // Remove previous click listener if exists
    if (clickListener) {
      google.maps.event.removeListener(clickListener);
    }

    // Add new click listener to set manual marker
    const listener = map.addListener(
      "click",
      (mapsMouseEvent: google.maps.MapMouseEvent) => {
        const position = mapsMouseEvent.latLng!;

        // If manual marker already exists, update its position
        if (manualMarkerRef.current) {
          manualMarkerRef.current.setPosition(position);
        } else {
          // Create a new marker if none exists
          const newMarker = new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP,
          });
          manualMarkerRef.current = newMarker; // Update the ref
        }

        const infoWindow = new google.maps.InfoWindow({
          content: `<p class='text-center'><span class='fw-bold'>Manual Location</span> <br> lat: ${position.lat().toFixed(8)} <br> lng: ${position.lng().toFixed(8)}</p>`,
        });

        infoWindow.open(map, manualMarkerRef.current);

        manualMarkerRef.current.addListener("click", () => {
          infoWindow.open(map, manualMarkerRef.current);
        });

        setIsManualLocationActive(false); // Disable manual mode after setting marker
      }
    );

    setClickListener(listener);
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
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={handleManualLocation} className="btn btn-primary">
          Set Manual Location
        </button>
        <button onClick={handleGoToMarker} className="btn-primary">
          Go to Marker
        </button>
        <button onClick={toggleLegend} className="btn-primary">
          {showLegend ? "Hide Legend" : "Show Legend"}
        </button>
      </div>

      <div ref={mapRef} className="w-full aspect-[4/3] h-max" />

      {showLegend && (
        <div className="p-2 mt-2 bg-white shadow-lg legend">
          <h4>Legend</h4>
          <ul>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-[#880c9c] mr-2 inline-block"></span>{" "}
              Negara
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-[#0f910a] mr-2 inline-block"></span>{" "}
              Provinsi
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-[#a6123a] mr-2 inline-block"></span>{" "}
              Kabupaten/Kota
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-[#a67712] mr-2 inline-block"></span>{" "}
              Kecamatan
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-[#eff538] mr-2 inline-block"></span>{" "}
              Desa
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Map;
