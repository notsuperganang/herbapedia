// src/app/admin/plants/new/page.tsx
import React from 'react';
import AdminLayout from '../../AdminLayout'; 
import PlantForm from '../PlantForm';     

export default function NewPlantPage() {
  return (
    <AdminLayout>
      <div className="container mx-auto px-2 sm:px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Add New Plant</h1>
        <PlantForm isEditMode={false} />
      </div>
    </AdminLayout>
  );
}