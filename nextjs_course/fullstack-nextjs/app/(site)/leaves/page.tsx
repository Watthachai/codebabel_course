'use client';

import LeaveList from '@/features/leaves/components/LeaveList';
import { useGetLeaves } from '@/features/leaves/hooks/api';

const LeavesPage = () => {
  const { isLoading, data: leaves, error } = useGetLeaves();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <LeaveList leaves={leaves || []}></LeaveList>;
};

export default LeavesPage;
