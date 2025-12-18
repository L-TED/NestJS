import { Guest } from './guest';

export interface Tier {
  id: number;
  name: string;
  guests?: Guest[];
}

export interface CreateTierDto {
  // 현재 비어있음
}

export interface UpdateTierDto {
  // CreateTierDto의 모든 필드를 선택적으로 받을 수 있음
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}

