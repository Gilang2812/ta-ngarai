import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { formatPrice } from "@/lib/priceFormatter";
import {
  DetailServiceSchema,
  ServicePackage,
} from "@/type/schema/ServiceSchema";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

type Props = {
  handleAddService: () => void;
  handleDeleteService: (service: ServicePackage) => void;
  detailServices: DetailServiceSchema[];
  isManage?: boolean;
};

const PackageServiceSection = ({
  handleAddService,
  handleDeleteService,
  detailServices,
  isManage = false,
}: Props) => {
  return (
    <SingleContentWrapper className="space-y-4">
      <h2 className="text-lg text-center font-semibold mb-4">
        Service Package
      </h2>
      <section className="flex items-center">
        <Button
          className="text-nowrap"
          onClick={handleAddService}
          variant={"regEdit"}
        >
          <FaPlus /> Add Service Package
        </Button>
      </section>

      <section className="overflow-x-scroll py-4">
        <table className="w-full min-w-fit [&_td]:p-2 [&_th]:p-2">
          <thead>
            <tr className="border-b-2">
              <th>No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {detailServices?.length > 0 &&
              detailServices?.map((service, index) => (
                <tr
                  className="border-b"
                  key={` -${service?.package_id}-${index}-${service.service_package_id}`}
                >
                  <td className="text-center">{index + 1}</td>
                  <td>{service?.service?.name}</td>
                  <td>{formatPrice(service?.service?.price || 0)}</td>
                  <td>
                    {service?.service?.category === 2 ? "individu" : "group"}
                  </td>
                  <td className="flex gap-2 items-center justify-center">
                    <Button
                      onClick={() => handleDeleteService(service.service)}
                      disabled={!isManage && !service.status_created}
                      variant={"regDanger"}
                    >
                      <FaTimes />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </SingleContentWrapper>
  );
};

export default PackageServiceSection;
