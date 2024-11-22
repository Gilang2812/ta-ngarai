'use client';

import { FormInput } from '@/components/inputs/FormInput';
import { useCreateHomestay } from '@/features/dashboard/homestay/useCreateHomestay'; 
import { showCreateAlert, showErrorAlert } from '@/utils/AlertUtils';
import { CreateHomestaySchema } from '@/validation/homestaySchema';
import { Spinner } from 'flowbite-react';
import { Formik, Form } from 'formik';


const NewHomestay = ({}) => {
  const initialValues:CreateHomestaySchema = {
    geom: '',
    name: '',
    address: '',
    contact_person: '',
    open: '',
    close: '',
    description: '',
    gallery: null,
    latitude: '',
    longitude: '',
  };
  const {mutate , isPending} = useCreateHomestay({
    onSuccess: () => {
      showCreateAlert('homestay')
      
    },
    onError: (error) => {
      showErrorAlert(error) 
    },
  
  })
  const handleSubmit = (values: CreateHomestaySchema) => {
    console.log('Form values:', values);
    mutate(values)
  };
  
  return (
    <main className="p-4">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} >
        {({ setFieldValue }) => (
          <Form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Homestay Details Section */}
            <section className="p-4 bg-white rounded-md space-y-4 leading-loose">
              <h2 className="mb-4 text-lg font-semibold text-center">New Homestay</h2>

              <FormInput placeholder='geo json' name="geom" type="text" label="Geo JSON"  readonly/>
              <FormInput placeholder='homestay name' name="name" type="text" label="Homestay Name" required />
              <FormInput placeholder='address' name="address" type="text" label="Address"  required/>
              <FormInput placeholder='contact person' name="contactPerson" type="text" label="Contact Person" />
              
              <div className="grid grid-cols-2 gap-4">
                <FormInput name="open" type="time" label="Open" required />
                <FormInput name="close" type="time" label="Close" required />
              </div>

              <FormInput as='textarea' name="description" type="textarea" label="Description" />
              <div className="mb-4">
                <label htmlFor="gallery" className="block text-sm text-black">
                  Gallery
                </label>
                <input
                  type="file"
                  id="gallery"
                  name="gallery"
                  className="block w-full px-2 py-1 mt-1 border border-black rounded shadow-sm"
                  multiple
                  onChange={(event) => {
                    setFieldValue('gallery', event.currentTarget.files);
                  }}
                />
              </div>

              <div className="flex space-x-4 font-normal">
                <button
                  type="reset"
                  className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md shadow-md hover:bg-gray-300"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 btn-fill-primary  shadow-md  "
                >
                 {isPending&& <Spinner />} Save & Add Facility
                </button>
              </div>
            </section>

            {/* Google Maps Section */}
            <section className="p-4 bg-white rounded-md">
              <h2 className="mb-4 text-lg font-semibold">Google Maps</h2>

              <div className="grid grid-cols-2 gap-4">
                <FormInput name="latitude" type="text" label="Latitude" placeholder="eg. -0.52435750" />
                <FormInput name="longitude" type="text" label="Longitude" placeholder="eg. 100.49234850" />
              </div>

              {/* Map Section */}
              <div
                className="flex items-center justify-center w-full h-64 text-black bg-gray-200"
                role="img"
                aria-label="Google Maps Placeholder"
              >
                Google Maps Placeholder
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default NewHomestay;
