import { NextResponse } from "next/server";

const BASE_URL = "https://ai-legal-platform-backend.onrender.com";

export async function GET() {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/common/analysis/platform-performing`,
      {
        method: "GET",
        headers: {
          accept: "*/*"
        },
        // Force fetch from origin, not Next.js cache, so stats stay up to date.
        cache: "no-store"
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch platform stats" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error while fetching platform stats" },
      { status: 500 }
    );
  }
}
