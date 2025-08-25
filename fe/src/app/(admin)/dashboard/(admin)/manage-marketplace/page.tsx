"use client";
import ManagementHeader from "@/components/admin/ManagementHeader";
import TableHeaderManagement from "@/components/admin/TableHeaderManagement";
import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import DetailMarketplaceSection from "@/components/dashboard/marketplace/DetailMarketplaceSection";
import { TableRawSkeleton } from "@/components/loading/TableRawSkeleton";
import { Modal } from "@/components/modal/Modal";
import { useManageMarketplace } from "@/hooks/useManageMarketplace";
import { timeFormatter } from "@/lib/timeFormatter";
import { FaCircleInfo } from "react-icons/fa6";

const ManageMarketplace = () => {
  const tableHeaders = [
    "id",
    "name",
    "address",
    "contact_person",
    "open",
    "close",
    "description",
  ];

  const { isOpen, toggleModal, data, isLoading, selectedItem, handleSelect } =
    useManageMarketplace();

  const RenderSouvenirPlace = () => {
    if (isLoading) return <TableRawSkeleton tableHead={tableHeaders} />;
    return (
      <table className="w-full [&_td]:text-wrap [&_td]:p-2 text-sm">
        <TableHeaderManagement headers={tableHeaders} />
        <tbody>
          {data?.map((sp, index) => (
            <tr className="border-b" key={index}>
              <td>{index + 1}</td>
              <td>{sp.id}</td>
              <td>{sp.name}</td>
              <td>{sp.address}</td>
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
          <RenderSouvenirPlace />
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
