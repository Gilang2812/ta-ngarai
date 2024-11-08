"use client";
import { useFetchTourism } from "@/features/web/useFetchTourism";
import Image from "next/image";
import { LabelTextSkeleton } from "@/components/loading/LabelTextSkeleton";

export const Profile = () => {
    
    const {data,isLoading} = useFetchTourism('KG01')
    if(isLoading) return  <article className="col-span-1 space-y-6 leading-loose"> <LabelTextSkeleton /></article>  
    return (
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
          <p>08:30:00</p>
        </div>
        <div>
          <h2 className="font-semibold text-primary">Close</h2>
          <p>18:30:00</p>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-primary">Ticket Price</h2>
        <p>5000</p>
      </div>
      <div>
        <h2 className="font-semibold text-primary">Contact Person</h2>
        <p>0845463123</p>
      </div>
      <div>
        <h2 className="font-semibold text-primary">Bank Name</h2>
        <p>Bank Syariah Indonesia</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold text-primary">Bank Code</h2>
          <p>451</p>
        </div>
        <div>
          <h2 className="font-semibold text-primary">
            Bank Account Holder Name
          </h2>
          <p>Desa Wisata Koto Gadang</p>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-primary">Bank Account Number</h2>
        <p>345234524</p>
      </div>
      <div>
        <h2 className="font-semibold text-primary">QR Code</h2>
        <Image
          src="/"
          alt="QR code for the Nagari Koto Gadang village"
          width={200}
          height={200}
          className="rounded-lg"
        />
      </div>
    </article>
  );
};
