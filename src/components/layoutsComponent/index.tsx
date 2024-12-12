"use client";
import { useEffect, useState } from "react";
import HeaderComponent from "../headerComponent";
import Sidebar from "../sidebar";
import axios from "axios";
import axiosClient from "@/services/axiosClient";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  const [tittle, setTittle] = useState<string>("");
  const [name, setName] = useState<string>("");

  const getUser = async () => {
    try {
      const response = await axiosClient.get("/api/users/me");
      console.log(response.data);

      const name = response.data?.data?.name;
      setName(name);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="grid grid-cols-5">
      <Sidebar setTitle={setTittle} name={name} />
      <div className="col-span-4 flex flex-col">
        <HeaderComponent title={tittle} />
        {children}
      </div>
    </div>
  );
};

export default LayoutComponent;
