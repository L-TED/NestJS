export interface Staff {
  id: number;
  name: string;
  age: number;
  year: string; // YYYY-MM-DD 형식
}

export interface CreateStaffDto {
  name: string;
  age: number;
  year: string; // YYYY-MM-DD 형식
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}

