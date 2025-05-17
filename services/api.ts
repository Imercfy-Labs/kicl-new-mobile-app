import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'https://devkicl.duckdns.org/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    employeeId: string;
    email: string;
  };
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(isJson ? data.message || 'An error occurred' : 'Network error');
  }

  return { data: data as T };
}

export async function login(loginId: string, password: string): Promise<ApiResponse<LoginResponse>> {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginId, password }),
    });

    return await handleResponse<LoginResponse>(response);
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function resetPassword(email: string): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return await handleResponse<{ message: string }>(response);
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function verifyOTP(email: string, otp: string): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(`${API_URL}/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    return await handleResponse<{ message: string }>(response);
  } catch (error: any) {
    return { error: error.message };
  }
}