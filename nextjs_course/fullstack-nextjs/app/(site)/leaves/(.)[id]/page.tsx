import CreateLeave from '@/features/leaves/components/CreateLeave';
import LeaveDetails from '@/features/leaves/components/LeaveDetails';
import InterceptDialog from '@/features/ui/components/InterceptDialog';

interface LeaveDetailsPageProps {
  params: {
    id: string;
  };
}

const LeaveDetailsPage = ({ params: { id } }: LeaveDetailsPageProps) => {
  return (
    <InterceptDialog>
      {id === 'new' ? (
        <CreateLeave></CreateLeave>
      ) : (
        <LeaveDetails></LeaveDetails>
      )}
    </InterceptDialog>
  );
};

export default LeaveDetailsPage;
