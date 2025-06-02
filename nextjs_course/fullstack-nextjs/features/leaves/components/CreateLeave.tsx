'use client';

import LeaveForm from '@/features/leaves/components/LeaveForm';
import { useCreateLeave } from '@/features/leaves/hooks/api';
import { type AddLeaveInput } from '@/features/leaves/types';
import { useRouter } from 'next/navigation';

const CreateLeave = () => {
  const router = useRouter();
  const { mutateAsync } = useCreateLeave();
  const createLeave = async (form: AddLeaveInput) => {
    await mutateAsync(form);
    router.push('/leaves');
  };

  return <LeaveForm kind="create" onSubmit={createLeave}></LeaveForm>;
};

export default CreateLeave;
