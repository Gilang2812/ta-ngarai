type Location = {
  name:string;
  position:Position
};
type Position ={
  lat:number;
  lng:number
}
export const labeledRegionLocations:Location[] = [
  { position: { lat: 3.440052, lng: 101.957396 }, name: "MALAYSIA" },
  { position: { lat: 1.3521, lng: 103.8198 }, name: "SINGAPORE" },
  { position: { lat: 4.90614, lng: 114.9398 }, name: "BRUNEI" },
  { position: { lat: -1.377737, lng: 113.217183 }, name: "INDONESIA" },
  { position: { lat: -6.2088, lng: 106.8456 }, name: "JAKARTA" },
  { position: { lat: -0.9446, lng: 100.3714 }, name: "PADANG" },
  { position: { lat: 1.047, lng: 104.0305 }, name: "BATAM" },
];
