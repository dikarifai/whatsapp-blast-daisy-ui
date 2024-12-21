import axiosInstance from "@/services/axiosInstance";
import { errorUtil } from "@/utils/errorUtil";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const response = await axiosInstance.get("/dashboard");

    return NextResponse.json(response.data);
  } catch (error) {
    return errorUtil(error);
  }
}
