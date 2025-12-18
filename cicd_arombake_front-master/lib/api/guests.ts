import { apiRequest } from './client';
import { Guest, CreateGuestDto, ApiResponse } from '@/lib/types';

export async function getAllGuests(): Promise<Guest[]> {
  const response = await apiRequest<Guest[]>('/guests');
  return response.data || [];
}

export async function getGuestById(id: number): Promise<Guest> {
  const response = await apiRequest<Guest>(`/guests/${id}`);
  if (!response.data) {
    throw new Error('고객을 찾을 수 없습니다.');
  }
  return response.data;
}

export async function createGuest(data: CreateGuestDto): Promise<Guest> {
  const response = await apiRequest<Guest>('/guests', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!response.data) {
    throw new Error('고객 생성에 실패했습니다.');
  }
  return response.data;
}

export async function deleteGuest(id: number): Promise<void> {
  await apiRequest<void>(`/guests/${id}`, {
    method: 'DELETE',
  });
}

