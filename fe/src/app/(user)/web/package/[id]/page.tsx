'use client';

import React from 'react';
import { InfoSection } from "@/components/web/package/moreInfoPackage/InfoSection";
import { Itinerary } from "@/components/web/package/moreInfoPackage/Itinerary"; 
import GoogleMap from '@/components/map/GoogleMapComponent';

const MoreInfo = () => {
  const handleMapLoad = () => {
    console.log('Map loaded successfully');
  };

  const handleMapError = (error: Error) => {
    console.error('Map loading error:', error);
  };

  return (
    <main className="grid grid-cols-12 gap-6">
      <InfoSection />
   </main>
  );
};

export default MoreInfo;