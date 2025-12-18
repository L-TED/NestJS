'use client';

import { useState, useEffect } from 'react';
import { Guest } from '@/lib/types/guest';
import { getAllGuests, createGuest, deleteGuest } from '@/lib/api/guests';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { GuestForm } from '@/components/GuestForm';
import { CreateGuestDto } from '@/lib/types/guest';
import { ApiError } from '@/lib/api/client';
import { formatTierName } from '@/lib/utils/tierEmoji';

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const loadGuests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllGuests();
      setGuests(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('고객 목록을 불러오는 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGuests();
  }, []);

  const handleCreate = async (data: CreateGuestDto) => {
    try {
      await createGuest(data);
      setIsModalOpen(false);
      await loadGuests();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('고객 생성 중 오류가 발생했습니다.');
      }
      throw err;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteGuest(id);
      setDeleteConfirmId(null);
      await loadGuests();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('고객 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black dark:text-white">고객 관리</h1>
        <Button onClick={() => setIsModalOpen(true)}>고객 추가</Button>
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
      ) : guests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">등록된 고객이 없습니다.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>ID</TableCell>
              <TableCell header>이름</TableCell>
              <TableCell header>지출 금액</TableCell>
              <TableCell header>등급</TableCell>
              <TableCell header>작업</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell>{guest.id}</TableCell>
                <TableCell>{guest.name}</TableCell>
                <TableCell>{guest.expenditure.toLocaleString()}원</TableCell>
                <TableCell className="text-lg">{formatTierName(guest.tier?.name)}</TableCell>
                <TableCell>
                  <Button
                    variant="danger"
                    onClick={() => setDeleteConfirmId(guest.id)}
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
        title="고객 추가"
      >
        <GuestForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        title="고객 삭제"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            정말로 이 고객을 삭제하시겠습니까?
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

