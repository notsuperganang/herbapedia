// src/app/admin/AdminLayout.tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Jangan lakukan apa-apa saat masih loading
    if (!session || session.user.role !== 'admin') {
      // Jika tidak ada sesi atau user bukan admin, redirect ke login
      router.push('/admin/login');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || session.user.role !== 'admin') {
    // Tampilkan loading atau null sementara menunggu redirect atau jika tidak authorized
    return (
      <div className="flex justify-center items-center h-screen">
        Loading admin area...
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/admin/login' });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <div className="text-2xl font-semibold text-center">Herbapedia Admin</div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin/dashboard"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/plants"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Manage Plants
              </Link>
            </li>
            <li>
              <Link
                href="/admin/articles"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Manage Articles
              </Link>
            </li>
            {/* Tambahkan link lain jika perlu */}
          </ul>
        </nav>
        <div className="absolute bottom-6 left-6 w-52">
            <p className="text-sm text-gray-400 mb-2">Logged in as: {session.user.username}</p>
            <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
                Logout
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}