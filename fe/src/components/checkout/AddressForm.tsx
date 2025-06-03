"use client";

import { Search, X } from "lucide-react";
import { Address } from "@/type/schema/CheckoutSchema";
import Button from "../common/Button";
import { motion } from "framer-motion";
import { Form } from "formik";
import { FormInput } from "../inputs/FormInput";
import { CheckBoxLabel } from "../common/CheckBoxLabel";
import { useAddessForm } from "@/hooks/useAddressForm";

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
    district,
    groupedDistrict,
    handleCheckboxChange,
    kota,
    onVerify,
    province,
    values,
  } = useAddessForm();

  return (
    <motion.div
      layoutId="formAddress"
      className="bg-white p-6 rounded-lg border border-gray-200"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {addressInitialValues.id ? "Edit Address" : "Add New Address"}
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
          <div className="flex [&_>div]:flex-1 items-center  [&_>div]:mr-2">
            <FormInput
              type="number"
              name="kode_post"
              label="Postal Code"
              autoFocus
            />
            <Button className="h-fit p-1 " type="button" onClick={onVerify}>
              <Search />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
            <FormInput
              name="label"
              label="label"
              placeholder="ex : home , office"
            />
            <FormInput name="recipient_name" label="Recipient Name" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput name="recipient_phone" label="Phone" />
            <FormInput name="negara" label="Country" />
          </div>

          <>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <FormInput as="select" name="kelurahan" label="Subdistrict">
                {!groupedDistrict?.[values.kecamatan] ||
                groupedDistrict[values.kecamatan].length === 0 ? (
                  <option value="" disabled>
                    select district first
                  </option>
                ) : (
                  <>
                    {groupedDistrict[values.kecamatan]?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </>
                )}
              </FormInput>
              <FormInput as="select" name="kecamatan" label="District">
                {!district || district.length === 0 ? (
                  <option value="" disabled>
                    No District Available
                  </option>
                ) : (
                  <>
                    {district?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </>
                )}
              </FormInput>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput as="select" name="kota" label="City">
                {!kota || kota.length === 0 ? (
                  <option value="" disabled>
                    No City Available
                  </option>
                ) : (
                  <>
                    {kota?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </>
                )}
              </FormInput>
              <FormInput as="select" name="provinsi" label="State/Province">
                {!province || province.length === 0 ? (
                  <option value="" disabled>
                    No Province Available
                  </option>
                ) : (
                  <>
                    {province?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </>
                )}
              </FormInput>
            </div>
          </>

          <FormInput name="street" label="Street" />
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
            label={`set as default address ${values.is_primary}`}
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
