"use client";

import { useEffect } from "react";
import TableComponent from "../../../components/tableComponent";
import useUser from "./useUser";

const User: React.FC = () => {
  const { columns, rows } = useUser();

  return (
    <main>
      <TableComponent columns={columns} rows={rows} />
    </main>
  );
};

export default User;
