import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_BASE_URL =
  process.env.BACKEND_API_BASE_URL ??
  "https://ai-legal-platform-backend.onrender.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // { email, password }

    const backendResponse = await fetch(
      `${BACKEND_API_BASE_URL}/api/v1/students/auth/sign-in`,
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

    // Forward backend JSON + status (e.g. 400 with message: "Your email or password incorrect")
    return NextResponse.json(data ?? {}, { status: backendResponse.status });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected error while signing in";

    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}