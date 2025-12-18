export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}

export * from './staff';
export * from './guest';
export * from './tier';

