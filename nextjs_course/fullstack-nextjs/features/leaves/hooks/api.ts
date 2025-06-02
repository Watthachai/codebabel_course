import {
  type UpdateLeaveInput,
  type AddLeaveInput,
  type LeaveDetails,
  type LeaveItem,
} from '@/features/leaves/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetLeaves = () => {
  return useQuery({
    queryKey: ['leaves'],
    queryFn: async () => {
      const token = localStorage.getItem('authToken'); // Or wherever you store your token
      const res = await fetch('/api/leaves', {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your token type
          'Content-Type': 'application/json', // Add other headers as needed
        },
      });

      if (!res.ok) {
        // Handle non-success responses, e.g., throw an error
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const leaves = await (res.json() as Promise<LeaveItem[]>);

      return leaves;
    },
  });
};

export const useGetLeave = (id: LeaveDetails['id']) => {
  return useQuery({
    queryKey: ['leaves', id],
    queryFn: async () => {
      const res = await fetch(`/api/leaves/${id}`);
      const leave = await (res.json() as Promise<LeaveDetails>);

      return leave;
    },
  });
};

export const useCreateLeave = () => {
  return useMutation({
    mutationFn: async (input: AddLeaveInput) => {
      const res = await fetch('/api/leaves', {
        method: 'POST',
        body: JSON.stringify(input),
      });
      const leave = await (res.json() as Promise<LeaveDetails>);

      return leave;
    },
  });
};

export const useEditLeave = (id: LeaveDetails['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['leaves', id] });
    },
    mutationFn: async (input: UpdateLeaveInput) => {
      const res = await fetch(`/api/leaves/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(input),
      });
      const leave = await (res.json() as Promise<LeaveDetails>);

      return leave;
    },
  });
};
