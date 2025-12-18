import { Tier } from './tier';

export interface Guest {
  id: number;
  name: string;
  expenditure: number;
  tierId: number | null;
  tier?: Tier;
}

export interface CreateGuestDto {
  name: string;
  expenditure: number;
  tierId: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}

