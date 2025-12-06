/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useFormikContext } from "formik";
import { AddressForm } from "@/types/schema/CheckoutSchema";
import useGetArea from "@/features/shipping/useGetArea";
import { hideLoadingAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { debounce } from "lodash";
export const useAddressForm = () => {
  const { setFieldValue, values } = useFormikContext<AddressForm>();
  const [input, setInput] = useState<string>("");
  const { data: areaData, isLoading, isSuccess } = useGetArea(input);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("is_primary", e.target.checked ? 1 : 0);
  };

  const areas = useMemo(() => areaData?.areas || [], [areaData]);

  const countryName = [
    ...new Set(areas.map((item) => item.country_name.toLowerCase())),
  ];
 
  const provinceName = [
    ...new Set(
      areas
        .filter(
          (item) =>
            item.country_name.toLowerCase() === values.country.toLowerCase()
        )
        .map((item) => item.administrative_division_level_1_name.toLowerCase())
    ),
  ];

  useEffect(() => {
    if (isLoading) {
      showLoadingAlert();
    }
    if (isSuccess) {
      hideLoadingAlert();
    }
  }, [isLoading]);

  const cityName = [
    ...new Set(
      areas
        .filter(
          (item) =>
            item.country_name.toLowerCase() == values.country.toLowerCase() &&
            item.administrative_division_level_1_name.toLowerCase() ==
              values.province.toLowerCase()
        )
        .map((item) => item.administrative_division_level_2_name.toLowerCase())
    ),
  ];

  const districtName = [
    ...new Set(
      areas
        .filter(
          (item) =>
            item.country_name.toLowerCase() == values.country.toLowerCase() &&
            item.administrative_division_level_1_name.toLowerCase() ==
              values.province.toLowerCase() &&
            item.administrative_division_level_2_name.toLowerCase() ==
              values.regency.toLowerCase()
        )
        .map((item) => item.administrative_division_level_3_name.toLowerCase())
    ),
  ];

  const destination = areas?.find(
    (item) =>
      item.country_name.toLowerCase() === values.country.toLowerCase() &&
      item.administrative_division_level_1_name.toLowerCase() ===
        values.province.toLowerCase() &&
      item.administrative_division_level_2_name.toLowerCase() ===
        values.regency.toLowerCase() &&
      item.administrative_division_level_3_name.toLowerCase() ===
        values.district.toLowerCase()
  );

  const destination_id = destination?.id || "";

  useEffect(() => {
    if (String(values.postal_code)?.length === 5) {
      debounce(() => {
        setInput(values.postal_code || "");
      }, 500)();
    }
  }, [values.postal_code]);

  useEffect(() => {
    if (destination_id) {
      setFieldValue("destination_id", destination_id);
    }
    if (areas.length === 0) {
      setFieldValue("destination_id", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination_id, areas]);

  return {
    handleCheckboxChange,
    values,
    areas,
    countryName,
    provinceName,
    districtName,
    cityName,
    areaData,
  };
};
