import React from "react";

type Props = {
  headers: string[];
  action?: boolean;
};

const TableHeaderManagement = ({ headers, action = true }: Props) => {
  return (
    <thead className="border-b-2">
      <tr>
        <th>#</th>
        {headers.map((h, index) => (
          <th key={index}>{h}</th>
        ))}
        {action && <th className="text-center w-fit">Action</th>}
      </tr>
    </thead>
  );
};

export default TableHeaderManagement;
