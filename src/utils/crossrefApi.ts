import { JournalArticle } from '../data/satwaData';

const CROSSREF_BASE = 'https://api.crossref.org/v1';
const POLITE_MAILTO = 'mailto=admin@satwalogi.or.id';

export interface CrossRefWork {
  DOI: string;
  title?: string[];
  author?: CrossRefAuthor[];
  abstract?: string;
  'container-title'?: string[];
  'published-print'?: { 'date-parts': number[][] };
  'published-online'?: { 'date-parts': number[][] };
  type?: string;
  subject?: string[];
  URL?: string;
  publisher?: string;
  'member'?: string;
  'ISSN'?: string[];
  'issue'?: string;
  volume?: string;
  page?: string;
  'reference'?: { key: string; DOI?: string; 'unstructured'?: string; 'article-title'?: string }[];
}

interface CrossRefAuthor {
  given?: string;
  family?: string;
  sequence?: 'first' | 'additional';
  affiliation?: { name: string }[];
  ORCID?: string;
  role?: { role: string; vocabulary: string }[];
}

interface CrossRefSearchResponse {
  status: string;
  'message-type': string;
  message: {
    'total-results': number;
    items: CrossRefWork[];
    'items-per-page': number;
    query: { 'start-index': number; 'search-terms': string | null };
  };
}

interface CrossRefWorkResponse {
  status: string;
  message: CrossRefWork;
}

/**
 * Strip JATS/XML tags from abstract text
 */
function stripJatsTags(text: string): string {
  return text
    .replace(/<\/?jats:[^>]+>/g, '')
    .replace(/<\/?[a-z]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Format authors into our JournalArticle author format
 */
function mapAuthors(authors: CrossRefAuthor[]): JournalArticle['authors'] {
  return authors.map((auth, idx) => {
    const fullName = [auth.given, auth.family].filter(Boolean).join(' ');
    const institution = auth.affiliation?.[0]?.name || 'Institusi tidak tercantum';

    return {
      name: fullName || 'Penulis tidak diketahui',
      institution,
      role: idx === 0 ? 'Penulis Utama' : auth.sequence === 'first' ? 'Penulis Utama' : 'Kontributor',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || 'Unknown')}&background=062e23&color=d4a373&size=100&bold=true`,
    };
  });
}

/**
 * Extract publication date string from CrossRef date parts
 */
function formatDate(dateObj: { 'date-parts': number[][] } | undefined): string {
  if (!dateObj) return 'Tanggal tidak diketahui';
  const parts = dateObj['date-parts']?.[0];
  if (!parts?.length) return 'Tanggal tidak diketahui';

  const [year, month, day] = parts;
  const date = new Date(year, month ? month - 1 : 0, day || 1);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: day ? 'numeric' : undefined,
  });
}

/**
 * Estimate read time based on abstract length
 */
function estimateReadTime(abstract: string): string {
  const wordCount = abstract.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} menit baca`;
}

/**
 * Generate a placeholder journal article from CrossRef work data
 * CrossRef does not provide full article content sections, so we
 * fill them with a note directing readers to the DOI link.
 */
export function transformCrossRefToArticle(work: CrossRefWork, idx: number): JournalArticle {
  const title = work.title?.[0] || 'Judul tidak tersedia';
  const abstractRaw = work.abstract || '';
  const abstract = abstractRaw ? stripJatsTags(abstractRaw) : 'Abstrak tidak tersedia dalam metadata CrossRef. Silakan kunjungi DOI untuk membaca artikel lengkap.';
  const authors = work.author ? mapAuthors(work.author) : [];
  const dateObj = work['published-print'] || work['published-online'];
  const publishedDate = formatDate(dateObj);
  const tags = work.subject?.slice(0, 6) || ['Artikel Ilmiah', 'CrossRef'];
  const journalName = work['container-title']?.[0] || work.publisher || 'Jurnal Ilmiah';
  const doi = work.DOI;

  // Generate a simple body note since CrossRef only has metadata
  const doiNote = `Artikel ini dimuat dari CrossRef. Untuk membaca konten lengkap, kunjungi https://doi.org/${doi}`;

  return {
    id: `crossref-${idx}-${Math.random().toString(36).slice(2, 8)}`,
    doi: doi,
    title,
    abstract,
    authors: authors.length > 0 ? authors : [{
      name: 'Penulis tidak diketahui',
      institution: 'CrossRef / Publikasi Ilmiah',
      role: 'Penulis',
      avatar: 'https://ui-avatars.com/api/?name=Unknown+Author&background=062e23&color=d4a373&size=100&bold=true',
    }],
    coverImage: undefined,
    category: tags[0] || 'Artikel Ilmiah',
    tags,
    publishedDate,
    readTime: estimateReadTime(abstract),
    citationsCount: 0,
    viewsCount: 0,
    pdfSize: 'N/A',
    peerReviewed: true,
    content: {
      introduction: `Artikel ini bersumber dari CrossRef — infrastruktur metadata terbuka untuk publikasi ilmiah. Judul: "${title}". Diterbitkan di ${journalName} pada ${publishedDate}. ${doiNote}`,
      methodology: 'Metodologi penelitian dapat diakses melalui teks lengkap di DOI publikasi.',
      results: 'Hasil penelitian tersedia di publikasi asli. Silakan merujuk ke DOI untuk detail lengkap.',
      discussion: doiNote,
      conclusion: `Artikel ini telah terdaftar di CrossRef dengan DOI ${doi}. ` + doiNote,
    },
    references: [
      {
        id: 1,
        text: `${title}. ${journalName}. https://doi.org/${doi}`,
        doi: doi,
      },
    ],
  };
}

/**
 * Search CrossRef works by bibliographic query
 * Returns transformed JournalArticle array
 */
export async function searchCrossRefWorks(
  query: string,
  rows: number = 10
): Promise<JournalArticle[]> {
  if (!query.trim()) return [];

  const url = `${CROSSREF_BASE}/works?query.bibliographic=${encodeURIComponent(query)}&rows=${Math.min(rows, 50)}&${POLITE_MAILTO}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CrossRef API error: ${response.status} ${response.statusText}`);
  }

  const data: CrossRefSearchResponse = await response.json();
  const items = data.message?.items || [];

  return items.map((work, idx) => transformCrossRefToArticle(work, idx));
}

/**
 * Fetch a specific work by DOI
 */
export async function fetchWorkByDoi(doi: string): Promise<JournalArticle> {
  const url = `${CROSSREF_BASE}/works/${encodeURIComponent(doi)}?${POLITE_MAILTO}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CrossRef API error: ${response.status} ${response.statusText}`);
  }

  const data: CrossRefWorkResponse = await response.json();
  return transformCrossRefToArticle(data.message, 0);
}

/**
 * Predefined search queries for auto-fetching biodiversity/conservation
 * articles related to Indonesian flora & fauna
 */
export const AUTO_FETCH_QUERIES = [
  'biodiversity conservation Indonesia tropical',
  'wildlife conservation Sumatra Java Borneo',
  'Indonesian flora fauna endangered species',
  'tropical rainforest biodiversity Indonesia',
];

/**
 * Auto-fetch a curated set of articles from CrossRef
 * on initial load to populate the journal feed
 */
export async function fetchInitialCrossRefArticles(
  maxArticles: number = 8
): Promise<JournalArticle[]> {
  const allArticles: JournalArticle[] = [];
  const articlesPerQuery = Math.max(1, Math.ceil(maxArticles / AUTO_FETCH_QUERIES.length));

  for (const query of AUTO_FETCH_QUERIES) {
    try {
      const articles = await searchCrossRefWorks(query, articlesPerQuery);
      allArticles.push(...articles);
    } catch (err) {
      console.warn(`CrossRef fetch warning for "${query}":`, err);
      // Continue with other queries even if one fails
    }
  }

  // Deduplicate by DOI and limit
  const seen = new Set<string>();
  const unique = allArticles.filter((art) => {
    if (seen.has(art.doi)) return false;
    seen.add(art.doi);
    return true;
  });

  return unique.slice(0, maxArticles);
}
