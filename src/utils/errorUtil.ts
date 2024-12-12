import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const errorUtil = async (error: any) => {
  const data = error.response.data;
  const status = error.status;

  if (error.status === 401) {
    const cookie = await cookies();
    cookie.delete("token");
  }

  return NextResponse.json({ data }, { status: status });
};
