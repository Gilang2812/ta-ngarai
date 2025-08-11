"use client";
import { useFetchTourism } from "@/features/web/useFetchTourism"; 
import { LabelTextSkeleton } from "@/components/loading/LabelTextSkeleton";
import { formatPrice } from "@/lib/priceFormatter";
import ImgCraft from "../common/ImgCraft";

export const Profile = () => {
  const { data, isLoading } = useFetchTourism("KG01");
  if (isLoading)
    return (
      <article className="col-span-1 space-y-6 leading-loose"> 
        <LabelTextSkeleton />
      </article>
    );
  return (
    data && (
      <article className="col-span-1 space-y-6 leading-loose">
        <div>
          <h2 className="font-semibold text-primary">Name</h2>
          <p>{data?.name}</p>
        </div>
        <div>
          <h2 className="font-semibold text-primary">Type Of Tourism</h2>
          <p>{data?.name}</p>
        </div>
        <div>
          <h2 className="font-semibold text-primary">Address</h2>
          <p>{data?.name}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold text-primary">Open</h2>
            <p>{data?.open}</p>
          </div>
          <div>
            <h2 className="font-semibold text-primary">Close</h2>
            <p>{data?.close}</p>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-primary">Ticket Price</h2>
          <p>{formatPrice(data?.ticket_price || 0)}</p>
        </div>
        <div>
          <h2 className="font-semibold text-primary">Contact Person</h2>
          <p>{data?.contact_person}</p>
        </div>
        <div>
          <h2 className="font-semibold text-primary">Bank Name</h2>
          <p>{data?.bank_name}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold text-primary">Bank Code</h2>
            <p>{data?.bank_code}</p>
          </div>
          <div>
            <h2 className="font-semibold text-primary">
              Bank Account Holder Name
            </h2>
            <p>{data?.bank_account_holder}</p>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-primary">Bank Account Number</h2>
          <p>{data?.bank_account_number}</p>
        </div>
        <div>
          <h2 className="font-semibold text-primary">QR Code</h2>
          <ImgCraft
            src={data?.qr_url}
            alt="QR code for the Nagari Koto Gadang village"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
      </article>
    )
  );
};
