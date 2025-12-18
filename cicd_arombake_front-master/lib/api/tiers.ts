import { apiRequest } from './client';
import { Tier, CreateTierDto, UpdateTierDto, ApiResponse } from '@/lib/types';

export async function getAllTiers(): Promise<Tier[]> {
  const response = await apiRequest<Tier[]>('/tiers');
  return response.data || [];
}

export async function getTierById(id: number): Promise<Tier> {
  const response = await apiRequest<Tier>(`/tiers/${id}`);
  if (!response.data) {
    throw new Error('등급을 찾을 수 없습니다.');
  }
  return response.data;
}

export async function createTier(data: CreateTierDto = {}): Promise<Tier> {
  const response = await apiRequest<Tier>('/tiers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!response.data) {
    throw new Error('등급 생성에 실패했습니다.');
  }
  return response.data;
}

export async function updateTier(id: number, data: UpdateTierDto): Promise<Tier> {
  const response = await apiRequest<Tier>(`/tiers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  if (!response.data) {
    throw new Error('등급 수정에 실패했습니다.');
  }
  return response.data;
}

export async function deleteTier(id: number): Promise<void> {
  await apiRequest<void>(`/tiers/${id}`, {
    method: 'DELETE',
  });
}

