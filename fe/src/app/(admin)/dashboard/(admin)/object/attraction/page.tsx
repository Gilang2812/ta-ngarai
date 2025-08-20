import ManagementHeader from "@/components/admin/ManagementHeader";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import useManageAttraction from "@/hooks/useManageAttraction";
import React from "react";

const Attraction = () => {
  const {} = useManageAttraction();
  return (
    <SingleContentWrapper>
      <ManagementHeader title="Attraction Management" content="Attraction" />
    </SingleContentWrapper>
  );
};

export default Attraction;
