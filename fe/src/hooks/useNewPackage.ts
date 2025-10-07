import { ROUTES } from "@/data/routes";
import { useCreatePackage } from "@/features/web/package/useCreatePackage";
import { useFetchPackageTypes } from "@/features/web/package/useFetchPackageTypes";
import { EditPackageSchema } from "@/types/schema/PackageSchema";
import { cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useRouter } from "next/navigation";

export const useNewPackage = () => {
  const { data: types, isLoading } = useFetchPackageTypes();
  const router = useRouter();
  const initialValues: EditPackageSchema = {
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
      router.push(ROUTES.PACKAGE);
    },
  });

  const handleSubmit = (values: EditPackageSchema) => {
    const formData = createFormData(values);
    createPackage(formData);
  };

  return { isPending, types, isLoading, handleSubmit, initialValues };
};
