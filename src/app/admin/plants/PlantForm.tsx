'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { IPlant, IScientificClassification } from '@/lib/models/Plant'; // Menggunakan alias
import { useRouter } from 'next/navigation';

interface PlantFormProps {
  plantData?: IPlant | null;
  isEditMode: boolean;
}

const initialClassification: IScientificClassification = {
    kingdom: '', division: '', class: '', order: '', family: '', genus: '', species: '',
};

const PlantForm: React.FC<PlantFormProps> = ({ plantData, isEditMode }) => {
  const [name, setName] = useState('');
  const [latinName, setLatinName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  const [uses, setUses] = useState('');
  const [region, setRegion] = useState('');
  const [parts, setParts] = useState('');
  const [habitat, setHabitat] = useState('');
  const [cultivation, setCultivation] = useState('');
  const [history, setHistory] = useState('');
  const [image, setImage] = useState('');
  const [scientificClassification, setScientificClassification] = useState<IScientificClassification>(initialClassification);
  const [relatedPlantsInput, setRelatedPlantsInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  useEffect(() => {
    if (isEditMode && plantData) {
      setName(plantData.name || '');
      setLatinName(plantData.latinName || '');
      setSlug(plantData.slug || '');
      setDescription(plantData.description || '');
      setBenefits(plantData.benefits?.join(', ') || '');
      setUses(plantData.uses || '');
      setRegion(plantData.region || '');
      setParts(plantData.parts?.join(', ') || '');
      setHabitat(plantData.habitat || '');
      setCultivation(plantData.cultivation || '');
      setHistory(plantData.history || '');
      setImage(plantData.image || '');
      setScientificClassification(plantData.scientificClassification || initialClassification);
      setRelatedPlantsInput(plantData.relatedPlants?.map(p => (p as any)._id || p.toString()).join(', ') || '');
    } else if (!isEditMode) {
      // Reset form for new plant
      setName('');
      setLatinName('');
      setSlug('');
      setDescription('');
      setBenefits('');
      setUses('');
      setRegion('');
      setParts('');
      setHabitat('');
      setCultivation('');
      setHistory('');
      setImage('');
      setScientificClassification(initialClassification);
      setRelatedPlantsInput('');
    }
  }, [plantData, isEditMode]);

  const handleClassificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setScientificClassification(prev => ({ ...prev, [name]: value }));
  };

  const generateSlugFromName = (plantName: string) => {
    return plantName
      .toLowerCase()
      .replace(/\s+/g, '-') 
      .replace(/[^\w-]+/g, '');
  };

  useEffect(() => {
    // Auto-generate slug only in "add new" mode, or if slug is empty in "edit" mode and name changes
    if (!isEditMode) {
        setSlug(generateSlugFromName(name));
    }
  }, [name, isEditMode]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    const benefitsArray = benefits.split(',').map(b => b.trim()).filter(b => b);
    const partsArray = parts.split(',').map(p => p.trim()).filter(p => p);
    const relatedPlantsArray = relatedPlantsInput.split(',').map(id => id.trim()).filter(id => id);

    const payload: Partial<IPlant> = {
      name, latinName, slug, description, benefits: benefitsArray, uses, region,
      parts: partsArray, habitat, cultivation, history, image, scientificClassification,
      relatedPlants: relatedPlantsArray.length > 0 ? relatedPlantsArray as any : [], // Kirim array kosong jika tidak ada
    };

    // Hapus field relatedPlants jika kosong untuk menghindari error ObjectId
    if (payload.relatedPlants?.length === 0) {
        delete payload.relatedPlants;
    }


    const endpoint = isEditMode ? `/api/plants/${plantData?._id}` : '/api/plants';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || `Failed to ${isEditMode ? 'update' : 'create'} plant.`);
        if (data.errors) {
            setFieldErrors(data.errors);
        }
        // Tidak throw error di sini agar setLoading(false) di finally tetap berjalan
        setLoading(false);
        return; 
      }

      alert(`Plant ${isEditMode ? 'updated' : 'created'} successfully!`);
      router.push('/admin/plants');
      router.refresh(); 
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || 'An unexpected error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };
  
  const renderInput = (label: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, type: string = "text", required: boolean = true, isTextarea: boolean = false, placeholder?: string) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
      {isTextarea ? (
         <textarea id={id} name={id} value={value} onChange={onChange} required={required} rows={4} placeholder={placeholder || `Enter ${label.toLowerCase()}`}
         className={`input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors[id] ? 'border-red-500' : 'border-gray-300'}`} />
      ) : (
        <input type={type} id={id} name={id} value={value} onChange={onChange} required={required} placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className={`input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors[id] ? 'border-red-500' : 'border-gray-300'}`} />
      )}
      {fieldErrors[id] && <p className="text-red-500 text-xs mt-1">{fieldErrors[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-xl">
      {error && <div className="p-3 bg-red-100 text-red-700 rounded mb-4 text-sm">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {renderInput("Name", "name", name, (e) => setName(e.target.value))}
        {renderInput("Latin Name", "latinName", latinName, (e) => setLatinName(e.target.value))}
      </div>

      {renderInput("Slug", "slug", slug, (e) => setSlug(e.target.value), "text", true)}
      <p className="text-xs text-gray-500 -mt-3 mb-4">Auto-generated from name if creating new. Must be unique.</p>

      {renderInput("Image URL", "image", image, (e) => setImage(e.target.value), "url", true, false, "https://example.com/image.jpg")}
      {image && <img src={image} alt="Preview" className="mt-2 h-40 w-auto object-contain border rounded-md p-1 bg-gray-50" onError={(e) => e.currentTarget.style.display='none'}/>}
      
      {renderInput("Description", "description", description, (e) => setDescription(e.target.value), "text", true, true)}
      {renderInput("Benefits (comma-separated)", "benefits", benefits, (e) => setBenefits(e.target.value), "text", true, false, "Benefit 1, Benefit 2")}
      {renderInput("Uses", "uses", uses, (e) => setUses(e.target.value), "text", true, true)}
      {renderInput("Region", "region", region, (e) => setRegion(e.target.value))}
      {renderInput("Parts Used (comma-separated)", "parts", parts, (e) => setParts(e.target.value), "text", true, false, "Leaf, Root, Stem")}
      {renderInput("Habitat", "habitat", habitat, (e) => setHabitat(e.target.value), "text", true, true)}
      {renderInput("Cultivation", "cultivation", cultivation, (e) => setCultivation(e.target.value), "text", true, true)}
      {renderInput("History", "history", history, (e) => setHistory(e.target.value), "text", true, true)}

      <h3 className="text-xl font-semibold text-gray-800 border-t border-gray-200 pt-6 mt-8">Scientific Classification</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {renderInput("Kingdom", "kingdom", scientificClassification.kingdom, handleClassificationChange)}
        {renderInput("Division", "division", scientificClassification.division || '', handleClassificationChange, "text", false)}
        {renderInput("Class", "class", scientificClassification.class || '', handleClassificationChange, "text", false)}
        {renderInput("Order", "order", scientificClassification.order, handleClassificationChange)}
        {renderInput("Family", "family", scientificClassification.family, handleClassificationChange)}
        {renderInput("Genus", "genus", scientificClassification.genus, handleClassificationChange)}
        {renderInput("Species", "species", scientificClassification.species, handleClassificationChange)}
      </div>
      
      {renderInput("Related Plant IDs (comma-separated MongoDB ObjectIds)", "relatedPlantsInput", relatedPlantsInput, (e) => setRelatedPlantsInput(e.target.value), "text", false, false, "id1, id2, id3")}
      <p className="text-xs text-gray-500 -mt-3 mb-4">Optional. Enter MongoDB ObjectIds of related plants, separated by commas.</p>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-8">
        <button type="button" onClick={() => router.push('/admin/plants')} className="btn bg-gray-200 hover:bg-gray-300 text-gray-700">
            Cancel
        </button>
        <button type="submit" disabled={loading} className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-70">
          {loading ? 'Saving...' : (isEditMode ? 'Update Plant' : 'Create Plant')}
        </button>
      </div>
    </form>
  );
};
export default PlantForm;