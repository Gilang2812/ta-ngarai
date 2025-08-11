import { useCreatePackage } from "@/features/web/package/useCreatePackage";
import { useFetchPackageTypes } from "@/features/web/package/useFetchPackageTypes";
import { EditPackageSchema } from "@/type/schema/PackageSchema";
import { cornerAlert } from "@/utils/AlertUtils";

export const useNewPackage = () => {
  const { data: types, isLoading } = useFetchPackageTypes();
  const initialValues: EditPackageSchema = {
    id: "",
    name: "",
    type_id: "",
    price: "" as unknown as number,
    min_capacity: "" as unknown as number,
    contact_person: "",
    description: "",
    images: [],
    video_url: [],
  };
  const { mutate: createPackage, isPending } = useCreatePackage({
    onSuccess: () => {
      cornerAlert("Package created successfully");
    },
  });

  const handleSubmit = (values: EditPackageSchema) => {
    createPackage(values);
  };

  return { isPending, types, isLoading, handleSubmit, initialValues };
};
