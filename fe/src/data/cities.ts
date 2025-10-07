import { City } from "@/types/common/Cities";

export const cities: City[] = [
  {
    name: "JAKARTA",
    type: "plane",
    coords: { lat: -6.1754, lng: 106.8272 },
    routes: [
      "Take a domestic flight to Padang (PDG), Indonesia.",
      "Rent a car to Koto Gadang.",
    ],
  },
  {
    name: "SINGAPURA",
    type: "plane",
    coords: { lat: 1.3521, lng: 103.8198 },
    routes: [
      "Fly directly to Padang (PDG), Indonesia.",
      "Continue by car to Koto Gadang.",
    ],
    iconUrl: "/icons/sg.svg",
  },
  {
    name: "KUALA_LUMPUR",
    type: "plane",
    coords: { lat: 3.139, lng: 101.6869 },
    routes: ["Fly to Padang (PDG), Indonesia.", "Rent a car to Koto Gadang."],
    iconUrl: "/icons/my.svg",
  },
  {
    name: "PADANG",
    type: "bus",
    coords: { lat: -0.7887883759026773, lng: 100.28325921114201 },
    routes: [],
  },
  {
    name: "BANDA_ACEH",
    type: "bus",
    coords: { lat: 5.537368838813003, lng: 95.50780215398227 },
    routes: [
      "Take an intercity bus or drive from Banda Aceh to Padang.",
      "From Padang, continue by car to Koto Gadang.",
    ],
  },
];
