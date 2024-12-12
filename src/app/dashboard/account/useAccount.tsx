"use client";

import axiosInstance from "@/services/axiosInstance";
import axios from "axios";
import { useEffect, useState } from "react";

interface FormDataTypes {
  name: string;
  phoneNumber: string;
}

const initialFormData = {
  name: "",
  phoneNumber: "",
};

const useAccount = () => {
  const [rows, setRows] = useState<any[]>();
  const [isShow, setIsShow] = useState<boolean>();
  const [qr, setQr] = useState<string>("");
  const [formData, setFormData] = useState<FormDataTypes>(initialFormData);
  const getAccounts = async () => {
    try {
      const response = await axios.get("/api/accounts");

      setRows(response.data.data);
    } catch (error) {}
  };

  const postAccount = async () => {
    try {
      const response = await axios.post("/api/accounts");
    } catch (error) {}
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/accounts", formData);
      setFormData(initialFormData);
      await getAccounts();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleSetQr = (qr: string) => {
    setQr(qr);
  };

  const handleScanClick = async (phone: string) => {
    try {
      const response = await axios.post("/api/blast/scan", { number: phone });
      console.log(response.data.qr);
      setQr(response.data.qr);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const columns = [
    { key: "name", name: "Name" },
    { key: "phoneNumber", name: "Phone Number" },
    {
      key: "isActive",
      name: "Is Active",
      render: (item: any) => (item.isActive ? "Actived" : "Deactived"),
    },
    {
      key: "action",
      name: "Action",
      render: (item: any) => (
        <label
          htmlFor="my_modal_7"
          onClick={() => handleScanClick(item.phoneNumber)}
          className="btn btn-success text-white"
        >
          Scan
        </label>
      ),
    },
  ];

  useEffect(() => {
    getAccounts();
  }, []);

  return {
    columns,
    rows,
    isShow,
    qr,
    formData,
    handleSetQr,
    handleChange,
    handleSubmit,
  };
};

export default useAccount;
