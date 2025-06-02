import {
  type AddLeaveInput,
  type UpdateLeaveInput,
} from '@/features/leaves/types';
import db from '@/features/shared/db';

export const findAll = async (userId: number) => {
  const leaves = await db.leave.findMany({
    where: { userId },
    select: {
      id: true,
      reason: true,
      leaveDate: true,
      status: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return leaves;
};

export const findById = async (id: number) => {
  const leave = await db.leave.findUnique({
    where: { id },
  });

  if (!leave) throw new Error('leave not found');
  return leave;
};

export const add = async (userId: number, input: AddLeaveInput) => {
  const leave = await db.leave.create({
    data: {
      ...input,
      userId,
    },
  });

  return leave;
};

export const update = async (id: number, input: UpdateLeaveInput) => {
  const leave = await db.leave.update({
    where: { id },
    data: input,
  });

  return leave;
};
