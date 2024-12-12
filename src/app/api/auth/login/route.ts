import axiosInstance from "@/services/axiosInstance";
import { errorUtil } from "@/utils/errorUtil";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const response = await axiosInstance.post("/auth/login", data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return errorUtil(error);
  }
}
