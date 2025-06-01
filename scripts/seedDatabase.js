// scripts/seedDatabase.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Define schemas directly
    const plantSchema = new mongoose.Schema({
      name: { type: String, required: true },
      latinName: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      benefits: [{ type: String, required: true }],
      uses: { type: String, required: true },
      region: { type: String, required: true },
      parts: [{ type: String, required: true }],
      habitat: { type: String, required: true },
      cultivation: { type: String, required: true },
      history: { type: String, required: true },
      image: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      scientificClassification: {
        kingdom: { type: String, required: true },
        division: { type: String },
        class: { type: String },
        order: { type: String, required: true },
        family: { type: String, required: true },
        genus: { type: String, required: true },
        species: { type: String, required: true }
      },
      relatedPlants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }]
    }, { timestamps: true });

    const articleSchema = new mongoose.Schema({
      title: { type: String, required: true },
      excerpt: { type: String, required: true },
      content: { type: String, required: true },
      image: { type: String, required: true },
      author: { type: String, required: true },
      date: { type: Date, required: true, default: Date.now },
      slug: { type: String, required: true, unique: true },
      category: { type: String, required: true },
      readTime: { type: String }
    }, { timestamps: true });

    // Create models
    const Plant = mongoose.models.Plant || mongoose.model('Plant', plantSchema);
    const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);

    // Clear existing data first
    console.log('Clearing existing data...');
    await Plant.deleteMany({});
    await Article.deleteMany({});
    console.log('Existing data cleared');

    // Sample Plants Data
    const plantsData = [
      {
        name: "Jahe",
        latinName: "Zingiber officinale",
        description: "Jahe adalah tanaman rimpang yang sangat populer sebagai rempah-rempah dan obat tradisional. Tanaman ini memiliki aroma yang khas dan rasa pedas yang hangat.",
        benefits: ["Mengatasi mual", "Anti inflamasi", "Meningkatkan pencernaan", "Meredakan batuk", "Menghangatkan tubuh"],
        uses: "Jahe dapat dikonsumsi dalam bentuk teh, ditambahkan dalam masakan, atau dibuat menjadi wedang jahe. Untuk pengobatan, jahe bisa direbus dengan air dan diminum hangat-hangat.",
        region: "Jawa Tengah",
        parts: ["Rimpang"],
        habitat: "Jahe tumbuh baik di daerah tropis dengan curah hujan yang cukup. Tanaman ini memerlukan tanah yang gembur, subur, dan memiliki drainase yang baik.",
        cultivation: "Jahe dapat ditanam dengan cara menyemaikan rimpang yang sudah bertunas. Tanaman ini membutuhkan naungan parsial dan penyiraman yang teratur.",
        history: "Jahe telah digunakan dalam pengobatan tradisional Indonesia selama berabad-abad. Tanaman ini juga menjadi komoditas ekspor penting.",
        image: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/10/10040846/Jarang-Diketahui-Ini-X-Manfaat-Jahe-untuk-Kesehatan-Tubuh.jpg",
        slug: "jahe",
        scientificClassification: {
          kingdom: "Plantae",
          division: "Magnoliophyta",
          class: "Liliopsida",
          order: "Zingiberales",
          family: "Zingiberaceae",
          genus: "Zingiber",
          species: "Z. officinale"
        }
      },
      {
        name: "Kunyit",
        latinName: "Curcuma longa",
        description: "Kunyit adalah tanaman obat tradisional yang memiliki rimpang berwarna kuning cerah. Tanaman ini dikenal karena kandungan kurkuminnya yang tinggi.",
        benefits: ["Anti inflamasi", "Antioksidan", "Meningkatkan imunitas", "Menyehatkan hati", "Mengatasi masalah pencernaan"],
        uses: "Kunyit dapat dikonsumsi sebagai jamu, teh kunyit, atau ditambahkan dalam masakan. Untuk pengobatan, kunyit bisa diparut dan direbus atau dimakan langsung.",
        region: "Jawa Barat",
        parts: ["Rimpang"],
        habitat: "Kunyit tumbuh baik di daerah tropis dan subtropis dengan kelembaban tinggi. Tanaman ini memerlukan tanah yang subur dan drainase yang baik.",
        cultivation: "Penanaman kunyit dilakukan dengan menyemaikan rimpang. Tanaman ini membutuhkan sinar matahari penuh hingga naungan parsial.",
        history: "Kunyit telah menjadi bagian penting dalam pengobatan Ayurveda dan jamu tradisional Indonesia. Tanaman ini juga digunakan sebagai pewarna alami.",
        image: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1683291053/attached_image/7-manfaat-kunyit-untuk-kulit-yang-jarang-diketahui.jpg",
        slug: "kunyit",
        scientificClassification: {
          kingdom: "Plantae",
          division: "Magnoliophyta",
          class: "Liliopsida",
          order: "Zingiberales",
          family: "Zingiberaceae",
          genus: "Curcuma",
          species: "C. longa"
        }
      },
      {
        name: "Temulawak",
        latinName: "Curcuma xanthorrhiza",
        description: "Temulawak adalah tanaman asli Indonesia yang memiliki khasiat sebagai hepatoprotektor alami. Rimpangnya berwarna kuning dengan rasa yang agak pahit.",
        benefits: ["Menyehatkan hati", "Meningkatkan nafsu makan", "Anti inflamasi", "Menurunkan kolesterol", "Meningkatkan stamina"],
        uses: "Temulawak biasanya dikonsumsi dalam bentuk jamu, ekstrak, atau kapsul. Dapat juga direbus dan diminum sebagai teh herbal.",
        region: "Jawa Timur",
        parts: ["Rimpang"],
        habitat: "Temulawak tumbuh di daerah tropis dengan curah hujan tinggi. Tanaman ini memerlukan tanah yang gembur dan kaya bahan organik.",
        cultivation: "Penanaman menggunakan rimpang yang sehat. Temulawak membutuhkan naungan dan kelembaban yang cukup untuk tumbuh optimal.",
        history: "Temulawak merupakan tanaman endemik Indonesia dan telah digunakan dalam pengobatan tradisional sejak zaman kerajaan Majapahit.",
        image: "https://desagrogol.gunungkidulkab.go.id/assets/files/dokumen/TEMULAWAK.jpg",
        slug: "temulawak",
        scientificClassification: {
          kingdom: "Plantae",
          division: "Magnoliophyta",
          class: "Liliopsida",
          order: "Zingiberales",
          family: "Zingiberaceae",
          genus: "Curcuma",
          species: "C. xanthorrhiza"
        }
      },
      {
        name: "Sirih",
        latinName: "Piper betle",
        description: "Sirih adalah tanaman merambat yang daunnya memiliki khasiat antiseptik dan antibakteri. Daun sirih telah lama digunakan dalam pengobatan tradisional.",
        benefits: ["Antiseptik", "Antibakteri", "Menyehatkan mulut", "Mengobati keputihan", "Mengatasi bau badan"],
        uses: "Daun sirih dapat direbus untuk berkumur, dimakan langsung, atau digunakan untuk kompres. Sering digunakan untuk menjaga kebersihan organ intim.",
        region: "Sumatera Utara",
        parts: ["Daun"],
        habitat: "Sirih tumbuh baik di daerah tropis yang lembab. Tanaman ini memerlukan naungan dan kelembaban tinggi untuk pertumbuhan optimal.",
        cultivation: "Sirih dapat diperbanyak dengan stek batang. Tanaman ini membutuhkan penyangga untuk merambat dan penyiraman yang teratur.",
        history: "Sirih telah digunakan dalam budaya Indonesia sejak zaman nenek moyang. Daun sirih juga memiliki nilai simbolis dalam upacara adat.",
        image: "https://mysiloam-api.siloamhospitals.com/public-asset/website-cms/website-cms-16771199596118035.webp",
        slug: "sirih",
        scientificClassification: {
          kingdom: "Plantae",
          division: "Magnoliophyta",
          class: "Magnoliopsida",
          order: "Piperales",
          family: "Piperaceae",
          genus: "Piper",
          species: "P. betle"
        }
      },
      {
        name: "Lidah Buaya",
        latinName: "Aloe vera",
        description: "Lidah buaya adalah tanaman sukulen yang memiliki gel dalam daunnya. Tanaman ini dikenal karena khasiatnya untuk perawatan kulit dan rambut.",
        benefits: ["Menyembuhkan luka", "Melembabkan kulit", "Anti inflamasi", "Menyehatkan rambut", "Mendinginkan kulit"],
        uses: "Gel lidah buaya dapat dioleskan langsung pada kulit atau dikonsumsi sebagai minuman. Sering digunakan untuk mengobati luka bakar dan iritasi kulit.",
        region: "Bali",
        parts: ["Daun", "Gel"],
        habitat: "Lidah buaya tumbuh baik di daerah kering dengan sinar matahari penuh. Tanaman ini tahan terhadap kekeringan dan tidak memerlukan banyak air.",
        cultivation: "Lidah buaya mudah ditanam dan dirawat. Tanaman ini dapat diperbanyak dengan anakan dan memerlukan drainase yang baik.",
        history: "Lidah buaya telah digunakan dalam pengobatan tradisional di berbagai belahan dunia, termasuk Indonesia, selama ribuan tahun.",
        image: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/10/17044350/Ini-Alasan-Aloe-Vera-Baik-untuk-Kulit-Kering.jpg.webp",
        slug: "lidah-buaya",
        scientificClassification: {
          kingdom: "Plantae",
          division: "Magnoliophyta",
          class: "Liliopsida",
          order: "Asparagales",
          family: "Asphodelaceae",
          genus: "Aloe",
          species: "A. vera"
        }
      },
      {
        name: "Sambiloto",
        latinName: "Andrographis paniculata",
        description: "Sambiloto adalah tanaman herba yang memiliki rasa sangat pahit. Tanaman ini dikenal sebagai 'raja pahit' dan memiliki khasiat sebagai imunomodulator.",
        benefits: ["Meningkatkan imunitas", "Antibakteri", "Antivirus", "Menurunkan demam", "Mengobati diare"],
        uses: "Sambiloto dapat dikonsumsi dalam bentuk kapsul, ekstrak, atau direbus sebagai teh. Biasanya dicampur dengan madu untuk mengurangi rasa pahit.",
        region: "Kalimantan Selatan",
        parts: ["Daun", "Batang"],
        habitat: "Sambiloto tumbuh baik di daerah tropis yang lembab. Tanaman ini dapat tumbuh di berbagai jenis tanah dan tahan terhadap hama.",
        cultivation: "Sambiloto dapat ditanam dari biji atau stek. Tanaman ini tumbuh cepat dan dapat dipanen dalam waktu 3-4 bulan.",
        history: "Sambiloto telah digunakan dalam pengobatan tradisional Asia selama berabad-abad dan dikenal sebagai 'echinacea Asia'.",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Andrographis_paniculata_001.JPG",
        slug: "sambiloto",
        scientificClassification: {
          kingdom: "Plantae",
          division: "Magnoliophyta",
          class: "Magnoliopsida",
          order: "Lamiales",
          family: "Acanthaceae",
          genus: "Andrographis",
          species: "A. paniculata"
        }
      },
      {
        name: "Meniran",
        latinName: "Phyllanthus niruri",
        description: "Meniran adalah tanaman herba kecil yang memiliki khasiat untuk kesehatan ginjal dan hati. Tanaman ini sering disebut sebagai 'stone breaker'.",
        benefits: ["Menyehatkan ginjal", "Mencegah batu ginjal", "Menyehatkan hati", "Antivirus", "Meningkatkan imunitas"],
        uses: "Meniran biasanya dikonsumsi dalam bentuk teh atau ekstrak. Seluruh bagian tanaman dapat digunakan untuk pengobatan.",
        region: "Sulawesi Utara",
        parts: ["Seluruh tanaman"],
        habitat: "Meniran tumbuh liar di daerah tropis dan dapat ditemukan di halaman rumah. Tanaman ini menyukai tanah yang lembab dan naungan parsial.",
        cultivation: "Meniran mudah tumbuh dan dapat menyebar secara alami. Tanaman ini tidak memerlukan perawatan khusus dan tahan terhadap berbagai kondisi.",
        history: "Meniran telah digunakan dalam pengobatan tradisional Ayurveda dan jamu Indonesia untuk mengatasi masalah ginjal dan hati.",
        image: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/08/11041114/X-Manfaat-Daun-Meniran-untuk-Kesehatan-Tubuh.jpg.webp",
        slug: "meniran",
        scientificClassification: {
          kingdom: "Plantae",
          division: "Magnoliophyta",
          class: "Magnoliopsida",
          order: "Malpighiales",
          family: "Phyllanthaceae",
          genus: "Phyllanthus",
          species: "P. niruri"
        }
      },
      {
        name: "Pegagan",
        latinName: "Centella asiatica",
        description: "Pegagan adalah tanaman herba yang tumbuh merambat dengan daun berbentuk ginjal. Tanaman ini dikenal dapat meningkatkan fungsi otak dan menyembuhkan luka.",
        benefits: ["Meningkatkan memori", "Menyembuhkan luka", "Anti aging", "Menenangkan saraf", "Meningkatkan sirkulasi darah"],
        uses: "Pegagan dapat dikonsumsi sebagai lalap, dijus, atau dibuat teh. Daun segar dapat dimakan langsung atau diblender dengan air.",
        region: "Papua",
        parts: ["Daun"],
        habitat: "Pegagan tumbuh di daerah lembab seperti pinggir sungai, sawah, dan tempat yang tergenang air. Tanaman ini menyukai naungan parsial.",
        cultivation: "Pegagan mudah ditanam dan dapat diperbanyak dengan stolon. Tanaman ini membutuhkan kelembaban tinggi dan penyiraman teratur.",
        history: "Pegagan telah digunakan dalam pengobatan tradisional Asia selama ribuan tahun dan dikenal sebagai 'makanan otak' alami.",
        image: "https://ners.unair.ac.id/site/images/Lihat/daun_pegagan.png",
        slug: "pegagan",
        scientificClassification: {
          kingdom: "Plantae",
          division: "Magnoliophyta",
          class: "Magnoliopsida",
          order: "Apiales",
          family: "Apiaceae",
          genus: "Centella",
          species: "C. asiatica"
        }
      },
      {
        name: "Daun Binahong",
        latinName: "Anredera cordifolia",
        description: "Binahong adalah tanaman merambat yang memiliki daun tebal dan berair. Tanaman ini dikenal sebagai 'obat segala penyakit' karena khasiatnya yang beragam.",
        benefits: ["Menyembuhkan luka", "Anti inflamasi", "Meningkatkan stamina", "Menurunkan kolesterol", "Menyehatkan ginjal"],
        uses: "Daun binahong dapat dimakan langsung, dijus, atau direbus sebagai teh. Untuk luka luar, daun dapat ditumbuk dan digunakan sebagai kompres.",
        region: "Nusa Tenggara Barat",
        parts: ["Daun", "Umbi"],
        habitat: "Binahong tumbuh baik di daerah tropis dengan kelembaban tinggi. Tanaman ini memerlukan penyangga untuk merambat dan naungan parsial.",
        cultivation: "Binahong dapat diperbanyak dengan stek batang atau umbi. Tanaman ini tumbuh cepat dan memerlukan pemangkasan rutin.",
        history: "Binahong berasal dari Amerika Selatan dan telah menjadi populer di Indonesia sebagai tanaman obat keluarga dalam beberapa dekade terakhir.",
        image: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1679881074/attached_image/4-efek-samping-daun-binahong-yang-harus-diwaspadai.jpg",
        slug: "daun-binahong",
        scientificClassification: {
          kingdom: "Plantae",
          division: "Magnoliophyta",
          class: "Magnoliopsida",
          order: "Caryophyllales",
          family: "Basellaceae",
          genus: "Anredera",
          species: "A. cordifolia"
        }
      },
      {
        name: "Kencur",
        latinName: "Kaempferia galanga",
        description: "Kencur adalah tanaman rimpang yang memiliki aroma khas dan rasa pedas yang unik. Tanaman ini sering digunakan dalam ramuan jamu tradisional.",
        benefits: ["Mengobati batuk", "Melancarkan pencernaan", "Mengatasi masuk angin", "Anti inflamasi", "Meningkatkan nafsu makan"],
        uses: "Kencur dapat dikonsumsi sebagai jamu beras kencur, ditambahkan dalam masakan, atau direbus sebagai teh. Rimpang segar dapat dikunyah langsung.",
        region: "Yogyakarta",
        parts: ["Rimpang"],
        habitat: "Kencur tumbuh baik di dataran rendah dengan iklim tropis. Tanaman ini memerlukan tanah yang gembur dan drainase yang baik.",
        cultivation: "Kencur ditanam dengan menyemaikan rimpang. Tanaman ini membutuhkan naungan parsial dan penyiraman yang tidak berlebihan.",
        history: "Kencur telah menjadi bagian penting dalam kuliner dan pengobatan tradisional Indonesia, terutama dalam pembuatan jamu.",
        image: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1658726281/attached_image/khasiat-kencur-bisa-menyaingi-efek-obat-obatan-modern.jpg",
        slug: "kencur",
        scientificClassification: {
          kingdom: "Plantae",
          division: "Magnoliophyta",
          class: "Liliopsida",
          order: "Zingiberales",
          family: "Zingiberaceae",
          genus: "Kaempferia",
          species: "K. galanga"
        }
      }
    ];

    // Sample Articles Data
    const articlesData = [
      {
        title: "10 Tanaman Obat yang Wajib Ada di Halaman Rumah",
        excerpt: "Memiliki tanaman obat di halaman rumah tidak hanya memberikan udara segar, tetapi juga menyediakan obat alami untuk kebutuhan sehari-hari. Berikut adalah 10 tanaman obat yang mudah ditanam dan sangat bermanfaat.",
        content: `
          <p>Tanaman obat telah menjadi bagian integral dari kehidupan masyarakat Indonesia selama berabad-abad. Dengan menanam tanaman obat di halaman rumah, kita tidak hanya mendapatkan manfaat kesehatan, tetapi juga turut melestarikan kearifan lokal dan menjaga lingkungan.</p>
          
          <h2>1. Jahe (Zingiber officinale)</h2>
          <p>Jahe adalah salah satu tanaman obat yang paling mudah ditanam. Rimpangnya dapat digunakan untuk mengatasi mual, masuk angin, dan meningkatkan daya tahan tubuh.</p>
          
          <h2>2. Kunyit (Curcuma longa)</h2>
          <p>Kunyit mengandung kurkumin yang memiliki sifat anti-inflamasi dan antioksidan tinggi. Tanaman ini efektif untuk menjaga kesehatan hati dan meningkatkan imunitas.</p>
          
          <h2>3. Lidah Buaya (Aloe vera)</h2>
          <p>Gel lidah buaya sangat baik untuk perawatan kulit dan penyembuhan luka. Tanaman ini juga mudah dirawat dan tahan terhadap cuaca kering.</p>
          
          <h2>Tips Perawatan</h2>
          <ul>
            <li>Pastikan tanah memiliki drainase yang baik</li>
            <li>Berikan pupuk organik secara teratur</li>
            <li>Perhatikan kebutuhan air setiap tanaman</li>
            <li>Lakukan pemangkasan rutin untuk menjaga kesehatan tanaman</li>
          </ul>
          
          <p>Dengan memiliki tanaman obat di rumah, kita dapat mengurangi ketergantungan pada obat-obatan kimia dan hidup lebih sehat secara alami.</p>
        `,
        image: "https://d1bpj0tv6vfxyp.cloudfront.net/articles/591497_20-6-2023_7-29-52.jpeg",
        author: "Dr. Sari Herbal",
        date: new Date('2024-12-01'),
        slug: "10-tanaman-obat-wajib-halaman-rumah",
        category: "Panduan Menanam",
        readTime: "7 menit"
      },
      {
        title: "Manfaat Kunyit untuk Kesehatan dan Cara Pengolahannya",
        excerpt: "Kunyit atau Curcuma longa telah lama dikenal sebagai rempah ajaib dengan segudang manfaat kesehatan. Pelajari cara mengolah kunyit dengan benar untuk mendapatkan khasiat maksimal.",
        content: `
          <p>Kunyit adalah salah satu tanaman obat tradisional yang paling berharga di Indonesia. Kandungan kurkumin dalam kunyit memiliki sifat anti-inflamasi, antioksidan, dan antimikroba yang sangat kuat.</p>
          
          <h2>Kandungan Nutrisi Kunyit</h2>
          <p>Kunyit mengandung berbagai senyawa aktif, termasuk:</p>
          <ul>
            <li>Kurkumin (1-7%)</li>
            <li>Minyak atsiri (3-5%)</li>
            <li>Protein (6.3%)</li>
            <li>Lemak (5.1%)</li>
            <li>Karbohidrat (69.4%)</li>
          </ul>
          
          <h2>Manfaat Kesehatan</h2>
          <p>Penelitian modern telah membuktikan berbagai manfaat kunyit untuk kesehatan:</p>
          <ul>
            <li><strong>Anti-inflamasi:</strong> Mengurangi peradangan dalam tubuh</li>
            <li><strong>Antioksidan:</strong> Melawan radikal bebas</li>
            <li><strong>Hepatoprotektor:</strong> Melindungi fungsi hati</li>
            <li><strong>Imunomodulator:</strong> Meningkatkan sistem kekebalan tubuh</li>
          </ul>
          
          <h2>Cara Pengolahan yang Benar</h2>
          <p>Untuk mendapatkan manfaat maksimal, kunyit dapat diolah dengan berbagai cara:</p>
          <ol>
            <li><strong>Jamu Kunyit Asam:</strong> Rebus kunyit dengan asam jawa dan gula merah</li>
            <li><strong>Golden Milk:</strong> Campurkan bubuk kunyit dengan susu hangat</li>
            <li><strong>Teh Kunyit:</strong> Seduh irisan kunyit segar dengan air panas</li>
          </ol>
          
          <p>Konsumsi kunyit secara teratur dapat membantu menjaga kesehatan secara alami dan mencegah berbagai penyakit.</p>
        `,
        image: "https://d1bpj0tv6vfxyp.cloudfront.net/articles/195235_27-1-2021_18-30-52.webp",
        author: "Prof. Herbal Indonesia",
        date: new Date('2024-11-28'),
        slug: "manfaat-kunyit-kesehatan-cara-pengolahan",
        category: "Manfaat Kesehatan",
        readTime: "6 menit"
      },
      {
        title: "Konservasi Tanaman Obat: Melestarikan Warisan Nenek Moyang",
        excerpt: "Banyak tanaman obat tradisional Indonesia yang terancam punah akibat deforestasi dan urbanisasi. Upaya konservasi perlu dilakukan untuk melestarikan warisan berharga ini untuk generasi mendatang.",
        content: `
          <p>Indonesia memiliki kekayaan biodiversitas tanaman obat yang luar biasa. Namun, modernisasi dan perubahan gaya hidup mengancam kelestarian pengetahuan tradisional dan tanaman obat itu sendiri.</p>
          
          <h2>Ancaman terhadap Tanaman Obat</h2>
          <p>Beberapa faktor yang mengancam kelestarian tanaman obat Indonesia:</p>
          <ul>
            <li>Deforestasi dan alih fungsi lahan</li>
            <li>Pengambilan yang berlebihan tanpa budidaya</li>
            <li>Hilangnya pengetahuan tradisional</li>
            <li>Urbanisasi yang mengurangi area hijau</li>
          </ul>
          
          <h2>Upaya Konservasi</h2>
          <p>Berbagai upaya dapat dilakukan untuk melestarikan tanaman obat:</p>
          
          <h3>1. Konservasi In-Situ</h3>
          <p>Pelestarian tanaman di habitat aslinya melalui:</p>
          <ul>
            <li>Pembentukan kawasan konservasi</li>
            <li>Perlindungan hutan adat</li>
            <li>Regulasi pengambilan tanaman liar</li>
          </ul>
          
          <h3>2. Konservasi Ex-Situ</h3>
          <p>Pelestarian di luar habitat asli melalui:</p>
          <ul>
            <li>Kebun raya dan taman obat</li>
            <li>Bank benih tanaman obat</li>
            <li>Kultur jaringan</li>
          </ul>
          
          <h3>3. Budidaya Berkelanjutan</h3>
          <p>Mengembangkan sistem budidaya yang ramah lingkungan dan ekonomis untuk petani.</p>
          
          <h2>Peran Masyarakat</h2>
          <p>Masyarakat dapat berperan dalam konservasi dengan:</p>
          <ul>
            <li>Menanam tanaman obat di halaman rumah</li>
            <li>Mempelajari dan melestarikan pengetahuan tradisional</li>
            <li>Mendukung produk herbal lokal</li>
            <li>Menggunakan tanaman obat secara bijak</li>
          </ul>
          
          <p>Konservasi tanaman obat bukan hanya tanggung jawab pemerintah, tetapi juga setiap individu yang peduli pada warisan budaya dan lingkungan Indonesia.</p>
        `,
        image: "https://econusa.id/wp-content/uploads/2022/06/honai-suku-dani.jpg",
        author: "Dr. Konservasi Alam",
        date: new Date('2024-11-25'),
        slug: "konservasi-tanaman-obat-warisan-nenek-moyang",
        category: "Konservasi",
        readTime: "8 menit"
      },
      {
        title: "Cara Membuat Apotek Hidup di Rumah: Panduan Lengkap",
        excerpt: "Apotek hidup adalah konsep menanam berbagai tanaman obat di sekitar rumah untuk keperluan pengobatan sehari-hari. Pelajari cara membuatnya dengan mudah dan efektif.",
        content: `
          <p>Apotek hidup adalah konsep yang sangat relevan di era modern ini. Dengan memiliki berbagai tanaman obat di rumah, kita dapat mengurangi ketergantungan pada obat-obatan kimia dan hidup lebih sehat secara alami.</p>
          
          <h2>Perencanaan Apotek Hidup</h2>
          <p>Langkah pertama dalam membuat apotek hidup adalah perencanaan yang matang:</p>
          
          <h3>1. Survei Lahan</h3>
          <ul>
            <li>Ukur luas lahan yang tersedia</li>
            <li>Perhatikan intensitas cahaya matahari</li>
            <li>Cek kondisi drainase tanah</li>
            <li>Identifikasi sumber air terdekat</li>
          </ul>
          
          <h3>2. Pemilihan Tanaman</h3>
          <p>Pilih tanaman berdasarkan:</p>
          <ul>
            <li>Kebutuhan kesehatan keluarga</li>
            <li>Kondisi iklim setempat</li>
            <li>Kemudahan perawatan</li>
            <li>Manfaat ganda (obat dan bumbu)</li>
          </ul>
          
          <h2>Tanaman Wajib untuk Apotek Hidup</h2>
          
          <h3>Kategori Pencernaan</h3>
          <ul>
            <li>Jahe - untuk mual dan masuk angin</li>
            <li>Kencur - untuk batuk dan pencernaan</li>
            <li>Kunyit - untuk maag dan liver</li>
          </ul>
          
          <h3>Kategori Perawatan Kulit</h3>
          <ul>
            <li>Lidah buaya - untuk luka dan luka bakar</li>
            <li>Sirih - untuk antiseptik</li>
            <li>Binahong - untuk penyembuhan luka</li>
          </ul>
          
          <h3>Kategori Pernapasan</h3>
          <ul>
            <li>Sambiloto - untuk flu dan demam</li>
            <li>Meniran - untuk daya tahan tubuh</li>
          </ul>
          
          <h2>Layout dan Desain</h2>
          <p>Atur tanaman berdasarkan:</p>
          <ul>
            <li><strong>Tinggi tanaman:</strong> Tempatkan yang tinggi di belakang</li>
            <li><strong>Kebutuhan air:</strong> Kelompokkan berdasarkan kebutuhan penyiraman</li>
            <li><strong>Sinar matahari:</strong> Sesuaikan dengan kebutuhan masing-masing</li>
            <li><strong>Aksesibilitas:</strong> Buat jalur untuk pemeliharaan</li>
          </ul>
          
          <h2>Perawatan dan Pemeliharaan</h2>
          <p>Tips perawatan apotek hidup:</p>
          <ul>
            <li>Buat jadwal penyiraman dan pemupukan</li>
            <li>Lakukan pemangkasan rutin</li>
            <li>Monitor hama dan penyakit</li>
            <li>Rotasi panen untuk keberlanjutan</li>
          </ul>
          
          <p>Apotek hidup yang terawat dengan baik akan memberikan manfaat jangka panjang untuk kesehatan keluarga dan lingkungan.</p>
        `,
        image: "https://jendela360.com/info/wp-content/uploads/2020/06/apotik-hidup-3.jpg",
        author: "Tim Herbapedia",
        date: new Date('2024-11-22'),
        slug: "cara-membuat-apotek-hidup-rumah-panduan-lengkap",
        category: "Panduan Menanam",
        readTime: "10 menit"
      },
      {
        title: "Jamu Tradisional Indonesia: Khasiat dan Resep Turun Temurun",
        excerpt: "Jamu adalah warisan budaya Indonesia yang telah terbukti khasiatnya selama berabad-abad. Pelajari berbagai resep jamu tradisional dan manfaatnya untuk kesehatan modern.",
        content: `
          <p>Jamu merupakan warisan budaya Indonesia yang sangat berharga. Minuman herbal tradisional ini telah digunakan selama berabad-abad dan terbukti memiliki khasiat yang luar biasa untuk menjaga kesehatan.</p>
          
          <h2>Sejarah Jamu Indonesia</h2>
          <p>Tradisi jamu sudah ada sejak zaman kerajaan Mataram Kuno (abad ke-8). Relief di Candi Borobudur menunjukkan bahwa nenek moyang kita sudah mengenal tanaman obat dan cara pengolahannya.</p>
          
          <h2>Jenis-Jenis Jamu Tradisional</h2>
          
          <h3>1. Jamu Kunyit Asam</h3>
          <p><strong>Bahan:</strong> Kunyit segar, asam jawa, gula merah, garam</p>
          <p><strong>Khasiat:</strong> Menyehatkan organ reproduksi wanita, melancarkan haid</p>
          <p><strong>Cara membuat:</strong></p>
          <ol>
            <li>Parut 200g kunyit segar</li>
            <li>Rebus dengan 1 liter air</li>
            <li>Tambahkan 2 sdm asam jawa</li>
            <li>Saring dan tambahkan gula merah secukupnya</li>
          </ol>
          
          <h3>2. Jamu Beras Kencur</h3>
          <p><strong>Bahan:</strong> Beras, kencur, jahe, asam jawa, gula merah</p>
          <p><strong>Khasiat:</strong> Meningkatkan nafsu makan, mengobati masuk angin</p>
          
          <h3>3. Jamu Temulawak</h3>
          <p><strong>Bahan:</strong> Temulawak, jahe, serai, daun pandan</p>
          <p><strong>Khasiat:</strong> Menyehatkan liver, meningkatkan stamina</p>
          
          <h2>Manfaat Jamu untuk Kesehatan Modern</h2>
          <p>Penelitian modern membuktikan bahwa jamu memiliki berbagai manfaat:</p>
          <ul>
            <li><strong>Antioksidan tinggi:</strong> Melawan radikal bebas</li>
            <li><strong>Anti-inflamasi:</strong> Mengurangi peradangan</li>
            <li><strong>Imunomodulator:</strong> Meningkatkan daya tahan tubuh</li>
            <li><strong>Hepatoprotektor:</strong> Melindungi fungsi hati</li>
          </ul>
          
          <h2>Tips Mengonsumsi Jamu</h2>
          <ul>
            <li>Konsumsi secara teratur untuk hasil optimal</li>
            <li>Sesuaikan dengan kondisi kesehatan individu</li>
            <li>Gunakan bahan-bahan segar dan berkualitas</li>
            <li>Konsultasikan dengan ahli herbal untuk kondisi khusus</li>
          </ul>
          
          <h2>Jamu dalam Era Modern</h2>
          <p>Kini jamu sudah berkembang menjadi industri modern dengan standar GMP (Good Manufacturing Practice), namun tetap mempertahankan kearifan tradisional dalam formulasinya.</p>
          
          <p>Jamu bukan hanya minuman, tetapi juga filosofi hidup sehat yang perlu dilestarikan dan diteruskan kepada generasi mendatang.</p>
        `,
        image: "https://stifera.ac.id/wp-content/uploads/2023/07/622deb4988ac0.jpg",
        author: "Mbok Jamu Tradisional",
        date: new Date('2024-11-20'),
        slug: "jamu-tradisional-indonesia-khasiat-resep-turun-temurun",
        category: "Budaya Tradisional",
        readTime: "9 menit"
      },
      {
        title: "Teknologi Modern dalam Budidaya Tanaman Obat",
        excerpt: "Kemajuan teknologi telah membawa inovasi dalam budidaya tanaman obat. Dari hidroponik hingga sensor IoT, teknologi modern membantu meningkatkan kualitas dan produktivitas tanaman obat.",
        content: `
          <p>Budidaya tanaman obat kini telah mengalami revolusi dengan pemanfaatan teknologi modern. Teknologi ini tidak hanya meningkatkan produktivitas, tetapi juga menjaga kualitas dan konsistensi kandungan aktif tanaman obat.</p>
          
          <h2>Teknologi dalam Budidaya Modern</h2>
          
          <h3>1. Sistem Hidroponik</h3>
          <p>Hidroponik memungkinkan budidaya tanaman obat tanpa tanah dengan keunggulan:</p>
          <ul>
            <li>Kontrol nutrisi yang presisi</li>
            <li>Bebas dari patogen tanah</li>
            <li>Penggunaan air yang efisien</li>
            <li>Produktivitas lebih tinggi</li>
          </ul>
          
          <h3>2. Internet of Things (IoT)</h3>
          <p>Sensor IoT membantu monitoring real-time:</p>
          <ul>
            <li>Kelembaban tanah dan udara</li>
            <li>Suhu lingkungan</li>
            <li>pH dan nutrisi tanah</li>
            <li>Intensitas cahaya</li>
          </ul>
          
          <h3>3. Greenhouse Technology</h3>
          <p>Rumah kaca modern dengan kontrol otomatis untuk:</p>
          <ul>
            <li>Pengaturan suhu dan kelembaban</li>
            <li>Sistem irigasi otomatis</li>
            <li>Perlindungan dari hama</li>
            <li>Optimasi pencahayaan</li>
          </ul>
          
          <h2>Kultur Jaringan Tanaman</h2>
          <p>Teknologi kultur jaringan memungkinkan:</p>
          <ul>
            <li>Propagasi massal tanaman berkualitas</li>
            <li>Bebas dari virus dan penyakit</li>
            <li>Konservasi plasma nutfah</li>
            <li>Produksi bibit uniform</li>
          </ul>
          
          <h2>Analisis Fitokimia Modern</h2>
          <p>Teknologi analisis modern seperti:</p>
          <ul>
            <li><strong>HPLC:</strong> Analisis senyawa aktif</li>
            <li><strong>GC-MS:</strong> Identifikasi komponen volatil</li>
            <li><strong>Spektrofotometri:</strong> Kuantifikasi senyawa</li>
            <li><strong>DNA Barcoding:</strong> Identifikasi spesies</li>
          </ul>
          
          <h2>Precision Agriculture</h2>
          <p>Pertanian presisi menggunakan:</p>
          <ul>
            <li>GPS untuk pemetaan lahan</li>
            <li>Drone untuk monitoring tanaman</li>
            <li>Variable rate technology untuk pemupukan</li>
            <li>Machine learning untuk prediksi panen</li>
          </ul>
          
          <h2>Keuntungan Teknologi Modern</h2>
          <ul>
            <li><strong>Kualitas konsisten:</strong> Kandungan aktif terstandardisasi</li>
            <li><strong>Produktivitas tinggi:</strong> Hasil panen optimal</li>
            <li><strong>Efisiensi sumber daya:</strong> Penggunaan air dan pupuk minimal</li>
            <li><strong>Ramah lingkungan:</strong> Mengurangi pestisida kimia</li>
          </ul>
          
          <h2>Tantangan dan Solusi</h2>
          <p>Meskipun memberikan banyak keuntungan, penerapan teknologi juga memiliki tantangan:</p>
          <ul>
            <li><strong>Biaya investasi tinggi:</strong> Perlu dukungan pembiayaan</li>
            <li><strong>Skill gap:</strong> Memerlukan pelatihan SDM</li>
            <li><strong>Maintenance:</strong> Perlu sistem support yang baik</li>
          </ul>
          
          <p>Integrasi teknologi modern dengan kearifan tradisional akan membawa budidaya tanaman obat Indonesia ke level yang lebih tinggi, mendukung industri farmasi herbal yang berkelanjutan.</p>
        `,
        image: "https://pertanian.sultengprov.go.id/wp-content/uploads/2022/12/smart-farming-iot-agriculture.webp",
        author: "Dr. Agritech Herbal",
        date: new Date('2024-11-18'),
        slug: "teknologi-modern-budidaya-tanaman-obat",
        category: "Penelitian & Inovasi",
        readTime: "8 menit"
      },
      {
        title: "Panduan Mengenal Tanaman Obat Beracun dan Cara Menghindarinya",
        excerpt: "Tidak semua tanaman yang terlihat alami aman untuk dikonsumsi. Beberapa tanaman memiliki kandungan racun yang berbahaya. Pelajari cara mengidentifikasi dan menghindari tanaman beracun.",
        content: `
          <p>Dalam dunia tanaman obat, tidak semua yang alami berarti aman. Beberapa tanaman mengandung senyawa toksik yang dapat berbahaya bagi kesehatan jika dikonsumsi tanpa pengetahuan yang tepat.</p>
          
          <h2>Prinsip Dasar Keamanan Tanaman Obat</h2>
          <p>Hippocrates pernah berkata: "Semua adalah obat dan semua adalah racun, dosislah yang membedakannya." Prinsip ini sangat relevan dalam penggunaan tanaman obat.</p>
          
          <h2>Tanaman Obat yang Berpotensi Beracun</h2>
          
          <h3>1. Jarak Pagar (Jatropha curcas)</h3>
          <p><strong>Bagian beracun:</strong> Biji dan getah</p>
          <p><strong>Gejala keracunan:</strong> Mual, muntah, diare, kram perut</p>
          <p><strong>Penggunaan aman:</strong> Hanya untuk obat luar</p>
          
          <h3>2. Kecubung (Datura metel)</h3>
          <p><strong>Kandungan beracun:</strong> Alkaloid tropin</p>
          <p><strong>Gejala:</strong> Halusinasi, kejang, koma</p>
          <p><strong>Catatan:</strong> Sangat berbahaya, hindari penggunaan</p>
          
          <h3>3. Tapak Dara (Catharanthus roseus)</h3>
          <p><strong>Kandungan:</strong> Alkaloid vinka yang sitotoksik</p>
          <p><strong>Risiko:</strong> Dapat menyebabkan kanker jika berlebihan</p>
          
          <h2>Cara Mengidentifikasi Tanaman Beracun</h2>
          
          <h3>Ciri-ciri Visual</h3>
          <ul>
            <li>Warna buah atau bunga yang mencolok</li>
            <li>Getah berwarna putih atau bening</li>
            <li>Bau yang menyengat atau tidak sedap</li>
            <li>Tekstur daun yang kasar atau berbulu</li>
          </ul>
          
          <h3>Tes Sederhana</h3>
          <ul>
            <li><strong>Skin test:</strong> Oleskan getah di kulit, lihat reaksi</li>
            <li><strong>Smell test:</strong> Cium aroma, hindari yang mencurigakan</li>
            <li><strong>Research:</strong> Selalu verifikasi identitas tanaman</li>
          </ul>
          
          <h2>Prinsip Penggunaan yang Aman</h2>
          
          <h3>1. Identifikasi yang Tepat</h3>
          <ul>
            <li>Gunakan nama latin untuk akurasi</li>
            <li>Konsultasi dengan ahli botani</li>
            <li>Gunakan referensi yang terpercaya</li>
            <li>Hindari tanaman yang tidak dikenal</li>
          </ul>
          
          <h3>2. Dosis yang Tepat</h3>
          <ul>
            <li>Mulai dengan dosis kecil</li>
            <li>Ikuti panduan tradisional yang terbukti</li>
            <li>Perhatikan reaksi tubuh</li>
            <li>Jangan berlebihan dalam penggunaan</li>
          </ul>
          
          <h3>3. Cara Pengolahan</h3>
          <ul>
            <li>Beberapa racun dapat dihilangkan dengan pemasakan</li>
            <li>Fermentasi dapat mengurangi toksisitas</li>
            <li>Pengeringan yang benar penting untuk keamanan</li>
          </ul>
          
          <h2>Tanda-tanda Keracunan Tanaman</h2>
          <p>Waspadai gejala berikut:</p>
          <ul>
            <li>Mual dan muntah</li>
            <li>Diare atau sembelit</li>
            <li>Pusing atau sakit kepala</li>
            <li>Ruam kulit atau gatal-gatal</li>
            <li>Kesulitan bernapas</li>
            <li>Kejang atau pingsan</li>
          </ul>
          
          <h2>Pertolongan Pertama Keracunan</h2>
          <ol>
            <li>Hentikan konsumsi tanaman</li>
            <li>Minum banyak air putih</li>
            <li>Jangan memuntahkan jika tidak disarankan</li>
            <li>Segera hubungi tenaga medis</li>
            <li>Bawa sampel tanaman yang dikonsumsi</li>
          </ol>
          
          <h2>Kelompok Berisiko Tinggi</h2>
          <p>Kelompok yang perlu ekstra hati-hati:</p>
          <ul>
            <li>Anak-anak dan balita</li>
            <li>Ibu hamil dan menyusui</li>
            <li>Lansia dengan kondisi komorbid</li>
            <li>Penderita penyakit liver atau ginjal</li>
          </ul>
          
          <p>Ingatlah bahwa keamanan selalu menjadi prioritas utama dalam penggunaan tanaman obat. Konsultasikan dengan ahli herbal atau tenaga medis sebelum menggunakan tanaman yang belum familiar.</p>
        `,
        image: "https://asset.kompas.com/crop/0x18:1000x518/780x390/data/photo/2018/09/24/1319032216.jpg",
        author: "Dr. Toksikologi Herbal",
        date: new Date('2024-11-15'),
        slug: "panduan-mengenal-tanaman-obat-beracun-cara-menghindari",
        category: "Tips dan Trik",
        readTime: "12 menit"
      },
      {
        title: "Budidaya Jahe: Dari Penanaman hingga Panen untuk Pemula",
        excerpt: "Jahe adalah salah satu tanaman obat yang paling mudah dibudidayakan. Pelajari teknik budidaya jahe yang benar untuk mendapatkan hasil panen yang optimal di halaman rumah Anda.",
        content: `
          <p>Jahe (Zingiber officinale) adalah salah satu tanaman obat yang paling populer dan mudah dibudidayakan. Dengan teknik yang tepat, Anda dapat membudidayakan jahe di halaman rumah dan mendapatkan hasil panen yang optimal.</p>
          
          <h2>Persiapan Lahan dan Media Tanam</h2>
          
          <h3>Pemilihan Lokasi</h3>
          <ul>
            <li><strong>Ketinggian:</strong> 0-1500 mdpl (optimal 500-950 mdpl)</li>
            <li><strong>Curah hujan:</strong> 2500-4000 mm/tahun</li>
            <li><strong>Suhu:</strong> 25-30°C</li>
            <li><strong>Kelembaban:</strong> 80-90%</li>
            <li><strong>Naungan:</strong> 50-60% (tidak terlalu teduh)</li>
          </ul>
          
          <h3>Persiapan Tanah</h3>
          <ol>
            <li><strong>Olah tanah</strong> sedalam 30-40 cm</li>
            <li><strong>Buat bedengan</strong> lebar 100-120 cm, tinggi 30 cm</li>
            <li><strong>Beri pupuk dasar</strong> berupa kompos 10-15 ton/ha</li>
            <li><strong>Atur drainase</strong> yang baik untuk mencegah genangan</li>
          </ol>
          
          <h2>Pemilihan dan Persiapan Bibit</h2>
          
          <h3>Kriteria Bibit Berkualitas</h3>
          <ul>
            <li>Rimpang tua (10-12 bulan)</li>
            <li>Sehat, tidak busuk atau berjamur</li>
            <li>Memiliki mata tunas yang jelas</li>
            <li>Berat minimum 25-50 gram per rimpang</li>
          </ul>
          
          <h3>Perlakuan Bibit</h3>
          <ol>
            <li><strong>Pemotongan:</strong> Potong rimpang dengan 2-3 mata tunas</li>
            <li><strong>Pengeringan:</strong> Angin-anginkan 1-2 hari</li>
            <li><strong>Perendaman:</strong> Rendam dalam larutan fungisida 15 menit</li>
            <li><strong>Penyimpanan:</strong> Simpan di tempat sejuk hingga tunas muncul</li>
          </ol>
          
          <h2>Teknik Penanaman</h2>
          
          <h3>Waktu Tanam</h3>
          <p>Penanaman optimal dilakukan pada:</p>
          <ul>
            <li>Awal musim hujan (Oktober-November)</li>
            <li>Akhir musim hujan (Februari-Maret)</li>
          </ul>
          
          <h3>Cara Tanam</h3>
          <ol>
            <li><strong>Buat lubang</strong> sedalam 3-5 cm</li>
            <li><strong>Jarak tanam</strong> 25x30 cm atau 30x30 cm</li>
            <li><strong>Posisi rimpang</strong> mata tunas menghadap ke atas</li>
            <li><strong>Tutup tanah</strong> tipis dan siram secukupnya</li>
          </ol>
          
          <h2>Pemeliharaan Tanaman</h2>
          
          <h3>Penyiraman</h3>
          <ul>
            <li><strong>Frekuensi:</strong> 2-3 kali seminggu</li>
            <li><strong>Intensitas:</strong> Cukup untuk menjaga kelembaban</li>
            <li><strong>Hindari:</strong> Genangan air yang berlebihan</li>
          </ul>
          
          <h3>Pemupukan</h3>
          <p><strong>Pupuk Dasar (saat tanam):</strong></p>
          <ul>
            <li>Kompos: 10-15 ton/ha</li>
            <li>TSP: 100 kg/ha</li>
            <li>KCl: 100 kg/ha</li>
          </ul>
          
          <p><strong>Pupuk Susulan:</strong></p>
          <ul>
            <li><strong>Umur 2 bulan:</strong> Urea 50 kg/ha + KCl 50 kg/ha</li>
            <li><strong>Umur 4 bulan:</strong> Urea 50 kg/ha + KCl 50 kg/ha</li>
            <li><strong>Umur 6 bulan:</strong> KCl 100 kg/ha</li>
          </ul>
          
          <h3>Penyiangan dan Pembumbunan</h3>
          <ul>
            <li><strong>Penyiangan:</strong> Setiap 2-3 minggu</li>
            <li><strong>Pembumbunan:</strong> Saat tanaman tinggi 20-25 cm</li>
            <li><strong>Mulching:</strong> Gunakan jerami atau daun kering</li>
          </ul>
          
          <h2>Pengendalian Hama dan Penyakit</h2>
          
          <h3>Hama Utama</h3>
          <ul>
            <li><strong>Penggerek batang:</strong> Gunakan Beauveria bassiana</li>
            <li><strong>Ulat grayak:</strong> Semprot dengan Bt (Bacillus thuringiensis)</li>
            <li><strong>Kepik hijau:</strong> Perangkap kuning atau insektisida nabati</li>
          </ul>
          
          <h3>Penyakit Utama</h3>
          <ul>
            <li><strong>Busuk rimpang:</strong> Perbaiki drainase, gunakan fungisida</li>
            <li><strong>Layu bakteri:</strong> Sanitasi lahan, rotasi tanaman</li>
            <li><strong>Bercak daun:</strong> Semprot fungisida sistemik</li>
          </ul>
          
          <h2>Panen dan Pasca Panen</h2>
          
          <h3>Waktu Panen</h3>
          <ul>
            <li><strong>Jahe muda:</strong> 4-6 bulan (untuk bumbu)</li>
            <li><strong>Jahe tua:</strong> 8-12 bulan (untuk obat)</li>
          </ul>
          
          <h3>Ciri-ciri Siap Panen</h3>
          <ul>
            <li>Daun mulai menguning</li>
            <li>Batang mengering</li>
            <li>Rimpang mudah dipatahkan</li>
            <li>Aroma jahe kuat</li>
          </ul>
          
          <h3>Teknik Panen</h3>
          <ol>
            <li>Gali hati-hati agar rimpang tidak rusak</li>
            <li>Bersihkan dari tanah dan akar</li>
            <li>Sortir berdasarkan ukuran dan kualitas</li>
            <li>Keringkan di tempat teduh 1-2 hari</li>
          </ol>
          
          <h2>Pengolahan dan Penyimpanan</h2>
          
          <h3>Jahe Segar</h3>
          <ul>
            <li>Simpan di tempat sejuk dan kering</li>
            <li>Tahan 2-3 minggu</li>
            <li>Untuk konsumsi langsung</li>
          </ul>
          
          <h3>Jahe Kering</h3>
          <ul>
            <li>Iris tipis dan jemur hingga kering</li>
            <li>Tahan hingga 1 tahun</li>
            <li>Untuk bubuk atau teh</li>
          </ul>
          
          <h2>Analisis Ekonomi</h2>
          <p><strong>Produktivitas:</strong> 15-25 ton/ha</p>
          <p><strong>Harga jual:</strong> Rp 15.000-25.000/kg (tergantung kualitas)</p>
          <p><strong>Keuntungan:</strong> Rp 150-400 juta/ha/tahun</p>
          
          <p>Budidaya jahe sangat menguntungkan karena permintaan yang tinggi dan teknik budidaya yang relatif mudah. Dengan perawatan yang tepat, Anda dapat memperoleh hasil panen yang optimal dan berkualitas tinggi.</p>
        `,
        image: "https://tanilink.com/uploads/berita/2024-05-08/cover_jahe.png",
        author: "Petani Jahe Sukses",
        date: new Date('2024-11-12'),
        slug: "budidaya-jahe-penanaman-hingga-panen-pemula",
        category: "Panduan Menanam",
        readTime: "15 menit"
      },
      {
        title: "Kearifan Lokal dalam Pengobatan Tradisional Indonesia",
        excerpt: "Kearifan lokal dalam pengobatan tradisional Indonesia mencerminkan harmoni antara manusia dan alam. Pelajari bagaimana nenek moyang kita menggunakan tanaman obat dengan bijak.",
        content: `
          <p>Indonesia memiliki warisan kearifan lokal yang sangat kaya dalam bidang pengobatan tradisional. Selama berabad-abad, masyarakat Indonesia telah mengembangkan sistem pengobatan yang holistik dan berkelanjutan.</p>
          
          <h2>Filosofi Pengobatan Tradisional Indonesia</h2>
          
          <h3>Konsep Keseimbangan</h3>
          <p>Pengobatan tradisional Indonesia didasarkan pada konsep keseimbangan:</p>
          <ul>
            <li><strong>Mikrokosmos vs Makrokosmos:</strong> Manusia sebagai cerminan alam semesta</li>
            <li><strong>Panas vs Dingin:</strong> Keseimbangan sifat dalam tubuh</li>
            <li><strong>Basah vs Kering:</strong> Kondisi humor tubuh</li>
            <li><strong>Jiwa vs Raga:</strong> Kesehatan holistik</li>
          </ul>
          
          <h3>Prinsip Pengobatan</h3>
          <ul>
            <li><strong>Preventif:</strong> Mencegah lebih baik daripada mengobati</li>
            <li><strong>Holistik:</strong> Mengobati penyebab, bukan hanya gejala</li>
            <li><strong>Individual:</strong> Sesuai dengan konstitusi individu</li>
            <li><strong>Berkelanjutan:</strong> Ramah lingkungan dan dapat diperbaharui</li>
          </ul>
          
          <h2>Sistem Pengobatan Tradisional Nusantara</h2>
          
          <h3>1. Jamu Jawa</h3>
          <p>Sistem pengobatan yang berasal dari Jawa dengan karakteristik:</p>
          <ul>
            <li>Penggunaan rempah-rempah lokal</li>
            <li>Formulasi yang telah diwariskan turun-temurun</li>
            <li>Penekanan pada pencegahan penyakit</li>
            <li>Disesuaikan dengan kondisi iklim tropis</li>
          </ul>
          
          <h3>2. Usada Bali</h3>
          <p>Sistem pengobatan Bali yang memadukan:</p>
          <ul>
            <li>Pengobatan herbal dengan ritual spiritual</li>
            <li>Pustaka lontar sebagai panduan</li>
            <li>Balian sebagai praktisi tradisional</li>
            <li>Integrasi dengan kalender Hindu-Bali</li>
          </ul>
          
          <h3>3. Ramuan Minangkabau</h3>
          <p>Tradisi pengobatan Sumatera Barat:</p>
          <ul>
            <li>Penggunaan tanaman dataran tinggi</li>
            <li>Sistem matrilineal dalam pewarisan ilmu</li>
            <li>Integrasi dengan budaya Islam</li>
            <li>Praktik komunal dalam pengobatan</li>
          </ul>
          
          <h2>Tokoh Penting dalam Pengobatan Tradisional</h2>
          
          <h3>Dukun/Tabib</h3>
          <p>Peran dan fungsi dalam masyarakat:</p>
          <ul>
            <li><strong>Penyembuh:</strong> Mengobati penyakit fisik dan spiritual</li>
            <li><strong>Penasihat:</strong> Memberikan bimbingan hidup</li>
            <li><strong>Penjaga tradisi:</strong> Melestarikan pengetahuan lokal</li>
            <li><strong>Mediator:</strong> Penghubung dengan alam gaib</li>
          </ul>
          
          <h3>Mbok Jamu</h3>
          <p>Penjual jamu keliling yang memiliki peran:</p>
          <ul>
            <li>Menyebarkan pengetahuan jamu</li>
            <li>Menjaga tradisi oral</li>
            <li>Adaptasi resep sesuai kebutuhan</li>
            <li>Membangun kepercayaan masyarakat</li>
          </ul>
          
          <h2>Kearifan dalam Pemilihan Tanaman</h2>
          
          <h3>Doctrine of Signatures</h3>
          <p>Konsep bahwa bentuk tanaman menunjukkan kegunaannya:</p>
          <ul>
            <li><strong>Daun berbentuk hati:</strong> Untuk penyakit jantung</li>
            <li><strong>Getah putih:</strong> Untuk produksi ASI</li>
            <li><strong>Akar kuning:</strong> Untuk penyakit kuning</li>
            <li><strong>Buah merah:</strong> Untuk menambah darah</li>
          </ul>
          
          <h3>Waktu Pemanenan</h3>
          <p>Berdasarkan siklus lunar dan musim:</p>
          <ul>
            <li><strong>Purnama:</strong> Kandungan aktif maksimal</li>
            <li><strong>Pagi hari:</strong> Sebelum matahari terbit</li>
            <li><strong>Musim kemarau:</strong> Konsentrasi senyawa tinggi</li>
            <li><strong>Fase bulan:</strong> Sesuai kepercayaan lokal</li>
          </ul>
          
          <h2>Ritual dan Upacara</h2>
          
          <h3>Ritual Pemetikan</h3>
          <ul>
            <li>Mohon izin kepada penunggu tanaman</li>
            <li>Pembacaan mantra atau doa</li>
            <li>Sesajen untuk roh pelindung</li>
            <li>Pantangan tertentu saat memetik</li>
          </ul>
          
          <h3>Proses Pengolahan</h3>
          <ul>
            <li>Pembacaan mantra saat meracik</li>
            <li>Penggunaan peralatan khusus</li>
            <li>Waktu pengolahan yang tepat</li>
            <li>Niat yang suci dalam pembuatan</li>
          </ul>
          
          <h2>Sistem Transmisi Pengetahuan</h2>
          
          <h3>Oral Tradition</h3>
          <ul>
            <li>Cerita rakyat dengan pesan kesehatan</li>
            <li>Pantun dan syair obat-obatan</li>
            <li>Legenda asal-usul tanaman obat</li>
            <li>Tembang dan lagu tradisional</li>
          </ul>
          
          <h3>Sistem Magang</h3>
          <ul>
            <li>Pembelajaran langsung dari guru</li>
            <li>Pengalaman praktis di lapangan</li>
            <li>Pembentukan karakter spiritual</li>
            <li>Ujian kemampuan sebelum lulus</li>
          </ul>
          
          <h2>Integrasi dengan Kehidupan Sehari-hari</h2>
          
          <h3>Makanan sebagai Obat</h3>
          <p>Konsep "Let food be thy medicine":</p>
          <ul>
            <li>Bumbu dapur sebagai obat</li>
            <li>Makanan sesuai musim</li>
            <li>Diet berdasarkan konstitusi tubuh</li>
            <li>Pantangan makanan saat sakit</li>
          </ul>
          
          <h3>Gaya Hidup Sehat</h3>
          <ul>
            <li>Bangun pagi dan tidur awal</li>
            <li>Aktivitas fisik sesuai kemampuan</li>
            <li>Meditasi dan doa</li>
            <li>Hidup selaras dengan alam</li>
          </ul>
          
          <h2>Tantangan Modern</h2>
          
          <h3>Ancaman Kepunahan</h3>
          <ul>
            <li>Urbanisasi dan modernisasi</li>
            <li>Hilangnya habitat tanaman obat</li>
            <li>Berkurangnya penerus tradisi</li>
            <li>Dominasi obat modern</li>
          </ul>
          
          <h3>Upaya Pelestarian</h3>
          <ul>
            <li>Dokumentasi pengetahuan tradisional</li>
            <li>Pendidikan formal tentang herbal</li>
            <li>Penelitian ilmiah untuk validasi</li>
            <li>Pengembangan wisata edukasi</li>
          </ul>
          
          <h2>Relevansi untuk Masa Depan</h2>
          <p>Kearifan lokal dalam pengobatan tradisional memberikan:</p>
          <ul>
            <li><strong>Sustainability:</strong> Model pengobatan berkelanjutan</li>
            <li><strong>Biodiversity:</strong> Pelestarian keanekaragaman hayati</li>
            <li><strong>Cultural identity:</strong> Identitas budaya bangsa</li>
            <li><strong>Innovation source:</strong> Sumber inovasi obat modern</li>
          </ul>
          
          <p>Kearifan lokal bukan hanya warisan masa lalu, tetapi juga blueprint untuk masa depan pengobatan yang holistik, berkelanjutan, dan berbasis alam. Melestarikan dan mengembangkan kearifan ini adalah tanggung jawab bersama untuk generasi mendatang.</p>
        `,
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7yaiOKdn0VmdSu9kUMj4T0WfIgzPghKQylZ0yibruM3TcPKrNw75zV4SmGCgZCU89I9DFG9hK7XDGTgQeBSt62TzRAirvGostzkwDL_30P1WKI4EXHkETLqcyswrsTPU3EK8_PCieLTSTaobcJuYfm_N-jKqvVqUgsZlurXcxzDuriDhbxsnP77thayCj/s860/pengobatan-alternatif-medium_1661004670.webp",
        author: "Prof. Antropologi Medis",
        date: new Date('2024-11-10'),
        slug: "kearifan-lokal-pengobatan-tradisional-indonesia",
        category: "Budaya Tradisional",
        readTime: "14 menit"
      },
      {
        title: "Mengatasi Insomnia dengan Tanaman Obat Alami",
        excerpt: "Insomnia atau gangguan tidur dapat diatasi dengan bantuan tanaman obat alami. Pelajari berbagai tanaman herbal yang terbukti efektif untuk meningkatkan kualitas tidur secara alami.",
        content: `
          <p>Insomnia atau gangguan tidur telah menjadi masalah yang semakin umum di era modern. Stress, teknologi, dan gaya hidup yang tidak sehat sering menjadi penyebab utama. Untungnya, alam menyediakan berbagai tanaman obat yang dapat membantu mengatasi masalah tidur secara alami.</p>
          
          <h2>Memahami Insomnia</h2>
          
          <h3>Jenis-jenis Insomnia</h3>
          <ul>
            <li><strong>Insomnia akut:</strong> Berlangsung beberapa hari hingga minggu</li>
            <li><strong>Insomnia kronis:</strong> Terjadi minimal 3 malam per minggu selama 3 bulan</li>
            <li><strong>Insomnia onset:</strong> Sulit memulai tidur</li>
            <li><strong>Insomnia maintenance:</strong> Sering terbangun di malam hari</li>
          </ul>
          
          <h3>Penyebab Insomnia</h3>
          <ul>
            <li>Stress dan kecemasan</li>
            <li>Pola hidup tidak teratur</li>
            <li>Konsumsi kafein berlebihan</li>
            <li>Lingkungan tidur yang tidak nyaman</li>
            <li>Gangguan hormonal</li>
            <li>Efek samping obat-obatan</li>
          </ul>
          
          <h2>Tanaman Obat untuk Mengatasi Insomnia</h2>
          
          <h3>1. Chamomile (Matricaria chamomilla)</h3>
          <p><strong>Kandungan aktif:</strong> Apigenin, bisabolol</p>
          <p><strong>Cara kerja:</strong> Mengikat reseptor benzodiazepine di otak</p>
          <p><strong>Penggunaan:</strong></p>
          <ul>
            <li>Teh chamomile 1-2 cangkir sebelum tidur</li>
            <li>Essential oil untuk aromaterapi</li>
            <li>Ekstrak dalam bentuk kapsul</li>
          </ul>
          
          <h3>2. Lavender (Lavandula angustifolia)</h3>
          <p><strong>Kandungan aktif:</strong> Linalool, linalyl acetate</p>
          <p><strong>Manfaat:</strong> Menenangkan sistem saraf</p>
          <p><strong>Cara penggunaan:</strong></p>
          <ul>
            <li>Aromaterapi dengan essential oil</li>
            <li>Teh lavender hangat</li>
            <li>Bunga kering di bawah bantal</li>
            <li>Mandi dengan air lavender</li>
          </ul>
          
          <h3>3. Valerian (Valeriana officinalis)</h3>
          <p><strong>Kandungan aktif:</strong> Asam valerenat, isovalerat</p>
          <p><strong>Efek:</strong> Sedatif alami yang kuat</p>
          <p><strong>Dosis:</strong> 300-600 mg ekstrak 1-2 jam sebelum tidur</p>
          <p><strong>Peringatan:</strong> Dapat menyebabkan kantuk di pagi hari</p>
          
          <h3>4. Passiflora (Passiflora incarnata)</h3>
          <p><strong>Nama lokal:</strong> Markisa</p>
          <p><strong>Kandungan:</strong> Flavonoid, alkaloid</p>
          <p><strong>Manfaat:</strong> Mengurangi kecemasan dan meningkatkan kualitas tidur</p>
          <p><strong>Penggunaan:</strong> Teh dari daun kering 1-2 cangkir sebelum tidur</p>
          
          <h3>5. Lemon Balm (Melissa officinalis)</h3>
          <p><strong>Kandungan aktif:</strong> Rosmarinic acid, citronellal</p>
          <p><strong>Efek:</strong> Menenangkan dan mengurangi stress</p>
          <p><strong>Cara penggunaan:</strong></p>
          <ul>
            <li>Teh lemon balm segar atau kering</li>
            <li>Ekstrak cair 1-2 ml sebelum tidur</li>
            <li>Kombinasi dengan chamomile</li>
          </ul>
          
          <h2>Tanaman Obat Lokal Indonesia</h2>
          
          <h3>1. Pegagan (Centella asiatica)</h3>
          <p><strong>Manfaat:</strong> Menenangkan sistem saraf, mengurangi kecemasan</p>
          <p><strong>Penggunaan:</strong></p>
          <ul>
            <li>Jus daun pegagan segar</li>
            <li>Teh dari daun kering</li>
            <li>Dimakan sebagai lalapan</li>
          </ul>
          
          <h3>2. Sambiloto (Andrographis paniculata)</h3>
          <p><strong>Manfaat:</strong> Mengurangi stress dan meningkatkan relaksasi</p>
          <p><strong>Cara konsumsi:</strong> Rebusan daun sambiloto dengan madu</p>
          
          <h3>3. Meniran (Phyllanthus niruri)</h3>
          <p><strong>Efek:</strong> Menenangkan dan mengurangi ketegangan</p>
          <p><strong>Penggunaan:</strong> Teh dari seluruh bagian tanaman</p>
          
          <h2>Resep Ramuan Tradisional</h2>
          
          <h3>Ramuan Tidur Nyenyak</h3>
          <p><strong>Bahan:</strong></p>
          <ul>
            <li>1 sdm bunga chamomile kering</li>
            <li>1 sdt lavender kering</li>
            <li>1 sdt lemon balm</li>
            <li>Madu secukupnya</li>
          </ul>
          <p><strong>Cara membuat:</strong></p>
          <ol>
            <li>Seduh semua bahan dengan 250 ml air panas</li>
            <li>Tutup dan diamkan 10-15 menit</li>
            <li>Saring dan tambahkan madu</li>
            <li>Minum 30 menit sebelum tidur</li>
          </ol>
          
          <h3>Jamu Tidur Nusantara</h3>
          <p><strong>Bahan:</strong></p>
          <ul>
            <li>5 lembar daun pegagan segar</li>
            <li>3 lembar daun meniran</li>
            <li>1 ruas jahe kecil</li>
            <li>Madu atau gula aren</li>
          </ul>
          <p><strong>Cara membuat:</strong></p>
          <ol>
            <li>Rebus semua bahan dengan 2 gelas air</li>
            <li>Masak hingga tersisa 1 gelas</li>
            <li>Saring dan tambahkan pemanis</li>
            <li>Minum hangat sebelum tidur</li>
          </ol>
          
          <h2>Aromaterapi untuk Tidur</h2>
          
          <h3>Essential Oil Terbaik</h3>
          <ul>
            <li><strong>Lavender:</strong> Yang paling populer dan efektif</li>
            <li><strong>Chamomile:</strong> Menenangkan dan anti-anxiety</li>
            <li><strong>Bergamot:</strong> Mengurangi stress dan depresi</li>
            <li><strong>Ylang-ylang:</strong> Menurunkan tekanan darah</li>
            <li><strong>Sandalwood:</strong> Meningkatkan kualitas tidur dalam</li>
          </ul>
          
          <h3>Cara Penggunaan</h3>
          <ul>
            <li><strong>Diffuser:</strong> 3-5 tetes essential oil</li>
            <li><strong>Pillow spray:</strong> Campurkan dengan air</li>
            <li><strong>Bath oil:</strong> Tambahkan ke air mandi hangat</li>
            <li><strong>Massage oil:</strong> Campurkan dengan carrier oil</li>
          </ul>
          
          <h2>Tips Penggunaan yang Aman</h2>
          
          <h3>Dosis dan Waktu</h3>
          <ul>
            <li>Mulai dengan dosis rendah</li>
            <li>Konsumsi 30-60 menit sebelum tidur</li>
            <li>Gunakan secara konsisten 2-4 minggu</li>
            <li>Evaluasi efektivitas secara berkala</li>
          </ul>
          
          <h3>Interaksi Obat</h3>
          <p>Hati-hati jika sedang mengonsumsi:</p>
          <ul>
            <li>Obat penenang (sedatif)</li>
            <li>Antidepresan</li>
            <li>Obat tekanan darah</li>
            <li>Obat diabetes</li>
          </ul>
          
          <h3>Kontraindikasi</h3>
          <ul>
            <li>Ibu hamil dan menyusui</li>
            <li>Anak-anak di bawah 12 tahun</li>
            <li>Penderita depresi berat</li>
            <li>Gangguan liver</li>
          </ul>
          
          <h2>Gaya Hidup Pendukung</h2>
          
          <h3>Sleep Hygiene</h3>
          <ul>
            <li>Jadwal tidur yang konsisten</li>
            <li>Lingkungan tidur yang nyaman</li>
            <li>Hindari kafein 6 jam sebelum tidur</li>
            <li>Batasi screen time sebelum tidur</li>
            <li>Olahraga teratur tapi tidak malam hari</li>
          </ul>
          
          <h3>Teknik Relaksasi</h3>
          <ul>
            <li>Meditasi mindfulness</li>
            <li>Progressive muscle relaxation</li>
            <li>Breathing exercises</li>
            <li>Yoga ringan</li>
          </ul>
          
          <h2>Kapan Harus ke Dokter</h2>
          <p>Konsultasikan dengan dokter jika:</p>
          <ul>
            <li>Insomnia berlangsung lebih dari 3 minggu</li>
            <li>Mengganggu aktivitas sehari-hari</li>
            <li>Disertai gejala depresi atau kecemasan</li>
            <li>Tanaman obat tidak memberikan efek</li>
            <li>Terjadi efek samping yang mengganggu</li>
          </ul>
          
          <p>Mengatasi insomnia dengan tanaman obat alami membutuhkan kesabaran dan konsistensi. Kombinasikan dengan pola hidup sehat untuk hasil yang optimal. Ingatlah bahwa setiap orang berbeda, sehingga mungkin perlu mencoba beberapa tanaman untuk menemukan yang paling cocok.</p>
        `,
        image: "https://i.ytimg.com/vi/jQrFfHqpOPA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCeyPw-g7x2cffY40oPG2kooAzrqw",
        author: "Dr. Sleep Medicine",
        date: new Date('2024-11-08'),
        slug: "mengatasi-insomnia-tanaman-obat-alami",
        category: "Manfaat Kesehatan",
        readTime: "11 menit"
      }
    ];

    // Insert data
    console.log('Seeding plants...');
    const plants = await Plant.insertMany(plantsData);
    console.log(`✅ Successfully inserted ${plants.length} plants`);

    console.log('Seeding articles...');
    const articles = await Article.insertMany(articlesData);
    console.log(`✅ Successfully inserted ${articles.length} articles`);

    console.log('🎉 Database seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📋 MongoDB connection closed');
    process.exit(0);
  }
}

seedDatabase();