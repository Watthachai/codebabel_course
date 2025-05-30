import { type Leave } from '@/features/leaves/types';

interface LeaveListProps {
  leaves: Leave[];
}

const LeaveList = ({ leaves }: LeaveListProps) => {
  return (
    <ul>
      {leaves.map((leave) => (
        <li key={leave.id}>{leave.reason}</li>
      ))}
    </ul>
  );
};

export default LeaveList;
