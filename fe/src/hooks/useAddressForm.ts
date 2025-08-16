import React from "react";
import useGetDestination from "@/features/shipping/useGetDestination";
import { useEffect, useState } from "react";
import { DestinationItem } from "@/type/schema/ShippingSchema";
import { useFormikContext } from "formik";
import { Address } from "@/type/schema/CheckoutSchema";
export const useAddessForm = () => {
  const { setFieldValue, values, setFieldError } = useFormikContext<Address>();

  const { data, refetch } = useGetDestination(values.kode_post || "");
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("is_primary", e.target.checked ? 1 : 0);
  };
  const [destinations, setDestinations] = useState<DestinationItem[] | null>(
    null
  );
  const onVerify = () => {
    setDestinations(data?.data || []);
    if (!data || Array.isArray(data) ? data?.length === 0 : !data) {
      setFieldError("kode_post", "Postal code not found");
      return;
    }
    refetch();
  };

  const district = [
    ...new Set(destinations && destinations?.map((item) => item.district_name)),
  ];
  const kota = [
    ...new Set(destinations && destinations?.map((item) => item.city_name)),
  ];
  const province = [
    ...new Set(destinations && destinations?.map((item) => item.province_name)),
  ];

  const groupedDistrict = destinations?.reduce((access, item) => {
    const key = item.district_name;
    if (!access[key]) {
      access[key] = [];
    }
    access[key].push(item.subdistrict_name);

    return access;
  }, {} as Record<string, string[]>);

  const destination = destinations?.find(
    (item) =>
      item.zip_code == values.kode_post &&
      item.district_name === values.kecamatan &&
      item.subdistrict_name === values.kelurahan
  );
  const destination_id = destination?.id || "";
 
  useEffect(() => {
    if (destination_id) {
      setFieldValue("destination_id", destination_id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination_id, data]);
  useEffect(() => {
    if (values.kode_post) {
      setDestinations(data?.data || []);
      refetch();
    }
    return () => {
      setDestinations(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.kode_post, data]);

  return {
    district,
    kota,
    province,
    groupedDistrict,
    destination_id,
    handleCheckboxChange,
    onVerify,

    values,
  };
};
