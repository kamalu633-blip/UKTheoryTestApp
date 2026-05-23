import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'uk-theory-test.db';

let database: SQLite.SQLiteDatabase | null = null;

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!database) {
    database = await SQLite.openDatabaseAsync(DATABASE_NAME);
  }
  return database;
}

export async function initializeDatabase(): Promise<void> {
  const db = await getDatabase();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY NOT NULL,
      categoryId TEXT NOT NULL,
      questionText TEXT NOT NULL,
      options TEXT NOT NULL,
      correctAnswerIndex INTEGER NOT NULL,
      explanation TEXT NOT NULL
    );
  `);
}
