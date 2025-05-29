// src/app/tanaman/[slug]/page.tsx
import PlantDetail from '@/components/plants/PlantDetail';
import RelatedPlants from '@/components/plants/RelatedPlants';
import PlantTabs from '@/components/plants/PlantTabs';
import dbConnect from '@/lib/dbConnect';
import Plant, { IPlant } from '@/lib/models/Plant';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link'; // Import Link
import mongoose from 'mongoose';

type Props = {
  params: { slug: string };
};

// Fungsi untuk mengambil data tanaman berdasarkan slug
async function getPlantBySlug(slug: string): Promise<IPlant | null> {
  await dbConnect();
  try {
    // Temukan tanaman berdasarkan slug. Pastikan slug diindeks di model Anda untuk performa.
    // Jika relatedPlants adalah array ObjectId, kita perlu populate
    const plant = await Plant.findOne({ slug })
                             .populate({
                                path: 'relatedPlants',
                                model: 'Plant', // Pastikan nama modelnya benar
                                select: 'name latinName image slug benefits region' // Pilih field yang dibutuhkan untuk related plants
                             })
                             .lean(); // .lean() untuk mendapatkan objek JavaScript biasa, bukan Mongoose Document

    if (!plant) {
      return null;
    }
    // Konversi ObjectId menjadi string jika perlu agar bisa diserialisasi
    // dan pastikan semua field yang diharapkan ada dan dalam format yang benar
    const serializedPlant = JSON.parse(JSON.stringify(plant)) as IPlant;
    return serializedPlant;

  } catch (error) {
    console.error("Error fetching plant by slug:", error);
    return null;
  }
}

// Fungsi untuk generate metadata dinamis
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const plant = await getPlantBySlug(slug);

  if (!plant) {
    return {
      title: 'Tanaman Tidak Ditemukan - Herbapedia',
      description: 'Maaf, tanaman yang Anda cari tidak ditemukan di database kami.',
    };
  }

  return {
    title: `${plant.name} (${plant.latinName}) - Herbapedia`,
    description: `Pelajari tentang ${plant.name}, manfaat, cara penggunaan, dan informasi lengkap lainnya tentang tanaman obat tradisional ini.`,
    // openGraph: {
    //   images: [plant.image || '/default-plant-image.jpg'],
    // },
  };
}

// Fungsi untuk generate static params (opsional, tapi bagus untuk SEO & build time)
export async function generateStaticParams() {
  await dbConnect();
  try {
    const plants = await Plant.find({}, 'slug').lean(); // Ambil semua slug
    return plants.map((plant) => ({
      slug: plant.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for plants:", error);
    return [];
  }
}

export default async function PlantDetailPage({ params }: Props) {
  const slug = params.slug;
  const plant = await getPlantBySlug(slug);

  if (!plant) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tanaman Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">
          Maaf, tanaman dengan slug "{slug}" tidak tersedia di database kami.
        </p>
        <Link href="/katalog" className="btn btn-primary">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }
  
  // Pastikan data relatedPlants yang dipass ke RelatedPlants adalah array ID atau objek yang sesuai
  // Jika getPlantBySlug sudah melakukan populate dengan benar, plant.relatedPlants akan berisi objek tanaman terkait.
  // Komponen RelatedPlants mungkin perlu disesuaikan untuk menerima array objek IPlant atau hanya array string ID.
  // Untuk saat ini, kita asumsikan RelatedPlants bisa menangani array objek IPlant.
  // Jika relatedPlants masih berupa ObjectId string setelah .lean() dan JSON.parse(JSON.stringify()),
  // maka Anda mungkin perlu melakukan fetch data related plants lagi di dalam RelatedPlants
  // atau menyesuaikan bagaimana data itu dipass/digunakan.

  // Untuk RelatedPlants, jika ia mengharapkan array ID dan Anda sudah populate:
  const relatedPlantIds = (plant.relatedPlants || []).map(rp => (rp as any)._id?.toString() || rp.toString()).filter(id => mongoose.Types.ObjectId.isValid(id));


  return (
    <div>
      {/* Detail Tanaman */}
      <PlantDetail plant={plant} /> {/* Komponen ini harus menerima IPlant */}
      
      {/* Tab Informasi Lengkap */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          {/* PlantTabs mungkin perlu 'use client' jika memiliki state/interaktivitas */}
          <PlantTabs plant={plant} /> {/* Komponen ini harus menerima IPlant */}
        </div>
      </section>
      
      {/* Tanaman Terkait */}
      {plant.relatedPlants && plant.relatedPlants.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            {/* Pastikan RelatedPlants bisa menerima plant.relatedPlants (array objek IPlant yang sudah dipopulate)
              atau hanya array ID (relatedPlantIds).
              Jika RelatedPlants masih menggunakan data dummy atau mengharapkan format berbeda,
              Anda perlu menyesuaikannya.
            */}
            <RelatedPlants 
              currentPlantId={plant._id ? plant._id.toString() : ''} 
              relatedPlantsData={plant.relatedPlants as IPlant[]} // Mengirim data tanaman terkait yang sudah dipopulate
            />
          </div>
        </section>
      )}
    </div>
  );
}
