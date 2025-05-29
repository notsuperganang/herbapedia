'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../AdminLayout'; // Path disesuaikan
import { IPlant } from '@/lib/models/Plant'; // Menggunakan alias, seharusnya sudah benar

export default function ManagePlantsPage() {
  const [plants, setPlants] = useState<IPlant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPlants = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/plants'); // API endpoint tetap sama
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch plants');
      }
      const data = await res.json();
      setPlants(data.data || []);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching plants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleDelete = async (plantId: string) => {
    if (window.confirm('Are you sure you want to delete this plant? This action cannot be undone.')) {
      try {
        const res = await fetch(`/api/plants/${plantId}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to delete plant');
        }
        alert('Plant deleted successfully!');
        fetchPlants(); // Refresh daftar tanaman
      } catch (err: any) {
        setError(err.message);
        alert(`Error deleting plant: ${err.message}`);
        console.error("Error deleting plant:", err);
      }
    }
  };
  
  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (plant.latinName && plant.latinName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Plants</h1>
          <Link href="/admin/plants/new" className="btn btn-primary bg-green-600 hover:bg-green-700 text-white">
            Add New Plant
          </Link>
        </div>

        <input 
            type="text"
            placeholder="Search by name or latin name..."
            className="mb-6 p-3 border border-gray-300 rounded-md w-full md:w-1/2 lg:w-1/3 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading && <div className="text-center py-4">Loading plants...</div>}
        {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">Error fetching plants: {error}</div>}
        
        {!loading && !error && (
          <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Latin Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlants.length > 0 ? filteredPlants.map((plant) => (
                  <tr key={plant._id as string} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {plant.image ? (
                        <img 
                            src={plant.image} 
                            alt={plant.name} 
                            className="h-12 w-12 object-cover rounded-md shadow-sm" 
                            onError={(e) => (e.currentTarget.src = 'https://placehold.co/48x48/EBF4FF/7F9CF5?text=No+Img')} // Fallback image
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">No Img</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plant.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 italic">{plant.latinName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plant.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <Link href={`/admin/plants/edit/${plant._id}`} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(plant._id as string)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )) : (
                    <tr>
                        <td colSpan={5} className="text-center py-10 text-gray-500">No plants found matching your search or no plants available.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}