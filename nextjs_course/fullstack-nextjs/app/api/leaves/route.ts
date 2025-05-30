export const GET = () => {
  return Response.json([
    { id: 1, reason: 'Reason#1' },
    { id: 2, reason: 'Reason#2' },
    { id: 3, reason: 'Reason#3' },
  ]);
};
