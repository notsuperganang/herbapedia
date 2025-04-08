import PlantDetail from '@/components/plants/PlantDetail';
import RelatedPlants from '@/components/plants/RelatedPlants';
import PlantTabs from '@/components/plants/PlantTabs';

// Data tanaman (dummy)
const plantsData = {
  jahe: {
    id: 1,
    name: 'Jahe',
    latinName: 'Zingiber officinale',
    description: 'Jahe adalah tanaman rimpang yang populer sebagai rempah-rempah dan bahan obat. Jahe berasal dari Asia Tenggara dan telah digunakan selama ribuan tahun dalam pengobatan tradisional China dan Ayurveda India.',
    benefits: [
      'Meredakan mual dan muntah',
      'Menghangatkan tubuh',
      'Anti-inflamasi',
      'Membantu pencernaan',
      'Mengurangi nyeri otot',
      'Menurunkan kadar kolesterol',
    ],
    uses: 'Jahe dapat dikonsumsi dalam berbagai bentuk seperti minuman jahe, permen jahe, atau tambahan dalam makanan. Untuk pengobatan, jahe dapat dibuat menjadi minuman dengan cara memarut atau mengiris rimpang jahe dan diseduh dengan air panas.',
    region: 'Asia Tenggara',
    parts: ['Rimpang'],
    habitat: 'Tumbuh subur di daerah tropis dan subtropis dengan curah hujan yang cukup dan tanah yang kaya akan nutrisi.',
    cultivation: 'Jahe dapat ditanam dengan potongan rimpang yang memiliki tunas. Membutuhkan tanah yang gembur, drainase baik, dan sinar matahari yang cukup. Panen dapat dilakukan setelah 8-10 bulan.',
    history: 'Jahe telah digunakan dalam pengobatan tradisional selama lebih dari 3000 tahun. Pedagang Arab membawa jahe ke Eropa pada abad pertama, dan menjadi rempah yang sangat berharga selama Abad Pertengahan.',
    image: '/plants/jahe.jpg',
    slug: 'jahe',
    scientificClassification: {
      kingdom: 'Plantae',
      division: 'Magnoliophyta',
      class: 'Liliopsida',
      order: 'Zingiberales',
      family: 'Zingiberaceae',
      genus: 'Zingiber',
      species: 'Z. officinale',
    },
    related: [2, 3, 4], // ID tanaman terkait
  },
  // Tambahkan data tanaman lainnya sesuai kebutuhan
};

// Metadata generator
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const plant = plantsData[slug as keyof typeof plantsData];
  
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

export default function PlantDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const plant = plantsData[slug as keyof typeof plantsData];
  
  if (!plant) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tanaman Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">
          Maaf, tanaman yang Anda cari tidak tersedia di database kami.
        </p>
        <a
          href="/katalog"
          className="btn btn-primary"
        >
          Kembali ke Katalog
        </a>
      </div>
    );
  }
  
  return (
    <div>
      {/* Detail Tanaman */}
      <PlantDetail plant={plant} />
      
      {/* Tab Informasi Lengkap */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <PlantTabs plant={plant} />
        </div>
      </section>
      
      {/* Tanaman Terkait */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <RelatedPlants currentPlantId={plant.id} relatedIds={plant.related} />
        </div>
      </section>
    </div>
  );
}