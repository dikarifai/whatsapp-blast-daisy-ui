import axios from "axios";
import { useEffect, useRef, useState } from "react";

const useUser = () => {
  const [rows, setRows] = useState<any>();
  const getUser = async () => {
    try {
      const response = await axios.get("/users");

      const data = response.data.data;

      setRows(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const labelDeleteRef = useRef<HTMLLabelElement>(null);

  const columns = [
    { key: "name", name: "Name" },
    { key: "username", name: "Username" },
    { key: "role", name: "Role" },
    {
      key: "action",
      name: "Action",
      render: (item: any) => (
        <div className="flex flex-row gap-4">
          <label
            htmlFor="delete-modal"
            ref={labelDeleteRef}
            // onClick={() => handleDeleteModal(item)}
            className="btn bg-red-600 text-white"
          >
            Delete
          </label>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getUser();
  }, []);

  return { columns, rows };
};

export default useUser;
