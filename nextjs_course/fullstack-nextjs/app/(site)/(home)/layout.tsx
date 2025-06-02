import { type ReactNode } from 'react';

interface HomeLayoutProps {
  children: ReactNode;
  articles: ReactNode;
  announcements: ReactNode;
}

const HomeLayout = ({ children, articles, announcements }: HomeLayoutProps) => {
  return (
    <>
      {children}
      {articles}
      {announcements}
    </>
  );
};

export default HomeLayout;
