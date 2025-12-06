"use client";
import ManagementFooter from "@/components/admin/ManagementFooter";
import ManagementHeader from "@/components/admin/ManagementHeader";
import TableHeaderManagement from "@/components/admin/TableHeaderManagement";
import TableManagementHeader from "@/components/admin/TableManagementHeader";
import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import DetailMarketplaceSection from "@/components/dashboard/marketplace/DetailMarketplaceSection";
import { TableRawSkeleton } from "@/components/loading/TableRawSkeleton";
import { Modal } from "@/components/modal/Modal";
import { useManageMarketplace } from "@/hooks/useManageMarketplace";
import useSearchTable from "@/hooks/useSearchTable";
import useTableManagement from "@/hooks/useTableManagement";
import { formatAddress } from "@/lib/addressFormatter";
import { timeFormatter } from "@/lib/timeFormatter";
import { SimplifiedObject } from "@/types/schema/PackageSchema";
import { useMemo } from "react";
import { FaCircleInfo } from "react-icons/fa6";

const ManageMarketplace = () => {
  const tableHeaders = [
    "id",
    "name",
    "address",
    "contact person",
    "open",
    "close",
    "description",
  ];

  const { isOpen, toggleModal, data, isLoading, selectedItem, handleSelect } =
    useManageMarketplace();
  const { handleSearch, searchTerm } = useSearchTable();
  const filteredData = useMemo(() => {
    return (
      data?.filter((item) => {
        const request = {
          id: item.id,
          name: item.name,
          country: item?.location?.country,
          province: item?.location?.province,
          regency: item?.location?.regency,
          district: item?.location?.district,
          village: item?.location?.village,
          postal_code: item?.location?.postal_code,
          street: item?.street,
          contact_person: item?.contact_person,
          open: item?.open,
          close: item?.close,
          description: item?.description,
        };
        return Object.values(request)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }) ?? []
    );
  }, [data, searchTerm]);

  const {
    handleNextPage,
    handlePrevPage,
    handleItemsPerPage,
    currentItems,
    currentPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems,
  } = useTableManagement(filteredData);

  const RenderSouvenirPlace = () => {
    if (isLoading) return <TableRawSkeleton tableHead={tableHeaders} />;
    return (
      <table className="w-full [&_td]:text-wrap [&_td]:p-2 text-sm">
        <TableHeaderManagement headers={tableHeaders} />
        <tbody>
          {currentItems?.map((sp, index) => (
            <tr className="border-b" key={index}>
              <td>{index + indexOfFirstItem + 1}</td>
              <td>{sp.id}</td>
              <td>{sp.name}</td>
              <td>{formatAddress(sp as unknown as SimplifiedObject)}</td>
              <td>{sp.contact_person}</td>
              <td>{timeFormatter(sp.open)}</td>
              <td>{timeFormatter(sp.close)}</td>
              <td>{sp.description}</td>
              <td>
                <div className="flex gap-2 justify-center items-center">
                  <Button onClick={() => handleSelect(sp)}>
                    <FaCircleInfo />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    data && (
      <SingleContentWrapper>
        <ManagementHeader title="manage marketplace" />
        <section>
          <TableManagementHeader
            handleItemsPerPage={handleItemsPerPage}
            handleSearch={handleSearch}
            itemsPerPage={itemsPerPage}
            searchTerm={searchTerm}
          />
          <RenderSouvenirPlace />
          <ManagementFooter
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
            totalItems={totalItems}
            totalPages={totalPages}
          />
        </section>

        <Modal
          isOpen={isOpen}
          onClose={toggleModal}
          title={`Detail Marketplace`}
        >
          <DetailMarketplaceSection souvenirPlace={selectedItem} />
        </Modal>
      </SingleContentWrapper>
    )
  );
};

export default ManageMarketplace;
