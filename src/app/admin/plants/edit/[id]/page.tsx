// src/app/admin/plants/edit/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; 
import AdminLayout from '../../../AdminLayout'; 
import PlantForm from '../../PlantForm';       
import { IPlant } from '@/lib/models/Plant';   // Menggunakan alias

export default function EditPlantPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter(); 

  const [plantData, setPlantData] = useState<IPlant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPlant = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/plants/${id}`);
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to fetch plant data');
          }
          const data = await res.json();
          if (data.success) {
            setPlantData(data.data);
          } else {
            throw new Error(data.error || 'Plant data not found in response');
          }
        } catch (err: any) {
          console.error("Error fetching plant for edit:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchPlant();
    } else {
        setError("No plant ID provided.");
        setLoading(false);
    }
  }, [id]);

  if (loading) return <AdminLayout><div className="text-center py-10">Loading plant data...</div></AdminLayout>;
  if (error) return <AdminLayout><div className="p-4 bg-red-100 text-red-700 rounded-md">Error: {error} <button onClick={() => router.push('/admin/plants')} className="ml-4 text-blue-600 hover:underline">Go back to list</button></div></AdminLayout>;
  if (!plantData && !loading) return <AdminLayout><div className="text-center py-10">Plant not found. <button onClick={() => router.push('/admin/plants')} className="ml-4 text-blue-600 hover:underline">Go back to list</button></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="container mx-auto px-2 sm:px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Edit Plant: <span className="text-primary-600">{plantData?.name}</span></h1>
        {plantData && <PlantForm isEditMode={true} plantData={plantData} />}
      </div>
    </AdminLayout>
  );
}