import { useFetchObjects } from "@/features/web/common/useFetchObjects";
import { useFetchService } from "@/features/web/package/useFetchService";
import { PackageActivityFormSchema } from "@/type/schema/PackageSchema";
import { hideLoadingAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { useFormikContext } from "formik";
import { useEffect, useMemo } from "react";

const useModifyPackageForm = () => {
  const { values, errors } = useFormikContext<PackageActivityFormSchema>();
  const { data: attractionsData, isLoading: isLoadingAttractions } =
    useFetchObjects("attractions", true);
  const { data: culinaryData, isLoading: isLoadingCulinary } = useFetchObjects(
    "culinary",
    true
  );
  const { data: facilitiesData, isLoading: isLoadingFacilities } =
    useFetchObjects("facilities", true);
  const { data: souvenirsData, isLoading: isLoadingSouvenirs } =
    useFetchObjects("souvenirs", true);
  const { data: traditionalData, isLoading: isLoadingTraditional } =
    useFetchObjects("traditional", true);
  const { data: worshipData, isLoading: isLoadingWorship } = useFetchObjects(
    "worship",
    true
  );
  const { data: serviceData, isLoading: isLoadingService } = useFetchService();
  const isLoading =
    isLoadingAttractions ||
    isLoadingCulinary ||
    isLoadingFacilities ||
    isLoadingSouvenirs ||
    isLoadingTraditional ||
    isLoadingWorship ||
    isLoadingService;

  useEffect(() => {
    if (isLoading) {
      showLoadingAlert();
    }
    return () => {
      hideLoadingAlert();
    };
  }, [isLoading]);
  useEffect(() => {
    if (errors) {
      console.log(errors);
      console.log(values)
    }
  }, [errors,values]);

  const data = useMemo(() => {
    switch (values.activity_type) {
      case "A":
        return attractionsData;
      case "CP":
        return culinaryData;
      case "FC":
        return facilitiesData;
      case "SP":
        return souvenirsData;
      case "TH":
        return traditionalData;
      case "WO":
        return worshipData;
      default:
        return null;
    }
  }, [
    values.activity_type,
    attractionsData,
    culinaryData,
    facilitiesData,
    souvenirsData,
    traditionalData,
    worshipData,
  ]);

  return {
    data,
    isLoading,
    serviceData,
    isLoadingService,
  };
};

export default useModifyPackageForm;
