import ProtectedRoute from '@/features/auth/guards/ProtectedRoute';

const DashboardPage = () => {
  return (
    <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
      <div>Dashboard</div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
