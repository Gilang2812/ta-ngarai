import * as yup from "yup";

export const addressFormSchema = yup.object({
  destination_id: yup
    .string()
    .required(
      "Destination ID is required, maybe you need to complete the address first"
    ),
  label: yup
    .string()
    .required("Label is required")
    .max(50, "Label must be at most 50 characters"),
  recipient_name: yup
    .string()
    .required("Recipient name is required")
    .max(100, "Recipient name must be at most 100 characters"),
  recipient_phone: yup
    .string()
    .required("Recipient phone is required")
    .matches(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"),
  negara: yup
    .string()
    .required("Country is required")
    .max(50, "Country must be at most 50 characters"),
  provinsi: yup
    .string()
    .required("State/Province is required")
    .max(50, "State/Province must be at most 50 characters"),
  kota: yup
    .string()
    .required("City is required")
    .max(50, "City must be at most 50 characters"),
  kecamatan: yup
    .string()
    .required("District is required")
    .max(50, "District must be at most 50 characters"),
  kelurahan: yup
    .string()
    .max(50, "Sub-district must be at most 50 characters")
    .nullable(),
  kode_post: yup
    .string()
    .required("Postal code is required")
    .matches(/^\d{5}$/, "Postal code must be exactly 5 digits"),
  street: yup
    .string()
    .required("Street is required")
    .max(100, "Street must be at most 100 characters"),
  details: yup
    .string()
    .max(255, "Address details must be at most 255 characters")
    .nullable(),
  is_primary: yup
    .number()
    .oneOf([0, 1], "Is primary must be 0 or 1")
    .nullable()
    .optional(),
});
export type AddressForm = yup.InferType<typeof addressFormSchema>;
export type Address = AddressForm & {
  id: string;
  customer_id: string | number;
};

// Checkout Schema
export const checkoutSchema = yup.object({
  id: yup
    .string()
    .required("ID checkout wajib diisi")
    .max(5, "ID checkout maksimal 5 karakter"),
  address_id: yup
    .string()
    .required("Address ID wajib diisi")
    .max(5, "Address ID maksimal 5 karakter"),
  checkout_date: yup
    .date()
    .required("Tanggal checkout wajib diisi")
    .typeError("Format tanggal tidak valid"),
  total_price: yup
    .number()
    .required("Total harga wajib diisi")
    .positive("Total harga harus lebih dari 0")
    .integer("Total harga harus berupa angka bulat"),
  payment_date: yup
    .date()
    .required("Tanggal pembayaran wajib diisi")
    .typeError("Format tanggal tidak valid"),
});

// Item Checkout Schema
export const itemCheckoutSchema = yup.object({
  checkout_id: yup
    .string()
    .required("Checkout ID wajib diisi")
    .max(5, "Checkout ID maksimal 5 karakter"),
  craft_id: yup
    .string()
    .required("Craft ID wajib diisi")
    .max(5, "Craft ID maksimal 5 karakter"),
  total: yup
    .number()
    .required("Total wajib diisi")
    .positive("Total harus lebih dari 0")
    .integer("Total harus berupa angka bulat"),
  note: yup.string().max(100, "Catatan maksimal 100 karakter").nullable(),
  review_start: yup
    .number()
    .min(1, "Review minimal 1")
    .max(5, "Review maksimal 5")
    .integer("Review harus berupa angka bulat")
    .nullable(),
  review_text: yup
    .string()
    .max(255, "Review text maksimal 255 karakter")
    .nullable(),
  seller_response: yup
    .string()
    .max(255, "Review text maksimal 255 karakter")
    .nullable(),
});

// Item Checkout Review Gallery Schema
export const itemCheckoutReviewGallerySchema = yup.object({
  id: yup.string().required("ID wajib diisi").max(5, "ID maksimal 5 karakter"),
  checkout_id: yup
    .string()
    .required("Checkout ID wajib diisi")
    .max(5, "Checkout ID maksimal 5 karakter"),
  craft_id: yup
    .string()
    .required("Craft ID wajib diisi")
    .max(5, "Craft ID maksimal 5 karakter"),
  url: yup
    .string()
    .required("URL wajib diisi")
    .url("Format URL tidak valid")
    .max(255, "URL maksimal 255 karakter"),
});

// Combined schema untuk validasi relasi

// Infer Types dari Schema
export type CheckoutType = yup.InferType<typeof checkoutSchema>;
export type ItemCheckoutType = yup.InferType<typeof itemCheckoutSchema>;
export type ItemCheckoutReviewGalleryType = yup.InferType<
  typeof itemCheckoutReviewGallerySchema
>;

export interface Checkout {
  id: string;
  address_id: string;
  checkout_date: string | null;
  total_price: number | null;
  payment_date: string | null;
  shippingAddress: ShippingAddress;
  items: CheckoutItem[];
}

export type ShippingAddress = Address & {
  addressCustomer: AddressCustomer;
};

export interface AddressCustomer {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface CheckoutItem {
  checkout_id: string;
  craft_variant_id: string;
  jumlah: number;
  note: string | null;
  shipping_id: string | null;
  review_rating: number | null;
  review_text: string | null;
  seller_response: string | null;
  craftVariant: CraftVariant;
}

export interface CraftVariant {
  id: string;
  name: string;
  price: number;
  weight: number;
  craft: Craft & { souvenirPlace: SouvenirPlace };
  craftGalleries: CraftGallery[];
}

export type SouvenirPlace = {
  id: string;
  name: string;
  address: string;
  contact_person: string;
};

export interface Craft {
  id: string;
  name: string;
  id_souvenir_place: string;
}

export interface CraftGallery {
  id: string;
  id_craft_variant: string;
  url: string;
  deleted_at: string | null;
}

export type CheckoutPayload = {
  checkout_id: string | number | undefined;
  total_shipping_cost: number;
  sub_total: number;
  total: number;
  items: CheckoutItem[];
  shippings: Shipping[];
  item_details: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export type Item = {
  craftVariant: {
    id: string;
    name: string;
    price: number;
    weight: number;
    craft: {
      name: string;
      souvenirPlace: {
        name: string;
        contact_person: string;
        address: string;
      };
    };
  };
  note: string;
  shipping_id: string;
  jumlah: number;
};

export type Shipping = {
  order_date: Date;
  brand_name: string;
  shipper_name: string | undefined;
  shipper_phone: string | undefined;
  shipper_destination_id: number | undefined;
  shipper_address: string | undefined;
  shipper_email: string | undefined;
  receiver_name: string | undefined;
  receiver_phone: string | undefined;
  receiver_destination_id: number | undefined;
  receiver_address: string | undefined;
  shipping: string | undefined;
  shipping_type: string | undefined;
  payment_method: "COD" | "TRANSFER" | string;
  shipping_cost: number;
  shipping_cashback: number;
  service_fee: number;
  additional_cost: number;
  grand_total: number;
  cod_value: number;
  insurance_value: number;
  order_details: OrderDetail[];
};

export type OrderDetail = {
  product_id: string;
  product_name: string;
  product_variant_name: string;
  product_price: number;
  product_weight: number;
  qty: number;
  subtotal: number;
  note: string | null;
  shipping_id: string | null;
};
