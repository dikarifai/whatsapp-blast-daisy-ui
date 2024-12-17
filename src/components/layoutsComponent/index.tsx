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
    <div className="grid md:grid-cols-3 xl:grid-cols-5">
      <Sidebar setTitle={setTittle} />
      <div className="col-span-2 xl:col-span-4 flex flex-col relative md:px-8">
        <HeaderComponent title={tittle} name={name} />
        {children}
      </div>
    </div>
  );
};

export default LayoutComponent;
