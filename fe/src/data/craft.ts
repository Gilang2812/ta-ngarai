 
export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  isHot?: boolean;
  currentPrice: number;
  reviewCount: number;
  bintang: number;
  stock: number;
  sold: number;
  description: string;
  thumbnails?: string[];
  variants?: ProductVariant[];
  warranty?: string;
  voucherInfo?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  isAvailable: boolean;
}
export const crafts = [
  {
    id: "1",
    name: "Gantungan Kunci Model Rumah Gadang",
    price: 10000,
    rating: 5,
    reviewCount: 738,
    imageUrl: "/kotoGadang/images/carousel-1.jpg",
    isHot: true,
  },
  {
    id: "2",
    name: "Gantungan Kunci Model Rumah Gadang",
    price: 10000,
    rating: 5,
    reviewCount: 738,
    imageUrl: "/kotoGadang/images/carousel-2.jpg",
  },
  {
    id: "3",
    name: "Gantungan Kunci Model Rumah Gadang",
    price: 10000,
    rating: 5,
    reviewCount: 738,
    imageUrl: "/kotoGadang/images/carousel-3.jpg",
  },
  {
    id: "4",
    name: "Gantungan Kunci Model Rumah Gadang",
    price: 10000,
    rating: 5,
    reviewCount: 738,
    imageUrl: "/kotoGadang/images/carousel-1.jpg",
  },
  {
    id: "5",
    name: "Gantungan Kunci Model Rumah Gadang",
    price: 10000,
    rating: 5,
    reviewCount: 738,
    imageUrl: "/kotoGadang/images/carousel-2.jpg",
    isHot: true,
  },
  {
    id: "6",
    name: "Gantungan Kunci Model Rumah Gadang",
    price: 10000,
    rating: 5,
    reviewCount: 738,
    imageUrl: "/kotoGadang/images/carousel-3.jpg",
  },
  {
    id: "7",
    name: "Gantungan Kunci Model Rumah Gadang",
    price: 10000,
    rating: 5,
    reviewCount: 738,
    imageUrl: "/kotoGadang/images/carousel-1.jpg",
  },
  {
    id: "8",
    name: "Gantungan Kunci Model Rumah Gadang",
    price: 10000,
    rating: 5,
    reviewCount: 738,
    imageUrl: "/kotoGadang/images/carousel-1.jpg",
  },
];

export const MOCK_PRODUCT: Product = {
  id: "1",
  name: "Gantungan Kunci Model Rumah Gadang",
  currentPrice: 10000,
  price: 12000,
  rating: 5,
  bintang: 4.7,
  reviewCount: 738,
  stock: 305,
  sold: 3848,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  imageUrl: "/kotoGadang/images/carousel-1.jpg",

  thumbnails: [
    "/kotoGadang/images/carousel-1.jpg",
    "/kotoGadang/images/carousel-2.jpg",
    "/kotoGadang/images/carousel-3.jpg",
    "/kotoGadang/images/carousel-1.jpg",
    "/kotoGadang/images/carousel-2.jpg",
    "/kotoGadang/images/carousel-3.jpg",
    "/kotoGadang/images/carousel-1.jpg",
    "/kotoGadang/images/carousel-2.jpg",
    "/kotoGadang/images/carousel-3.jpg",
  ],
  variants: [
    { id: "v1", name: "Silver", color: "#C0C0C0", isAvailable: true },
    { id: "v2", name: "Gold", color: "#FFD700", isAvailable: true },
  ],
  warranty: "Garansi Tiba: 8 - 11 Mei",
  voucherInfo: "Dapatkan Voucher s/d Rp10.000 jika pesanan tertambah",
};

 