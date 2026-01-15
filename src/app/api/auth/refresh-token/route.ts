import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_BASE_URL =
  process.env.BACKEND_API_BASE_URL ??
  "https://ai-legal-platform-backend.onrender.com";

export async function POST(req: NextRequest) {
  try {
    const backendResponse = await fetch(
      `${BACKEND_API_BASE_URL}/api/v1/students/auth/refresh-token`,
      {
        method: "POST",
        // Forward cookies and auth header if present
        headers: {
          accept: "*/*",
          cookie: req.headers.get("cookie") ?? "",
          authorization: req.headers.get("authorization") ?? "",
        },
      }
    );

    const data = await backendResponse.json().catch(() => null);

    return NextResponse.json(data ?? {}, { status: backendResponse.status });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected error while refreshing token";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
