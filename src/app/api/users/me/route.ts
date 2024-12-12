import axiosInstance from "@/services/axiosInstance";
import { errorUtil } from "@/utils/errorUtil";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const response = await axiosInstance.get("/users/me");

    return NextResponse.json(response.data);
  } catch (error: any) {
    // console.log("error me: ", error);

    return errorUtil(error);
  }
}
