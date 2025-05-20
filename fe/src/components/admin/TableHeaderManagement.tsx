import React from "react";

type Props = {
  headers: string[];
};

const TableHeaderManagement = ({ headers }: Props) => {
  return (
    <thead className="border-b-2">
      <tr>
        <th>#</th>
        {headers.map((h, index) => (
          <th key={index}>{h}</th>
        ))}
        <th>action</th>
      </tr>
    </thead>
  );
};

export default TableHeaderManagement;
