import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Tentang Kami - Herbapedia',
  description: 'Mengenal lebih jauh tentang Herbapedia, platform ensiklopedia tanaman obat tradisional Indonesia untuk melestarikan pengetahuan dan menjaga lingkungan hijau.',
};

export default function TentangPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Tentang Kami</h1>
            <p className="text-primary-100 text-lg mb-0">
              Mengenal Herbapedia, platform ensiklopedia tanaman obat tradisional Indonesia untuk menjaga warisan leluhur dan lingkungan hijau.
            </p>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Visi & Misi</h2>
              <div className="h-1 w-20 bg-primary-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-gray-100 rounded-lg shadow-sm bg-gray-50">
                <div className="inline-flex justify-center items-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Visi</h3>
                <p className="text-gray-600">
                  Menjadi platform pendidikan terpercaya yang melestarikan pengetahuan tradisional tentang tanaman obat Indonesia dan mendorong keberlanjutan lingkungan hijau untuk generasi mendatang.
                </p>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-lg shadow-sm bg-gray-50">
                <div className="inline-flex justify-center items-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Misi</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-primary-500 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Mendokumentasikan dan melestarikan pengetahuan tradisional tentang tanaman obat Indonesia</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-primary-500 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Mengedukasi masyarakat tentang manfaat dan cara pemanfaatan tanaman obat secara tepat dan aman</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-primary-500 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Mendorong pelestarian tanaman obat dan keanekaragaman hayati Indonesia</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-primary-500 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Membangun kesadaran masyarakat tentang pentingnya menjaga lingkungan hijau</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Cerita Kami</h2>
              <div className="h-1 w-20 bg-primary-500 mx-auto"></div>
            </div>
            
            <div className="prose max-w-none text-gray-600">
              <p>
                Herbapedia didirikan pada tahun 2020 sebagai respons terhadap kekhawatiran akan semakin lunturnya pengetahuan tradisional tentang tanaman obat di Indonesia. Kami menyadari bahwa banyak pengetahuan berharga yang hanya diturunkan secara lisan dari generasi ke generasi berisiko hilang seiring waktu.
              </p>
              
              <p>
                Tim kami terdiri dari para ahli etnobotani, praktisi pengobatan tradisional, peneliti, dan pecinta lingkungan yang bersatu dalam misi untuk mendokumentasikan, melestarikan, dan membagikan pengetahuan tentang tanaman obat tradisional Indonesia.
              </p>
              
              <p>
                Melalui riset lapangan yang ekstensif di berbagai daerah di Indonesia, kami mengumpulkan informasi langsung dari para tetua adat, dukun tradisional, dan masyarakat lokal yang masih menjaga kearifan lokal terkait pemanfaatan tanaman obat.
              </p>
              
              <p>
                Saat ini, Herbapedia telah berkembang menjadi platform ensiklopedia digital yang komprehensif, menyediakan informasi tentang ratusan jenis tanaman obat tradisional Indonesia beserta manfaat, cara penggunaan, dan upaya pelestariannya.
              </p>
              
              <p>
                Kami berkomitmen untuk terus memperluas database kami dan membagikan pengetahuan ini kepada masyarakat luas, dengan harapan bahwa warisan budaya yang berharga ini dapat terus lestari untuk generasi mendatang, sambil mendorong kesadaran akan pentingnya menjaga lingkungan hijau sebagai sumber keanekaragaman hayati.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tim Kami</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Kenali sosok-sosok di balik Herbapedia yang berdedikasi untuk melestarikan pengetahuan tanaman obat tradisional Indonesia.
            </p>
            <div className="h-1 w-20 bg-primary-500 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <svg className="h-24 w-24 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Dr. Budi Santoso</h3>
              <p className="text-primary-600 mb-2">Pendiri & Etnobotanis</p>
              <p className="text-gray-600 text-sm">Ahli etnobotani dengan pengalaman 20 tahun riset tanaman obat tradisional di berbagai daerah Indonesia.</p>
            </div>
            
            <div className="text-center">
              <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <svg className="h-24 w-24 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Dewi Lestari, M.Si</h3>
              <p className="text-primary-600 mb-2">Peneliti Utama</p>
              <p className="text-gray-600 text-sm">Spesialis biologi konservasi yang fokus pada pelestarian tanaman obat langka di Indonesia.</p>
            </div>
            
            <div className="text-center">
              <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <svg className="h-24 w-24 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Hendra Wijaya</h3>
              <p className="text-primary-600 mb-2">Pengembang Web</p>
              <p className="text-gray-600 text-sm">Pengembang web berpengalaman yang mendesain dan mengembangkan platform Herbapedia.</p>
            </div>
            
            <div className="text-center">
              <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <svg className="h-24 w-24 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Siti Rahayu</h3>
              <p className="text-primary-600 mb-2">Editor Konten</p>
              <p className="text-gray-600 text-sm">Penulis dan editor dengan keahlian dalam menyederhanakan informasi ilmiah menjadi konten yang mudah dipahami.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Bergabunglah dengan Misi Kami</h2>
            <p className="mb-8 text-primary-100">
              Bantu kami melestarikan pengetahuan tradisional dan menjaga lingkungan hijau dengan menjadi bagian dari komunitas Herbapedia.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/kontak" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Hubungi Kami
              </Link>
              <Link href="/artikel" className="btn bg-primary-600 text-white border border-primary-500 hover:bg-primary-800">
                Baca Artikel
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}