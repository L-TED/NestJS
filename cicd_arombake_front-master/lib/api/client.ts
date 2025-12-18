import { ApiResponse } from "@/lib/types";

const BASE_URL = "http://localhost:3001";

export class ApiError extends Error {
  constructor(message: string, public status: number, public data: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.message || "요청 처리 중 오류가 발생했습니다.", response.status, data);
  }

  return data;
}

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("네트워크 오류가 발생했습니다.", 0, error);
  }
}
