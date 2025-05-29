// src/app/admin/login/page.tsx
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'admin') {
      // Jika sudah login sebagai admin, redirect ke dashboard admin
      // Kita akan buat halaman dashboard nanti, untuk sementara redirect ke /admin
      router.push('/admin/dashboard'); // Ganti dengan path dashboard admin
    }
  }, [status, session, router]);

  useEffect(() => {
    const callbackError = searchParams?.get('error');
    if (callbackError) {
      if (callbackError === 'CredentialsSignin') {
        setError('Invalid username or password.');
      } else if (callbackError === 'AccessDenied') {
          setError('Access Denied. You are not an admin.');
      } else {
        setError('An unknown error occurred during login.');
      }
    }
  }, [searchParams]);


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false, // Kita handle redirect manual
        username,
        password,
      });

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          setError('Invalid username or password.');
        } else {
          setError(result.error);
        }
        setLoading(false);
      } else if (result?.ok) {
        // Redirect akan dihandle oleh useEffect di atas atau
        // kita bisa paksa redirect di sini setelah memastikan role
        router.push('/admin/dashboard'); // Ganti dengan path dashboard admin
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  // Jika sudah authenticated dan belum di-redirect, jangan tampilkan form
  if (status === 'authenticated' && session?.user?.role === 'admin') {
    return <div className="flex justify-center items-center h-screen">Redirecting to dashboard...</div>;
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary py-2 px-4"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}