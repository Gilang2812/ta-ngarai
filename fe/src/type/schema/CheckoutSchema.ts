import * as yup from 'yup';


export interface Address {
  id: string;
  name: string;
  email: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  isDefault: boolean;
}


// Checkout Schema
export const checkoutSchema = yup.object({
  id: yup
    .string()
    .required('ID checkout wajib diisi')
    .max(5, 'ID checkout maksimal 5 karakter'),
  address_id: yup
    .string()
    .required('Address ID wajib diisi')
    .max(5, 'Address ID maksimal 5 karakter'),
  checkout_date: yup
    .date()
    .required('Tanggal checkout wajib diisi')
    .typeError('Format tanggal tidak valid'),
  total_price: yup
    .number()
    .required('Total harga wajib diisi')
    .positive('Total harga harus lebih dari 0')
    .integer('Total harga harus berupa angka bulat'),
  payment_date: yup
    .date()
    .required('Tanggal pembayaran wajib diisi')
    .typeError('Format tanggal tidak valid'),
  status: yup
    .date()
    .required('Status wajib diisi')
    .typeError('Format tanggal status tidak valid'),
});

// Item Checkout Schema
export const itemCheckoutSchema = yup.object({
  checkout_id: yup
    .string()
    .required('Checkout ID wajib diisi')
    .max(5, 'Checkout ID maksimal 5 karakter'),
  craft_id: yup
    .string()
    .required('Craft ID wajib diisi')
    .max(5, 'Craft ID maksimal 5 karakter'),
  total: yup
    .number()
    .required('Total wajib diisi')
    .positive('Total harus lebih dari 0')
    .integer('Total harus berupa angka bulat'),
  note: yup
    .string()
    .max(100, 'Catatan maksimal 100 karakter')
    .nullable(),
  review_start: yup
    .number()
    .min(1, 'Review minimal 1')
    .max(5, 'Review maksimal 5')
    .integer('Review harus berupa angka bulat')
    .nullable(),
  review_text: yup
    .string()
    .max(255, 'Review text maksimal 255 karakter')
    .nullable(),
  seller_response: yup
    .string()
    .max(255, 'Review text maksimal 255 karakter')
    .nullable(),
});

// Item Checkout Review Gallery Schema
export const itemCheckoutReviewGallerySchema = yup.object({
  id: yup
    .string()
    .required('ID wajib diisi')
    .max(5, 'ID maksimal 5 karakter'),
  checkout_id: yup
    .string()
    .required('Checkout ID wajib diisi')
    .max(5, 'Checkout ID maksimal 5 karakter'),
  craft_id: yup
    .string()
    .required('Craft ID wajib diisi')
    .max(5, 'Craft ID maksimal 5 karakter'),
  url: yup
    .string()
    .required('URL wajib diisi')
    .url('Format URL tidak valid')
    .max(255, 'URL maksimal 255 karakter'),
});

// Combined schema untuk validasi relasi
 

// Infer Types dari Schema
export type CheckoutType = yup.InferType<typeof checkoutSchema>;
export type ItemCheckoutType = yup.InferType<typeof itemCheckoutSchema>;
export type ItemCheckoutReviewGalleryType = yup.InferType<typeof itemCheckoutReviewGallerySchema>;
 
