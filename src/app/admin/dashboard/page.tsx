// src/app/admin/dashboard/page.tsx
import React from 'react';
import AdminLayout from '../AdminLayout'; // Path relatif ke AdminLayout

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">
            Welcome to the Herbapedia Admin Panel!
          </p>
          <p className="mt-4 text-gray-600">
            Use the sidebar navigation to manage plants and articles.
          </p>
          {/* Anda bisa menambahkan ringkasan data di sini nanti */}
        </div>
      </div>
    </AdminLayout>
  );
}