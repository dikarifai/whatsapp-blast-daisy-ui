import axiosInstance from "@/services/axiosInstance";
import LayoutComponent from "../../components/layoutsComponent";
import { headers } from "next/headers";
import axios from "axios";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayut: React.FC<LayoutProps> = ({ children }) => {
  return <LayoutComponent>{children}</LayoutComponent>;
};

export default DashboardLayut;
