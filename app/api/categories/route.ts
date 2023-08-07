import { DUMMY_CATEGORIES } from "@/DUMMY_DATA";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(DUMMY_CATEGORIES);
}
