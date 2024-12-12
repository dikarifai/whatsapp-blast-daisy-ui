import axiosInstance from "@/services/axiosInstance";
import { errorUtil } from "@/utils/errorUtil";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const response = await axiosInstance.get("/users");
    return NextResponse.json(response.data);
  } catch (error: any) {
    return errorUtil(error);
  }
}
