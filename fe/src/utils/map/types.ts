export interface MapConfig {
    center: {
      lat: number;
      lng: number;
    };
    zoom: number;
    mapId: string;
  }
  
  // Extend Window interface for Google Maps
  declare global {
    interface Window {
      initMap?: () => Promise<void>;
    }
  }
  
  export interface GoogleMapProps {
    center: {
      lat: number;
      lng: number;
    };
    zoom?: number;
    mapId?: string;
    onMapLoad?: () => void;
    onMapError?: (error: Error) => void;
  }