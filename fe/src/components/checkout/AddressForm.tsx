"use client";

import { X } from "lucide-react";
import { Address } from "@/types/schema/CheckoutSchema";
import Button from "../common/Button";
import { motion } from "framer-motion";
import { Form } from "formik";
import { FormInput } from "../inputs/FormInput";
import { CheckBoxLabel } from "../common/CheckBoxLabel";
import { useAddressForm } from "@/hooks/useAddressForm";

interface AddressFormProps {
  onSave: (values: Address) => void;
  onCancel: () => void;
  addressInitialValues: Address;
  isPending?: boolean;
}

export const AddressForm = ({
  onCancel,
  addressInitialValues,
  isPending,
}: AddressFormProps) => {
  const {
    handleCheckboxChange,
    values,
    countryName,
    provinceName,
    districtName,
    cityName,
    areaData,
  } = useAddressForm();

  return (
    <motion.div
      layoutId="formAddress"
      className="bg-white p-6 rounded-lg border border-gray-200"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {addressInitialValues.address_id ? "Edit Address" : "Add New Address"}
        </h3>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={onCancel}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <Form>
        <div className="grid grid-cols-1 gap-2">
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

          <>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput name="kelurahan" label="Subdistrict" />
              <FormInput name="recipient_phone" label="Phone" />
            </div>
          </>
          <FormInput name="street" label="Street" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
            <FormInput
              name="label"
              label="label"
              placeholder="ex : home , office"
            />
            <FormInput name="recipient_name" label="Recipient Name" />
          </div>
          <FormInput
            name="details"
            label="Address Details"
            placeholder="Apartment, suite, etc. (optional)"
            as="textarea"
            rows={3}
          />

          <CheckBoxLabel
            checked={values.is_primary === 1}
            id="is_primary"
            name="is_primary"
            label={`set as default address  `}
            onChange={handleCheckboxChange}
          />
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isPending}>
            Save Address
          </Button>
        </div>
      </Form>
    </motion.div>
  );
};
