"use client";

import {
  addAccount,
  deleteAccountById,
  getAccounts,
} from "@/lib/features/accountsSlice";
import { resetScan, scanBlast } from "@/lib/features/blastSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axiosInstance from "@/services/axiosInstance";
import { AccountAddRequest, AccountTypes } from "@/types/accountTypes";
import { ScanBlatsResponse } from "@/types/blastTypes";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface FormDataTypes {
  name: string;
  phoneNumber: string;
}

const initialFormData = {
  name: "",
  phoneNumber: "",
};

const useAccount = () => {
  const rows = useAppSelector((state) => state.accounts);
  const scan = useAppSelector((state) => state.blast);
  const [isShow, setIsShow] = useState<boolean>();
  const [formData, setFormData] = useState<AccountAddRequest>(initialFormData);
  const [dataDelete, setDataDelete] = useState<AccountTypes>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [scanModal, setScanModal] = useState<boolean>(false);
  const dispacth = useAppDispatch();
  const labelFormRef = useRef<HTMLLabelElement>(null);
  const labelDeleteRef = useRef<HTMLLabelElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const resp = await dispacth(addAccount(formData));
      if (addAccount.fulfilled.match(resp)) {
        setFormData(initialFormData);
        await dispacth(getAccounts());
        if (labelFormRef.current) {
          labelFormRef.current.click();
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleScanClick = async (phone: string) => {
    try {
      dispacth(scanBlast(phone));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleDeleteModal = (item: AccountTypes) => {
    setDeleteModal(true);
    setDataDelete(item);
  };

  const handleDeleteClick = async (id: number) => {
    const resp = await dispacth(deleteAccountById(id));
    if (deleteAccountById.fulfilled.match(resp)) {
      labelDeleteRef.current?.click();
      await dispacth(getAccounts());
    }
  };

  const handleResetScan = () => {
    dispacth(resetScan());
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
        <div className="flex flex-row gap-4">
          <label
            htmlFor="my_modal_7"
            onClick={() => handleScanClick(item.phoneNumber)}
            className="btn btn-success text-white"
          >
            Scan
          </label>
          <label
            htmlFor="delete-modal"
            ref={labelDeleteRef}
            onClick={() => handleDeleteModal(item)}
            className="btn bg-red-600 text-white"
          >
            Delete
          </label>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispacth(getAccounts());
  }, [dispacth]);

  return {
    columns,
    rows,
    isShow,
    formData,
    scan,
    dataDelete,
    deleteModal,
    labelFormRef,
    setDeleteModal,
    handleResetScan,
    handleDeleteClick,
    handleChange,
    handleSubmit,
  };
};

export default useAccount;
