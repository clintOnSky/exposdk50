import * as SQLite from "expo-sqlite/next";

export let db: SQLite.SQLiteDatabase;

export const initDb = async () => {
  db = await SQLite.openDatabaseAsync("TodoDatabase");

  // `execAsync()` is useful for bulk queries when you want to execute alltogether.
  // Please note that `execAsync()` does not escape parameters and may lead to SQL injection.

  await db.execAsync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, point INTEGER);
  INSERT INTO tasks (value, point) VALUES ('Fix performance', 20);
  INSERT INTO tasks (value, point) VALUES ('Add themes', 18);
  INSERT INTO tasks (value, point) VALUES ('Change button colour', 1);
  `);
  console.log("Init database");
};

// Define an interface for the row object
interface Task {
  id: number;
  value: string;
  point: number;
}

export const getTasks = async () => {
  console.log("Called");
  if (!db) {
    console.log("Database does not exist");
    return;
  }
  // `getAllAsync()` is useful when you want to get all results as an array of objects.
  const allRows = await db.getAllAsync<Task>("SELECT * FROM tasks");
  console.log("Get all async");
  for (const row of allRows) {
    console.log(row.id, row.value, row.point);
  }
  return allRows;
};
