import { apiRequest } from './client';
import { Staff, CreateStaffDto, ApiResponse } from '@/lib/types';

export async function getAllStaffs(): Promise<Staff[]> {
  const response = await apiRequest<Staff[]>('/staffs');
  return response.data || [];
}

export async function getStaffById(id: number): Promise<Staff> {
  const response = await apiRequest<Staff>(`/staffs/${id}`);
  if (!response.data) {
    throw new Error('직원을 찾을 수 없습니다.');
  }
  return response.data;
}

export async function createStaff(data: CreateStaffDto): Promise<Staff> {
  const response = await apiRequest<Staff>('/staffs', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!response.data) {
    throw new Error('직원 생성에 실패했습니다.');
  }
  return response.data;
}

export async function deleteStaff(id: number): Promise<void> {
  await apiRequest<void>(`/staffs/${id}`, {
    method: 'DELETE',
  });
}

