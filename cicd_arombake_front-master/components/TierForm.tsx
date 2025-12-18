'use client';

import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { UpdateTierDto } from '@/lib/types/tier';

interface TierFormProps {
  onSubmit: (data: UpdateTierDto) => Promise<void>;
  onCancel: () => void;
  initialData?: { name?: string };
  isEdit?: boolean;
}

export const TierForm: React.FC<TierFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<UpdateTierDto>(
    initialData || {}
  );
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};

    // 등급 수정 시 이름이 제공되면 검증
    if (isEdit && formData.name !== undefined && !formData.name.trim()) {
      newErrors.name = '등급 이름을 입력해주세요.';
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
      // 생성 모드일 때는 빈 객체 전달, 수정 모드일 때는 formData 전달
      const submitData = isEdit ? formData : {};
      await onSubmit(submitData);
    } catch (error) {
      console.error('제출 오류:', error);
      throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isEdit && (
        <Input
          label="등급 이름"
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
      )}

      {!isEdit && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          등급을 생성하시겠습니까?
        </p>
      )}

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {isEdit ? '수정' : '생성'}
        </Button>
      </div>
    </form>
  );
};

