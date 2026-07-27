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
  coverImage?: string;
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
  plagiarismScore: number;
  taxonomyAccuracyScore: number;
  citationsVerified: boolean;
  abstractText: string;
  previewSnippet: string;
  reviewerNotes?: string;
  fullBody?: string;
  tags?: string[];
  speciesTag?: string;
  coverImage?: string;
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
  bookmarks: string[];
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  institution: string;
  role: 'Peneliti' | 'Penulis' | 'Pembaca' | 'Admin';
}

export const INITIAL_USERS_DATABASE: RegisteredUser[] = [
  {
    id: "usr-admin-1",
    name: "Admin Satwalogi",
    email: "admin@satwalogi.or.id",
    username: "admin",
    password: "admin123",
    institution: "Pusat Admin Satwalogi",
    role: "Admin"
  }
];

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
    description: "Spesies kadal terbesar dan terberat di bumi yang masih hidup. Memiliki kelenjar racun berbisa di rahang bawah serta penciuman tajam melalui lidah bercabang.",
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
    conservationEfforts: "Penetapan kawasan konservasi perairan (KKP) padang lamun dan penetasan buatan di konservasi Pangumbahan."
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
  },
  {
    id: "sp-7",
    latinName: "Elephas maximus sumatranus",
    commonName: "Gajah Sumatra",
    englishName: "Sumatran Elephant",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    order: "Proboscidea",
    family: "Elephantidae",
    genus: "Elephas",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "Sekitar 1.400 - 1.700 individu di alam liar",
    habitat: "Hutan hujan tropis dataran rendah Sumatra",
    distributionRegion: ["Aceh", "Riau (Giam Siak Kecil)", "Jambi", "Lampung (Way Kambas)"],
    imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80",
    audioTitle: "Terompet Belalai & Infrasonik Gajah Sumatra",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2402/2402-preview.mp3",
    description: "Subspesies gajah Asia endemik Sumatra dengan postur paling anggun. Berperan penting sebagai pemencar biji tanaman hutan tropis.",
    physicalCharacteristics: [
      "Tinggi bahu 2-3 meter, berat 2.000-4.000 kg",
      "Sepasang gading hanya tumbuh menonjol pada jantan dewasa",
      "Telinga lebih kecil berbentuk segitiga lengkung",
      "Kulit berpigmen abu-abu tua dengan bercak merah muda di belalai"
    ],
    diet: "Herbivora megafauna: Rumput gajah, bambu hutan, kulit pohon, dan pisang liar",
    threats: ["Konflik ruang dengan pemukiman", "Perburuan gading", "Keracunan di area perkebunan"],
    conservationEfforts: "Unit Penanggulangan Konflik Gajah (Elephant Response Unit - ERU) dan pelindungan koridor Way Kambas."
  },
  {
    id: "sp-8",
    latinName: "Rhinoceros sondaicus",
    commonName: "Badak Jawa",
    englishName: "Javan Rhinoceros",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    order: "Perissodactyla",
    family: "Rhinocerotidae",
    genus: "Rhinoceros",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "Sisa ~ 75 individu di TN Ujung Kulon",
    habitat: "Hutan hujan dataran rendah & rawa pesisir Ujung Kulon",
    distributionRegion: ["Taman Nasional Ujung Kulon (Semenanjung Ujung Kulon, Banten)"],
    imageUrl: "https://images.unsplash.com/photo-1574063413132-355dbfd83e0c?auto=format&fit=crop&w=1000&q=80",
    audioTitle: "Suara Emisi Udara & Dengkuran Kubangan Badak Jawa",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2691/2691-preview.mp3",
    description: "Salah satu mamalia terlangka dan paling terancam punah di bumi. Memiliki secula satu cula dan lipatan kulit menyerupai pakaian zirah perang kuno.",
    physicalCharacteristics: [
      "Panjang tubuh 3,1-3,2 meter, berat 900-2.300 kg",
      "Memiliki satu cula pendek sekitar 20-25 cm pada jantan",
      "Lipatan kulit tebal berpola mosaik di leher dan bahu",
      "Bibir atas lentur memanjang untuk merenggut pucuk daun"
    ],
    diet: "Herbivora browsing: Daun ranting (*Arenga obtusifolia*), tunas pisang liar, dan buah jatuh",
    threats: ["Bencana alam letusan Gunung Anak Krakatau", "Tsunami pesisir", "Invasif tanaman langkap (*Arenga*)"],
    conservationEfforts: "Pengendalian tanaman invasif langkap dan studi kelayakan habitat kedua (second habitat establishment)."
  },
  {
    id: "sp-9",
    latinName: "Nisaetus bartelsi",
    commonName: "Elang Jawa",
    englishName: "Javan Hawk-Eagle",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Aves",
    order: "Accipitriformes",
    family: "Accipitridae",
    genus: "Nisaetus",
    iucnStatus: "EN",
    iucnLabel: "Terguncang (Endangered)",
    population: "Diperkirakan 300–500 pasang berbiak",
    habitat: "Hutan hujan tropis pegunungan Pulau Jawa (500–2.000 mdpl)",
    distributionRegion: ["TN Gunung Gede Pangrango", "TN Halimun Salak", "TN Bromo Tengger Semeru", "TN Merapi"],
    imageUrl: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=1000&q=80",
    audioTitle: "Panggilan Melengking Elang Jawa (Nisaetus bartelsi)",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2436/2436-preview.mp3",
    description: "Burung pemangsa endemik Jawa yang dijadikan lambang negara 'Garuda Pancasila'. Memiliki jambul menonjol di kepala berwarna cokelat kemerahan.",
    physicalCharacteristics: [
      "Bentang sayap 110-130 cm, panjang tubuh 60 cm",
      "Jambul hitam panjang 12 cm di atas kepala bersudut tegak",
      "Bulu dada bergaris cokelat kemerahan melintang meliuk",
      "Mata berwarna kuning emas tajam mengawasi mangsa"
    ],
    diet: "Karnivora raptor: Tupai, Kancil, Burung kecil, Kadal pohon, dan Musang",
    threats: ["Perburuan liar satwa eksotis", "Hilangnya tutupan hutan primer Jawa"],
    conservationEfforts: "Monitoring reproduksi sarang tahunan oleh Eagle Conservation Project dan Taman Nasional Jawa."
  },
  {
    id: "sp-10",
    latinName: "Paradisaea minor",
    commonName: "Cendrawasih Kuning-Kecil",
    englishName: "Lesser Bird-of-Paradise",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Aves",
    order: "Passeriformes",
    family: "Paradisaeidae",
    genus: "Paradisaea",
    iucnStatus: "LC",
    iucnLabel: "Risiko Rendah (Least Concern)",
    population: "Stabil di hutan hujan daratan Papua",
    habitat: "Kanopi hutan hujan tropis Papua & pulau rimba sekitarnya",
    distributionRegion: ["Papua Barat", "Papua Pegunungan", "Kepulauan Raja Ampat", "Pulau Yapen"],
    imageUrl: "https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?auto=format&fit=crop&w=1000&q=80",
    audioTitle: "Kicauan Ritual Tarian Lek Cendrawasih Jantan",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2436/2436-preview.mp3",
    description: "Burung eksotis yang dijuluki 'Bird of Paradise' karena keindahan bulu hiasan berwarna kuning kecokelatan di samping paha jantan saat melakukan tarian penikahan.",
    physicalCharacteristics: [
      "Panjang tubuh 32 cm",
      "Jantan memiliki hiasan bulu panggul kuning panjang melambai",
      "Mahkota kepala berbulu kuning keemasan berkilau",
      "Tenggorokan hijau zamrud iridescence berkilau metalik"
    ],
    diet: "Frugivora-Insektivora: Buah pala hutan, buah beringin, dan serangga kanopi",
    threats: ["Perdagangan mahkota bulu tradisional berlebihan", "Penebangan hutan papua"],
    conservationEfforts: "Ekoturisme birdwatching berbasis komunitas adat lokal Papua di Raja Ampat."
  },
  {
    id: "sp-11",
    latinName: "Macrocephalon maleo",
    commonName: "Burung Maleo",
    englishName: "Maleo Senkawor",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Aves",
    order: "Galliformes",
    family: "Megapodiidae",
    genus: "Macrocephalon",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "< 8.000 individu di Pulau Sulawesi",
    habitat: "Pantai berpasir hangat & tempat geotermal vulkanik daratan",
    distributionRegion: ["TN Bogani Nani Wartabone", "TN Lore Lindu", "Suaka Margasatwa Pinjan-Tanjung Matop"],
    imageUrl: "https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?auto=format&fit=crop&w=1000&q=80",
    audioTitle: "Panggilan Khas Pasangan Maleo di Penangkaran Geotermal",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2436/2436-preview.mp3",
    description: "Burung megapoda unik endemik Sulawesi yang tidak mengerami telurnya. Telurnya dieramkan secara alami menggunakan panas bumi (geotermal) atau pasir pantai yang hangat.",
    physicalCharacteristics: [
      "Panjang tubuh 55 cm, warna bulu hitam dengan dada merah muda lembut",
      "Tonjolan tanduk keras melengkung berwarna hitam di atas kepala",
      "Kulit muka kuning terang telanjang",
      "Ukuran telur 5 kali lipat lebih besar dibanding telur ayam biasa"
    ],
    diet: "Omnivora darat: Biji-bijian jatuh, semut hutan, rayap, dan buah kecil",
    threats: ["Pengambilan telur berlebih oleh warga lokal", "Predasi anak maleo oleh biawak dan kucing hutan"],
    conservationEfforts: "Pagar perlindungan lokasi peneluran (hatchery) dan penetasan geotermal terkontrol."
  },
  {
    id: "sp-12",
    latinName: "Tarsius wallacei",
    commonName: "Tarsius Wallace",
    englishName: "Wallace's Tarsier",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    order: "Primates",
    family: "Tarsiidae",
    genus: "Tarsius",
    iucnStatus: "VU",
    iucnLabel: "Rentan (Vulnerable)",
    population: "Populasi terisolasi di Sulawesi Tengah",
    habitat: "Hutan hujan dataran rendah & kebun sekunder terpencil",
    distributionRegion: ["Kabupaten Sigi & Donggala (Sulawesi Tengah)"],
    imageUrl: "https://images.unsplash.com/photo-1574063413132-355dbfd83e0c?auto=format&fit=crop&w=1000&q=80",
    audioTitle: "Vokalisasi Duet Pagi Hari Tarsius Wallace",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2677/2677-preview.mp3",
    description: "Primata nokturnal amat kecil endemik Sulawesi dengan mata raksasa yang tidak dapat melirik, namun kepalanya mampu berputar hingga 180 derajat ke belakang.",
    physicalCharacteristics: [
      "Panjang tubuh hanya 12 cm, berat 110-140 gram",
      "Mata bulat raksasa yang bercahaya di kegelapan",
      "Tangan dan kaki bermembran perekat untuk melompat antar dahan",
      "Ekor panjang dengan rumbai bulu tipis di ujungnya"
    ],
    diet: "Karnivora murni (Karnivora primata): Belalang, jangkrik, ngengat, dan cicak kecil",
    threats: ["Penebangan pohon tempat tidur rumpun bambu & pohon beringin", "Penggunaan pestisida serangga"],
    conservationEfforts: "Studi akustik pemantauan teritorial oleh Institut Pertanian Bogor dan LIPI."
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [];
export const ADMIN_VERIFICATION_QUEUE: AdminVerificationItem[] = [];

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
    "Herpetologi Indonesia"
  ],
  stats: {
    totalArticles: 0,
    totalCitations: 0,
    totalReads: 0,
    hIndex: 0
  },
  bookmarks: []
};
