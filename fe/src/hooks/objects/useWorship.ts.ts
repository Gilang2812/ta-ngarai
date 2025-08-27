import { useGetObjectById } from "@/features/web/object/useGetObjectByid";

const useWorship = (id: string) => {
    const { data, isLoading } = useGetObjectById(id, "worship");

  return {data,isLoading};
};

export default useWorship;
