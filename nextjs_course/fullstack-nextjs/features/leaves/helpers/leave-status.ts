import { type LeaveItem } from '@/features/leaves/types';

export const statusColor = (status: LeaveItem['status']) => {
  switch (status) {
    case 'PENDING':
      return 'bg-cyan-500';
    case 'APPROVED':
      return 'bg-green-500';
    case 'REJECTED':
      return 'bg-red-500';
  }
};
