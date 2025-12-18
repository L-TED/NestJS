'use client';

import { useState, useEffect } from 'react';
import { Tier } from '@/lib/types/tier';
import { getAllTiers, createTier, updateTier, deleteTier } from '@/lib/api/tiers';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { TierForm } from '@/components/TierForm';
import { UpdateTierDto } from '@/lib/types/tier';
import { ApiError } from '@/lib/api/client';
import { formatTierName } from '@/lib/utils/tierEmoji';

export default function TiersPage() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editTierId, setEditTierId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const loadTiers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllTiers();
      setTiers(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('등급 목록을 불러오는 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTiers();
  }, []);

  const handleCreate = async (data: UpdateTierDto) => {
    try {
      await createTier(data);
      setIsCreateModalOpen(false);
      await loadTiers();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('등급 생성 중 오류가 발생했습니다.');
      }
      throw err;
    }
  };

  const handleUpdate = async (data: UpdateTierDto) => {
    if (editTierId === null) return;
    try {
      await updateTier(editTierId, data);
      setEditTierId(null);
      await loadTiers();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('등급 수정 중 오류가 발생했습니다.');
      }
      throw err;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTier(id);
      setDeleteConfirmId(null);
      await loadTiers();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('등급 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const editingTier = editTierId ? tiers.find((t) => t.id === editTierId) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black dark:text-white">등급 관리</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>등급 추가</Button>
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
      ) : tiers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">등록된 등급이 없습니다.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell header>ID</TableCell>
              <TableCell header>등급 이름</TableCell>
              <TableCell header>작업</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tiers.map((tier) => (
              <TableRow key={tier.id}>
                <TableCell>{tier.id}</TableCell>
                <TableCell className="text-lg">{formatTierName(tier.name)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => setEditTierId(tier.id)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => setDeleteConfirmId(tier.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="등급 추가"
      >
        <TierForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          isEdit={false}
        />
      </Modal>

      <Modal
        isOpen={editTierId !== null}
        onClose={() => setEditTierId(null)}
        title="등급 수정"
      >
        {editingTier && (
          <TierForm
            onSubmit={handleUpdate}
            onCancel={() => setEditTierId(null)}
            initialData={{ name: editingTier.name }}
            isEdit={true}
          />
        )}
      </Modal>

      <Modal
        isOpen={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        title="등급 삭제"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            정말로 이 등급을 삭제하시겠습니까?
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

