'use client';

import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { CreateStaffDto } from '@/lib/types/staff';

interface StaffFormProps {
  onSubmit: (data: CreateStaffDto) => Promise<void>;
  onCancel: () => void;
  initialData?: CreateStaffDto;
}

export const StaffForm: React.FC<StaffFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState<CreateStaffDto>(
    initialData || {
      name: '',
      age: 0,
      year: new Date().toISOString().split('T')[0],
    }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof CreateStaffDto, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateStaffDto, string>> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = '이름은 최소 2자 이상이어야 합니다.';
    }

    if (!formData.age || formData.age < 1) {
      newErrors.age = '나이는 1 이상이어야 합니다.';
    }

    if (!formData.year) {
      newErrors.year = '입사년도를 입력해주세요.';
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.year)) {
        newErrors.year = '날짜 형식이 올바르지 않습니다. (YYYY-MM-DD)';
      }
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
        label="나이"
        type="number"
        value={formData.age || ''}
        onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
        error={errors.age}
        min={1}
        required
      />

      <Input
        label="입사년도"
        type="date"
        value={formData.year}
        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        error={errors.year}
        required
      />

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

