import React from "react";
import Button from "@/components/common/Button";
import FilePondComponent from "@/components/common/Filepond";
import { ValidateClose } from "@/components/common/ValidateClose";
import { FormInput } from "@/components/inputs/FormInput";
import GoogleMapDrawing from "@/components/map/GoogleMapDrawing";
import { Form } from "formik";
import { useAddressForm } from "@/hooks/useAddressForm";
type Props = {
  isPending: boolean;
  id?: string;
};

const MarketPlaceFormSection = ({ id, isPending }: Props) => {
  const {
    values,
    countryName,
    provinceName,
    districtName,
    cityName,
    areaData,
  } = useAddressForm();
  return (
    <Form className="space-y-2 grid grid-flow-col gap-8  ">
      <section className="space-y-2">
        <FormInput
          type="text"
          name="destination_id"
          label="destination id"
          readonly
        />
        <div>
          <FormInput
            type="number"
            name="kode_pos"
            label="Postal Code"
            autoFocus
          />
          {areaData && values.kode_pos && countryName.length === 0 && (
            <p className="text-red-600 text-sm font-bold">
              postal code not found
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput as="select" name="negara" label="Country">
            {!countryName || countryName.length === 0 ? (
              <option value="" disabled>
                No Country Available, Input Postal Code First
              </option>
            ) : (
              <>
                {countryName?.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </>
            )}
          </FormInput>
          <FormInput as="select" name="provinsi" label="State/Province">
            {!provinceName || provinceName.length === 0 ? (
              <option value="" disabled>
                No Province Available, Select Country First
              </option>
            ) : (
              <>
                {provinceName?.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </>
            )}
          </FormInput>
        </div>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <FormInput as="select" name="kota" label="City">
              {!cityName || cityName.length === 0 ? (
                <option value="" disabled>
                  No City Available
                </option>
              ) : (
                <>
                  {cityName?.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </>
              )}
            </FormInput>
            <FormInput as="select" name="kecamatan" label="District">
              {!districtName || districtName.length === 0 ? (
                <option value="" disabled>
                  No District Available, select City First
                </option>
              ) : (
                <>
                  {districtName?.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </>
              )}
            </FormInput>
          </div>
        </section>
        {id && <FormInput type={"text"} label={`id`} name="id" readonly />}
        <FormInput type={"text"} label={`name`} name="name" />
        <FormInput type={"text"} label={`address`} name="address" />
        <FormInput
          type={"number"}
          label={`contact person`}
          name="contact_person"
        />

        <FormInput type={"time"} label={`open`} name="open" />
        <FormInput type={"time"} label={`close`} name="close" />
        <FormInput type={"text"} label={`description`} name="description" />
        <FormInput type={"text"} label={`geojson`} name="geom" readonly />
        <FilePondComponent />
        <ValidateClose />
        <Button
          variant={`${isPending ? "secondary" : "default"}`}
          type="submit"
          className="h-fit"
          disabled={isPending}
          isLoading={isPending}
        >
          {id ? "edit" : "Submit"}
        </Button>
      </section>
      <section className="space-y-4">
        <GoogleMapDrawing />
      </section>
    </Form>
  );
};

export default MarketPlaceFormSection;
