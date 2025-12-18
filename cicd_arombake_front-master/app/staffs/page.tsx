'use client';

import { useState, useEffect } from 'react';
import { Staff } from '@/lib/types/staff';
import { getAllStaffs, createStaff, deleteStaff } from '@/lib/api/staffs';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StaffForm } from '@/components/StaffForm';
import { CreateStaffDto } from '@/lib/types/staff';
import { ApiError } from '@/lib/api/client';

export default function StaffsPage() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const loadStaffs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllStaffs();
      setStaffs(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('직원 목록을 불러오는 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStaffs();
  }, []);

  const handleCreate = async (data: CreateStaffDto) => {
    try {
      await createStaff(data);
      setIsModalOpen(false);
      await loadStaffs();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('직원 생성 중 오류가 발생했습니다.');
      }
      throw err;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStaff(id);
      setDeleteConfirmId(null);
      await loadStaffs();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('직원 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black dark:text-white">직원 관리</h1>
        <Button onClick={() => setIsModalOpen(true)}>직원 추가</Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">로딩 중...</p>
        </div>
      ) : staffs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">등록된 직원이 없습니다.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>ID</TableCell>
              <TableCell header>이름</TableCell>
              <TableCell header>나이</TableCell>
              <TableCell header>입사년도</TableCell>
              <TableCell header>작업</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffs.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.id}</TableCell>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.age}</TableCell>
                <TableCell>{staff.year}</TableCell>
                <TableCell>
                  <Button
                    variant="danger"
                    onClick={() => setDeleteConfirmId(staff.id)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="직원 추가"
      >
        <StaffForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        title="직원 삭제"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            정말로 이 직원을 삭제하시겠습니까?
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setDeleteConfirmId(null)}>
              취소
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              삭제
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

