import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Hubungi Kami - Herbapedia',
  description: 'Kirimkan pesan, saran, atau pertanyaan Anda kepada tim Herbapedia melalui formulir kontak kami.',
};

export default function KontakPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Hubungi Kami</h1>
            <p className="text-primary-100 text-lg mb-0">
              Kami selalu terbuka untuk saran, umpan balik, dan kolaborasi. Jangan ragu untuk menghubungi kami.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 h-full">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Informasi Kontak</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <p className="text-sm text-gray-600">info@herbapedia.id</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Telepon</p>
                        <p className="text-sm text-gray-600">+62 812 3456 7890</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Alamat</p>
                        <p className="text-sm text-gray-600">
                          Jl. Tanaman Obat No. 123<br />
                          Kota Jakarta, 12345<br />
                          Indonesia
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="my-8 border-gray-200" />
                  
                  <h3 className="text-base font-semibold text-gray-800 mb-4">Ikuti Kami</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-200 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 6.816v6l5-3-5-3z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Kirim Pesan</h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Pertanyaan Umum</h2>
              <p className="text-gray-600">
                Berikut adalah beberapa pertanyaan yang sering diajukan. Jika Anda tidak menemukan jawaban untuk pertanyaan Anda, silakan hubungi kami.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Bagaimana cara berkontribusi untuk Herbapedia?</h3>
                <p className="text-gray-600">
                  Anda dapat berkontribusi dengan mengirimkan informasi tentang tanaman obat yang belum ada di database kami, atau memberikan koreksi/tambahan informasi untuk data yang sudah ada. Silakan gunakan formulir kontak di atas dan tim kami akan merespons segera.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Apakah saya boleh menggunakan informasi dari Herbapedia untuk keperluan edukasi?</h3>
                <p className="text-gray-600">
                  Ya, Anda diperbolehkan menggunakan informasi dari Herbapedia untuk keperluan edukasi non-komersial dengan mencantumkan sumber. Untuk penggunaan komersial, silakan hubungi kami terlebih dahulu untuk mendapatkan izin.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Bagaimana cara berkolaborasi dalam riset tanaman obat?</h3>
                <p className="text-gray-600">
                  Kami terbuka untuk kolaborasi dengan peneliti, akademisi, dan praktisi yang memiliki minat dalam tanaman obat tradisional. Untuk diskusi lebih lanjut tentang potensi kolaborasi, silakan kirim email ke partnership@herbapedia.id dengan detail proposal Anda.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Apakah Herbapedia menerima magang atau volunteer?</h3>
                <p className="text-gray-600">
                  Ya, kami secara berkala membuka kesempatan magang dan volunteer untuk mahasiswa atau individu yang berminat dalam bidang etnobotani, konservasi lingkungan, atau pengembangan web. Informasi tentang kesempatan ini akan diumumkan di halaman Karir kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}