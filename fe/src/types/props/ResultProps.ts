export type ResultProps = {
  gross_amount: string;
  order_id: string;
  payment_type: string;
  pdf_url: string;
  status_code: string;
  status_message: string;
  transaction_id: string;
  transaction_status: string;
  transaction_time: string;
  va_numbers: Array<{
    bank: string;
    va_number: string;
  }>;
};

export type ResultErrorProps = {
  status_code: string | number;
  transaction_status?: string; 
  error_messages: string[];
  finish_redirect_url: string;
  [key: string]: unknown; // fallback jika ada properti lain yang tidak terdokumentasi
};
