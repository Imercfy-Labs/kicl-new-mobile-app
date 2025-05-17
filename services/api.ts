import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'https://devkicl.duckdns.org/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: any;
    name: string;
    email: string;
    role: string;
    branch_id: any;
  };
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  try {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    
    // Log response details for debugging
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    const data = isJson ? await response.json() : await response.text();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(isJson ? data.message || 'An error occurred' : 'Network error');
    }

    return { data: data as T };
  } catch (error) {
    console.error('Error handling response:', error);
    throw error;
  }
}

export async function login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
  try {
    console.log('Making login request with:', { email, password });
    console.log('API URL:', API_URL);
    
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8081'
      },
      mode: 'cors',
      body: JSON.stringify({ email, password }),
    });

    const result = await handleResponse<LoginResponse>(response);
    console.log('Login result:', result);
    return result;
  } catch (error: any) {
    console.error('Login error:', error);
    return { error: error.message || 'Failed to connect to the server' };
  }
}

export async function resetPassword(email: string): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8081'
      },
      mode: 'cors',
      body: JSON.stringify({ email }),
    });

    return await handleResponse<{ message: string }>(response);
  } catch (error: any) {
    return { error: error.message || 'Failed to connect to the server' };
  }
}

export async function verifyOTP(email: string, otp: string): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(`${API_URL}/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8081'
      },
      mode: 'cors',
      body: JSON.stringify({ email, otp }),
    });

    return await handleResponse<{ message: string }>(response);
  } catch (error: any) {
    return { error: error.message || 'Failed to connect to the server' };
  }
}