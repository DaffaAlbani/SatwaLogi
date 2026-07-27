export interface Species {
  id: string;
  latinName: string;
  commonName: string;
  englishName: string;
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  iucnStatus: 'CR' | 'EN' | 'VU' | 'NT' | 'LC';
  iucnLabel: string;
  population: string;
  habitat: string;
  distributionRegion: string[];
  imageUrl: string;
  audioUrl?: string;
  audioTitle?: string;
  description: string;
  physicalCharacteristics: string[];
  diet: string;
  threats: string[];
  conservationEfforts: string;
}

export interface JournalArticle {
  id: string;
  doi: string;
  title: string;
  abstract: string;
  authors: {
    name: string;
    institution: string;
    role: string;
    avatar: string;
  }[];
  category: string;
  tags: string[];
  publishedDate: string;
  readTime: string;
  citationsCount: number;
  viewsCount: number;
  pdfSize: string;
  peerReviewed: boolean;
  content: {
    introduction: string;
    methodology: string;
    results: string;
    discussion: string;
    conclusion: string;
  };
  references: {
    id: number;
    text: string;
    doi: string;
  }[];
}

export interface AdminVerificationItem {
  id: string;
  articleTitle: string;
  authorName: string;
  authorInstitution: string;
  category: string;
  submittedDate: string;
  status: 'PENDING' | 'APPROVED' | 'REVISION_NEEDED' | 'REJECTED';
  plagiarismScore: number; // e.g. 1.8%
  taxonomyAccuracyScore: number; // e.g. 98%
  citationsVerified: boolean;
  abstractText: string;
  previewSnippet: string;
  reviewerNotes?: string;
  fullBody?: string;
  tags?: string[];
  speciesTag?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  institution: string;
  email: string;
  role: 'Peneliti' | 'Penulis' | 'Pembaca' | 'Admin';
  avatar: string;
  bio: string;
  scientificInterests: string[];
  stats: {
    totalArticles: number;
    totalCitations: number;
    totalReads: number;
    hIndex: number;
  };
  bookmarks: string[]; // article IDs
}

export const SPECIES_DATA: Species[] = [
  {
    id: "sp-1",
    latinName: "Panthera tigris sumatrae",
    commonName: "Harimau Sumatra",
    englishName: "Sumatran Tiger",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    order: "Carnivora",
    family: "Felidae",
    genus: "Panthera",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "Sisa 400–600 individu di alam liar",
    habitat: "Hutan hujan dataran rendah & pegunungan Sumatra",
    distributionRegion: ["Aceh (Leuser)", "Riau", "Jambi (Kerinci Seblat)", "Sumatra Selatan", "Lampung (TNBBS)"],
    imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80",
    audioTitle: "Vokalisasi Auman & Panggilan Wilayah Panthera tigris sumatrae",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2402/2402-preview.mp3",
    description: "Harimau Sumatra adalah subspesies harimau terkecil yang masih tersisa di dunia. Memiliki warna kulit tergelap dengan garis-garis hitam legam yang rapat untuk menyamar di rapatnya kanopi hutan hujan tropis Sumatra.",
    physicalCharacteristics: [
      "Panjang tubuh jantan 2,2-2,5 meter, betina 2,15-2,3 meter",
      "Berat rata-rata: Jantan 100-140 kg, Betina 75-110 kg",
      "Selaput di antara jari kaki memungkinkan perenang handal",
      "Suri di sekeliling leher yang menonjol pada jantan dewasa"
    ],
    diet: "Karnivora: Babi hutan (Sus scrofa), Rusa (Rusa unicolor), Kancil, dan Tapir",
    threats: ["Deforestasi & fragmentasi habitat akibat kebun kelapa sawit", "Perburuan liar organ tubuh", "Konflik dengan pemukiman manusia"],
    conservationEfforts: "Patroli Smart Patrol TN Kerinci Seblat, Restorasi koridor lanskap Leuser, dan penegakan hukum perdagangan satwa."
  },
  {
    id: "sp-2",
    latinName: "Pongo tapanuliensis",
    commonName: "Orangutan Tapanuli",
    englishName: "Tapanuli Orangutan",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    order: "Primates",
    family: "Hominidae",
    genus: "Pongo",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "< 800 individu di Ekosistem Batang Toru",
    habitat: "Hutan pegunungan basah Batang Toru (800–1.200 mdpl)",
    distributionRegion: ["Tapanuli Utara", "Tapanuli Selatan", "Tapanuli Tengah (Sumatra Utara)"],
    imageUrl: "https://images.unsplash.com/photo-1540573133985-7585677a3281?auto=format&fit=crop&w=1000&q=80",
    audioTitle: "Panggilan Panjang (Long Call) Orangutan Jantan Adult",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2677/2677-preview.mp3",
    description: "Spesies kera besar ketiga yang baru diidentifikasi secara sains pada tahun 2017. Berbeda secara morfologi dan genetika dari Orangutan Sumatra (Pongo abelii) dan Orangutan Kalimantan (Pongo pygmaeus).",
    physicalCharacteristics: [
      "Rambut lebih keriting dan berwarna kemerahan gelap",
      "Kumis lebat pada jantan dan betina dewasa",
      "Panggilan jantan bernada lebih tinggi dan durasi lebih panjang",
      "Tengkorak dan gigi lebih kecil dibanding spesies Pongo lain"
    ],
    diet: "Frugivora: Buah hutan, dedaunan muda, kulit kayu, dan ulat biji kerucut",
    threats: ["Pembangunan PLTA Batang Toru", "Fragmentasi lahan hutan pegunungan", "Perburuan kontak liar"],
    conservationEfforts: "Usulan pembentukan Suaka Margasatwa Batang Toru dan koridor satwa berbasis riset genetik LIPI/BRIN."
  },
  {
    id: "sp-3",
    latinName: "Leucopsar rothschildi",
    commonName: "Jalak Bali",
    englishName: "Bali Myna",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Aves",
    order: "Passeriformes",
    family: "Sturnidae",
    genus: "Leucopsar",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "Sekitar 200 individu di Taman Nasional Bali Barat",
    habitat: "Hutan musim kering & savana pesisir Bali Barat",
    distributionRegion: ["Taman Nasional Bali Barat (Sumberejo, Prapat Agung)", "Nusa Penida (Introduksi)"],
    imageUrl: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1000&q=80",
    audioTitle: "Kicauan Khas & Bersahut Jalak Bali (Leucopsar rothschildi)",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2436/2436-preview.mp3",
    description: "Burung endemik Bali yang sangat langka dengan bulu putih bersih di seluruh tubuh, kelopak mata biru cerah, dan jambul indah di kepala.",
    physicalCharacteristics: [
      "Panjang tubuh sekitar 25 cm",
      "Bulu serba putih kecuali ujung sayap dan ekor berwarna hitam legam",
      "Kulit di sekitar mata telanjang berwarna biru murni",
      "Jambul kepala tegak saat berinteraksi"
    ],
    diet: "Omnivora: Biji-bijian, cacing tanah, belalang, buah beri hutan",
    threats: ["Perdagangan burung berkicau ilegal", "Hilangnya habitat vegetasi asli", "Predasi sarang oleh ular dan biawak"],
    conservationEfforts: "Program penangkaran ex-situ (Captive Breeding) dan pelepasliaran bertahap dengan pelacak radio ring."
  },
  {
    id: "sp-4",
    latinName: "Varanus komodoensis",
    commonName: "Komodo",
    englishName: "Komodo Dragon",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Reptilia",
    order: "Squamata",
    family: "Varanidae",
    genus: "Varanus",
    iucnStatus: "EN",
    iucnLabel: "Terguncang (Endangered)",
    population: "~ 3.300 individu di Taman Nasional Komodo",
    habitat: "Savana kering, hutan terbuka dataran rendah, dan pantai batu",
    distributionRegion: ["Pulau Komodo", "Pulau Rinca", "Pulau Padar", "Pulau Flores (Pesisir Utara & Barat)"],
    imageUrl: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=1000&q=80",
    audioTitle: "Desisan Pertahanan & Vokalisasi Komodo Dewasa",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2691/2691-preview.mp3",
    description: "Spesies kadal terbesar dan terberat di bumi yang masih hidup. Memiliki kelenjar racun berbisa di rahang bawah serta penciuman tajam melalu lidah bercabang.",
    physicalCharacteristics: [
      "Panjang rata-rata 2,5-3 meter, berat mencapai 70-135 kg",
      "Lidah panjang berwarna kuning bercabang dua",
      "Kulit tebal bersisik osteoderm menyerupai zirah besi",
      "Air liur mengandung senyawa antikoagulan pembunuh prey"
    ],
    diet: "Karnivora apex: Rusa Timor, Kerbau liar, Kuda, Babi hutan, dan bangkai",
    threats: ["Kenaikan permukaan laut akibat pemanasan global", "Penurunan populasi mangsa Rusa Timor", "Aktivitas turisme tak terkendali"],
    conservationEfforts: "Zonasi ketat Taman Nasional Komodo dan monitoring kamera jebak bulanan oleh Rangers TNK."
  },
  {
    id: "sp-5",
    latinName: "Chelonia mydas",
    commonName: "Penyu Hijau",
    englishName: "Green Sea Turtle",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Reptilia",
    order: "Testudines",
    family: "Cheloniidae",
    genus: "Chelonia",
    iucnStatus: "EN",
    iucnLabel: "Terguncang (Endangered)",
    population: "Mengalami penurunan 48% dalam 3 generasi",
    habitat: "Ekosistem padang lamun, terumbu karang, dan pantai peneluran",
    distributionRegion: ["Derawan (Kaltim)", "Pangumbahan (Jabar)", "Sukamade (Jatim)", "Kepulauan Derawan"],
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
    audioTitle: "Suara Emisi Udara Pernapasan Penyu Hijau Saat Bertelur",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2402/2402-preview.mp3",
    description: "Penyu laut herbivora besar yang memakan lamun dan alga laut. Warna 'hijau' berasal dari lapisan lemak hijau di bawah cangkangnya akibat diet spesifik lamun.",
    physicalCharacteristics: [
      "Panjang karapas 80-120 cm, berat 110-190 kg",
      "Karapas berbentuk hati membulat berwarna cokelat kehijauan",
      "Rahang bawah bergerigi untuk memotong lamun laut",
      "Kaki depan berbentuk sirip panjang untuk berenang ribuan mil"
    ],
    diet: "Herbivora: Padang Lamun (*Thalassia hemprichii*) dan Alga Merah/Hijau",
    threats: ["Pencemaran mikroplastik laut", "Pencurian telur penyu", "Tertangkap jaring trawl nelayan (bycatch)"],
    conservationEfforts: "Penetapan kawasan konservasi perairan (KKP) padang lamun dan penetasan penetasan buatan di konservasi Pangumbahan."
  },
  {
    id: "sp-6",
    latinName: "Bubalus quarlesi",
    commonName: "Anoa Pegunungan",
    englishName: "Mountain Anoa",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    order: "Artiodactyla",
    family: "Bovidae",
    genus: "Bubalus",
    iucnStatus: "EN",
    iucnLabel: "Terguncang (Endangered)",
    population: "< 2.500 individu dewasa di Pulau Sulawesi",
    habitat: "Hutan hujan primer pegunungan tinggi Sulawesi (1.000–2.300 mdpl)",
    distributionRegion: ["TN Lore Lindu (Sulteng)", "TN Bogani Nani Wartabone (Gorontalo)", "Pegunungan Latimojong (Sulsel)"],
    imageUrl: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1000&q=80",
    audioTitle: "Suara Dengkuran Anoa Pegunungan (Bubalus quarlesi)",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2677/2677-preview.mp3",
    description: "Spesies sapi liar terkecil di dunia yang hidup soliter di keheningan hutan pegunungan basah Sulawesi. Memiliki tanduk berbentuk lurus pipih.",
    physicalCharacteristics: [
      "Tinggi bahu hanya 70-80 cm, berat 150-300 kg",
      "Tanduk pendek lurus 15-20 cm berpenampang segitiga",
      "Bulu tebal berwarna cokelat tua kehitaman",
      "Sangat pemalu dan aktif di pagi serta sore hari (krepuscular)"
    ],
    diet: "Herbivora: Pakis pegunungan, buah perdu, rumput liar, dan air kaya garam mineral (salty licks)",
    threats: ["Perburuan liar untuk konsumsi daging lokal", "Perambahan hutan lindung pegunungan"],
    conservationEfforts: "Riset DNA barcoding oleh Universitas Sam Ratulangi dan pelindungan habitat TN Lore Lindu."
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "art-101",
    doi: "10.1038/s41559-026-02104-x",
    title: "Filogeografi dan Variasi Genomik Populasi Panthera tigris sumatrae di Lanskap Leuser dan Kerinci Seblat",
    abstract: "Studi ini menganalisis urutan genomik utuh (whole-genome sequencing) dari 64 sampel non-invasif Panthera tigris sumatrae untuk mengevaluasi tingkat aliran gen (gene flow), koefisien perkawinan sedarah (inbreeding depression), dan kerentanan garis keturunan terhadap penyempitan habitat tropis.",
    authors: [
      {
        name: "Dr. Pratama Kusuma, M.Sc.",
        institution: "Pusat Riset Biosistemasi & Evolusi BRIN",
        role: "Penulis Utama",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Prof. Eleanor Vance, Ph.D.",
        institution: "Department of Evolutionary Biology, Cambridge University",
        role: "Ko-Penulis",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
      }
    ],
    category: "Konservasi Genetik",
    tags: ["Panthera tigris", "Genomik", "Hutan Tropis", "BRIN", "Bioinformatika"],
    publishedDate: "14 Mei 2026",
    readTime: "12 menit baca",
    citationsCount: 42,
    viewsCount: 1890,
    pdfSize: "2.4 MB",
    peerReviewed: true,
    content: {
      introduction: "Keberlanjutan populasi Harimau Sumatra (Panthera tigris sumatrae) berada pada titik kritis akibat isolasi geografis yang dipicu oleh alih fungsi lahan hutan. Pemahaman komprehensif mengenai tingkat keanekaragaman genetik dan koefisien perataan alel mutasi sangat diperlukan untuk merumuskan intervensi translokasi individu yang tepat sasaran [1].",
      methodology: "Kami mengumpulkan sampel feses dan bulu non-invasif dari lanskap Ekosistem Leuser (n=36) dan Taman Nasional Kerinci Seblat (n=28) menggunakan metode pelacakan Smart Patrol selama rentang waktu 2023–2025. DNA diekstraksi menggunakan kit daur ulang silika standar dan diurutkan menggunakan platform Illumina NovaSeq 6000 dengan kedalaman pembacaan rata-rata 30x [2].",
      results: "Analisis komponen utama (PCA) dan STRUCTURE menunjukkan pemisahan sub-populasi yang signifikan antara blok utara Leuser dan blok selatan Kerinci Seblat (FST = 0.142, p < 0.001). Koefisien inbreeding (FROH) pada populasi Kerinci Seblat tercatat 18.4% lebih tinggi dibandingkan populasi Leuser, yang berkorelasi langsung dengan penurunan variabilitas lokus MHC kelas II [3].",
      discussion: "Temuan ini mengonfirmasi bahwa koridor ekologi penghubung antara lanskap Kerinci dan Leuser telah terputus total selama lebih dari 3 dekade. Tanpa adanya tindakan pembuatan koridor hijau berbasis restorasi vegetasi tajuk rapat, risiko kelelahan genomik dan kerentanan wabah penyakit seperti Canine Distemper Virus (CDV) diproyeksikan meningkat hingga 65% pada tahun 2040 [4].",
      conclusion: "Rekomendasi strategis kami mencakup penguatan perlindungan koridor Bukit Barisan Selatan, pembentukan bank sperma cryopreservation satwa liar nasional, dan translokasi individu jantan terpilih berbasis profil SNP untuk memperkaya keanekaragaman alel."
    },
    references: [
      { id: 1, text: "Kusuma, P., et al. (2024). Conservation Genomics of Sumatran Megafauna. Journal of Biodiversity, 12(4), 405-418.", doi: "10.1016/j.jbio.2024.08.003" },
      { id: 2, text: "Vance, E., & Suryadi, H. (2023). High-Throughput Non-Invasive Sequencing in Tropical Rain Forests. Molecular Ecology Resources, 23(1), 112-129.", doi: "10.1111/1755-0998.13680" },
      { id: 3, text: "Balai Besar TNKS & WCS. (2025). Laporan Konservasi Populasi Harimau Sumatra Kerinci Seblat. Publikasi Resmi Kementerian LHK.", doi: "10.5281/zenodo.7891234" },
      { id: 4, text: "Riyanto, A., et al. (2025). Pathogen Vulnerability in Fragmented Carnivore Populations. Nature Ecology & Evolution, 9(2), 230-245.", doi: "10.1038/s41559-025-01890-w" }
    ]
  },
  {
    id: "art-102",
    doi: "10.1016/j.biocon.2026.109822",
    title: "Akustik Pasif dan Pola Aktivitas Nokturnal Orangutan Tapanuli (Pongo tapanuliensis) di Blok Hutan Batang Toru",
    abstract: "Penggunaan Passive Acoustic Monitoring (PAM) dalam memetakan frekuensi vokalisasi 'Long Call' jantan Pongo tapanuliensis untuk mengukur kepadatan populasi tanpa mengganggu struktur sosial kanopi tropis.",
    authors: [
      {
        name: "Nirmala Rahmadani, Ph.D.",
        institution: "Fakultas Kehutanan Universitas Gadjah Mada",
        role: "Penulis Utama",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
      }
    ],
    category: "Bioakustik & Ekologi Behavior",
    tags: ["Pongo tapanuliensis", "Bioakustik", "Batang Toru", "Monitoring Pasif"],
    publishedDate: "02 April 2026",
    readTime: "9 menit baca",
    citationsCount: 19,
    viewsCount: 1420,
    pdfSize: "1.8 MB",
    peerReviewed: true,
    content: {
      introduction: "Orangutan Tapanuli merupakan spesies kera besar paling terancam di dunia. Metode inventarisasi sarang konvensional sering kali menghasilkan bias estimasi pada medan pegunungan yang sangat curam seperti Batang Toru.",
      methodology: "Kami memasang 48 sensor perekam akustik Audiomoth v1.2 di ketinggian kanopi 15-25 meter selama 180 hari berturut-turut. Algoritma Convolutional Neural Network (CNN) dilatih khusus untuk mengidentifikasi harmonik khas vokalisasi Pongo tapanuliensis.",
      results: "Puncak aktivitas Long Call terdeteksi pada pukul 04:30 - 06:00 WIB dan 17:00 - 18:30 WIB. Kepadatan panggilan bernilai tertinggi pada elevasi 900–1.100 mdpl.",
      discussion: "Gangguan suara mesin konstruksi dari area sekitar terbukti menggeser frekuensi panggilan jantan sebesar +150 Hz dan mereduksi jarak jangkauan komunikasi hingga 40%.",
      conclusion: "PAM terbukti efektif sebagai instrumen audit lingkungan real-time untuk mengevaluasi ambang batas kebisingan industri di sekitar habitat kritis."
    },
    references: [
      { id: 1, text: "Rahmadani, N., et al. (2025). Passive Acoustic Monitoring in Tropical Primate Studies. Bioacoustics Journal, 34(3), 201-219.", doi: "10.1080/09524622.2025.109822" }
    ]
  }
];

export const ADMIN_VERIFICATION_QUEUE: AdminVerificationItem[] = [
  {
    id: "ver-201",
    articleTitle: "Evaluasi Populasi Bawah Laut Penyu Hijau (Chelonia mydas) di Kawasan Padang Lamun Kepulauan Derawan",
    authorName: "Dr. Aris Setyawan, M.Si.",
    authorInstitution: "Institut Pertanian Bogor (IPB University)",
    category: "Biologi Kelautan & Konservasi",
    submittedDate: "25 Juli 2026",
    status: "PENDING",
    plagiarismScore: 1.8,
    taxonomyAccuracyScore: 99.2,
    citationsVerified: true,
    abstractText: "Penelitian ini mengukur kepadatan individu dan laju konsumsi padang lamun Thalassia hemprichii oleh populasi juvenile Chelonia mydas di perairan Karang Muaras, Derawan. Hasil survei transek kuadrat menunjukkan peningkatan frekuensi makan pada pasut perbani.",
    previewSnippet: "Padang lamun Kepulauan Derawan memegang peranan krusial sebagai nursery ground bagi penyu hijau. Berdasarkan pemetaan drone bawah air dan foto-ID karapas...",
    reviewerNotes: "Naskah sangat komprehensif. Perlu pengecekan format koordinat GPS transek pada tabel 3 sebelum publikasi final.",
    fullBody: "Padang lamun Kepulauan Derawan memegang peranan krusial sebagai nursery ground bagi penyu hijau. Berdasarkan pemetaan drone bawah air dan foto-ID karapas, kami mengukur kepadatan individu 3.4 individu/hektar.",
    tags: ["Chelonia mydas", "Padang Lamun", "Derawan", "Konservasi Laut"],
    speciesTag: "Chelonia mydas"
  },
  {
    id: "ver-202",
    articleTitle: "Analisis Respon Stres Hormon Kortisol Pada Jalak Bali (Leucopsar rothschildi) Pascalelepasliaran ex-situ",
    authorName: "Siti Rahmawati, S.Si., M.Biol.",
    authorInstitution: "Universitas Udayana Bali",
    category: "Fisiologi Satwa Liar",
    submittedDate: "22 Juli 2026",
    status: "REVISION_NEEDED",
    plagiarismScore: 4.2,
    taxonomyAccuracyScore: 96.5,
    citationsVerified: false,
    abstractText: "Pengukuran kadar kortisol feses dilakukan pada 12 individu Jalak Bali yang dilepasliarkan di TNBB untuk mengevaluasi adaptasi terhadap predator alami.",
    previewSnippet: "Pengambilan sampel feses harian menunjukkan lonjakan kadar metabolit kortisosteroid pada 7 hari pertama pasca peluncuran...",
    reviewerNotes: "Terdapat 2 sitasi jurnal tahun 2011 yang tidak tercantum DOI-nya pada daftar referensi. Mohon perbaiki dan submit ulang.",
    fullBody: "Pengambilan sampel feses harian menunjukkan lonjakan kadar metabolit kortisosteroid pada 7 hari pertama pasca pelepasliaran. Kadar ini melandai kembali mendekati normal pada minggu ke-3.",
    tags: ["Leucopsar rothschildi", "Jalak Bali", "Kortisol", "Fisiologi"],
    speciesTag: "Leucopsar rothschildi"
  }
];

export const CURRENT_USER: UserProfile = {
  id: "usr-888",
  name: "Dr. Satria Wibawa, M.Sc.",
  title: "Peneliti Utama Ornitologi & Ekologi Megafauna",
  institution: "Pusat Riset Biosistemasi & Evolusi BRIN",
  email: "satria.wibawa@brin.go.id",
  role: "Penulis",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  bio: "Fokus pada konservasi megafauna tropis Sumatra & Kalimantan, bioakustik satwa endemik, serta penerapan GIS & barcoding genetik untuk pelindungan spesies terancam punah.",
  scientificInterests: [
    "Ornitologi",
    "Konservasi Genetik",
    "Bioakustik",
    "Mamalogi",
    "Herpetologi Indonesia",
    "GIS & Pemetaan Habitat"
  ],
  stats: {
    totalArticles: 14,
    totalCitations: 382,
    totalReads: 18450,
    hIndex: 9
  },
  bookmarks: ["art-101", "art-102"]
};
