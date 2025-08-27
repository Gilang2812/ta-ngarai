import { useGetObjectById } from "@/features/web/object/useGetObjectByid";

const useAttraction = (id: string) => {
  const { data, isLoading } = useGetObjectById(id, "attractions");
  return { data, isLoading };
};

export default useAttraction;
