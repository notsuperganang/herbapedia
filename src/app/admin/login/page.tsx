// src/app/admin/login/page.tsx
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'; // Ditambahkan usePathname

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // State untuk loading submit form

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession(); // Ganti nama 'status' menjadi 'sessionStatus' untuk menghindari konflik
  const searchParams = useSearchParams();
  const pathname = usePathname(); // Untuk mendapatkan path saat ini

  // Efek 1: Mengarahkan pengguna jika sudah terautentikasi sebagai admin
  useEffect(() => {
    if (sessionStatus === 'authenticated' && session?.user?.role === 'admin') {
      // Hanya redirect jika belum berada di dashboard admin
      // Ini mencegah loop jika dashboard adalah halaman ini (bukan kasus kita)
      if (pathname !== '/admin/dashboard') {
         router.push('/admin/dashboard');
      }
    }
    // Opsional: Tambahkan penanganan jika user terautentikasi tapi BUKAN admin
    // else if (sessionStatus === 'authenticated' && session?.user?.role !== 'admin') {
    //   setError("Anda sudah login, tetapi bukan sebagai admin.");
    //   // Bisa signOut() atau router.push('/') atau halaman 'unauthorized'
    // }
  }, [sessionStatus, session, router, pathname]);

  // Efek 2: Menampilkan pesan error dari parameter URL (misalnya, dari redirect NextAuth)
  useEffect(() => {
    const callbackError = searchParams?.get('error');
    if (callbackError) {
      if (callbackError === 'CredentialsSignin') {
        setError('Username atau password salah. Silakan coba lagi.');
      } else if (callbackError === 'AccessDenied') {
        // Ini biasanya muncul jika middleware mengarahkan kembali dengan error
        setError('Akses ditolak. Anda tidak memiliki hak admin.');
      } else {
        // Menampilkan error lain yang mungkin dikirim oleh NextAuth
        setError(`Error Login: ${callbackError}`);
      }
      // Opsional: Membersihkan parameter error dari URL agar tidak muncul lagi saat refresh
      // router.replace('/admin/login', { scroll: false }); // Hati-hati dengan ini karena bisa memicu re-render
    }
  }, [searchParams, router]); // router ditambahkan jika menggunakan router.replace

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null); // Bersihkan error sebelumnya
    setLoading(true); // Aktifkan loading submit

    try {
      const result = await signIn('credentials', {
        redirect: false, // Kita tangani redirect manual berdasarkan hasil
        username,
        password,
      });

      if (result?.error) {
        // Pesan error berasal dari callback 'authorize' di konfigurasi NextAuth
        // Contoh: "Invalid credentials", "Access Denied: Not an admin"
        setError(result.error);
      } else if (result?.ok) {
        // Login berhasil, sesi NextAuth akan diperbarui.
        // Efek 1 di atas akan menangani redirect ke dashboard.
        // Atau bisa dipaksa di sini:
        router.push('/admin/dashboard');
      } else {
        // Fallback jika result tidak ok dan tidak ada error spesifik (jarang terjadi)
        setError('Proses login gagal. Silakan periksa kredensial Anda dan coba lagi.');
      }
    } catch (err: any) {
      // Menangkap error dari pemanggilan signIn itu sendiri (misalnya, masalah jaringan)
      console.error("Panggilan signIn gagal:", err);
      setError(err.message || 'Terjadi kesalahan tak terduga saat login.');
    } finally {
      setLoading(false); // Pastikan loading selalu dihentikan
    }
  };

  // Tampilkan indikator loading saat status sesi sedang ditentukan
  if (sessionStatus === 'loading') {
    return <div className="flex justify-center items-center h-screen">Memuat sesi...</div>;
  }

  // Jika pengguna adalah admin yang terautentikasi dan redirect kemungkinan sedang berlangsung (via useEffect), tampilkan pesan.
  // Ini mencegah form login berkedip singkat.
  if (sessionStatus === 'authenticated' && session?.user?.role === 'admin') {
    // Cek ini penting jika dashboard sendiri kompleks dan butuh waktu memuat AdminLayout
     if (pathname !== '/admin/dashboard') {
        return <div className="flex justify-center items-center h-screen">Mengarahkan ke dashboard...</div>;
     }
     // Jika sudah di dashboard (bukan kasus jika ini halaman login), render null atau biarkan komponen dashboard yang menangani.
     // Untuk halaman login, kondisi ini seharusnya singkat karena useEffect akan mengarahkan.
  }

  // Render form login jika tidak sedang loading dan bukan admin yang terautentikasi
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
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
              disabled={loading} // Nonaktifkan input saat loading
              className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50"
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
              disabled={loading} // Nonaktifkan input saat loading
              className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Nonaktifkan tombol saat form sedang disubmit
            className="w-full btn btn-primary py-2 px-4 disabled:opacity-70"
          >
            {loading ? 'Sedang login...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}