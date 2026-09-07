import { SidyaData } from '../types';

export const initialSidyaData: SidyaData = {
  company: {
    companyName: 'PT Sidya Sadaya Sejahtera',
    tagline: 'Solusi Terintegrasi Distribusi Perlengkapan Haji & Umroh Nusantara Menuju Tanah Suci',
    establishedYear: '2021',
    aboutStory: 'PT Sidya Sadaya Sejahtera didirikan atas komitmen mendalam untuk meningkatkan standar layanan dan kenyamanan para tamu Allah (Dhuyufurrahman). Sebagai pelopor platform ekosistem rantai pasok (supply chain) khusus haji dan umroh, kami menjembatani produsen/seller, Kelompok Bimbingan Ibadah Haji (KBIH), agen biro perjalanan haji & umroh, hingga jamaah secara langsung dengan ketepatan waktu, kualitas teruji, dan sistem pelacakan digital modern.',
    vision: 'Menjadi ekosistem rantai pasok dan distribusi perlengkapan haji & umroh terdepan, terpercaya, dan berbasis teknologi digital terlengkap di Asia Tenggara yang menjunjung tinggi amanah dan kemaslahatan umat.',
    missions: [
      'Menyediakan platform digital terintegrasi (Mobile & Desktop) yang memudahkan KBIH, Agen, dan Jamaah dalam pengadaan perlengkapan ibadah secara transparan dan tepat waktu.',
      'Menjamin standar mutu tinggi dan sertifikasi halal untuk seluruh kain ihram, busana muslim, koper, dan atribut perlengkapan jamaah.',
      'Membangun jaringan pergudangan dan pusat distribusi strategis di seluruh embarkasi asrama haji dan bandara utama di Indonesia.',
      'Memberdayakan pelaku industri garmen, pengrajin koper, dan UMKM perlengkapan ibadah lokal agar terhubung dengan pasar biro perjalanan berskala nasional.',
      'Memberikan ketenangan lahir batin bagi jamaah dan efisiensi operasional bagi pengelola KBIH serta biro umroh.'
    ],
    values: [
      {
        id: 'val-1',
        title: 'Amanah & Keberkahan',
        description: 'Menjaga integritas setiap helai benang dan barang yang dipesan sebagai sarana ibadah suci para tamu Allah.',
        iconName: 'ShieldCheck'
      },
      {
        id: 'val-2',
        title: 'Presisi Logistik Tepat Waktu',
        description: 'Jaminan sampai tepat sebelum keberangkatan ke asrama haji atau bandara dengan penomoran barcode presisi.',
        iconName: 'Clock'
      },
      {
        id: 'val-3',
        title: 'Kustomisasi Identitas Travel & KBIH',
        description: 'Dukungan penuh branding logo, warna identitas, dan nama travel pada koper, tas paspor, seragam, dan buku manasik.',
        iconName: 'Sparkles'
      },
      {
        id: 'val-4',
        title: 'Transparansi Real-Time',
        description: 'Pelacakan status produksi, pengemasan, hingga distribusi barang secara realtime melalui ekosistem aplikasi Sidya.',
        iconName: 'Layers'
      }
    ],
    legalities: [
      {
        id: 'leg-1',
        label: 'Nomor Induk Berusaha (NIB)',
        value: '1904210088921',
        authority: 'Kementerian Investasi / BKPM RI'
      },
      {
        id: 'leg-2',
        label: 'SK Kemenkumham RI',
        value: 'AHU-0024819.AH.01.01.TAHUN 2021',
        authority: 'Kemenkumham Republik Indonesia'
      },
      {
        id: 'leg-3',
        label: 'Sertifikasi Jaminan Mutu',
        value: 'ISO 9001:2015 Quality Logistics',
        authority: 'Badan Akreditasi Nasional'
      },
      {
        id: 'leg-4',
        label: 'Standar Tekstil & Kehalalan',
        value: 'SNI Kain & Sertifikat Halal Logistik',
        authority: 'BPJPH Kementerian Agama RI'
      }
    ],
    distributionHubs: [
      {
        id: 'hub-1',
        name: 'Hub Utama Cengkareng & Bandara Soetta',
        city: 'Tangerang - Jakarta',
        type: 'Sentra Logistik Ekspor & Bandara Internasional',
        capacity: '50.000 Paket / Bulan'
      },
      {
        id: 'hub-2',
        name: 'Hub Asrama Haji Pondok Gede & Bekasi',
        city: 'DKI Jakarta & Jawa Barat',
        type: 'Gudang Konsolidasi Embarkasi Jakarta',
        capacity: '35.000 Paket / Bulan'
      },
      {
        id: 'hub-3',
        name: 'Hub Embarkasi Solo (Donohudan) & Jogja',
        city: 'Surakarta, Jawa Tengah',
        type: 'Pusat Distribusi Regional Jawa Tengah - DIY',
        capacity: '30.000 Paket / Bulan'
      },
      {
        id: 'hub-4',
        name: 'Hub Embarkasi Surabaya (Sukolilo)',
        city: 'Surabaya, Jawa Timur',
        type: 'Pusat Distribusi Indonesia Timur & Jawa Timur',
        capacity: '40.000 Paket / Bulan'
      }
    ],
    stats: {
      pilgrimsServed: '185.000+',
      kbihPartners: '340+',
      itemsDelivered: '1.200.000+',
      distributionCenters: '12 Hub'
    }
  },
  boardMembers: [
    // Level 0 - CEO (Top)
    {
      id: 'board-3',
      name: 'Ir. Ahmad Zulkarnain, M.B.A.',
      title: 'Direktur Utama (President Director)',
      category: 'direksi',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'Memimpin transformasi digital PT Sidya Sadaya Sejahtera dan ekspansi rantai pasok perlengkapan ibadah dengan visi efisiensi terintegrasi dari pabrik ke jamaah.',
      linkedin: 'https://linkedin.com',
      email: 'ahmad.zulkarnain@sidya.co.id',
      order: 1,
      parentId: undefined,
      level: 0,
      department: 'Presidensi'
    },

    // Level 1 - Direct Reports to CEO
    {
      id: 'board-4',
      name: 'H. Denny Hendrawan, S.T.',
      title: 'Direktur Operasional & Rantai Pasok',
      category: 'direksi',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
      bio: 'Penanggung jawab alur pergudangan nasional, manajemen vendor manufaktur koper, serta ketepatan dispatching barang ke asrama haji jelang musim haji raya.',
      linkedin: 'https://linkedin.com',
      email: 'denny.h@sidya.co.id',
      order: 2,
      parentId: 'board-3',
      level: 1,
      department: 'Operasional & Logistik'
    },
    {
      id: 'board-5',
      name: 'Rizky Alamsyah, S.Kom., M.T.',
      title: 'Direktur Teknologi & Produk Digital (CTO)',
      category: 'direksi',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      bio: 'Arsitek di balik Sidya Mobile dan Sidya Desktop Suite, berpengalaman dalam enterprise ERP, barcode scanning logistic, dan customer-facing mobile UX.',
      linkedin: 'https://linkedin.com',
      email: 'rizky.tech@sidya.co.id',
      order: 3,
      parentId: 'board-3',
      level: 1,
      department: 'Teknologi & Inovasi'
    },
    {
      id: 'board-6',
      name: 'Hj. Nabila Safitri, S.E., Ak.',
      title: 'Direktur Keuangan & Kemitraan Strategis',
      category: 'direksi',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      bio: 'Mengelola tata kelola finansial, permodalan vendor lokal, pembiayaan syariah mitra KBIH, serta skema pembayaran berjangka bagi biro travel.',
      linkedin: 'https://linkedin.com',
      email: 'nabila.safitri@sidya.co.id',
      order: 4,
      parentId: 'board-3',
      level: 1,
      department: 'Keuangan & Kemitraan'
    },

    // Level 2 - Reports to Directors
    {
      id: 'board-7',
      name: 'Bambang Kusuma, S.Sos.',
      title: 'Head of KBIH & Travel Relations',
      category: 'manajemen',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      bio: 'Fasilitator utama pelayanan lebih dari 300 KBIH se-Indonesia dalam penyesuaian kebutuhan paket koper kustom dan administrasi manasik.',
      linkedin: 'https://linkedin.com',
      email: 'bambang.k@sidya.co.id',
      order: 5,
      parentId: 'board-6',
      level: 2,
      department: 'Hubungan Kemitraan'
    },
    {
      id: 'board-8',
      name: 'Fathiyah Zahra, S.Ds.',
      title: 'Head of Quality Assurance & Custom Branding',
      category: 'manajemen',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Mengawasi presisi cetak logo sablon/bordir pada koper, keseragaman warna kain batik, dan uji ketahanan resleting serta roda koper haji berstandar maskapai.',
      linkedin: 'https://linkedin.com',
      email: 'fathiyah@sidya.co.id',
      order: 6,
      parentId: 'board-4',
      level: 2,
      department: 'Kontrol Kualitas'
    },

    // Commissioners (Non-Operational)
    {
      id: 'board-1',
      name: 'H. Muhammad Faisal Sadaya, S.E., M.M.',
      title: 'Komisaris Utama',
      category: 'komisaris',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Praktisi bisnis logistik dan pemerhati ekosistem haji-umroh nasional dengan pengalaman lebih dari 20 tahun membina kemitraan bersama ratusan KBIH dan travel umroh.',
      linkedin: 'https://linkedin.com',
      email: 'faisal@sidya.co.id',
      order: 7,
      parentId: undefined,
      level: 0,
      department: 'Dewan Komisaris'
    },
    {
      id: 'board-2',
      name: 'Dra. Hj. Siti Rahmah Nurul Aini',
      title: 'Komisaris Independen',
      category: 'komisaris',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Pakar tata kelola perusahaan (GCG) dan pengawas mutu syariah dengan latar belakang kepengurusan asosiasi biro perjalanan haji dan umroh nusantara.',
      linkedin: 'https://linkedin.com',
      email: 'siti.rahmah@sidya.co.id',
      order: 8,
      parentId: undefined,
      level: 0,
      department: 'Dewan Komisaris'
    }
  ],
  apps: {
    mobile: {
      appName: 'Sidya Mobile',
      subtitle: 'Aplikasi Sahabat Jamaah Menuju Baitullah',
      description: 'Didesain khusus untuk memberikan kemudahan bagi setiap calon jamaah haji dan umroh dalam memantau, memilih, serta menerima perlengkapan ibadah langsung di tangan mereka.',
      targetUser: 'Jamaah Haji Reguler, Haji Khusus (Plus), dan Jamaah Umroh Mandiri / Rombongan',
      version: 'v2.4.1 (iOS & Android)',
      features: [
        {
          title: 'Pelacakan Koper & Barang Real-Time',
          description: 'Lacak posisi koper dan paket perlengkapan mulai dari proses kustom logo KBIH hingga tiba di asrama haji atau alamat rumah.',
          icon: 'Truck'
        },
        {
          title: 'Konfirmasi Ukuran Busana & Seragam',
          description: 'Input ukuran gamis, batik travel, sandal, dan kain ihram dengan panduan size chart cerdas anti salah ukuran.',
          icon: 'Ruler'
        },
        {
          title: 'Checklist Perlengkapan & Doa Manasik',
          description: 'Daftar periksa bawaan wajib dan sunnah sesuai rukun ibadah lengkap dengan panduan audio doa perlengkapan.',
          icon: 'CheckSquare'
        },
        {
          title: 'Katalog Tambahan Perlengkapan Personal',
          description: 'Belanja perlengkapan pelengkap seperti kantong kerikil, botol semprotan wudhu, kaos kaki wudhu, dan obat-obatan pribadi.',
          icon: 'ShoppingBag'
        }
      ],
      googlePlayLink: '#download-googleplay',
      appStoreLink: '#download-appstore'
    },
    desktop: {
      appName: 'Sidya Desktop Pro',
      subtitle: 'Pusat Kendali Pengadaan & Distribusi Skala Besar',
      description: 'Software desktop handal untuk pengurus KBIH, biro travel umroh, dan seller manufaktur. Kelola ribuan pesanan jamaah, manifes rombongan, kustomisasi logo travel, hingga pengiriman batch besar tanpa kendala.',
      targetUser: 'Pengurus KBIH, Pemilik Biro Travel Haji & Umroh, Manajer Operasional, dan Mitra Seller/Vendor',
      version: 'v3.2.0 (Windows 10/11 & macOS)',
      features: [
        {
          title: 'Bulk Order & Impor Manifes Jamaah',
          description: 'Upload data jamaah via Excel/CSV dalam hitungan detik untuk langsung menghasilkan alokasi koper, seragam, dan name tag otomatis.',
          icon: 'FileSpreadsheet'
        },
        {
          title: 'Studio Kustomisasi Logo & Warna Travel',
          description: 'Preview 3D logo KBIH pada koper fiber, tas paspor, dan batik sebelum proses cetak massal dimulai.',
          icon: 'Palette'
        },
        {
          title: 'Dispatching Logistik ke Asrama Haji & Bandara',
          description: 'Pecah pengiriman per kloter atau per regu dengan cetak label barcode terintegrasi sistem logistik bandara.',
          icon: 'Box'
        },
        {
          title: 'Portal Seller & Manajemen Stok Terpusat',
          description: 'Untuk produsen tekstil dan koper: pantau pesanan masuk KBIH, kelola kapasitas produksi, dan buat surat jalan resmi.',
          icon: 'Store'
        }
      ],
      downloadWinLink: '#download-windows',
      downloadMacLink: '#download-mac'
    }
  },
  catalog: [
    {
      id: 'cat-1',
      name: 'Paket Koper Haji & Umroh Premium (Fiber ABS/PC)',
      category: 'koper',
      description: 'Set koper tahan banting beroda ganda 360 derajat terdiri dari Koper Bagasi 24/28 inch, Koper Kabin 20 inch, dan Tas Paspor Selempang berlogo KBIH/Travel.',
      image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=600&q=80',
      customLogoAvailable: true,
      minOrder: '20 Set',
      specifications: ['Material Polycarbonate + ABS Ringan Kuat', 'Kunci TSA Lock Internasional', 'Resleting Ganda Anti Tusuk', 'Bordir/Plat Metal Logo Travel Kustom'],
      popularBadge: 'Paling Diminati KBIH'
    },
    {
      id: 'cat-2',
      name: 'Kain Ihram Katun Jacquard Standar Kemenag',
      category: 'ihram_mukena',
      description: 'Kain ihram pria berkualitas tinggi dengan tenun jacquard berpola timbul, daya serap keringat tinggi, dan tidak menerawang untuk kenyamanan tawaf & sai.',
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=600&q=80',
      customLogoAvailable: true,
      minOrder: '30 Pasang',
      specifications: ['100% Benang Katun Pilihan', 'Ukuran 115 x 225 cm', 'Ketebalan 1200 - 1400 gram', 'Bisa Tenun Jacquard Logo Travel'],
      popularBadge: 'Wajib Jamaah Pria'
    },
    {
      id: 'cat-3',
      name: 'Mukena Berenda Sutra Silk Khusus Tawaf',
      category: 'ihram_mukena',
      description: 'Mukena katun jepang/silk lembut dengan jahitan dagu tertutup syari, tidak melorot saat sujud di pelataran Masjidil Haram, dilengkapi tas mini eksklusif.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
      customLogoAvailable: true,
      minOrder: '25 Pcs',
      specifications: ['Kain Katun Premium Lembut & Dingin', 'Dagu Syari Elastis Tertutup', 'Termasuk Sajadah Muka & Pouch Logo', 'Tersedia Pilihan Warna Identitas Travel']
    },
    {
      id: 'cat-4',
      name: 'Seragam Batik Resmi Jamaah KBIH & Travel',
      category: 'seragam',
      description: 'Bahan kain katun primisima berpola batik eksklusif travel haji/umroh atau seragam resmi nasional, tahan luntur dan nyaman untuk iklim gurun Arab Saudi.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      customLogoAvailable: true,
      minOrder: '50 Meter / 30 Stel',
      specifications: ['Katun Primisima Sanforized Halus', 'Pewarnaan Tekstil Reaktif Tahan Cuci', 'Desain Custom Motif Tradisional / Modern', 'Tersedia Potongan Siap Jahit']
    },
    {
      id: 'cat-5',
      name: 'Paket Aksesoris Lengkap Jamaah (Sandal, ID Card, Tas Kerikil)',
      category: 'aksesoris',
      description: 'Perlengkapan komplit penunjang ibadah: sandal jepit tebal anti licin, tas sandal serut waterproof, tali id card barcode, kantong kerikil muzdalifah, dan botol semprotan.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      customLogoAvailable: true,
      minOrder: '50 Paket',
      specifications: ['Sandal Jepit EVA Anti Licin', 'Tas Serut Parasut Tebal', 'Gelang / ID Card Tahan Air Barcode', 'Botol Semprot Wudhu 100ml']
    },
    {
      id: 'cat-6',
      name: 'Paket Bundling KBIH Komprehensif (All-in-One)',
      category: 'paket_kbih',
      description: 'Solusi lengkap siap serahkan ke jamaah: 1 Koper Bagasi, 1 Koper Kabin, 1 Tas Paspor, 1 Set Ihram/Mukena, 1 Stel Kain Seragam, Buku Panduan Manasik, dan ID Card.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
      customLogoAvailable: true,
      minOrder: '25 Paket',
      specifications: ['Semua Item Serasi Berlogo Travel', 'Sudah Di-packing Per Nama Jamaah', 'Gratis Barcode Kloter & Regu', 'Garansi Ganti Baru Bila Cacat Produksi'],
      popularBadge: 'Paling Praktis untuk KBIH'
    }
  ],
  articles: [
    {
      id: 'art-1',
      title: 'Panduan Lengkap Memilih Perlengkapan Haji yang Tepat',
      slug: 'panduan-memilih-perlengkapan-haji',
      category: 'Tips & Trik',
      featured: true,
      image: 'https://images.unsplash.com/photo-1584622181563-430f63602d4b?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Mempersiapkan perlengkapan haji yang tepat sangat penting untuk kenyamanan ibadah Anda. Artikel ini memandu langkah demi langkah memilih koper, kain ihram, dan perlengkapan lainnya.',
      content: 'Persiapan haji yang baik dimulai dari memilih perlengkapan yang sesuai kebutuhan dan standar kualitas. PT Sidya Sadaya Sejahtera menyediakan berbagai pilihan perlengkapan haji berkualitas tinggi dengan sertifikasi halal dan standar internasional.\n\nBagian 1: Memilih Koper yang Tepat\nKoper yang baik harus ringan, tahan lama, dan memiliki kompartemen yang memadai. Kami merekomendasikan koper dengan fitur:\n- Material polycarbonate yang ringan\n- Roda 360 derajat untuk mobilitas\n- Kunci keamanan TSA\n- Garansi minimum 2 tahun\n\nBagian 2: Kain Ihram dan Busana Muslim\nKain ihram harus berkualitas tinggi, nyaman, dan sesuai standar ibadah. Pastikan memilih bahan yang menyerap keringat dan mudah dirawat.\n\nBagian 3: Aksesoris Pendukung\nJangan lupa aksesoris seperti tas paspor, sarung alas kaki, dan tas tambahan untuk membuat ibadah Anda lebih nyaman.',
      author: 'Admin Sidya',
      publishedDate: '2024-09-01',
      readTime: '5 menit'
    },
    {
      id: 'art-2',
      title: 'Testimoni Jamaah: Pengalaman Menggunakan Layanan Sidya',
      slug: 'testimoni-jamaah-layanan-sidya',
      category: 'Testimoni',
      featured: true,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Dengarkan pengalaman langsung dari jamaah yang telah merasakan kemudahan dan kualitas layanan PT Sidya Sadaya Sejahtera dalam persiapan ibadah haji mereka.',
      content: 'Kepuasan pelanggan adalah prioritas utama kami. Berikut adalah beberapa testimoni dari jamaah yang telah menggunakan layanan dan produk PT Sidya Sadaya Sejahtera:\n\n"Saya sangat terkesan dengan kualitas perlengkapan dan ketepatan waktu pengiriman dari Sidya. Semua barang sampai tepat sebelum keberangkatan ke Jeddah. Sangat profesional!" - Ibu Siti, Jakarta\n\n"Koper dari Sidya sangat bagus, tahan lama, dan ringan. Cocok banget untuk naik pesawat berkali-kali. Pasti saya rekomendasikan ke teman-teman." - Pak Bambang, Bandung\n\n"Tim customer service Sidya sangat responsif dan membantu. Ketika ada pertanyaan tentang spesifikasi barang, mereka langsung memberikan jawaban yang detail dan memuaskan." - Mbak Dewi, Yogyakarta',
      author: 'Admin Sidya',
      publishedDate: '2024-08-28',
      readTime: '4 menit'
    },
    {
      id: 'art-3',
      title: 'Proses Kustomisasi Logo untuk Travel dan KBIH',
      slug: 'proses-kustomisasi-logo-travel-kbih',
      category: 'Proses Bisnis',
      featured: false,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Sidya menawarkan layanan kustomisasi logo penuh untuk travel dan KBIH. Pelajari bagaimana prosesnya dan manfaatnya untuk branding Anda.',
      content: 'Branding yang kuat adalah kunci untuk membedakan travel atau KBIH Anda dari kompetitor. PT Sidya Sadaya Sejahtera menyediakan layanan kustomisasi logo lengkap pada berbagai produk perlengkapan haji.\n\nManfaat Kustomisasi:\n1. Identitas Brand yang Kuat: Logo Anda akan terlihat di setiap koper, tas, dan perlengkapan yang digunakan jamaah\n2. Marketing yang Efektif: Jamaah akan terus mengingat brand Anda melalui produk berkualitas yang mereka gunakan\n3. Profesionalisme: Menunjukkan bahwa travel/KBIH Anda serius dan terpercaya\n4. Loyalitas Jamaah: Jamaah akan merasa dihargai dengan produk berlogo resmi\n\nProses Kustomisasi:\n- Konsultasi desain dengan tim kreatif Sidya\n- Approval desain dari Anda\n- Produksi dengan standar kualitas tinggi\n- Quality control ketat\n- Pengiriman tepat waktu',
      author: 'Admin Sidya',
      publishedDate: '2024-08-15',
      readTime: '6 menit'
    }
  ],
  contact: {
    phone: '0811866477',
    whatsapp: '+62 812 8899 7439',
    email: 'kemitraan@sidya.co.id',
    address: 'Jl. Anggur II No.28, RT.12/RW.6, Cipete Sel., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12410, Indonesia',
    operatingHours: 'Senin - Sabtu: 08.00 - 17.00 WIB (Layanan Siaga Haji 24/7 Selama Musim Operasional)'
  }
};
