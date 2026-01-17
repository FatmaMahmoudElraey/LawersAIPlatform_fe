import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const search = searchParams.get('search');
    const subject = searchParams.get('subject');
    const difficulty = searchParams.get('difficulty');
    const questionTypes = searchParams.get('questionTypes');
    
    // Get Authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization header required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Build query string for backend API
    const backendParams = new URLSearchParams();
    
    if (search) {
      backendParams.append('search', search);
    }
    
    if (subject) {
      backendParams.append('subject', subject);
    }
    
    if (difficulty) {
      backendParams.append('difficulty', difficulty);
    }
    
    if (questionTypes) {
      backendParams.append('questionTypes', questionTypes);
    }
    
    // Always include role for student
    backendParams.append('role', 'Students');
    
    console.log('Fetching exam questions with params:', backendParams.toString());
    
    // Make request to backend API
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/exam-questions?${backendParams.toString()}`;
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Backend API error:', response.status, response.statusText);
      
      if (response.status === 401) {
        return NextResponse.json(
          { message: 'Unauthorized - Invalid or expired token' },
          { status: 401 }
        );
      }
      
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || `Backend API error: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    console.log('Exam questions fetched successfully:', data);
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error in exam questions API route:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
