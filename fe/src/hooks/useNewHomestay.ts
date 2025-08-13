import { ROUTES } from "@/data/routes";
import { useCreateHomestay } from "@/features/dashboard/homestay/useCreateHomestay";
import { cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { CreateHomestaySchema } from "@/validation/homestaySchema";
import { useRouter } from "next/navigation";

export const useNewHomestay = () => {
  const router = useRouter();
  const initialValues: CreateHomestaySchema = {
    geom: "",
    name: "",
    address: "",
    contact_person: "",
    open: "",
    close: "",
    description: "",
    images: [],
    latitude: "",
    longitude: "",
  };
  const { mutate, isPending } = useCreateHomestay({
    onSuccess: () => {
      cornerAlert("homestay created successfully");
      router.push(ROUTES.HOMESTAY);
    },
  });
  const handleSubmit = (values: CreateHomestaySchema) => {
    const formData = createFormData(values);
    mutate(formData);
  };

  return { isPending, initialValues, handleSubmit };
};
