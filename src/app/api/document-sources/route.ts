// api/document-sources/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_BASE_URL =
  process.env.BACKEND_API_BASE_URL ??
  "https://ai-legal-platform-backend.onrender.com";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") ?? "Students";
  const authHeader = req.headers.get("authorization");

  console.log("API Route - Role:", role);
  console.log("API Route - Auth Header:", authHeader);

  // Check if token is null or invalid
  if (!authHeader || authHeader === "Bearer null" || authHeader === "Bearer undefined") {
    console.log("API Route - Invalid/Missing auth header");
    return NextResponse.json(
      { 
        message: "Authentication required", 
        error: "Invalid or missing token" 
      },
      { status: 401 }
    );
  }

  try {
    const backendUrl = `${BACKEND_API_BASE_URL}/api/v1/${role}/document-sources`;
    console.log("API Route - Backend URL:", backendUrl);
    
    const backendResponse = await fetch(backendUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: authHeader,
      },
    });

    console.log("API Route - Backend Response Status:", backendResponse.status);
    
    const data = await backendResponse.json().catch(() => null);
    console.log("API Route - Backend Response Data:", data);

    if (!backendResponse.ok) {
      // If backend returns 401, clear localStorage on frontend
      if (backendResponse.status === 401) {
        return NextResponse.json(
          { 
            message: "Authentication expired", 
            error: "Token expired or invalid",
            clearAuth: true 
          },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { message: "Failed to fetch document sources", backendError: data },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data ?? {});
  } catch (error) {
    console.error("API Route - Error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected error while fetching document sources";

    return NextResponse.json(
      { message, error: message },
      { status: 500 }
    );
  }
}