import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const errorUtil = async (error: any) => {
  console.log("error: ", error);

  const data = error.response.data || error.message;
  const status = error.status || 500;

  if (error.status === 401) {
    const cookie = await cookies();
    cookie.delete("token");
  }

  return NextResponse.json({ data }, { status: status });
};
