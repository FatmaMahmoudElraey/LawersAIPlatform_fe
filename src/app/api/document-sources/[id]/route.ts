import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_BASE_URL =
  process.env.BACKEND_API_BASE_URL ??
  "https://ai-legal-platform-backend.onrender.com";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") ?? "Students";
  const authHeader = req.headers.get("authorization");

  try {
    const backendResponse = await fetch(
      `${BACKEND_API_BASE_URL}/api/v1/${role}/document-sources/${id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          ...(authHeader && { authorization: authHeader }),
        },
      }
    );

    const data = await backendResponse.json().catch(() => null);

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: "Failed to fetch document" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data ?? {});
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
