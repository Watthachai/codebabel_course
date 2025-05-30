import { type Leave } from '@/features/leaves/types';
import { useEffect, useState } from 'react';

export const useGetLeaves = () => {
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState<Leave[]>([]);

  const fetchLeaves = async () => {
    const res = await fetch('http://localhost:3000/api/leaves');
    const leaves = await (res.json() as Promise<Leave[]>);

    setLeaves(leaves);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return { loading, leaves };
};
