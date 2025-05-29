// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Izinkan semua path dari hostname ini
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img-cdn.medkomtek.com', // Hostname yang menyebabkan error
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Untuk gambar placeholder
        port: '',
        pathname: '/**',
      }
      // Tambahkan hostname lain di sini jika diperlukan
    ],
  },
  /* Opsi konfigurasi lainnya mungkin ada di sini */
};

export default nextConfig;
