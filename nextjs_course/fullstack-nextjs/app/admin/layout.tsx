'use client';

import { type ReactNode } from 'react';
import { BellRing, Book, LayoutDashboard, Stamp, Users } from 'lucide-react';
import SidebarLink from '@/features/ui/components/SidebarLink';
import Link from 'next/link';
import Image from 'next/image';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex">
      <div className="flex h-screen w-16 flex-col justify-between border-r bg-white">
        <div>
          <Link href="/">
            <div className="inline-flex h-16 w-16 items-center justify-center">
              <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100">
                <Image
                  priority
                  src="/assets/images/logo.png"
                  alt="Absence Management"
                  width={50}
                  height={50}
                ></Image>
              </span>
            </div>
          </Link>
          <div className="border-t border-gray-100">
            <nav className="flex flex-col p-2">
              <div className="border-b border-gray-100 py-4">
                <SidebarLink
                  title="Dashboard"
                  href="/admin/dashboard"
                  Icon={LayoutDashboard}
                ></SidebarLink>
              </div>
              <ul className="space-y-1 pt-4">
                <li>
                  <SidebarLink
                    title="Users"
                    href="/admin/users"
                    Icon={Users}
                  ></SidebarLink>
                </li>
                <li>
                  <SidebarLink
                    title="Leaves"
                    href="/admin/leaves"
                    Icon={Stamp}
                  ></SidebarLink>
                </li>
                <li>
                  <SidebarLink
                    title="Announcements"
                    href="/admin/announcements"
                    Icon={BellRing}
                  ></SidebarLink>
                </li>
                <li>
                  <SidebarLink
                    title="Blog"
                    href="/admin/articles"
                    Icon={Book}
                  ></SidebarLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <main className="w-full p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
