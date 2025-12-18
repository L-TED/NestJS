'use client';

import React, { useState, useEffect } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { CreateGuestDto } from '@/lib/types/guest';
import { Tier } from '@/lib/types/tier';
import { getAllTiers } from '@/lib/api/tiers';
import { formatTierName } from '@/lib/utils/tierEmoji';

interface GuestFormProps {
  onSubmit: (data: CreateGuestDto) => Promise<void>;
  onCancel: () => void;
  initialData?: CreateGuestDto;
}

export const GuestForm: React.FC<GuestFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState<CreateGuestDto>(
    initialData || {
      name: '',
      expenditure: 0,
      tierId: 1,
    }
  );
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateGuestDto, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingTiers, setIsLoadingTiers] = useState(true);

  useEffect(() => {
    const loadTiers = async () => {
      try {
        const data = await getAllTiers();
        setTiers(data);
        if (data.length > 0 && !formData.tierId) {
          setFormData((prev) => ({ ...prev, tierId: data[0].id }));
        }
      } catch (error) {
        console.error('등급 목록 로드 오류:', error);
      } finally {
        setIsLoadingTiers(false);
      }
    };
    loadTiers();
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateGuestDto, string>> = {};

    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.expenditure || formData.expenditure < 1) {
      newErrors.expenditure = '지출 금액은 1 이상이어야 합니다.';
    }

    if (!formData.tierId || formData.tierId < 1) {
      newErrors.tierId = '등급을 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('제출 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="이름"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        required
      />

      <Input
        label="지출 금액"
        type="number"
        value={formData.expenditure || ''}
        onChange={(e) => setFormData({ ...formData, expenditure: parseInt(e.target.value) || 0 })}
        error={errors.expenditure}
        min={1}
        required
      />

      <div className="w-full">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          등급
        </label>
        {isLoadingTiers ? (
          <p className="text-sm text-gray-500">등급 목록 로딩 중...</p>
        ) : (
          <select
            value={formData.tierId}
            onChange={(e) => setFormData({ ...formData, tierId: parseInt(e.target.value) })}
            className={`
              w-full px-3 py-2 border rounded-md
              bg-white dark:bg-gray-900
              text-black dark:text-white
              border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
              ${errors.tierId ? 'border-red-500' : ''}
            `}
            required
          >
            <option value="">등급 선택</option>
            {tiers.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {formatTierName(tier.name)}
              </option>
            ))}
          </select>
        )}
        {errors.tierId && (
          <p className="mt-1 text-sm text-red-500">{errors.tierId}</p>
        )}
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          저장
        </Button>
      </div>
    </form>
  );
};

