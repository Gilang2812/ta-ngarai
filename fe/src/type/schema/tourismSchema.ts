 
export type TourismSchema = {
  id: string;
  name: string;
  type_of_tourism: string;
  address: string;
  email: string;
  province_id: string;
  open: string;  
  close: string;  
  ticket_price: number;
  contact_person: string;
  description: string;
  geom: string | null;  
  lat: string;  
  lng: string; 
  bank_name: string;
  bank_code: string;
  bank_account_holder: string;
  bank_account_number: string;
  qr_url: string; d
};