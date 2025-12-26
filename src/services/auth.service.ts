// src/services/auth.service.ts
import { cookies } from 'next/headers';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'lawyer' | 'firm_admin';
  avatar?: string;
}

const BACKEND_API_BASE_URL =
  process.env.BACKEND_API_BASE_URL ?? 'https://ai-legal-platform-backend.onrender.com';

export interface RegisterStudentPayload {
  name: string;
  email: string;
  password: string;
  languagePreference: string;
  role: string;
}

export interface RegisterStudentSuccessResponse {
  [key: string]: unknown;
}

export interface RegisterStudentErrorResponse {
  message?: string[] | string;
  errorName?: string;
  [key: string]: unknown;
}

export async function registerStudent(
  payload: RegisterStudentPayload
): Promise<RegisterStudentSuccessResponse> {
  const response = await fetch(
    `${BACKEND_API_BASE_URL}/api/v1/students/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
      },
      body: JSON.stringify(payload),
    }
  );

  const data = (await response.json().catch(() => null)) as
    | RegisterStudentSuccessResponse
    | RegisterStudentErrorResponse
    | null;

  if (!response.ok) {
    const error: RegisterStudentErrorResponse = data ?? {};
    const messages = Array.isArray(error.message)
      ? error.message.join('\n')
      : typeof error.message === 'string'
      ? error.message
      : 'Registration failed';

    throw new Error(messages);
  }

  return (data ?? {}) as RegisterStudentSuccessResponse;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token');
  
  if (!token) {
    return null;
  }
  
  // In a real app, you would validate the token with your backend
  // For now, return mock user based on stored role
  const userRole = cookieStore.get('user_role');
  
  if (!userRole) {
    return null;
  }
  
  return {
    id: '1',
    email: 'user@example.com',
    name: 'Demo User',
    role: userRole.value as User['role']
  };
}