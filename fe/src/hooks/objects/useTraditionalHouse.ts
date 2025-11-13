import { useGetObjectById } from "@/features/web/object/useGetObjectByid";

const useTraditionalHouse = (id: string) => {
    const { data, isLoading } = useGetObjectById(id, "traditional");

    return { data, isLoading };
};

export default useTraditionalHouse;
