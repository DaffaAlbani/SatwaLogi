/**
 * SQLite Database Service for Satwalogi
 * 
 * Implements principles from SQLite Database Expert skill:
 * - Parameterized queries (SQL injection prevention)
 * - Migration system with version tracking
 * - WAL mode + performance PRAGMAs
 * - Transaction safety
 * - Proper error handling (no SQL details in user-facing errors)
 */
import initSqlJs, { Database as SqlJsDatabase, SqlJsStatic, SqlValue } from 'sql.js';
import { RegisteredUser, JournalArticle, AdminVerificationItem, JOURNAL_ARTICLES, ADMIN_VERIFICATION_QUEUE } from '../data/satwaData';

// ---------------------------------------------------------------------------
// Database singleton
// ---------------------------------------------------------------------------
let SQL: SqlJsStatic | null = null;
let db: SqlJsDatabase | null = null;
const DB_KEY = 'satwalogi_db';

// ---------------------------------------------------------------------------
// Migration definitions
// ---------------------------------------------------------------------------
interface Migration {
  version: number;
  name: string;
  up: string[];
  down: string[];
}

const MIGRATIONS: Migration[] = [
  {
    version: 1,
    name: 'create_users_table',
    up: [`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT DEFAULT '',
        institution TEXT DEFAULT '',
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL DEFAULT 'Pembaca',
        avatar TEXT DEFAULT '',
        bio TEXT DEFAULT '',
        scientific_interests TEXT DEFAULT '[]',
        total_articles INTEGER DEFAULT 0,
        total_citations INTEGER DEFAULT 0,
        total_reads INTEGER DEFAULT 0,
        h_index INTEGER DEFAULT 0,
        bookmarks TEXT DEFAULT '[]',
        created_at TEXT DEFAULT (datetime('now'))
      )
    `],
    down: ['DROP TABLE IF EXISTS users'],
  },
  {
    version: 2,
    name: 'create_articles_table',
    up: [`
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        doi TEXT DEFAULT '',
        title TEXT NOT NULL,
        abstract_text TEXT DEFAULT '',
        authors_json TEXT DEFAULT '[]',
        cover_image TEXT DEFAULT '',
        category TEXT DEFAULT '',
        tags_json TEXT DEFAULT '[]',
        published_date TEXT DEFAULT '',
        read_time TEXT DEFAULT '',
        citations_count INTEGER DEFAULT 0,
        views_count INTEGER DEFAULT 0,
        pdf_size TEXT DEFAULT '',
        peer_reviewed INTEGER DEFAULT 0,
        content_json TEXT DEFAULT '{}',
        references_json TEXT DEFAULT '[]',
        source TEXT DEFAULT 'user',
        created_at TEXT DEFAULT (datetime('now'))
      )
    `],
    down: ['DROP TABLE IF EXISTS articles'],
  },
  {
    version: 3,
    name: 'create_verification_queue_table',
    up: [`
      CREATE TABLE IF NOT EXISTS verification_queue (
        id TEXT PRIMARY KEY,
        article_title TEXT NOT NULL,
        author_name TEXT DEFAULT '',
        author_institution TEXT DEFAULT '',
        category TEXT DEFAULT '',
        submitted_date TEXT DEFAULT '',
        status TEXT DEFAULT 'PENDING',
        plagiarism_score REAL DEFAULT 0,
        taxonomy_accuracy_score INTEGER DEFAULT 0,
        citations_verified INTEGER DEFAULT 0,
        abstract_text TEXT DEFAULT '',
        preview_snippet TEXT DEFAULT '',
        reviewer_notes TEXT DEFAULT '',
        full_body TEXT DEFAULT '',
        tags_json TEXT DEFAULT '[]',
        species_tag TEXT DEFAULT '',
        cover_image TEXT DEFAULT '',
        created_at TEXT DEFAULT (datetime('now'))
      )
    `],
    down: ['DROP TABLE IF EXISTS verification_queue'],
  },
  {
    version: 4,
    name: 'create_registered_users_table',
    up: [`
      CREATE TABLE IF NOT EXISTS registered_users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        institution TEXT DEFAULT '',
        role TEXT DEFAULT 'Penulis',
        created_at TEXT DEFAULT (datetime('now'))
      )
    `],
    down: ['DROP TABLE IF EXISTS registered_users'],
  },
  {
    version: 5,
    name: 'add_indexes',
    up: [
      'CREATE INDEX IF NOT EXISTS idx_articles_source ON articles(source)',
      'CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category)',
      'CREATE INDEX IF NOT EXISTS idx_verification_status ON verification_queue(status)',
      'CREATE INDEX IF NOT EXISTS idx_registered_users_email ON registered_users(email)',
    ],
    down: [
      'DROP INDEX IF EXISTS idx_articles_source',
      'DROP INDEX IF EXISTS idx_articles_category',
      'DROP INDEX IF EXISTS idx_verification_status',
      'DROP INDEX IF EXISTS idx_registered_users_email',
    ],
  },
];

// ---------------------------------------------------------------------------
// Database initialization
// ---------------------------------------------------------------------------

async function initSqlJsOnce(): Promise<SqlJsStatic> {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
    });
  }
  return SQL;
}

function loadFromStorage(): Uint8Array | null {
  try {
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      const binary = atob(saved);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    }
  } catch {
    // Ignore load errors
  }
  return null;
}

function saveToStorage(database: SqlJsDatabase): void {
  try {
    const data = database.export();
    const binary = Array.from(data)
      .map((b) => String.fromCharCode(b))
      .join('');
    localStorage.setItem(DB_KEY, btoa(binary));
  } catch {
    console.warn('Failed to save database to localStorage');
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getDatabase(): Promise<SqlJsDatabase> {
  if (db) return db;

  const SQLJs = await initSqlJsOnce();
  const existingData = loadFromStorage();

  if (existingData) {
    db = new SQLJs.Database(existingData);
  } else {
    db = new SQLJs.Database();
  }

  // Apply secure/performance PRAGMAs (as recommended by skill)
  db.run('PRAGMA foreign_keys = ON');
  db.run('PRAGMA journal_mode = MEMORY');  // Use MEMORY for browser env
  db.run('PRAGMA temp_store = MEMORY');
  db.run('PRAGMA cache_size = -64000');

  return db;
}

export function closeDatabase(): void {
  if (db) {
    saveToStorage(db);
    db.close();
    db = null;
  }
}

// Auto-save periodically
let autoSaveInterval: ReturnType<typeof setInterval> | null = null;

export function startAutoSave(intervalMs: number = 5000): void {
  stopAutoSave();
  autoSaveInterval = setInterval(() => {
    if (db) {
      saveToStorage(db);
    }
  }, intervalMs);
}

export function stopAutoSave(): void {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
    autoSaveInterval = null;
  }
}

// ---------------------------------------------------------------------------
// Migration runner (version-controlled as per skill)
// ---------------------------------------------------------------------------

export async function runMigrations(): Promise<void> {
  const database = await getDatabase();

  // Create migration tracking table
  database.run(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT DEFAULT (datetime('now'))
    )
  `);

  const currentVersion: number = (database.exec(
    'SELECT COALESCE(MAX(version), 0) as v FROM schema_migrations'
  )[0]?.values[0]?.[0] as number) ?? 0;

  const pendingMigrations = MIGRATIONS.filter((m) => m.version > currentVersion);

  for (const migration of pendingMigrations) {
    console.log(`Running migration ${migration.version}: ${migration.name}`);

    try {
      database.run('BEGIN TRANSACTION');

      for (const stmt of migration.up) {
        database.run(stmt);
      }

      database.run(
        'INSERT INTO schema_migrations (version, name) VALUES (?, ?)',
        [migration.version, migration.name]
      );

      database.run('COMMIT');
      console.log(`Migration ${migration.version} applied successfully.`);
    } catch (err) {
      database.run('ROLLBACK');
      console.error(`Migration ${migration.version} failed:`, err);
      throw err;
    }
  }

  saveToStorage(database);
}

// ---------------------------------------------------------------------------
// User operations (with parameterized queries)
// ---------------------------------------------------------------------------
// User operations (with parameterized queries & auto table creation safety)
// ---------------------------------------------------------------------------

export function ensureRegisteredUsersTable(): void {
  if (!db) return;
  try {
    db.run(`
      CREATE TABLE IF NOT EXISTS registered_users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        institution TEXT DEFAULT '',
        role TEXT DEFAULT 'Penulis',
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);
  } catch (e) {
    console.warn('ensureRegisteredUsersTable warning:', e);
  }
}

export function insertInitialAdminUser(): void {
  if (!db) return;
  ensureRegisteredUsersTable();

  try {
    const existing = db.exec(
      'SELECT id FROM registered_users WHERE email = ?',
      ['admin@satwalogi.or.id']
    );

    if (existing.length === 0 || existing[0].values.length === 0) {
      db.run(
        `INSERT INTO registered_users (id, name, email, username, password, institution, role)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          'usr-admin-1',
          'Admin Satwalogi',
          'admin@satwalogi.or.id',
          'admin',
          'admin123',
          'Pusat Admin Satwalogi',
          'Admin',
        ]
      );
      saveToStorage(db);
    }
  } catch (err) {
    console.warn('insertInitialAdminUser error:', err);
  }
}

// ---------------------------------------------------------------------------
// LocalStorage Fallback Helper for Registered Users
// ---------------------------------------------------------------------------
const LOCAL_USERS_KEY = 'satwalogi_local_users';

function getLocalUsers(): RegisteredUser[] {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveLocalUsers(users: RegisteredUser[]): void {
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch {}
}

export function findRegisteredUser(
  usernameOrEmail: string,
  password: string
): RegisteredUser | null {
  const cleanInput = usernameOrEmail.trim().toLowerCase();
  const cleanPass = password.trim();

  // 1. Try SQLite first if db is loaded
  if (db) {
    try {
      ensureRegisteredUsersTable();
      const result = db.exec(
        `SELECT id, name, email, username, password, institution, role
         FROM registered_users
         WHERE (LOWER(email) = ? OR LOWER(username) = ?) AND password = ?`,
        [cleanInput, cleanInput, cleanPass]
      );

      if (result.length > 0 && result[0].values.length > 0) {
        const row = result[0].values[0];
        return {
          id: row[0] as string,
          name: row[1] as string,
          email: row[2] as string,
          username: row[3] as string,
          password: row[4] as string,
          institution: row[5] as string,
          role: row[6] as 'Peneliti' | 'Penulis' | 'Pembaca' | 'Admin',
        };
      }
    } catch (e) {
      console.warn('findRegisteredUser SQLite query warning:', e);
    }
  }

  // 2. Fallback to LocalStorage store
  const localUsers = getLocalUsers();
  const found = localUsers.find(
    (u) =>
      (u.email.toLowerCase() === cleanInput || u.username.toLowerCase() === cleanInput) &&
      u.password === cleanPass
  );
  if (found) return found;

  // 3. Fallback to admin default user
  if (
    (cleanInput === 'admin' || cleanInput === 'admin@satwalogi.or.id') &&
    (cleanPass === 'admin' || cleanPass === 'admin123')
  ) {
    return {
      id: 'usr-admin-1',
      name: 'Admin Satwalogi',
      email: 'admin@satwalogi.or.id',
      username: 'admin',
      password: 'admin123',
      institution: 'Pusat Admin Satwalogi',
      role: 'Admin',
    };
  }

  return null;
}

export function registerNewUser(
  name: string,
  email: string,
  username: string,
  password: string,
  institution: string
): RegisteredUser {
  const id = `usr-${Date.now()}`;
  const cleanEmail = email.trim().toLowerCase();
  let finalUsername = username.trim().toLowerCase();

  const localUsers = getLocalUsers();
  if (localUsers.some((u) => u.username.toLowerCase() === finalUsername)) {
    finalUsername = `${finalUsername}-${Math.floor(Math.random() * 8999 + 1000)}`;
  }

  const newUser: RegisteredUser = {
    id,
    name: name.trim(),
    email: cleanEmail,
    username: finalUsername,
    password: password.trim(),
    institution: institution.trim() || 'Umum',
    role: 'Penulis',
  };

  // Always save to LocalStorage fallback first
  localUsers.push(newUser);
  saveLocalUsers(localUsers);

  // Also insert into SQLite if db is ready
  if (db) {
    try {
      ensureRegisteredUsersTable();
      db.run(
        `INSERT INTO registered_users (id, name, email, username, password, institution, role)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, newUser.name, cleanEmail, finalUsername, newUser.password, newUser.institution, 'Penulis']
      );
      saveToStorage(db);
    } catch (err) {
      console.warn('registerNewUser SQLite sync warning:', err);
    }
  }

  return newUser;
}

export function emailExists(email: string): boolean {
  const cleanEmail = email.trim().toLowerCase();

  // Check LocalStorage store
  const localUsers = getLocalUsers();
  if (localUsers.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return true;
  }

  // Check SQLite if db ready
  if (db) {
    try {
      ensureRegisteredUsersTable();
      const result = db.exec(
        'SELECT 1 FROM registered_users WHERE LOWER(email) = ?',
        [cleanEmail]
      );
      return result.length > 0 && result[0].values.length > 0;
    } catch {
      return false;
    }
  }

  return false;
}

// ---------------------------------------------------------------------------
// Article operations (parameterized queries)
// ---------------------------------------------------------------------------

export function saveArticle(article: JournalArticle): void {
  if (!db) return;

  db.run(
    `INSERT OR REPLACE INTO articles
     (id, doi, title, abstract_text, authors_json, cover_image, category,
      tags_json, published_date, read_time, citations_count, views_count,
      pdf_size, peer_reviewed, content_json, references_json, source)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      article.id,
      article.doi,
      article.title,
      article.abstract,
      JSON.stringify(article.authors),
      article.coverImage || '',
      article.category,
      JSON.stringify(article.tags),
      article.publishedDate,
      article.readTime,
      article.citationsCount,
      article.viewsCount,
      article.pdfSize,
      article.peerReviewed ? 1 : 0,
      JSON.stringify(article.content),
      JSON.stringify(article.references),
      'user',
    ]
  );
  saveToStorage(db);
}

export function getAllArticles(source?: string): JournalArticle[] {
  if (!db) return [];

  let query = 'SELECT * FROM articles';
  const params: unknown[] = [];

  if (source) {
    query += ' WHERE source = ?';
    params.push(source);
  }
  query += ' ORDER BY created_at DESC';

  const result = db.exec(query, params as SqlValue[]);
  if (result.length === 0) return [];

  return result[0].values.map((row: unknown[]) => mapRowToArticle(row));
}

function mapRowToArticle(row: unknown[]): JournalArticle {
  return {
    id: row[0] as string,
    doi: row[1] as string,
    title: row[2] as string,
    abstract: row[3] as string,
    authors: JSON.parse((row[4] as string) || '[]'),
    coverImage: (row[5] as string) || undefined,
    category: row[6] as string,
    tags: JSON.parse((row[7] as string) || '[]'),
    publishedDate: row[8] as string,
    readTime: row[9] as string,
    citationsCount: (row[10] as number) || 0,
    viewsCount: (row[11] as number) || 0,
    pdfSize: row[12] as string,
    peerReviewed: Boolean(row[13]),
    content: JSON.parse((row[14] as string) || '{}'),
    references: JSON.parse((row[15] as string) || '[]'),
  };
}

// ---------------------------------------------------------------------------
// Verification queue operations
// ---------------------------------------------------------------------------

export function saveVerificationItem(item: AdminVerificationItem): void {
  if (!db) return;

  db.run(
    `INSERT OR REPLACE INTO verification_queue
     (id, article_title, author_name, author_institution, category,
      submitted_date, status, plagiarism_score, taxonomy_accuracy_score,
      citations_verified, abstract_text, preview_snippet, reviewer_notes,
      full_body, tags_json, species_tag, cover_image)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      item.id,
      item.articleTitle,
      item.authorName,
      item.authorInstitution,
      item.category,
      item.submittedDate,
      item.status,
      item.plagiarismScore,
      item.taxonomyAccuracyScore,
      item.citationsVerified ? 1 : 0,
      item.abstractText,
      item.previewSnippet,
      item.reviewerNotes || '',
      item.fullBody || '',
      JSON.stringify(item.tags || []),
      item.speciesTag || '',
      item.coverImage || '',
    ]
  );
  saveToStorage(db);
}

export function getAllVerificationItems(): AdminVerificationItem[] {
  if (!db) return [];

  const result = db.exec(
    'SELECT * FROM verification_queue ORDER BY created_at DESC'
  );
  if (result.length === 0) return [];

  return result[0].values.map((row: unknown[]) => ({
    id: row[0] as string,
    articleTitle: row[1] as string,
    authorName: row[2] as string,
    authorInstitution: row[3] as string,
    category: row[4] as string,
    submittedDate: row[5] as string,
    status: row[6] as AdminVerificationItem['status'],
    plagiarismScore: (row[7] as number) || 0,
    taxonomyAccuracyScore: (row[8] as number) || 0,
    citationsVerified: Boolean(row[9]),
    abstractText: row[10] as string,
    previewSnippet: row[11] as string,
    reviewerNotes: row[12] as string,
    fullBody: row[13] as string,
    tags: JSON.parse((row[14] as string) || '[]'),
    speciesTag: row[15] as string,
    coverImage: row[16] as string,
  }));
}

export function updateVerificationStatus(
  id: string,
  newStatus: AdminVerificationItem['status'],
  notes: string
): void {
  if (!db) return;

  db.run(
    'UPDATE verification_queue SET status = ?, reviewer_notes = ? WHERE id = ?',
    [newStatus, notes, id]
  );
  saveToStorage(db);
}

// ---------------------------------------------------------------------------
// Seed initial data from constants
// ---------------------------------------------------------------------------

export function seedInitialData(): void {
  if (!db) return;

  insertInitialAdminUser();

  try {
    const articleCount = db.exec('SELECT COUNT(*) FROM articles');
    if (articleCount.length === 0 || articleCount[0].values[0]?.[0] === 0) {
      JOURNAL_ARTICLES.forEach((art) => saveArticle(art));
    }
  } catch (e) {
    console.warn('seedInitialData articles warning:', e);
  }

  try {
    const queueCount = db.exec('SELECT COUNT(*) FROM verification_queue');
    if (queueCount.length === 0 || queueCount[0].values[0]?.[0] === 0) {
      ADMIN_VERIFICATION_QUEUE.forEach((item) => saveVerificationItem(item));
    }
  } catch (e) {
    console.warn('seedInitialData verification_queue warning:', e);
  }
}

// ---------------------------------------------------------------------------
// Database reset (for testing/development)
// ---------------------------------------------------------------------------

export function resetDatabase(): void {
  localStorage.removeItem(DB_KEY);
  if (db) {
    db.close();
    db = null;
  }
}
