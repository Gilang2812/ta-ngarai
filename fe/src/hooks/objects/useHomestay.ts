import { useGetObjectById } from "@/features/web/object/useGetObjectByid";

const useHomestay = (id: string) => {
  const { data, isLoading } = useGetObjectById(id, "homestay");

  return { data, isLoading };
};

export default useHomestay;
