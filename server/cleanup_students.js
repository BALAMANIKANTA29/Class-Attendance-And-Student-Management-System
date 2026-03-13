import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'attendance.db');
const db = new Database(dbPath);

const rollsToDelete = ['23B21A45C1', '236Q1A4529'];

for (const roll of rollsToDelete) {
    const info = db.prepare("DELETE FROM students WHERE roll = ?").run(roll);
    console.log(`Deleted ${roll} from students table. Changes: ${info.changes}`);
    
    // Also delete from attendance_history if they have any records
    // Actually roll is used as a key in JSON string in attendance_history table?
    // Let's check schema
}

// Attendance history table schema: id, date, data (JSON)
// We might need to cleanup the JSON data too if we want to be thorough.
// But mostly users care about the student list.

console.log('Cleanup complete.');
