"use client";
import { useState, useEffect } from "react";
import { useFetchTourism } from "@/features/web/useFetchTourism";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { imageUrl } from "@/lib/baseUrl";
import { FormInput } from "@/components/inputs/FormInput";
import { useFetchGalleries } from "@/features/web/useFetchGalleries";
import { useEditTourism } from "@/features/web/useEditTourism";
import { showErrorAlert } from "@/utils/AlertUtils";
import Button from "@/components/common/Button";
import { AxiosError } from "axios";

registerPlugin(FilePondPluginImagePreview);

const EditDataVillage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [galleryImages, setGalleryImages] = useState<
    Array<{ id: string; url: string }>
  >([]);
  const [uploadedQr, setUploadedQr] = useState<File | null>(null);
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data, isLoading } = useFetchTourism(id!.toString());

  useEffect(() => {
    if (data?.qr_url) {
      setUploadedQr(imageUrl + data?.qr_url);
    }
  }, [data]);

  const { data: dataImage, isLoading: imageLoading } =
    useFetchGalleries("tourism");
  useEffect(() => {
    if (dataImage) {
      setUploadedImages(
        dataImage.map((item: any) => ({ source: imageUrl+ item.url }))
      );
    }
  }, [dataImage]);

  const { mutate, isPending } = useEditTourism({
    onSuccess: () => {
      router.push("/dashboard/koto");
    },
    onError: (error: AxiosError) => {
      showErrorAlert("Editing Data");
    },
  });

  return (
    <main className="p-5 bg-white rounded-xl">
      <header className="mb-4 text-lg">
        <h1>Edit Village Information</h1>
      </header>
      <Formik 
           initialValues={ {
            id: data?.id ?? "",
            name: data?.name ?? "",
            type_of_tourism: data?.type_of_tourism ?? "",
            address: data?.address ?? "",
            open: data?.open ?? "",
            close: data?.close ?? "",
            ticket_price: data?.ticket_price ?? "",
            contact_person: data?.contact_person ?? "",
            bank_code: data?.bank_code ?? "",
            bank_name: data?.bank_name ?? "",
            bank_account: data?.bank_account ?? "",
            bank_account_holder: data?.bank_account_holder ?? "",
          }}
          enableReinitialize={true}
          onSubmit={ (values: any) => {
            const formData = new FormData();
      
            // Append non-file fields to FormData
            Object.entries(values).forEach(([key, value]) => {
              if (value !== undefined && value !== null) {
                formData.append(key, value as string);
              }
            });
      
            // Append QR image if it exists
            if (uploadedQr) {
              formData.append("qr", uploadedQr);
            }
      
            // Append gallery images
            uploadedImages.forEach((image) => {
              formData.append("gallery", image);
            });
      
            // Use mutate with FormData
            mutate(formData);
          }}>
        <Form encType="multipart/form-data">
          <section className="grid grid-cols-2 gap-8">
            {/* Left Column: Form Fields */}
            <section className="col-span-1 space-y-4 leading-loose">
              <FormInput name="name" type="text" />

              <FormInput name="type_of_tourism" type="text" />
              <FormInput name="address" type="text" />
              <FormInput name="open" type="time" />
              <FormInput name="close" type="time" />
              <FormInput name="ticket_price" type="number" />
              <FormInput name="contact_person" type="text" />
              <FormInput name="bank_name" type="text" />
              <FormInput name="bank_code" type="text" />
              <FormInput name="bank_account_holder" type="text" />

              <div>
                <label htmlFor="qr">QR Image</label>
                <FilePond
                  files={uploadedQr ? [uploadedQr] : []}
                  allowMultiple={false}
                  onupdatefiles={(fileItems) => {
                    setUploadedQr(fileItems[0]?.file || null);
                  }}
                  labelIdle='Seret & lepaskan gambar QR atau <span class="filepond--label-action">telusuri</span>'
                />
              </div>
            </section>

            {/* Right Column: Gallery Image Uploader */}
            <section className="col-span-1">
              <h1 className="text-lg">Gallery</h1>
              <FilePond
                files={uploadedImages}
                allowMultiple={true}
                onupdatefiles={(fileItems) => {
                  setUploadedImages(fileItems.map((fileItem) => fileItem.file));
                }}
                labelIdle='Seret & lepaskan gambar atau <span class="filepond--label-action">telusuri</span>'
              />
            </section>

            <div>
              <Button type="submit">{isPending ? "Loading" : "Save"}</Button>
            </div>
          </section>
        </Form>
      </Formik>
    </main>
  );
};

export default EditDataVillage;
