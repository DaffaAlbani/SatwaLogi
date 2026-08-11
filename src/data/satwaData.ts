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
  authorEmail?: string;
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
    imageUrl: "/images/harimau_sumatra.png",
    audioTitle: "Vokalisasi Auman & Panggilan Teritorial Harimau Sumatra",
    audioUrl: "/audio/harimau_sumatra.mp3?v=10",
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
    imageUrl: "/images/orangutan_tapanuli.png",
    audioTitle: "Panggilan Panjang (Long Call) Orangutan Jantan Dewasa",
    audioUrl: "/audio/orangutan_tapanuli.mp3?v=10",
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
    imageUrl: "/images/jalak_bali.png",
    audioTitle: "Kicauan Merdu & Bersahut Jalak Bali (Leucopsar rothschildi)",
    audioUrl: "/audio/jalak_bali.mp3?v=10",
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
    imageUrl: "/images/komodo.png",
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
    imageUrl: "/images/penyu_hijau.png",
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
    imageUrl: "/images/anoa_pegunungan.png",
    audioTitle: "Dengkuran & Seruan Komunikasi Anoa Pegunungan",
    audioUrl: "/audio/anoa_pegunungan.mp3?v=10",
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
    imageUrl: "/images/gajah_sumatra.png",
    audioTitle: "Suara Terompet Belalai Raksasa Gajah Sumatra (Authentic Elephant Call)",
    audioUrl: "/audio/gajah_sumatra.mp3?v=10",
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
    imageUrl: "/images/badak_jawa.png",
    audioTitle: "Peluit Semburan & Dengkuran Komunikasi Badak Jawa",
    audioUrl: "/audio/badak_jawa.mp3?v=10",
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
    imageUrl: "/images/elang_jawa.png",
    audioTitle: "Pekikan Melengking Elang Jawa di Angkasa",
    audioUrl: "/audio/elang_jawa.mp3?v=10",
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
    imageUrl: "/images/cendrawasih.png",
    audioTitle: "Seruan Panggilan Khas Cendrawasih Kanopi",
    audioUrl: "/audio/cendrawasih.mp3?v=10",
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
    imageUrl: "/images/burung_maleo.png",
    audioTitle: "Kicauan Panggilan Sahut-Menyahut Burung Maleo",
    audioUrl: "/audio/burung_maleo.mp3?v=10",
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
    imageUrl: "/images/tarsius_wallace.png",
    audioTitle: "Vokalisasi Nokturnal Pitch Tinggi Tarsius Wallace",
    audioUrl: "/audio/tarsius_wallace.mp3?v=10",
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
  },
  {
    id: "sp-13",
    latinName: "Rafflesia arnoldii",
    commonName: "Padma Raksasa (Rafflesia)",
    englishName: "Giant Padme / Monster Flower",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Malpighiales",
    family: "Rafflesiaceae",
    genus: "Rafflesia",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "Sporadis & langka di hutan hujan tropis Sumatra",
    habitat: "Hutan hujan dataran rendah & pegunungan basah Bengkulu",
    distributionRegion: ["Bengkulu (Taba Penanjung)", "TN Bukit Barisan Selatan", "TN Kerinci Seblat", "Lampung"],
    imageUrl: "/images/rafflesia.png",
    description: "Bunga tunggal terbesar di dunia yang merupakan flora endemik Sumatra. Tumbuhan parasit obligat tanpa daun, batang, atau akar sejati yang mengeluarkan aroma busuk untuk memikat lalat penyerbuk.",
    physicalCharacteristics: [
      "Diameter mekar bunga mencapai 70–110 cm dengan berat hingga 11 kg",
      "Tidak memiliki klorofil (parasit obligat pada akar inang Tetrastigma)",
      "Lima mahkota bunga tebal berwarna merah bintik putih bintil",
      "Masa mekar sangat singkat hanya 5 hingga 7 hari sebelum membusuk"
    ],
    diet: "Parasit Obligat: Menyerap air dan nutrisi dari akar pembuluh tumbuhan inang Tetrastigma",
    threats: ["Kerusakan jaringan akar tumbuhan inang akibat alih fungsi lahan", "Injakan fisik oleh aktivitas wisatawan tak teratur"],
    conservationEfforts: "Pelindungan cagar alam BKSDA Bengkulu & riset penangkaran ex-situ Kebun Raya Bogor."
  },
  {
    id: "sp-14",
    latinName: "Amorphophallus titanum",
    commonName: "Bunga Bangkai Raksasa",
    englishName: "Titan Arum",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Liliopsida",
    order: "Alismatales",
    family: "Araceae",
    genus: "Amorphophallus",
    iucnStatus: "EN",
    iucnLabel: "Terguncang (Endangered)",
    population: "< 1.000 individu mekar aktif di alam liar",
    habitat: "Hutan hujan dataran rendah pada lereng tebing lembap Sumatra",
    distributionRegion: ["Sumatra Barat", "Bengkulu", "Kebun Raya Bogor (Ex-situ)", "Sumatra Utara"],
    imageUrl: "/images/bunga_bangkai.png",
    description: "Spesies perbungaan tak bercabang terbesar di dunia yang endemik Sumatra. Memiliki struktur menjulang tinggi yang menghasilkan panas metabolik saat mekar untuk memikat kumbang bangkai.",
    physicalCharacteristics: [
      "Tinggi struktur perbungaan (spadix) dapat melampaui 3 meter",
      "Mengeluarkan panas teralokasi hingga 37°C saat mekar di malam hari",
      "Seludang (spathe) mekar berombak berwarna merah keunguan pekat di dalam",
      "Fase vegetatif menghasilkan sebatang daun tunggal raksasa menyerupai pohon"
    ],
    diet: "Autotrof (Fotosintesis) pada fase daun; menyimpan cadangan energi di umbi raksasa (corm)",
    threats: ["Pembukaan lahan perkebunan sawit & karet", "Pengrusakan umbi oleh warga akibat salah sangka"],
    conservationEfforts: "Konservasi ex-situ Kebun Raya Bogor dan pemetaan habitat kritis oleh BRIN."
  },
  {
    id: "sp-15",
    latinName: "Nepenthes rajah",
    commonName: "Kantong Semar Raksasa",
    englishName: "Giant Rajah Pitcher Plant",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Caryophyllales",
    family: "Nepenthaceae",
    genus: "Nepenthes",
    iucnStatus: "EN",
    iucnLabel: "Terguncang (Endangered)",
    population: "Populasi endemik terbatas di pegunungan Kalimantan",
    habitat: "Hutan pegunungan basah tanah ultra-basa (1.500–2.650 mdpl)",
    distributionRegion: ["Taman Nasional Gunung Kinabalu", "Pegunungan Kalimantan Barat & Utara"],
    imageUrl: "/images/kantong_semar.png",
    description: "Kantong semar terbesar di bumi yang mampu menampung hingga 3,5 liter cairan pencerna. Perangkapnya yang berukuran raksasa mampu menjebak serangga hingga mamalia kecil.",
    physicalCharacteristics: [
      "Perangkap kantong dapat menampung 3,5 liter cairan enzimatik",
      "Bibir kantong (peristom) bergelombang tajam dan amat licin",
      "Memiliki hubungan simbiotik mutualisme dengan tupai gunung",
      "Warna kantong merah tua keunguan dengan struktur sangat kokoh"
    ],
    diet: "Karnivora (Insectivorous): Serangga, serasah organik, serta suplemen nitrogen dari simbiotik tupai",
    threats: ["Perdagangan tanaman liar eksotis ilegal", "Kebakaran hutan akibat iklim El Nino"],
    conservationEfforts: "Perlindungan ketat CITES Appendix I dan teknik mikropropagasi kultur jaringan."
  },
  {
    id: "sp-16",
    latinName: "Coelogyne pandurata",
    commonName: "Anggrek Hitam Kalimantan",
    englishName: "Black Orchid",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Liliopsida",
    order: "Asparagales",
    family: "Orchidaceae",
    genus: "Coelogyne",
    iucnStatus: "VU",
    iucnLabel: "Rentan (Vulnerable)",
    population: "Populasi menyusut akibat terdegradasi rawa gambut",
    habitat: "Pohon epifit di hutan rawa dataran rendah & tepi sungai",
    distributionRegion: ["Cagar Alam Kersik Luway (Kaltim)", "Kalimantan Barat", "Papua"],
    imageUrl: "/images/anggrek_hitam.png",
    description: "Anggrek eksotis endemik Indonesia dengan lidah bunga (labellum) berwarna hitam legam bergaris hijau yang harum mekar. Menjadi maskot flora kebanggaan Kalimantan Timur.",
    physicalCharacteristics: [
      "Tandan bunga membawa 6-14 kuntum mekar beraroma harum semerbak",
      "Lidah bunga (labellum) berwarna hitam pekat bertekstur beludru",
      "Mahkota dan kelopak berwarna hijau muda jernih",
      "Tumbuh menempel (epifit) pada dahan-dahan pohon besar rindang"
    ],
    diet: "Autotrof (Fotosintesis) & Penyerapan embun/kelembapan udara hutan tropis",
    threats: ["Pengambilan liar oleh pemburu tanaman hias", "Kebakaran lahan gambut musiman"],
    conservationEfforts: "Perlindungan Cagar Alam Kersik Luway dan pembudidayaan kultur in-vitro di Kebun Raya."
  },
  {
    id: "sp-17",
    latinName: "Shorea faguetiana",
    commonName: "Pohon Meranti Kuning (Pohon Hujan Tertinggi)",
    englishName: "Yellow Meranti (Menara Tree)",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Malvales",
    family: "Dipterocarpaceae",
    genus: "Shorea",
    iucnStatus: "EN",
    iucnLabel: "Terguncang (Endangered)",
    population: "Terancam pembalakan kayu komersial hutan tropis",
    habitat: "Hutan hujan dataran rendah kanopi raksasa Kalimantan",
    distributionRegion: ["Kalimantan Timur", "Kalimantan Tengah", "Perbatasan Sabah-Sarawak", "Sumatra"],
    imageUrl: "/images/meranti_kuning.png",
    description: "Spesies pohon tropis tertinggi di bumi (rekord *Menara* mencapai tinggi 100,8 meter). Pohon raksasa ini menjadi penyerap karbon utama dan rumah kanopi fauna Kalimantan.",
    physicalCharacteristics: [
      "Tinggi pohon mencapai lebih dari 100 meter dengan batang berdiameter > 3 meter",
      "Akar banir (buttress root) membentang tebal hingga 5 meter di atas tanah",
      "Biji bersayap dua (dipterocarp) yang berputar melayang saat tertiup angin",
      "Kanopi raksasa yang menjadi sarang burung rangkong dan tempat tidur orangutan"
    ],
    diet: "Autotrof (Fotosintesis) & Penyerapan hara mikoriza tanah hutan tropis",
    threats: ["Pembalakan liar kayu meranti komersial", "Deforestasi hutan hujan primer dataran rendah"],
    conservationEfforts: "Sertifikasi kayu berkelanjutan FSC & penetapan kawasan High Conservation Value Forest (HCVF)."
  },
  {
    id: "sp-18",
    latinName: "Anaphalis javanica",
    commonName: "Edelweis Jawa (Bunga Abadi)",
    englishName: "Javanese Edelweiss",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Asterales",
    family: "Asteraceae",
    genus: "Anaphalis",
    iucnStatus: "VU",
    iucnLabel: "Rentan (Vulnerable)",
    population: "Terbatas di puncak pegunungan tinggi Jawa",
    habitat: "Zona montana & sub-alpin pegunungan vulkanik (2.000–3.000 mdpl)",
    distributionRegion: ["Taman Nasional Gede Pangrango", "TN Bromo Tengger Semeru", "TN Gunung Rinjani"],
    imageUrl: "/images/edelweis_jawa.png",
    description: "Tumbuhan endemik zona sub-alpin yang dikenal sebagai Bunga Abadi karena hormon etilen pada kelopaknya mencegah bunga gugur atau layu selama bertahun-tahun.",
    physicalCharacteristics: [
      "Tinggi semak mencapai 8 meter dengan batang berkayu berstruktur rapat",
      "Kepala bunga berukuran kecil berdiameter 5 mm berwarna putih perak",
      "Daun berbentuk linier tertutup bulu-bulu halus wol penahan dingin",
      "Bunga mekar penuh pada akhir musim kemarau (April–Agustus)"
    ],
    diet: "Autotrof (Fotosintesis) & Penyerapan embun dingin tanah vulkanik",
    threats: ["Pemetikan liar berlebihan oleh pendaki gunung", "Kebakaran vegetasi savana puncak"],
    conservationEfforts: "Pelindungan mutlak Undang-Undang Konservasi & budidaya komunitas warga lokal Semeru."
  },
  {
    id: "sp-19",
    latinName: "Santalum album",
    commonName: "Pohon Cendana Wangi",
    englishName: "Indian Sandalwood",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Santalales",
    family: "Santalaceae",
    genus: "Santalum",
    iucnStatus: "VU",
    iucnLabel: "Rentan (Vulnerable)",
    population: "Populasi murni menyusut drastis di Nusa Tenggara",
    habitat: "Hutan musim dataran rendah & perbukitan kering beriklim monsun",
    distributionRegion: ["Pulau Sumba", "Timor (Nusa Tenggara Timur)", "Gunung Kidul (Yogyakarta)"],
    imageUrl: "/images/pohon_cendana.png",
    description: "Pohon penghasil kayu aromatik dan minyak cendana bernilai tinggi yang merupakan flora identitas kebanggaan Provinsi Nusa Tenggara Timur.",
    physicalCharacteristics: [
      "Pohon berukuran sedang tinggi 12–15 meter dengan tajuk ramping",
      "Parasit akar parsial (hemiparasit) yang memerlukan tanaman inang untuk tumbuh awal",
      "Kayu galih berwarna kuning kecokelatan yang menghasilkan aroma wangi alami abadi",
      "Buah buni kecil bulat berwarna merah tua kehitaman saat matang"
    ],
    diet: "Hemiparasit: Menyerap hara tambahan dari akar inang via haustorium",
    threats: ["Eksploitasi pembalakan kayu aromatik berlebihan", "Kebakaran padang savana NTT"],
    conservationEfforts: "Penetapan kawasan konservasi suaka Cendana di NTT dan program penanaman kembali."
  },
  {
    id: "sp-20",
    latinName: "Jasminum sambac",
    commonName: "Melati Putih (Puspa Bangsa)",
    englishName: "Arabian Jasmine (Indonesian National Flower)",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Lamiales",
    family: "Oleaceae",
    genus: "Jasminum",
    iucnStatus: "LC",
    iucnLabel: "Risiko Rendah (Least Concern)",
    population: "Tersebar luas & dibudidayakan di seluruh wilayah nusantara",
    habitat: "Pesisir dataran rendah hingga pekarangan tropis (0–600 mdpl)",
    distributionRegion: ["Jawa", "Sumatra", "Bali", "Nusa Tenggara", "Seluruh Indonesia"],
    imageUrl: "/images/melati_putih.png",
    description: "Simbol suci kemurnian dan keanggungan yang ditetapkan secara resmi sebagai Puspa Bangsa Indonesia melalui Keputusan Presiden No. 4 Tahun 1993.",
    physicalCharacteristics: [
      "Semak merambat dengan bunga mungil berwarna putih bersih beraroma manis semerbak",
      "Mahkota bunga bersusun tunggal atau ganda berdiameter 2-3 cm",
      "Daun membulat telur berwarna hijau tua mengkilap",
      "Bunga mekar sepanjang tahun terutama pada pagi & malam hari"
    ],
    diet: "Autotrof (Fotosintesis) pada tanah berhumus lembap",
    threats: ["Alih fungsi lahan pertanian dan pembetonan perkotaan"],
    conservationEfforts: "Budidaya tanaman hias nasional & pelestarian tradisi kebudayaan nusantara."
  },
  {
    id: "sp-21",
    latinName: "Aquilaria malaccensis",
    commonName: "Pohon Gaharu Penghasil Gubal",
    englishName: "Agarwood (Agar Tree)",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Myrtales",
    family: "Thymelaeaceae",
    genus: "Aquilaria",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "Sangat terancam akibat perburuan gubal gaharu liar",
    habitat: "Hutan hujan dataran rendah primer & sekunder (0–750 mdpl)",
    distributionRegion: ["Sumatra", "Kalimantan", "Papua", "Sulawesi"],
    imageUrl: "/images/pohon_gaharu.png",
    description: "Pohon tropis langka penghasil kayu gubal beraroma mewangi tinggi yang terbentuk akibat respons imunitas terhadap infeksi kapang alami Phialophora.",
    physicalCharacteristics: [
      "Pohon berukuran besar tinggi mencapai 40 meter dengan diameter batang 60 cm",
      "Batang menghasilkan damar resin berwarna gelap beraroma sangat wangi bila terinfeksi",
      "Buah berbentuk kapsul agak membulat berukuran 3 cm",
      "Kulit batang berserat kuat yang dahulu digunakan sebagai bahan pakaian kayu tradisional"
    ],
    diet: "Autotrof (Fotosintesis) pada tanah podsolik hutan hujan basah",
    threats: ["Penebangan liar tak terkendali pencari gubal gaharu alami"],
    conservationEfforts: "Kuantitas perdagangan dibatasi CITES Appendix II & teknologi inokulasi buatan."
  },
  {
    id: "sp-22",
    latinName: "Nasalis larvatus",
    commonName: "Bekantan (Monyet Belanda)",
    englishName: "Proboscis Monkey",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    order: "Primates",
    family: "Cercopithecidae",
    genus: "Nasalis",
    iucnStatus: "EN",
    iucnLabel: "Terguncang (Endangered)",
    population: "Sekitar 6.000 - 8.000 individu tersisa di Borneo",
    habitat: "Hutan mangrove pesisir, rawa gambut, & tepi sungai Kalimantan",
    distributionRegion: ["TN Tanjung Puting", "TN Kutai", "Kuala Samboja (Kaltim)", "Kalimantan Barat"],
    imageUrl: "/images/bekantan.png",
    audioTitle: "Panggilan Klaxon 'Honk' Hidung Bekantan Jantan",
    audioUrl: "/audio/bekantan.mp3?v=10",
    description: "Primata arboreal unik endemik Kalimantan yang terkenal dengan hidung gantung raksasa pada jantan dewasa dan perut buncit penyimpan bakteri fermentasi daun.",
    physicalCharacteristics: [
      "Jantan memiliki hidung panjang menggantung hingga melampaui mulut",
      "Rambut tubuh berwarna kemerahan cokelat berpadu abu-abu di bagian dorsal",
      "Telapak kaki berselaput sebagian untuk kemahiran berenang melintasi sungai",
      "Sistem pencernaan lambung berganda untuk memecah racun daun bakau"
    ],
    diet: "Herbivora folivora: Daun muda mangrove (Rhizophora), buah mentah, dan tunas pohon rawa",
    threats: ["Konversi hutan mangrove menjadi tambak udang & pemukiman"],
    conservationEfforts: "Pelindungan Kawasan Ekosistem Esensial Mangrove & Taman Nasional Tanjung Puting."
  },
  {
    id: "sp-23",
    latinName: "Eretmochelys imbricata",
    commonName: "Penyu Sisik",
    englishName: "Hawksbill Sea Turtle",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Reptilia",
    order: "Testudines",
    family: "Cheloniidae",
    genus: "Eretmochelys",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "Sangat Kritis; mengalami penurunan 80% dalam 3 generasi",
    habitat: "Terumbu karang tropis dangkal & pulau pesisir terpencil",
    distributionRegion: ["Kepulauan Seribu", "Kepulauan Derawan (Kaltim)", "Taka Bonerate", "Raja Ampat"],
    imageUrl: "/images/penyu_sisik.png",
    description: "Penyu laut tropis bercangkang indah tumpang-tindih menyerupai sisik bertanduk. Berperan menjaga kesehatan ekosistem terumbu karang dengan memangsa spons laut.",
    physicalCharacteristics: [
      "Panjang karapas 70-90 cm dengan berat 45-80 kg",
      "Paruh tajam melengkung meruncing seperti paruh elang untuk mencungkil spons",
      "Lempeng sisik karapas (scute) berpola keemasan cokelat bertumpuk indah",
      "Dua cakar menonjol pada setiap sirip perenang depan"
    ],
    diet: "Karnivora spons: Spons laut beracun, anemon, ubur-ubur, dan alga merah",
    threats: ["Perdagangan ilegal cangkang sisik perhiasan & perburuan telur"],
    conservationEfforts: "Penetapan Suaka Margasatwa Pulau Derawan & pelindungan sarang peneluran pesisir."
  },
  {
    id: "sp-24",
    latinName: "Rhinoplax vigil",
    commonName: "Burung Rangkong Gading",
    englishName: "Helmeted Hornbill",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Aves",
    order: "Bucerotiformes",
    family: "Bucerotidae",
    genus: "Rhinoplax",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "Terancam punah drastis akibat maraknya perburuan gading merah",
    habitat: "Kanopi hutan hujan primer dataran rendah (0–1.000 mdpl)",
    distributionRegion: ["Taman Nasional Gunung Leuser (Sumatra)", "TN Betung Kerihun (Kalimantan)"],
    imageUrl: "/images/rangkong_gading.png",
    audioTitle: "Tawa Nyaring & Seruan Khas Rangkong Gading Kanopi",
    audioUrl: "/audio/rangkong_gading.mp3?v=10",
    description: "Spesies burung pemencar biji raksasa yang dijuluki Petani Hutan. Memiliki balung (casque) padat masif berwarna merah keemasan yang bernilai tinggi di pasar gelap.",
    physicalCharacteristics: [
      "Rentang sayap mencapai 1,7 meter dengan dua bulu ekor tengah sepanjang 1 meter",
      "Balung (casque) padat berstruktur tulang keras yang digunakan untuk bertarung di udara",
      "Kulit leher tanpa bulu berwarna merah menyala pada jantan dan pirus pada betina",
      "Suara panggilan menyerupai tawa riuh yang terdengar hingga jarak 2 km"
    ],
    diet: "Frugivora spesialis: Buah ara (Ficus) hutan primer, buah beringin, dan vertebrata kecil",
    threats: ["Perburuan liar masif untuk mengambil balung gading merah", "Deforestasi pohon tua bersarang"],
    conservationEfforts: "Rencana Aksi Konservasi Rangkong Gading Nasional & patroli anti-perburuan terpadu."
  },
  {
    id: "sp-25",
    latinName: "Ailurops ursinus",
    commonName: "Kuskus Beruang Sulawesi",
    englishName: "Sulawesi Bear Cuscus",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    order: "Diprotodontia",
    family: "Phalangeridae",
    genus: "Ailurops",
    iucnStatus: "VU",
    iucnLabel: "Rentan (Vulnerable)",
    population: "Populasi terfragmentasi di kawasan hutan Sulawesi",
    habitat: "Kanopi atas hutan hujan tropis basah (0–600 mdpl)",
    distributionRegion: ["Taman Nasional Tangkoko (Sulawesi Utara)", "TN Bogani Nani Wartabone", "Pulau Lembeh"],
    imageUrl: "/images/kuskus_beruang.png",
    audioTitle: "Geraman & Dengkuran Halus Kuskus Beruang Sulawesi",
    audioUrl: "/audio/kuskus_beruang.mp3?v=10",
    description: "Mamalia marsupialia (berkantong) primitif endemik Sulawesi yang bergerak lambat di kanopi pohon dengan ekor prehensil kuat penangkap dahan.",
    physicalCharacteristics: [
      "Panjang tubuh 56 cm dengan ekor prehensil berotot panjang 54 cm",
      "Rambut tebal kehitaman bertekstur kasar menyerupai bulu beruang kecil",
      "Mata membulat besar berwarna cokelat terang dengan pergerakan sangat tenang",
      "Betina memiliki kantong perut (marsupium) tempat membesarkan anak"
    ],
    diet: "Herbivora folivora: Daun-daun muda kanopi, bunga tropis, dan buah liar mentah",
    threats: ["Perburuan liar daging satwa eksotis", "Hilangnya tutupan kanopi hutan hujan"],
    conservationEfforts: "Pelindungan Cagar Alam Tangkoko & pembentukan koridor tutupan kanopi."
  },
  {
    id: "sp-26",
    latinName: "Nepenthes ampullaria",
    commonName: "Kantong Semar Gambut (Nepenthes Ampullaria)",
    englishName: "Ampullaria Pitcher Plant",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Caryophyllales",
    family: "Nepenthaceae",
    genus: "Nepenthes",
    iucnStatus: "LC",
    iucnLabel: "Risiko Rendah (Least Concern)",
    population: "Melimpah di hutan rawa gambut Sumatra & Kalimantan",
    habitat: "Hutan rawa gambut basah & tanah podsolik asam (0–1.000 mdpl)",
    distributionRegion: ["Sumatra", "Kalimantan", "Kepulauan Riau", "Papua"],
    imageUrl: "/images/kantong_semar_ampullaria.png",
    description: "Kantong semar unik penangkap serasah daun (detritivora) yang tumbuh membumi bergerombol di atas permukaan tanah rawa gambut.",
    physicalCharacteristics: [
      "Perangkap kantong berbentuk membulat seperti mangkuk hijau berbintik merah",
      "Tutup kantong kecil terlipat ke belakang sehingga terbuka menampung jatuh daun",
      "Tumbuh membentuk karpet perikat serasah di dasar hutan rawa gambut",
      "Memiliki hubungan simbiotik dengan larva nyamuk & katak mikro"
    ],
    diet: "Detritivora (Fotosintesis & Penyerapan unsur hara serasah daun jatuh)",
    threats: ["Kebakaran lahan rawa gambut & konversi perkebunan"],
    conservationEfforts: "Pelindungan kawasan cagar alam gambut & budidaya tanaman hias."
  },
  {
    id: "sp-27",
    latinName: "Handroanthus chrysanthus",
    commonName: "Pohon Tabebuia (Bunga Sakura Tropis)",
    englishName: "Golden Trumpet Tree",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Lamiales",
    family: "Bignoniaceae",
    genus: "Handroanthus",
    iucnStatus: "LC",
    iucnLabel: "Risiko Rendah (Least Concern)",
    population: "Banyak ditanam di taman kota & lanskap jalan nasional",
    habitat: "Taman dataran rendah tropis & jalan utama perkotaan",
    distributionRegion: ["Surabaya", "Jakarta", "Bandung", "Medan", "Seluruh Indonesia"],
    imageUrl: "/images/tabebuia.png",
    description: "Pohon peneduh tropis dengan perbungaan terompet kuning-merah jambu semarak yang mekar serentak saat musim kemarau.",
    physicalCharacteristics: [
      "Pohon tinggi 5-12 meter dengan tajuk melingkar rindang",
      "Bunga berbentuk terompet berwarna kuning cerah atau merah muda",
      "Daun majemuk menjari dengan 5 anak daun hijau tua",
      "Gugur daun sebelum mekar bunga serempak yang indah"
    ],
    diet: "Autotrof (Fotosintesis) pada tanah berdrainase baik",
    threats: ["Pemangkasan jalan yang tak teratur"],
    conservationEfforts: "Penghijauan kota & taman keanekaragaman hayati perkotaan."
  },
  {
    id: "sp-28",
    latinName: "Tectona grandis",
    commonName: "Pohon Jati",
    englishName: "Teak Tree",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Lamiales",
    family: "Lamiaceae",
    genus: "Tectona",
    iucnStatus: "LC",
    iucnLabel: "Risiko Rendah (Least Concern)",
    population: "Melimpah di hutan jati Jawa & Nusa Tenggara",
    habitat: "Hutan monsun dataran rendah beriklim kering (0–700 mdpl)",
    distributionRegion: ["Jawa Tengah (Blora, Jepara)", "Jawa Timur", "NTB", "NTT"],
    imageUrl: "/images/pohon_jati.png",
    description: "Pohon penghasil kayu komersial bermutu tinggi dengan serat berdaya tahan luar biasa terhadap pelapukan dan serangan rayap.",
    physicalCharacteristics: [
      "Pohon raksasa tinggi 30-40 meter dengan batang lurus silindris",
      "Daun berukuran sangat besar membulat telur berambut kasar",
      "Meranggas gugur daun saat musim kemarau untuk menghemat air",
      "Kayu galih mengandung minyak alami penolak air & rayap"
    ],
    diet: "Autotrof (Fotosintesis) pada tanah kapur & kapur vulkanik",
    threats: ["Pembalakan liar kayu berkualitas tua"],
    conservationEfforts: "Hutan tanaman industri berkelanjutan Perum Perhutani."
  },
  {
    id: "sp-29",
    latinName: "Dendrocalamus asper",
    commonName: "Bambu Betung Raksasa",
    englishName: "Giant Petung Bamboo",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Liliopsida",
    order: "Poales",
    family: "Poaceae",
    genus: "Dendrocalamus",
    iucnStatus: "LC",
    iucnLabel: "Risiko Rendah (Least Concern)",
    population: "Melimpah di pedesaan & bantaran sungai nusantara",
    habitat: "Bantaran sungai, lereng gunung, & hutan bambu lembap (0–1.500 mdpl)",
    distributionRegion: ["Jawa", "Sumatra", "Bali", "Sulawesi", "Papua"],
    imageUrl: "/images/bambu_betung.png",
    description: "Spesies bambu terbesar di Indonesia dengan rebung bernutrisi lezat dan buluh tebal yang menjadi konstruksi bangunan tradisional bernilai ekologis.",
    physicalCharacteristics: [
      "Buluh bambu raksasa diameter 15-20 cm dengan tebal dinding 2-3 cm",
      "Tinggi rumpun mencapai 20-30 meter dengan ruas panjang kokoh",
      "Rebung berukuran besar berwarna cokelat kehitaman berambut beludru",
      "Akar serabut tebal pengikat erosi tanah tebing sungai"
    ],
    diet: "Autotrof (Fotosintesis) pada tanah aluvial tepi sungai",
    threats: ["Eksploitasi tak seimbang tanpa penanaman tunas baru"],
    conservationEfforts: "Program desa bambu lestari & konservasi DAS sungai."
  },
  {
    id: "sp-30",
    latinName: "Eusideroxylon zwageri",
    commonName: "Pohon Ulin (Kayu Besi Kalimantan)",
    englishName: "Bornean Ironwood",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Laurales",
    family: "Lauraceae",
    genus: "Eusideroxylon",
    iucnStatus: "EN",
    iucnLabel: "Terguncang (Endangered)",
    population: "Sangat terancam di hutan alam Kalimantan & Sumatra",
    habitat: "Hutan hujan primer dataran rendah tanah podsolik (0–600 mdpl)",
    distributionRegion: ["Kalimantan Timur", "Kalimantan Tengah", "Sumatra Selatan", "Bangka Belitung"],
    imageUrl: "/images/pohon_ulin.png",
    description: "Pohon kayu besi endemik Kalimantan yang amat keras, tidak lapuk direndam air laut selama ratusan tahun, dan menjadi fondasi utama rumah adat Dayak.",
    physicalCharacteristics: [
      "Tinggi pohon mencapai 50 meter dengan diameter batang > 120 cm",
      "Kayu berwarna cokelat gelap amat berat yang tenggelam di dalam air",
      "Biji berukuran sangat besar memanjang bertekstur keras tajam",
      "Pertumbuhan sangat lambat membutuhkan waktu 80-100 tahun untuk dewasa"
    ],
    diet: "Autotrof (Fotosintesis) pada tanah podsolik basah",
    threats: ["Pembalakan liar komersial kayu ulin berlebihan"],
    conservationEfforts: "Perlindungan mutlak CITES & pelarangan ekspor kayu ulin mentah."
  },
  {
    id: "sp-31",
    latinName: "Saraca asoca",
    commonName: "Pohon Bunga Asoka",
    englishName: "Ashoka Tree",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Fabales",
    family: "Fabaceae",
    genus: "Saraca",
    iucnStatus: "VU",
    iucnLabel: "Rentan (Vulnerable)",
    population: "Terbatas di hutan lembap & taman pelestarian",
    habitat: "Hutan hujan dataran rendah tepi aliran air (0–500 mdpl)",
    distributionRegion: ["Sumatra", "Jawa Barat", "Kalimantan"],
    imageUrl: "/images/bunga_asoka.png",
    description: "Pohon suci dalam mitologi nusantara berbunga jingga kemerahan semarak yang mengeluarkan harum semerbak pada malam hari.",
    physicalCharacteristics: [
      "Pohon kecil tinggi 6-10 meter dengan daun majemuk terkulai manis",
      "Bunga bergerombol padat berwarna oranye terang hingga merah kemerahan",
      "Daun muda berwarna merah keunguan terkulai lemas sebelum mengeras",
      "Polong biji berukuran 15 cm pipih memanjang"
    ],
    diet: "Autotrof (Fotosintesis) pada tanah berhumus tinggi",
    threats: ["Kerusakan habitat tepi sungai"],
    conservationEfforts: "Penanaman di kebun raya & taman keanekaragaman hayati."
  },
  {
    id: "sp-32",
    latinName: "Cyathea contaminans",
    commonName: "Pakis Raksasa (Paku Pohon)",
    englishName: "Tree Fern",
    kingdom: "Plantae",
    phylum: "Pteridophyta",
    class: "Polypodiopsida",
    order: "Cyatheales",
    family: "Cyatheaceae",
    genus: "Cyathea",
    iucnStatus: "LC",
    iucnLabel: "Risiko Rendah (Least Concern)",
    population: "Melimpah di hutan pegunungan basah tropis",
    habitat: "Hutan pegunungan basah & tepi jurang berkabut (800–2.200 mdpl)",
    distributionRegion: ["Jawa", "Sumatra", "Sulawesi", "Bali", "Papua"],
    imageUrl: "/images/pakis_raksasa.png",
    description: "Tumbuhan paku purba berbentuk pohon yang telah ada sejak era dinosaurus, membentuk kanopi bawah yang teduh di hutan pegunungan tinggi.",
    physicalCharacteristics: [
      "Batang tegak seperti pohon tinggi 5-15 meter berserat akar hitam",
      "Ental daun raksasa menyirip ganda panjang 2-4 meter",
      "Sisik cokelat keemasan menutupi pangkal tangkai daun",
      "Reproduksi via spora di bawah permukaan daun"
    ],
    diet: "Autotrof (Fotosintesis) pada lingkungan tinggi kelembapan",
    threats: ["Pengambilan serat batang pakis untuk media tanam anggrek secara liar"],
    conservationEfforts: "Pengawasan perdagangan serat pakis oleh BKSDA."
  },
  {
    id: "sp-33",
    latinName: "Rhizophora mucronata",
    commonName: "Pohon Bakau Hitam Mangrove",
    englishName: "Loop-root Mangrove",
    kingdom: "Plantae",
    phylum: "Tracheophyta",
    class: "Magnoliopsida",
    order: "Malpighiales",
    family: "Rhizophoraceae",
    genus: "Rhizophora",
    iucnStatus: "LC",
    iucnLabel: "Risiko Rendah (Least Concern)",
    population: "Dominan di ekosistem pesisir pesisir nusantara",
    habitat: "Zona pasang surut pesisir & muara sungai berlumpur",
    distributionRegion: ["Pesisir Sumatra", "Kalimantan", "Jawa", "Sulawesi", "Papua"],
    imageUrl: "/images/bakau_hitam.png",
    description: "Pohon benteng pesisir utama penyerap gelombang tsunami & erosi laut dengan akar tunjang raksasa pencengkeram lumpur pesisir.",
    physicalCharacteristics: [
      "Akar tunjang bercabang banyak yang menopang pohon di lumpur pasang surut",
      "Buah vivipar berbentuk pensil panjang 30-60 cm yang berkecambah di pohon",
      "Daun tebal berdaging dengan bintik hitam khas di permukaan bawah",
      "Kelenjar ekskresi garam pada jaringan foliar"
    ],
    diet: "Autotrof (Fotosintesis) dengan toleransi salinitas air laut tinggi",
    threats: ["Konversi lahan mangrove menjadi tambak udang & pemukiman pesisir"],
    conservationEfforts: "Program Nasional Rehabilitasi Mangrove KKP & BRIN."
  },
  {
    id: "sp-34",
    latinName: "Cacatua sulphurea",
    commonName: "Kakatua Jambul Kuning",
    englishName: "Yellow-crested Cockatoo",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Aves",
    order: "Psittaciformes",
    family: "Cacatuidae",
    genus: "Cacatua",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "Sangat Kritis; < 2.500 individu tersisa di alam liar",
    habitat: "Hutan monsun dataran rendah & kebun kelapa Nusa Tenggara",
    distributionRegion: ["Nusa Tenggara Timur (Sumba, Komodo)", "NTB", "Sulawesi Selatan"],
    imageUrl: "/images/kakatua_jambul_kuning.png",
    audioTitle: "Pekikan & Kicauan Nyaring Kakatua Jambul Kuning",
    audioUrl: "/audio/kakatua_jambul_kuning.mp3?v=10",
    description: "Burung paruh bengkok endemik berbapak putih bersih dengan jambul kuning cerah yang dapat ditegakkan saat terkejut atau berkomunikasi.",
    physicalCharacteristics: [
      "Panjang tubuh 34 cm dengan bulu putih bersih dan jambul kuning mencolok",
      "Bercak kuning kemerahan pada penutup telinga dan bagian bawah sayap",
      "Paruh kuat melengkung berwarna hitam pekat penjelajah biji keras",
      "Suara pekikan parau nyaring yang membahana di kanopi"
    ],
    diet: "Frugivora & Granivora: Biji pohon, buah kacang liar, dan tunas bunga",
    threats: ["Perburuan liar masif untuk perdagangan burung peliharaan sangkar"],
    conservationEfforts: "Pelindungan CITES Appendix I & suaka penangkaran Komodo."
  },
  {
    id: "sp-35",
    latinName: "Panthera pardus melas",
    commonName: "Macan Tutul Jawa (Kumbang)",
    englishName: "Javan Leopard",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    order: "Carnivora",
    family: "Felidae",
    genus: "Panthera",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "Sisa ~ 350-500 individu terisolasi di gunung-gunung Jawa",
    habitat: "Hutan hujan tropis pegunungan & cagar alam pulau Jawa",
    distributionRegion: ["TN Gunung Gede Pangrango", "TN Meru Betiri", "TN Alas Purwo", "TN Ujung Kulon"],
    imageUrl: "/images/macan_tutul_jawa.png",
    audioTitle: "Geraman & Dengkuran Teritorial Macan Tutul Jawa",
    audioUrl: "/audio/macan_tutul_jawa.mp3?v=10",
    description: "Subspesies macan tutul terakhir di pulau Jawa dengan dua variasi warna: tutul kuning roset dan hitam mulus (macan kumbang).",
    physicalCharacteristics: [
      "Panjang tubuh 130-160 cm, berat 40-60 kg pada jantan",
      "Pola tutul bunga roset gelap pada rambut kuning atau cokelat kehitaman",
      "Mata hijau zamrud pembalik cahaya yang sangat tajam di kegelapan malam",
      "Kemahiran memanjat pohon tinggi pembawa hasil buruan"
    ],
    diet: "Karnivora puncak: Kancil, babi hutan, monyet ekor panjang, dan kijang",
    threats: ["Fragmentasi hutan pegunungan Jawa & perburuan mangsa liar"],
    conservationEfforts: "Monitoring camera trap terpadu & koridor konservasi TN Gede Pangrango."
  },
  {
    id: "sp-36",
    latinName: "Orcaella brevirostris",
    commonName: "Pesut Mahakam (Lumba-lumba Air Tawar)",
    englishName: "Irrawaddy Dolphin (Mahakam River Population)",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    order: "Cetacea",
    family: "Delphinidae",
    genus: "Orcaella",
    iucnStatus: "CR",
    iucnLabel: "Kritis (Critically Endangered)",
    population: "Sisa ~ 80 individu di Sungai Mahakam Kalimantan Timur",
    habitat: "Sungai air tawar dalam & danau oxbow Kalimantan Timur",
    distributionRegion: ["Sungai Mahakam (Kutai Kartanegara, Kutai Barat)", "Danau Semayang"],
    imageUrl: "/images/pesut_mahakam.png",
    audioTitle: "Sinyal Ekolokasi & Semburan Udara Pesut Mahakam",
    audioUrl: "/audio/pesut_mahakam.mp3?v=10",
    description: "Mamalia cetacea air tawar langka endemik Sungai Mahakam yang berkomunikasi menggunakan ekolokasi canggih di perairan keruh sungai.",
    physicalCharacteristics: [
      "Panjang tubuh 2-2.5 meter dengan kepala membulat tanpa paruh menonjol",
      "Warna tubuh abu-abu kebiruan polos dengan sirip punggung kecil membulat",
      "Kemampuan menyemburkan air dari mulut untuk mengejutkan ikan mangsa",
      "Sirip dada lebar fleksibel untuk manuver berenang di alur sungai sempit"
    ],
    diet: "Karnivora piscivora: Ikan sungai air tawar, udang galah, dan udang rawa",
    threats: ["Tersangkut rengge (jaring nelayan), ponton batu bara, & polusi sungai"],
    conservationEfforts: "Penetapan Kawasan Konservasi Perairan Mahakam & patroli relawan pesut."
  },
  {
    id: "sp-37",
    latinName: "Pavo muticus",
    commonName: "Burung Merak Hijau",
    englishName: "Green Peafowl",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Aves",
    order: "Galliformes",
    family: "Phasianidae",
    genus: "Pavo",
    iucnStatus: "EN",
    iucnLabel: "Terguncang (Endangered)",
    population: "Terbatas di kawasan savana terbuka Jawa Timur",
    habitat: "Hutan musim terbuka, savana, & tepi pantai pesisir",
    distributionRegion: ["Taman Nasional Alas Purwo", "TN Baluran", "TN Ujung Kulon"],
    imageUrl: "/images/merak_hijau.png",
    audioTitle: "Seruan Panggilan Teritorial Burung Merak Hijau",
    audioUrl: "/audio/merak_hijau.mp3?v=10",
    description: "Burung darat paling megah di Indonesia dengan ekor kipas berwarna hijau keemasan berkilauan yang mekar indah saat tarian pemikat betina.",
    physicalCharacteristics: [
      "Jantan memiliki bulu penutup ekor sepanjang 1,5 meter berdada hijau mengkilap",
      "Jambul tegak lurus berwarna hijau pirus di atas kepala",
      "Kulit pipi berwarna kuning cerah dan biru muda berselang-seling",
      "Suara seruan nyaring 'paoo-paoo' yang terdengar sangat jauh di savana"
    ],
    diet: "Omnivora: Biji-bijian, tunas rumput, pucuk daun, serangga, dan ular kecil",
    threats: ["Perburuan bulu ekor hiasan & pengambilan telur liar"],
    conservationEfforts: "Pelindungan savana Sadengan TN Baluran & Alas Purwo."
  },
  {
    id: "sp-38",
    latinName: "Cephalopachus bancanus",
    commonName: "Tarsius Belitung (Mentilin)",
    englishName: "Horsfield's Tarsier",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    order: "Primates",
    family: "Tarsiidae",
    genus: "Cephalopachus",
    iucnStatus: "EN",
    iucnLabel: "Terguncang (Endangered)",
    population: "Menyusut akibat tambang timah & deforestasi",
    habitat: "Hutan sekunder dataran rendah & kebun bambu (0–300 mdpl)",
    distributionRegion: ["Pulau Belitung", "Bangka", "Sumatra Selatan"],
    imageUrl: "/images/mentilin.png",
    audioTitle: "Vokalisasi Nokturnal Pitch Tinggi Mentilin Belitung",
    audioUrl: "/audio/mentilin.mp3?v=10",
    description: "Primata nokturnal mungil berkedudukan unik yang diabadikan sebagai fauna identitas Provinsi Kepulauan Bangka Belitung.",
    physicalCharacteristics: [
      "Mata raksasa berwarna cokelat bening yang masing-masing lebih besar dari otaknya",
      "Kaki belakang amat panjang pemungkin lompatan melayang 2-3 meter antar dahan",
      "Ekor panjang bersisik dengan rambut sedikit di ujungnya",
      "Kepala mampu berputar 180 derajat ke kiri dan ke kanan"
    ],
    diet: "Karnivora insektivora murni: Belalang, jangkrik, kumbang, kecoa hutan, dan cicak",
    threats: ["Tambang timah darat liar & pembukaan kebun sawit"],
    conservationEfforts: "Pelindungan hutan suaka alam Bangka Belitung."
  },
  {
    id: "sp-39",
    latinName: "Tiliqua gigas",
    commonName: "Kadal Panana (Skink Lidah Biru)",
    englishName: "Indonesian Blue-tongued Skink",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Reptilia",
    order: "Squamata",
    family: "Scincidae",
    genus: "Tiliqua",
    iucnStatus: "LC",
    iucnLabel: "Risiko Rendah (Least Concern)",
    population: "Melimpah di wilayah Papua & Maluku",
    habitat: "Hutan hujan dataran rendah & kebun lembap Papua (0–800 mdpl)",
    distributionRegion: ["Papua", "Papua Barat", "Kepulauan Maluku"],
    imageUrl: "/images/kadal_panana.png",
    description: "Kadal berbadan gemuk berkaki pendek khas pesisir timur Indonesia yang menjulurkan lidah berwarna biru terang untuk menakuti pemangsa.",
    physicalCharacteristics: [
      "Panjang tubuh 50-60 cm dengan tubuh silindris membulat kekar",
      "Lidah berwarna biru tua mengkilap yang dijulurkan saat terancam",
      "Karapas sisik licin berwarna cokelat kekuningan bermotif pita hitam",
      "Ekor tebal penyimpan cadangan lemak tubuh"
    ],
    diet: "Omnivora: Buah jatuh, siput darat, serangga tanah, dan cacing",
    threats: ["Perdagangan ilegal reptil peliharaan eksotis"],
    conservationEfforts: "Pengawasan CITES Appendix II oleh BKSDA Papua."
  },
  {
    id: "sp-40",
    latinName: "Scleropages formosus",
    commonName: "Ikan Arwana Merah (Super Red Kapuas)",
    englishName: "Asian Arowana (Super Red)",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Actinopterygii",
    order: "Osteoglossiformes",
    family: "Osteoglossidae",
    genus: "Scleropages",
    iucnStatus: "EN",
    iucnLabel: "Terguncang (Endangered)",
    population: "Sangat Kritis di alam liar Sungai Kapuas",
    habitat: "Sungai air hitam rawa gambut & danau genangan Kapuas",
    distributionRegion: ["Sungai Kapuas & Danau Sentarum (Kalimantan Barat)"],
    imageUrl: "/images/arwana_merah.png",
    description: "Ikan purba eksotis berkilau merah darah yang merupakan spesies endemic bernilai fantastis dari perairan rawa gambut Danau Sentarum Kalimantan Barat.",
    physicalCharacteristics: [
      "Panjang tubuh mencapai 90 cm dengan sisik membesar berkilau merah menyala",
      "Dua sungut di ujung bibir bawah penangkap getaran di permukaan air",
      "Miring mulut menghadap ke atas untuk menyambar mangsa di permukaan",
      "Jantan mengerami telur di dalam mulut (mouthbrooder) hingga menetas"
    ],
    diet: "Karnivora prediktor: Kelabang, jangkrik, ikan kecil, katak, dan serangga air",
    threats: ["Perburuan liar induk alam & degradasi air rawa gambut"],
    conservationEfforts: "Sertifikasi chip microchip CITES Appendix I & Suaka Danau Sentarum."
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "art-1",
    doi: "10.1038/s41559-026-02104-x",
    title: "Analisis Struktur Populasi & Keanekaragaman Genetik Jalak Bali (Leucopsar rothschildi) di Taman Nasional Bali Barat",
    abstract: "Penelitian ini mengevaluasi keanekaragaman genetik dan keberhasilan pelepasliaran populasi Jalak Bali di Taman Nasional Bali Barat menggunakan marka microsatellite dan pemetaan genetik generasi baru. Hasil menunjukkan peningkatan indeks viabilitas genetik populasi ex-situ secara signifikan.",
    authors: [
      {
        name: "Dr. Satria Wibawa, M.Sc.",
        institution: "Pusat Riset Biosistemasi & Evolusi BRIN",
        role: "Penulis Utama",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Prof. Dr. Rina Kusuma",
        institution: "Fakultas Biologi Universitas Gadjah Mada",
        role: "Ko-Penulis",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
      }
    ],
    coverImage: "/images/jalak_bali.png",
    category: "Ornitologi & Konservasi",
    tags: ["Jalak Bali", "Genetika Populasi", "TN Bali Barat", "Ex-situ", "Endemik"],
    publishedDate: "14 Mei 2026",
    readTime: "12 menit baca",
    citationsCount: 42,
    viewsCount: 1850,
    pdfSize: "2.4 MB",
    peerReviewed: true,
    content: {
      introduction: "Jalak Bali (Leucopsar rothschildi) merupakan spesies burung passerine endemik Bali yang berada dalam status Kritis (Critically Endangered) menurut Daftar Merah IUCN. Degradasi habitat dan perburuan liar historis telah menekan populasi liar hingga titik nadir pada awal dekade 2000-an. Penelitian ini bertujuan mengukur keberhasilan program penangkaran serta dinamika genetik pasca-pelepasliaran di kawasan TN Bali Barat.",
      methodology: "Pengambilan sampel darah non-lethal dari 48 individu Jalak Bali di 3 lokasi penangkaran dan 2 kelompok pelepasliaran liar. Ekstraksi DNA dilakukan menggunakan kit komersial DNeasy Blood & Tissue Kit (Qiagen), dilanjutkan dengan amplifikasi 12 marka microsatellite spesifik sturnidae via Polymerase Chain Reaction (PCR).",
      results: "Analisis heterozigositas yang teramati (Ho = 0,642) menunjukkan tingkat variasi genetik yang relatif tinggi pada kelompok terlepasliarkan dibanding estimasi awal populasi inbred. Indeks diferensiasi populasi (Fst = 0,084) mengonfirmasi struktur aliran gen yang sehat antar unit konservasi.",
      discussion: "Temuan mengonfirmasi bahwa intervensi manajemen genetik melalui pertukaran pejantan antar fasilitas penangkaran (captive breeding) terbukti efektif mencegah kemerosotan perkawinan sekerabat (inbreeding depression). Rekomendasi mencakup pembentukan koridor hijau ke Nusa Penida.",
      conclusion: "Populasi Jalak Bali di TN Bali Barat menunjukkan tren pemulihan viabilitas genetik yang positif. Strategi pelepasliaran berbasis marka DNA direkomendasikan sebagai standar nasional pelindungan satwa avifauna terancam punah."
    },
    references: [
      { id: 1, text: "Rothschild, W. (1912). Description of a new bird from Bali: Leucopsar rothschildi. Bulletin of the British Ornithologists' Club, 31, 4-6.", doi: "10.5962/p.317822" },
      { id: 2, text: "Setiadi, A., & Kusuma, R. (2024). Konservasi Genetik Avifauna Endemik Indonesia. Jurnal Biologi Tropis, 18(2), 112-128.", doi: "10.1038/satwalogi.2024.01" }
    ]
  },
  {
    id: "art-2",
    doi: "10.1016/j.biocon.2026.10892",
    title: "Identifikasi Genomik & Pemetaan Habitat Kritis Orangutan Tapanuli (Pongo tapanuliensis) di Lanskap Batang Toru",
    abstract: "Studi genomik komparatif membedakan Orangutan Tapanuli dari spesies Pongo lainnya berdasarkan urutan genom utuh. Pemetaan spasial GIS mengidentifikasi 3 blok habitat tersisa yang memerlukan pelindungan koridor mendesak.",
    authors: [
      {
        name: "Dr. Satria Wibawa, M.Sc.",
        institution: "Pusat Riset Biosistemasi & Evolusi BRIN",
        role: "Penulis Utama",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      }
    ],
    coverImage: "/images/orangutan_tapanuli.png",
    category: "Taksonomi & Genomik",
    tags: ["Orangutan Tapanuli", "Genomik", "Batang Toru", "GIS Spasial"],
    publishedDate: "28 April 2026",
    readTime: "15 menit baca",
    citationsCount: 68,
    viewsCount: 3120,
    pdfSize: "3.8 MB",
    peerReviewed: true,
    content: {
      introduction: "Orangutan Tapanuli (Pongo tapanuliensis) diakui sebagai spesies kera besar tersendiri pada tahun 2017. Terisolasi di ekosistem Batang Toru Sumatra Utara, spesies ini diperkirakan tersisa kurang dari 800 individu. Penelitian ini menyajikan data analisis rantai genom terbaru serta model spasial keterhubungan lanskap.",
      methodology: "Sequencing genom generasi baru (NGS) pada sampel feses dan sampel jaringan biologis museum. Analisis pemetaan vegetasi menggunakan satelit Sentinel-2 dan LIDAR airborne untuk memetakan kanopi hutan basah pegunungan (800-1200 mdpl).",
      results: "Penjelajahan genom mengonfirmasi garis keturunan P. tapanuliensis telah terpisah dari P. abelii sejak 3,4 juta tahun lalu. Pemetaan GIS mengindikasikan fragmentasi serius antar blok barat dan timur akibat jalan koridor utama.",
      discussion: "Tanpa pembangunan jembatan kanopi buatan dan pembentukan suaka margasatwa terintegrasi, risiko kepunahan lokal akibat efek leher botol (bottleneck effect) diperkirakan mencapai 70% dalam kurun 50 tahun ke depan.",
      conclusion: "Pelindungan lanskap Batang Toru sebagai suaka terproteksi mutlak diperlukan demi kelangsungan hidup spesies kera besar paling terancam punah di planet ini."
    },
    references: [
      { id: 1, text: "Nater, A., et al. (2017). Morphometric, Behavioral, and Genomic Evidence for a New Orangutan Species. Current Biology, 27(22), 3487-3498.", doi: "10.1016/j.cub.2017.09.047" }
    ]
  },
  {
    id: "art-3",
    doi: "10.1093/aob/mcw214",
    title: "Evolusi Parasitisme & Struktur Morfologi Padma Raksasa (Rafflesia arnoldii) di Hutan Basah Bengkulu",
    abstract: "Kajian fisiologi organ tumbuhan parasit obligat Rafflesia arnoldii mengungkapkan transfer gen horizontal (HGT) unik antara tanaman inang Tetrastigma dan jaringan bunga padma, memicu ukuran perbungaan raksasa.",
    authors: [
      {
        name: "Dr. Maya Indah, M.Si.",
        institution: "Kebun Raya Bogor & LIPI-BRIN",
        role: "Penulis Utama",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
      }
    ],
    coverImage: "/images/rafflesia.png",
    category: "Botani Tropis",
    tags: ["Rafflesia arnoldii", "Parasitisme", "Bengkulu", "Fisiologi Tumbuhan"],
    publishedDate: "10 Maret 2026",
    readTime: "10 menit baca",
    citationsCount: 29,
    viewsCount: 1420,
    pdfSize: "1.8 MB",
    peerReviewed: true,
    content: {
      introduction: "Rafflesia arnoldii memegang rekor bunga tunggal terbesar di dunia tanpa memiliki daun, akar, atau batang sejati. Pemahaman mengenai mekanisme fisiologi penyerap energi parasit obligat dari akar Tetrastigma menjadi fokus utama riset ini.",
      methodology: "Studi jaringan histologi endofit dan sekual translokasi hara menggunakan perunut isotop karbon-14 pada kuncop mekar di kawasan Cagar Alam Taba Penanjung Bengkulu.",
      results: "Ditemukan bahwa Rafflesia menyerap lebih dari 85% hasil fotosintesis inang selama fase perkembangan kuncup 9 bulan sebelum mekar selama 5-7 hari.",
      discussion: "Temuan memberikan wawasan baru tentang strategi konservasi ex-situ in-vitro di Kebun Raya Bogor.",
      conclusion: "Ketergantungan mutlak pada spesies inang Tetrastigma menuntut konservasi ekosistem hutan primer secara utuh."
    },
    references: [
      { id: 1, text: "Meijer, W. (1997). Rafflesiaceae. Flora Malesiana, Series 1, 13, 1-42.", doi: "10.1093/aob/mcw214" }
    ]
  },
  {
    id: "art-4",
    doi: "10.1016/j.apacoust.2026.107821",
    title: "Bioakustik & Karakteristik Vokalisasi Teritorial Harimau Sumatra (Panthera tigris sumatrae)",
    abstract: "Analisis spektrogram auman dan panggilan infrasonik Harimau Sumatra menggunakan array mikrofon bioakustik jarak jauh di Taman Nasional Kerinci Seblat.",
    authors: [
      {
        name: "Dr. Satria Wibawa, M.Sc.",
        institution: "Pusat Riset Biosistemasi & Evolusi BRIN",
        role: "Penulis Utama",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      }
    ],
    coverImage: "/images/harimau_sumatra.png",
    category: "Bioakustik Satwa",
    tags: ["Harimau Sumatra", "Bioakustik", "Infrasonik", "Kerinci Seblat"],
    publishedDate: "22 Februari 2026",
    readTime: "9 menit baca",
    citationsCount: 51,
    viewsCount: 2410,
    pdfSize: "2.1 MB",
    peerReviewed: true,
    content: {
      introduction: "Harimau Sumatra memanfaatkan gelombang infrasonik (<20 Hz) untuk berkomunikasi melintasi rapatnya kanopi hutan hujan tropis Sumatra. Perekaman bioakustik menjadi metode pasif non-invasif untuk sensus populasi.",
      methodology: "Pemasangan 24 unit recorder bioakustik terkalibrasi di koridor lanskap Kerinci Seblat selama 180 hari operasional kontinu.",
      results: "Frekuensi auman teritorial jantan berkisar antara 14 Hz hingga 180 Hz dengan jangkauan rambat sinyal hingga 5 kilometer di bawah tutupan kanopi rapat.",
      discussion: "Bioakustik terbukti 3x lebih efisien dibanding metode pemantauan jejak kaki konvensional.",
      conclusion: "Teknologi bioakustik pasif direkomendasikan untuk pemantauan megafauna carnivora di seluruh kawasan konservasi Indonesia."
    },
    references: [
      { id: 1, text: "Larom, D., et al. (1997). Audible and infrasonic vocalizations of Bengal tigers. The Journal of the Acoustical Society of America, 102, 3122.", doi: "10.1121/1.420651" }
    ]
  },
  {
    id: "art-5",
    doi: "10.1021/acs.jnatprod.6b00192",
    title: "Karakterisasi Enzim Mikroba Pencerna pada Perangkap Kantong Semar Raksasa (Nepenthes rajah)",
    abstract: "Isolasi dan analisis sekuens protease dan nepredensin pada cairan enzimatis Nepenthes rajah di Pegunungan Kinabalu Kalimantan.",
    authors: [
      {
        name: "Dr. Budi Santoso, M.Pharm.",
        institution: "Pusat Riset Bioteknologi BRIN",
        role: "Penulis Utama",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
      }
    ],
    coverImage: "/images/kantong_semar.png",
    category: "Biokimia Tumbuhan",
    tags: ["Kantong Semar", "Nepenthes rajah", "Biokimia", "Enzim", "Kalimantan"],
    publishedDate: "18 Januari 2026",
    readTime: "11 menit baca",
    citationsCount: 19,
    viewsCount: 980,
    pdfSize: "1.6 MB",
    peerReviewed: true,
    content: {
      introduction: "Nepenthes rajah mampu mencerna mangsa organik kompleks melalui kombinasi enzim cairan pencerna dan simbiotik mikroba.",
      methodology: "Kromatografi cair kinerja tinggi (HPLC) dan analisis spektrometri massa MALDI-TOF pada cairan kantong.",
      results: "Berhasil diidentifikasi 4 isoenzim protease stabil pH asam yang efektif menghidrolisis protein kompleks.",
      discussion: "Aplikasi potensi biomedis mencakup agen terapetik pemecah kotoran dan enzim industri ramah lingkungan.",
      conclusion: "Perangkap Nepenthes rajah merupakan pabrik biokimia alami dengan potensi komersial tinggi."
    },
    references: [
      { id: 1, text: "Clarke, C. (1997). Nepenthes of Borneo. Natural History Publications (Borneo), Kota Kinabalu.", doi: "10.1021/acs.jnatprod.6b00192" }
    ]
  },
  {
    id: "art-6",
    doi: "10.1111/gcb.16890",
    title: "Stabilitas Struktur Kanopi Pohon Meranti Kuning (Shorea faguetiana) sebagai Penyerap Karbon Utama Kalimantan",
    abstract: "Pengukuran kanopi 3D airborne LIDAR pada pohon raksasa Menara (100.8m) mengonfirmasi peran vital Dipterocarpaceae dalam penyerapan biomassa karbon hutan hujan tropis.",
    authors: [
      {
        name: "Dr. Satria Wibawa, M.Sc.",
        institution: "Pusat Riset Biosistemasi & Evolusi BRIN",
        role: "Penulis Utama",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      }
    ],
    coverImage: "/images/meranti_kuning.png",
    category: "Ekologi Hutan",
    tags: ["Meranti Kuning", "Shorea faguetiana", "Biomassa Karbon", "LIDAR", "Kalimantan"],
    publishedDate: "05 Januari 2026",
    readTime: "14 menit baca",
    citationsCount: 35,
    viewsCount: 1670,
    pdfSize: "2.9 MB",
    peerReviewed: true,
    content: {
      introduction: "Pohon Meranti Kuning (Shorea faguetiana) merupakan pohon tropis tertinggi di bumi. Penelitian ini mengukur simpanan karbon stok biomassa kanopi raksasa Kalimantan.",
      methodology: "Pemindaian 3D LIDAR helikopter berpresisi mm pada 120 pohon meranti tua di lanskap hutan primer Kalimantan.",
      results: "Satu pohon individu meranti dewasa menyimpan rata-rata 120 ton stok karbon murni.",
      discussion: "Pembalakan satu pohon meranti tua berdampak setara dengan emisi ratusan kendaraan motor tahunan.",
      conclusion: "Pelindungan hutan tutupan meranti tua merupakan investasi vital bagi mitigasi perubahan iklim global."
    },
    references: [
      { id: 1, text: "Shenkin, A., et al. (2019). The world's tallest tropical tree in Sabah, Malaysian Borneo. Frontiers in Forests and Global Change, 2, 32.", doi: "10.3389/ffgc.2019.00032" }
    ]
  }
];

export const ADMIN_VERIFICATION_QUEUE: AdminVerificationItem[] = [
  {
    id: "queue-1",
    articleTitle: "Analisis Bioakustik Vokalisasi Nokturnal Tarsius Wallace di Sulawesi Tengah",
    authorName: "Ahmad Dahlan, S.Si.",
    authorInstitution: "Universitas Tadulako Palu",
    category: "Bioakustik Satwa",
    submittedDate: "27 Juli 2026",
    status: "PENDING",
    plagiarismScore: 6.2,
    taxonomyAccuracyScore: 94,
    citationsVerified: true,
    abstractText: "Penelitian ini memetakan rentang frekuensi komunikasi nokturnal Tarsius wallacei di kawasan hutan sekunder Kabupaten Sigi Sulawesi Tengah. Rekaman bioakustik menangkap pola duet pagi hari pada frekuensi 12-16 kHz.",
    previewSnippet: "Tarsius wallacei mengekspresikan panggilan pasangan dengan nada tinggi unik...",
    reviewerNotes: "Naskah dalam antrean peninjauan akhir oleh Dewan Redaksi BRIN.",
    fullBody: "Tarsius wallacei merupakan spesies primata kecil yang aktif di malam hari. Metode bioakustik pasif digunakan untuk mengidentifikasi individu tanpa mengganggu mikrohabitat vegetasi bambu.",
    tags: ["Tarsius Wallace", "Sulawesi", "Bioakustik"],
    speciesTag: "sp-12",
    coverImage: "/images/tarsius_wallace.png"
  },
  {
    id: "queue-2",
    articleTitle: "Studi Ekologi Peneluran Penyu Hijau (Chelonia mydas) di Pantai Pangumbahan",
    authorName: "Siti Rahmawati, M.Si.",
    authorInstitution: "Fakultas Perikanan & Kelautan IPB",
    category: "Konservasi Pesisir",
    submittedDate: "25 Juli 2026",
    status: "REVISION_NEEDED",
    plagiarismScore: 14.5,
    taxonomyAccuracyScore: 88,
    citationsVerified: true,
    abstractText: "Pemantauan frekuensi mendarat dan tingkat keberhasilan penetasan telur penyu hijau di kawasan Konservasi Pangumbahan Sukabumi selama musim barat 2026.",
    previewSnippet: "Tingkat penetasan alami mencapai 78% dengan suhu sarang rata-rata 29.4°C...",
    reviewerNotes: "Mohon tambahkan grafik fluktuasi suhu permukaan pasir dan referensi DOI terkini.",
    fullBody: "Pantai Pangumbahan merupakan salah satu lokasi peneluran utama Penyu Hijau di Jawa Barat. Studi ini mengevaluasi dampak temperatur sarang terhadap rasio jenis kelamin tukik.",
    tags: ["Penyu Hijau", "Pangumbahan", "Konservasi"],
    speciesTag: "sp-5",
    coverImage: "/images/penyu_hijau.png"
  },
  {
    id: "queue-3",
    articleTitle: "Distribusi Spasial & Pemetaan Koridor Gajah Sumatra (Elephas maximus sumatranus)",
    authorName: "Dr. Satria Wibawa, M.Sc.",
    authorInstitution: "Pusat Riset Biosistemasi & Evolusi BRIN",
    category: "Ekologi Megafauna",
    submittedDate: "20 Juli 2026",
    status: "APPROVED",
    plagiarismScore: 4.1,
    taxonomyAccuracyScore: 98,
    citationsVerified: true,
    abstractText: "Pemodelan Spasial MaxEnt untuk mengidentifikasi jalur migrasi kritis Gajah Sumatra antar lanskap Way Kambas dan Bukit Barisan Selatan.",
    previewSnippet: "Data telemetri GPS collar mengonfirmasi penurunan ketersediaan pakan bambu liar...",
    reviewerNotes: "Naskah telah diverifikasi akurat secara taksonomi dan disetujui untuk publikasi live.",
    fullBody: "Gajah Sumatra membutuhkan ruang jelajah melintasi beberapa kabupaten di Lampung dan Bengkulu. Koridor terintegrasi adalah kunci pencegahan konflik dengan perkebunan warga.",
    tags: ["Gajah Sumatra", "Way Kambas", "GIS Spasial"],
    speciesTag: "sp-7",
    coverImage: "/images/gajah_sumatra.png"
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
    "Herpetologi Indonesia"
  ],
  stats: {
    totalArticles: 6,
    totalCitations: 236,
    totalReads: 12450,
    hIndex: 8
  },
  bookmarks: ["art-1", "art-2", "art-4"]
};
