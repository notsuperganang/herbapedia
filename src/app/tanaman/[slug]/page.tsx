// src/app/tanaman/[slug]/page.tsx
import PlantDetail from '@/components/plants/PlantDetail';
import RelatedPlants from '@/components/plants/RelatedPlants';
import PlantTabs from '@/components/plants/PlantTabs';
import dbConnect from '@/lib/dbConnect';
import Plant, { IPlant, IPlantPopulated } from '@/lib/models/Plant';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>; // Changed: params is now Promise
};

// Fungsi untuk mengambil data tanaman berdasarkan slug
async function getPlantBySlug(slug: string): Promise<IPlantPopulated | null> {
  await dbConnect();
  try {
    // Temukan tanaman berdasarkan slug dan populate relatedPlants
    const plant = await Plant.findOne({ slug })
                             .populate({
                                path: 'relatedPlants',
                                model: 'Plant',
                                select: 'name latinName image slug benefits region'
                             })
                             .lean();

    if (!plant) {
      return null;
    }

    // Serialize dan return sebagai IPlantPopulated
    const serializedPlant = JSON.parse(JSON.stringify(plant)) as IPlantPopulated;
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
  const { slug } = await params; // Fixed: await params first
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
  };
}

// Fungsi untuk generate static params (opsional, tapi bagus untuk SEO & build time)
export async function generateStaticParams() {
  await dbConnect();
  try {
    const plants = await Plant.find({}, 'slug').lean();
    return plants.map((plant) => ({
      slug: plant.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for plants:", error);
    return [];
  }
}

export default async function PlantDetailPage({ params }: Props) {
  const { slug } = await params; // Fixed: await params first
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

  return (
    <div>
      {/* Detail Tanaman */}
      <PlantDetail plant={plant as IPlant} />
      
      {/* Tab Informasi Lengkap */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <PlantTabs plant={plant as IPlant} />
        </div>
      </section>
      
      {/* Tanaman Terkait */}
      {plant.relatedPlants && plant.relatedPlants.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            <RelatedPlants 
              currentPlantId={plant._id ? plant._id.toString() : ''} 
              relatedPlantsData={plant.relatedPlants}
            />
          </div>
        </section>
      )}
    </div>
  );
}