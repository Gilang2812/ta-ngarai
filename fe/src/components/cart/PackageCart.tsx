import { useDeleteCart } from "@/features/web/cart/useDeleteCart";
import {
  CartProps,
  useFetchUserCarts,
} from "@/features/web/cart/useFetchUserCarts";
import { CartSchema } from "@/types/schema/CartSchema";
import { confirmDeleteAlert, showDeleteAlert } from "@/utils/AlertUtils";
import React, { useMemo } from "react";
import { EmptyCart } from "../craft/EmptyCart";
import Link from "next/link";
import { Tooltip } from "flowbite-react";
import { FaTrash } from "react-icons/fa6";
import CraftCartSkeletonLoader from "../loading/CraftCartSkeletonLoader";
import Button from "../common/Button";
import useTableManagement from "@/hooks/useTableManagement";
import useSearchTable from "@/hooks/useSearchTable";
import TableManagementHeader from "../admin/TableManagementHeader";
import ManagementFooter from "../admin/ManagementFooter";
import { ROUTES } from "@/data/routes";
import TableHeaderManagement from "../admin/TableHeaderManagement";
import useUserRole from "@/hooks/useUserRole";

const PackageCart = () => {
  const { data, refetch, isLoading } = useFetchUserCarts();
  const { searchTerm, handleSearch } = useSearchTable();

  const filteredData = useMemo(() => {
    return (
      data?.filter((item) => {
        const { package: p, ...rest } = item;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...restOfItem } = p;
        const flat = { ...rest, ...(restOfItem || {}) };
        return Object.keys(flat).some((key) => {
          const value = flat[key as keyof CartSchema];
          return String(value)
            .toLowerCase()
            .trim()
            .includes(searchTerm.trim().toLowerCase());
        });
      }) || []
    );
  }, [searchTerm, data]);

  const {
    handleNextPage,
    handlePrevPage,
    handleItemsPerPage,
    itemsPerPage,
    currentItems,
    currentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
  } = useTableManagement<CartProps>(filteredData);

  const { mutate } = useDeleteCart({
    onSuccess: () => {
      showDeleteAlert("Cart");
      refetch();
    },
  });
  const handleDeleteCart = (id: string) => {
    confirmDeleteAlert("Cart", id, () => mutate(id));
  };

  const { isUserAuth } = useUserRole();
  if (data?.length == 0)
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyCart />
      </div>
    );

  if (isLoading) return <CraftCartSkeletonLoader />;
  return (
    <div className="py-4">
      <section aria-labelledby="data-table-section">
        <TableManagementHeader
          itemsPerPage={itemsPerPage}
          handleItemsPerPage={handleItemsPerPage}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
        />
        <h2 id="data-table-section" className="sr-only">
          Package Data Table
        </h2>

        <table className="min-w-full [&_td]:px-8 table-fixed bg-white">
          <TableHeaderManagement headers={["ID", "Package"]} />
          <tbody>
            {currentItems?.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="py-2 text-center">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-2 text-center">{item.id}</td>
                <td className="py-2">{item.package.name}</td>
                <td className="flex justify-center items-center flex-wrap md:flex-nowrap gap-4 py-2  w font-normal">
                  <Link
                    href={`/web/package/${item.package_id}`}
                    className="px-4 py-2 capitalize transition duration-300 ease-linear bg-white border rounded text-primary border-primary hover:bg-primary hover:text-white disabled:opacity-50 text-nowrap"
                    aria-label={`More info about ${item.package_id}`}
                  >
                    More Info
                  </Link>
                  <Button
                    variant={"success"}
                    className="text-nowrap"
                    aria-label={`Book ${item.package_id}`}
                    asChild
                    disabled={!isUserAuth}
                  >
                    {isUserAuth ? (
                      <Link href={ROUTES.PACKAGE_RESERVATION(item.package_id)}>
                        Book Now
                      </Link>
                    ) : (
                      "Login First"
                    )}
                  </Button>
                  <Tooltip content="delete" placement="bottom">
                    <Button
                      variant={"regDanger"}
                      onClick={() => handleDeleteCart(String(item.id))}
                      aria-label={`Delete ${item.package_id}`}
                    >
                      <FaTrash />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <ManagementFooter
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        totalItems={filteredData.length}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

export default PackageCart;
