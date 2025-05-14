import { Address } from "@/type/schema/CheckoutSchema";

export const addresses: Address[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '081234567890',
    streetAddress: 'Jl. Sudirman No. 123, Jakarta',
    postalCode: '12345',
    isDefault: true
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '081234567890',
    streetAddress: 'Jl. Thamrin No. 456, Jakarta',
    postalCode: '54321',
    isDefault: false
  }
];