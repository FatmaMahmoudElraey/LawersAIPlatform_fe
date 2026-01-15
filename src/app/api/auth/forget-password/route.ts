import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_BASE_URL =
  process.env.BACKEND_API_BASE_URL ??
  "https://ai-legal-platform-backend.onrender.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // { email }

    const backendResponse = await fetch(
      `${BACKEND_API_BASE_URL}/api/v1/students/auth/forget-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await backendResponse.json().catch(() => null);

    return NextResponse.json(data ?? {}, { status: backendResponse.status });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected error while requesting password reset";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
