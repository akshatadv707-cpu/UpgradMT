import { DatabaseSync } from "node:sqlite";
import path from "node:path";

const db = new DatabaseSync(path.join(process.cwd(), "lab.db"));

db.exec("PRAGMA busy_timeout = 5000;");
db.exec("PRAGMA journal_mode = WAL;");

db.exec(`
  CREATE TABLE IF NOT EXISTS titles (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    overview TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS watch_counts (
    slug TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0
  );
`);

const seedCount = db.prepare("SELECT COUNT(*) AS n FROM titles").get() as {n: number;};

if (seedCount.n === 0) {
  const insert = db.prepare(
    "INSERT INTO titles (slug, title, overview) VALUES (?, ?, ?)",
  );
  insert.run(
    "nebula-drift",
    "Nebula Drift",
    "A salvage crew stranded on a dying space station has one orbit left to fix their reactor before it takes the station's atmosphere with it.",
  );
  insert.run(
    "the-long-corridor",
    "The Long Corridor",
    "A night-shift hospital security guard starts finding messages on the CCTV monitors that no one else can see.",
  );
  insert.run(
    "counting-stars",
    "Counting Stars",
    "Two estranged siblings drive across three states to scatter their father's ashes at the observatory where he proposed.",
  );
  insert.run(
    "missing-reel",
    "The Lost Reel",
    "The final reel of this print was never recovered — loading it always fails. It exists to exercise the error.tsx boundary in Exercise 6.",
  );
}

export type Title = { slug: string; title: string; overview: string };

export function listTitles(): Pick<Title, "slug" | "title">[] {
  return db.prepare("SELECT slug, title FROM titles ORDER BY slug").all() as Pick<
    Title,
    "slug" | "title"
  >[];
}

export function getTitle(slug: string): Title | undefined {
  if (slug === "missing-reel") {
    throw new Error(
      'Simulated crash while loading title "missing-reel" — this is intentional.',
    );
  }
  return db
    .prepare("SELECT slug, title, overview FROM titles WHERE slug = ?")
    .get(slug) as Title | undefined;
}

export function getWatchCount(slug: string): number {
  const row = db
    .prepare("SELECT count FROM watch_counts WHERE slug = ?")
    .get(slug) as { count: number } | undefined;
  return row?.count ?? 0;
}

export function getTotalWatches(): number {
  const row = db
    .prepare("SELECT COALESCE(SUM(count), 0) AS total FROM watch_counts")
    .get() as {
    total: number;
  };
  return row.total;
}

export function incrementWatchCount(slug: string): number {
  db.prepare(
    `INSERT INTO watch_counts (slug, count) VALUES (?, 1)
     ON CONFLICT(slug) DO UPDATE SET count = count + 1`,
  ).run(slug);
  return getWatchCount(slug);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getReviews(slug: string): Promise<string[]> {
  await sleep(1500);
  return [
    `Really enjoyed "${slug}" — worth the watch.`,
    "The pacing dragged a bit in the middle but the ending landed.",
    "Second this — more like it please.",
  ];
}
