import axios from "axios";
import { useEffect, useState } from "react";

const useUser = () => {
  const [rows, setRows] = useState<any>();
  const getUser = async () => {
    try {
      const response = await axios.get("/api/users");

      const data = response.data.data;

      setRows(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const columns = [
    { key: "name", name: "Name" },
    { key: "username", name: "Username" },
    { key: "role", name: "Role" },
  ];

  useEffect(() => {
    getUser();
  }, []);

  return { columns, rows };
};

export default useUser;
