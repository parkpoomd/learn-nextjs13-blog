import { DUMMY_POSTS } from "@/DUMMY_DATA";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(DUMMY_POSTS);
}
