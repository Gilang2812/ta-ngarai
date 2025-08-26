/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useFormikContext } from "formik";
import { Address } from "@/type/schema/CheckoutSchema";
import useGetArea from "@/features/shipping/useGetArea";
import { hideLoadingAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { debounce } from "lodash";
export const useAddressForm = () => {
  const { setFieldValue, values } = useFormikContext<Address>();
  const [input, setInput] = useState<string>("");
  const { data: areaData, isLoading, isSuccess } = useGetArea(input);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("is_primary", e.target.checked ? 1 : 0);
  };

  const areas = useMemo(() => areaData?.areas || [], [areaData]);

  const countryName = [...new Set(areas.map((item) => item.country_name))];
  console.log(areaData);
  const provinceName = [
    ...new Set(
      areas
        .filter((item) => item.country_name === values.negara)
        .map((item) => item.administrative_division_level_1_name)
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
            item.country_name === values.negara &&
            item.administrative_division_level_1_name === values.provinsi
        )
        .map((item) => item.administrative_division_level_2_name)
    ),
  ];

  const districtName = [
    ...new Set(
      areas
        .filter(
          (item) =>
            item.country_name === values.negara &&
            item.administrative_division_level_1_name === values.provinsi &&
            item.administrative_division_level_2_name === values.kota
        )
        .map((item) => item.administrative_division_level_3_name)
    ),
  ];

  const destination = areas?.find(
    (item) =>
      item.country_name == values.negara &&
      item.administrative_division_level_1_name == values.provinsi &&
      item.administrative_division_level_2_name === values.kota &&
      item.administrative_division_level_3_name === values.kecamatan
  );

  const destination_id = destination?.id || "";

  useEffect(() => {
    if (String(values.kode_post)?.length === 5) {
      debounce(() => {
        setInput(values.kode_post || "");
      }, 500)();
    }
  }, [values.kode_post]);

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
