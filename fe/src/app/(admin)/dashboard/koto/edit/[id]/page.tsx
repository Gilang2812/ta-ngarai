'use client';
import { useCallback, useState } from 'react';
 
import Image from "next/image";
import { FormInput } from '@/components/inputs/FormInput';

 
const EditDataVillage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const removeImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <main className="p-5 bg-white rounded-xl">
      <header className="mb-4 text-lg">
        <h1>Edit Village Information</h1>
      </header>
      <section className="grid grid-cols-2 gap-8">
        {/* Left Column: Form Fields */}
        <section className="col-span-1 space-y-4 leading-loose">
          <article>
            <label>Village Name:</label>
            <FormInput name="name" value="Nagari Koto Gadang" type="text" />
          </article>
          <article>
            <label htmlFor="type">Type Of Tourism</label>
            <FormInput type="text" name="type"  />
          </article>
          <article>
            <label htmlFor="address">Address</label>
            <FormInput type="text" name="address"   />
          </article>
          <article>
            <label htmlFor="open">Open</label>
            <FormInput type="text" name="open"   />
          </article>
          <article>
            <label htmlFor="close">Close</label>
            <FormInput type="text" name="close"   />
          </article>
          <article>
            <label htmlFor="price">Ticket Price</label>
            <FormInput type="text" name="price"  />
          </article>
          <article>
            <label htmlFor="contact">Contact Person</label>
            <FormInput type="text" name="contact"  />
          </article>
          <article>
            <label htmlFor="bank">Bank Name</label>
            <FormInput type="text" name="bank"   />
          </article>
          <article>
            <label htmlFor="code">Bank Code</label>
            <FormInput type="text" name="code"   />
          </article>
          <article>
            <label htmlFor="account">Bank Account Holder Name</label>
            <FormInput type="text" name="account"   />
          </article>
          <article>
            <label htmlFor="qr">QR Image</label>
            <FormInput type="text" name="qr"   />
          </article>
        </section>

        {/* Right Column: Image Uploader */}
        <section className="col-span-1">
          <h1 className="text-lg">Gallery</h1>
             </section>
      </section>
    </main>
  );
};

export default EditDataVillage;
