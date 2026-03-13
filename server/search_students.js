import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'attendance.db');
const db = new Database(dbPath);

const results = db.prepare("SELECT roll, name, parentName FROM students WHERE name LIKE '%KAMAL%' OR parentName LIKE '%KAMAL%'").all();
console.log('Results:', results);
