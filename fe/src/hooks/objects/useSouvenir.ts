import { useGetObjectById } from "@/features/web/object/useGetObjectByid";

const useSouvenir = (id: string) => {
  const { data, isLoading } = useGetObjectById(id, "souvenirs");

  return { data, isLoading };
};

export default useSouvenir;
