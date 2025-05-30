import { type Announcement } from '@/features/announcements/types';
import { faker } from '@faker-js/faker';

export const findAll = () => {
  const length = faker.helpers.rangeToNumber({ min: 3, max: 10 });
  const announcements = Array.from({ length }).map(() => ({
    id: faker.number.int(),
    title: faker.lorem.sentence(),
  }));

  return Promise.resolve(announcements);
};

export const findById = async (id: Announcement['id']) => {
  const res = await fetch(`http://localhost:5151/announcements/${id}`, {
    cache: 'no-store',
  });

  return res.json() as Promise<Announcement>;
};
