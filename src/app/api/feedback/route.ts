import { NextResponse } from "next/server";

const BASE_URL = "https://ai-legal-platform-backend.onrender.com";

export async function GET() {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/common/feedback?field=createdAt&direction=createdAt&limit=25&page=1`,
      {
        method: "GET",
        headers: {
          accept: "*/*"
        },
        cache: "no-store"
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch feedback" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error while fetching feedback" },
      { status: 500 }
    );
  }
}
