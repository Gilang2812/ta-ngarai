import React from "react";
import { Table } from "../common/Table";
import TableHeaderManagement from "../admin/TableHeaderManagement";

const ManagePackageReservation = () => {
  return (
    <section>
      <Table>
        <TableHeaderManagement
          headers={[
            "ID",
            "Customer",
            "Package Name",
            "Request Date",
            "Check In",
            "Status",
          ]}
        />
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Deluxe Package</td>
            <td>2023-01-01</td>
            <td>2023-01-05</td>
            <td>Confirmed</td>
          </tr>
        </tbody>
      </Table> 
    </section>
  );
};

export default ManagePackageReservation;
