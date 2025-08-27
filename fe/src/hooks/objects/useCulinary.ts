import { useGetObjectById } from "@/features/web/object/useGetObjectByid";

const useCulinary = (id: string) => {
  const { data, isLoading } = useGetObjectById(id, "culinary");

  return { data, isLoading };
};

export default useCulinary;
